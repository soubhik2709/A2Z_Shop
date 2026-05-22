//ProductCard
"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Star, Heart, Eye, Zap } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  description: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const inStock = product.stock > 0;

  const handleCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <article className="group relative  bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-2 flex flex-col ">
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 ">
        {product.discountPercentage >= 10 && (
          <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {product.stock <= 5 && product.stock > 0 && (
        <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
          Only {product.stock} left
        </span>
      )}

      {product.stock === 0 && (
        <span className="bg-slate-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
          Out of Stock
        </span>
      )}

      {/* Wishlist */}
      <button
        onClick={() => setWished((w) => !w)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        aria-label="Toggle wishlist"
      >
        <Heart
          className={`size-4 transition-colors ${wished ? "fill-rose-500 text-rose-500" : "text-slate-400"}`}
        />
      </button>

      {/*Image  */}
      <div className="relative h-42 bg-slate-50 overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="
        object-contain p-3 group-hover:scale-105 transition-transform duration-500
        "
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Quick view overlay   */}

        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
          <button className="flex items-center gap-1.5 bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow hover:bg-slate-50 transition-colors">
            <Eye className="size-3" /> Quick View
          </button>
        </div>
      </div>

      {/* Content */}

      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-[10px] font-semibold text-indigo-500 uppercase tracking-widest">
          {product.category.replace(/-/g, " ")}
        </span>

        <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 min-h-5 sm:min-h-10">
          {product.title}
        </h3>
        {product.brand && (
          <p className="text-xs text-slate-400">by {product.brand}</p>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`size-3 ${
                  s <= Math.round(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-200 text-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">
            {product.rating.toFixed(1)}
          </span>
        </div>
     {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
          {product.discountPercentage >= 1 && (
            <span className="text-xs text-slate-400 line-through">${originalPrice}</span>
          )}
        </div>

        {/* Cart button */}
        <button
          onClick={handleCart}
          disabled={!inStock}
          className={`w-full mt-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            !inStock
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : addedToCart
              ? "bg-emerald-500 text-white scale-95"
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white"
          }`}
        >
          {addedToCart
            ? <><Zap className="size-4" /> Added!</>
            : <><ShoppingCart className="size-4" /> {inStock ? "Add to Cart" : "Out of Stock"}</>
          }
        </button>
      </div>
    </article>
  );
}

/* 
what is group,tracking-wide,object-contain,items-baseline in css , what is article tag use for? 


what is this in image?
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"

Make it small that it can show tow productCart in one row when its mobile before sm :
*/
/* 
group
------
Allows child elements to react when parent is hovered.

Example:
group-hover:scale-105

means:
"When parent with class 'group' is hovered,
scale this child"

Very common in cards.


tracking-wide
--------------
letter spacing

Makes text slightly spaced out.

Example:
A B C instead of ABC


object-contain
---------------
Image fits completely inside container
WITHOUT cropping.

Difference:

object-cover  -> fills container, may crop image
object-contain -> full image visible


items-baseline
---------------
Aligns text/items according to text baseline.

Useful when:
big price + small discounted price

Example:
$99.99   $120

Both align nicely at text bottom line.


article tag
-------------
Semantic HTML tag.

Used for:
- blog post
- product card
- news card
- independent reusable content

Better for:
SEO + accessibility

Better than random div.


Image sizes prop
-----------------

sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"

Tells Next.js:

On mobile (<640px):
image takes 100% viewport width

On tablet (<1024px):
image takes 50% width

Otherwise:
image takes 25% width

Next.js uses this to:
- generate optimized image sizes
- reduce bandwidth
- improve performance



*/