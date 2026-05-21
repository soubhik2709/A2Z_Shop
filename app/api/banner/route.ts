// route.ts
import { NextResponse } from "next/server";

type SlideConfig = {
  label: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  searchQuery: string;
};

const SLIDE_CONFIG: SlideConfig[] = [
  {
    label: "New Arrivals",
    title: "Top Electronics & Gadgets",
    subtitle: "Explore the latest in tech — smartphones, laptops & more",
    cta: "Shop Electronics",
    href: "/shop/category/smartphones",
    searchQuery: "electronics technology gadgets",
  },
  {
    label: "Fashion Week",
    title: "Trending Fashion",
    subtitle: "Discover new styles in women's & men's fashion",
    cta: "Shop Fashion",
    href: "/shop/category/womens-dresses",
    searchQuery: "fashion clothing style",
  },
  {
    label: "Home & Living",
    title: "Refresh Your Space",
    subtitle: "Premium furniture and home decor at great prices",
    cta: "Shop Furniture",
    href: "/shop/category/furniture",
    searchQuery: "furniture home interior",
  },
  {
    label: "Beauty Deals",
    title: "Beauty & Skincare",
    subtitle: "Top-rated beauty products — up to 40% off today",
    cta: "Shop Beauty",
    href: "/shop/category/beauty",
    searchQuery: "skincare beauty cosmetics",
  },
  {
    label: "Active Life",
    title: "Sports & Fitness",
    subtitle: "Everything you need to stay active and perform your best",
    cta: "Shop Sports",
    href: "/shop/category/sports-accessories",
    searchQuery: "sports fitness gym",
  },
];

export async function GET() {
  const key = process.env.UNSPLASH_ACCESS_KEY;

  if (!key) {
    console.error("Missing unsplash API key");
    return NextResponse.json(getFallbackSlides()); //hoisting fn.
  }

  try {
    // fetch images for each category individually
    const results = await Promise.allSettled(
      //wait for all value

      SLIDE_CONFIG.map(async (config) => {
        const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(config.searchQuery)}&per_page=1&orientation=landscape&client_id=${key}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        //Each request has its OWN 5 second timeout
        // If one takes longer than 5 seconds, only THAT ONE aborts
        // Others continue normally
        // After 5 seconds, if no response, it aborts and goes to catch block

        try {
          const res = await fetch(searchUrl, { signal: controller.signal }); //connect the signal abort with fetch. now start the timing.
          clearTimeout(timeoutId);

          if (!res.ok) {
            throw new Error(`unsplash  error for ${config.searchQuery}`);
          } //if api fails/expires

          const data = await res.json();
          const photo = data.results?.[0];

          if (!photo) {
            throw new Error(`No photo found for ${config.searchQuery}`);
          }

          return {
            id: photo.id,
            image: photo.urls.regular,
            alt: photo.alt_description ?? config.title,
            photographer: photo.user.name,
            label: config.label,
            title: config.title,
            subtitle: config.subtitle,
            cta: config.cta,
            href: config.href,
          };
        } catch (error) {
          clearTimeout(timeoutId);
          console.error(
            `Failed to fetch image for ${config.searchQuery}:`,
            error,
          );

          // DOUBT 3: Is this return value run when any fetch fails? yes
          // DOUBT 4: How does this return work with allSettled?
          return {
            id: `fallback-${config.label}`,
            image: `/images/fallback-${config.label.toLowerCase().replace(/\s+/g, "-")}.jpg`, //what is this?
            alt: config.title,
            photographer: "A2Z Shop",
            label: config.label,
            title: config.title,
            subtitle: config.subtitle,
            cta: config.cta,
            href: config.href,
          };
        }
      }),
    );

    // Extract successful results (all will have fallbacks
    const slides = results.map((result) => {
      // If promise succeeded, take its value
      if (result.status === "fulfilled") {
        return result.value;
      }
      // If promise failed (should never happen because catch handles everything)
      // But TypeScript needs this, so return a fallback
      return {
        id: "fallback-unknown",
        image: "/images/fallback-generic.jpg",
        alt: "Banner image",
        photographer: "A2Z Shop",
        label: "Sale",
        title: "Special Offer",
        subtitle: "Shop now",
        cta: "Shop Now",
        href: "/shop",
      };
    });

    // console.log("\n The slides is \n", slides);

    return NextResponse.json(slides, {
      headers: {
        "Cache-Control":
          "public, s-maxage=172800, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("Banner API error:", error);
    return NextResponse.json(getFallbackSlides());
  }
}

function getFallbackSlides() {
  return SLIDE_CONFIG.map((config) => ({
    id: `fallback-${config.label}`, //need id for analysic
    image: `/images/fallback-${config.label.toLowerCase().replace(/\s+/g, "-")}.jpg`, //what is this image?
    alt: config.title,
    photographer: "A2Z Shop",
    label: config.label,
    title: config.title,
    subtitle: config.subtitle,
    cta: config.cta,
    href: config.href,
  }));
}

/* 

// DOUBT 3: Is this return value run when any fetch fails?
// ANSWER: YES! If ANY error happens (timeout, 404, no photo)
// This return runs and PROVIDES A FALLBACK IMAGE

// DOUBT 4: How does this return work with allSettled?
// ANSWER: allSettled waits for ALL promises to COMPLETE
// Complete means either SUCCESS (return real image) 
// or FAILURE (return fallback)
// Both are considered "settled" - allSettled waits for both     


//Tell me another situation and example of using Promise.all :

------------------------------------------------
HEADERS (extra instructions)
Cache-Control: public, s-maxage=172800
This tells browser/CDN:
"how to cache this response"

Cache-Control:Controls caching behavior.
It tells:
browser
CDN
Vercel
proxy servers
how to cache your API response.

public
response can be cached by CDN/proxies/browser

s-maxage=3600
cache for 3600 seconds
(Usually for:

CDN
Vercel edge cache
shared caches)

stale-while-revalidate=600
after cache expires,
still serve old cache for 10 mins
while fetching fresh data in background

----------------------------------------------------
What is revalidate?
This is a special Next.js fetch caching rule.
It tells Next.js:
"Reuse cached data for some time,
then fetch fresh data again." and the cahce memory is Next.js fetch system, or if deployed then vercel space.

----------------------------------------------------
next: { revalidate: 3600 }
belongs to:
Next.js FETCH cache
INTERNAL server-side caching.

Cache-Control
belongs to:
HTTP response caching
for external layers.
---------------------------------
working of this two return one return inside the fetch and another response.json

Your app has TWO network layers.

Layer 1
Your server fetching Unsplash:
Next.js server → Unsplash
THIS uses:
next:{revalidate}

Layer 2
Browser fetching YOUR API:
Browser → /api/banner
THIS uses:
Cache-Control headers

Browser
   ↓
/api/banner
   ↓
Next.js fetch cache
   ↓
Unsplash API


--------------------------------------------------------
remove this   next: { revalidate: 172800 }
Why?

revalidate is meant for:

"cache this fetch result in Next.js rendering layer"
But API routes are not rendered pages/components.
They are just backend functions.
So Next.js does not apply the same fetch caching behavior there. IF it was server components instead of route then it will work.
*/
