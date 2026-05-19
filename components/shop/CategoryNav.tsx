// components/shop/CategoryNav.tsx
"use client";
import Link from "next/link";
import {
  Smartphone,
  Shirt,
  Home,
  BookOpen,
  Gamepad2,
  Bike,
  Sofa,
  Microwave,
  ShoppingBasket,
  Sparkles,
  Activity,
  Car,
  ChevronDown,
} from "lucide-react";

export default function CategoryNav() {
  const categories = [
    { name: "Electronics", icon: Smartphone },
    { name: "Fashion", icon: Shirt },
    { name: "Home & Kitchen", icon: Home },
    { name: "Books", icon: BookOpen },
    { name: "Toys", icon: Gamepad2 },
    { name: "Sports", icon: Bike },
    { name: "Furniture", icon: Sofa },
    { name: "Appliances", icon: Microwave },
    { name: "Groceries", icon: ShoppingBasket },
    { name: "Beauty", icon: Sparkles },
    { name: "Health", icon: Activity },
    { name: "Automotive", icon: Car },
    { name: "Gaming", icon: Gamepad2 },
  ];
  // w-full px-4
  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-16 z-40">
      <div className=" w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex items-center  justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-2 sm:py-3 px-2 sm:px-0  w-full">
          {/* All Buttons */}
          <button
            type="button"
            className="whitespace-nowrap text-slate-300 cursor-pointer flex items-center justify-center  gap-1 hover:text-amber-500 transition-colors "
          >
            <span>All</span>
            <ChevronDown className="size-4 opacity-80" />
          </button>

          {/* Categories */}
          <div className="flex-1 min-w-0 ">
            <ul className="flex gap-3 sm:gap-4 md:gap-6  overflow-x-auto py-2 sm:py-3 text-sm scrollbar-hide select-none ">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <li key={category.name}>
                    <Link
                      href="#"
                      className="flex flex-col items-center gap-1 sm:gap-2 text-slate-300  hover:text-amber-500 whitespace-nowrap transition-colors"
                    >
                      <Icon className="size-4 sm:size-5" />
                      <span className="text-xs sm:text-sm">
                        {category.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Side Buttons  */}
          <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              className="px-2 sm:px-3 py-1.5 sm:py-2  whitespace-nowrap  border text-amber-400 cursor-pointer rounded-lg sm:rounded-xl text-sm sm:text-base hover:bg-amber-400/10 transition-colors"
            >
              <span className="font-semibold ">A2Z_pay</span>
            </button>
            <button
              type="button"
              className="px-2 sm:px-3 py-1.5 sm:py-2  whitespace-nowrap  border text-amber-400 cursor-pointer rounded-lg sm:rounded-xl text-sm sm:text-base hover:bg-amber-400/10 transition-colors"
            >
              <span className="font-semibold">XYZ Offer</span>
            </button>
            <button
              type="button"
              className="px-2 sm:px-3 py-1.5 sm:py-2  whitespace-nowrap  border text-amber-400 cursor-pointer rounded-lg sm:rounded-xl text-sm sm:text-base hover:bg-amber-400/10 transition-colors"
            >
              <span className="font-semibold">XYZ Offer</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
