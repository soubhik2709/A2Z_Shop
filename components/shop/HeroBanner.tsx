/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string;
  image: string;
  alt: string;
  label: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  photographer: string;
}

const AUTOPLAY_INTERVAL = 5000;

export default function HeroBanner() {
  const pathname = usePathname();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Function to fetch slides
  const fetchSlides = useCallback(async () => {
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/banner");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setSlides(data);
      setCurrent(0);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array - function never changes

  // Fetch when page loads OR when coming back to homepage
  useEffect(() => {
    if (pathname === "/") {
      fetchSlides();
    }
  }, [pathname, fetchSlides]);

  // handle the browser back button to prevent from continuos loading
  //   useEffect(() => {
  //   const handlePopState = () => {
  //     if (window.location.pathname === '/') {
  //       fetchSlides();
  //     }
  //   };

  //   window.addEventListener('popstate', handlePopState);
  //   return () => window.removeEventListener('popstate', handlePopState);
  // }, [fetchSlides]);

  // Auto-play navigation
  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play timer
  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    timerRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length, next]);

  // Don't show on other pages
  //   if (pathname !== '/') return null;

  // Loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-80 sm:h-105 md:h-125 bg-gray-800 animate-pulse flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-600 border-t-amber-400 rounded-full animate-spin" />
          <span className="text-sm text-gray-400">Loading banners…</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error || slides.length === 0) {
    return (
      <div className="relative w-full h-80 sm:h-105 md:h-125 bg-gray-900 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-sm">
          Banner unavailable. Please try again later.
        </p>
        <button
          onClick={() => fetchSlides()}
          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold text-sm rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  //   Main banner display
  return (
    <section
      className="relative w-full h-80 sm:h-105 md:h-125 overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex items-center z-10">
            <div className="px-8 max-w-xl">
              <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold uppercase bg-amber-400 text-gray-900 rounded-sm">
                {slide.label}
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                {slide.title}
              </h2>
              <p className="text-sm text-gray-300 mb-5">{slide.subtitle}</p>
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold rounded-sm"
              >
                {slide.cta}
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>

          {index === current && (
            <p className="absolute bottom-2 right-3 text-[10px] text-white/40">
              Photo by {slide.photographer} on Unsplash
            </p>
          )}
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white"
      >
        <ChevronLeft className="size-5 mx-auto" />
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white"
      >
        <ChevronRight className="size-5 mx-auto" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all rounded-full ${
              index === current ? "w-6 h-2 bg-amber-400" : "w-2 h-2 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {!isPaused && (
        <div className="absolute bottom-0 left-0 z-20 h-0.5 bg-amber-400/80 animate-progress" />
      )}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress ${AUTOPLAY_INTERVAL}ms linear infinite;
        }
      `}</style>
    </section>
  );
}
