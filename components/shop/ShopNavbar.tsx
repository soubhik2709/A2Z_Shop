"use client";
import {
  MapPin,
  Search,
  ShoppingCart,
  CircleUserRound,
  ChevronDown,
} from "lucide-react";

export default function ShopNavbar() {
  return (
    <header className=" w-full bg-[#1e293b] text-white shadow-md ">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 ">
        {/* This px not work */}
        <div className="h-16 md:h-20  w-full  mx-auto flex flex-wrap  md:flex-nowrap items-center justify-between gap-3 md:gap-4 min-w-0">
          {/* here if i write the  px then aslo not work */}

          {/* Left Section */}
          <section className="flex items-center gap-3  md:gap-6 shrink-0">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-amber-500 whitespace-nowrap">
              A2Z_Shop
            </h1>
            <button
              type="button"
              className="hidden sm:flex items-center gap-3 text-left hover:text-slate-300 transition-colors focus:outline-none"
            >
              <MapPin className="size-4 md:size-5 text-amber-500 shrink-0" />
              <div className="text-xs md:text-sm">
                <span className="text-slate-400 text-xs md:text-sm">
                  Deliver to Kolkata
                </span>
                <br />
                <span className="font-semibold whitespace-nowrap text-xs md:text-sm">
                  Update Location
                </span>
              </div>
            </button>

            {/* For mobile icon */}
            <button
              type="button"
              className="sm:hidden hover:text-amber-400 transition-colors"
            >
              <MapPin className="size-5 text-amber-500" />
            </button>
          </section>

          {/* Center Section */}
          <form className="flex flex-1 min-w-30 sm:min-w-45 md:min-w-60 border items-center overflow-hidden rounded-md border-slate-300 bg-white focus-within:ring-2 focus-within:ring-amber-500">
            <div className="hidden sm:flex h-10 border-r border-slate-200 bg-slate-100 px-2 md:px-4 text-sm text-slate-700 items-center relative font-medium">
              {/* px-2 md:px-4 is not working */}
              <span className="flex items-center gap-1 pointer-events-none">
                All
                <ChevronDown className="size-4 opacity-80" />
              </span>
              <select className="absolute inset-0 opacity-0 cursor-pointer h-full w-full">
                {/* h-full w-full is not working */}
                <option value="" disabled hidden>
                  All
                </option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              aria-label="Search products"
              className="flex-1 min-w-0 px-3 md:px-4 py-2 text-slate-700 placeholder:text-slate-400 focus:outline-none text-sm md:text-base placeholder:px-1"
            />
            {/* not working px-3 md:px-4 py-2 */}
            <button
              type="submit"
              aria-label="Submit search"
              className="flex items-center h-10 px-3 md:px-5  justify-center bg-amber-500 hover:bg-amber-600 transition-colors text-white"
            >
              {/* px-3 md:px-5  not working */}
              <Search className="size-4 md:size-6" />
            </button>
          </form>



          {/* Navigation right section */}
          <nav className="flex gap-2 sm:gap-4 md:gap-6 justify-end items-center text-sm font-medium cursor-pointer shrink-0 ">
            <button
              type="button"
              className="flex items-center gap-1 md:gap-1.5 hover:text-amber-400 transition-colors focus:outline-none"
            >
              <CircleUserRound className="size-5" />
              <span className="hidden sm:inline text-sm">Login</span>
            </button>

            <button
            type="button"
            className="hidden md:flex items-center gap-1.5 hover:text-amber-400 transition-colors focus:outline-none"
            >
              <span >More</span>
              <ChevronDown className="size-4" />
            </button>
            
               <button
              type="button"
              className="flex items-center gap-1 md:gap-2 hover:text-amber-400 transition-colors focus:outline-none relative"
            >

              <ShoppingCart className="size-5" />
              <span className="hidden sm:inline text-sm">Cart</span>
              <span className="absolute -top-4 left-1 sm:static sm:ml-0  bg-amber-500  text-white text-xs rounded-full w-4 h-4 flex items-center justify-center sm:w-5 sm:h-5">0</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

/* 
sm = 640px and UP
md = 768px and UP
lg = 1024px and UP


*/
