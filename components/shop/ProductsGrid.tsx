"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import {
  SlidersHorizontal,
  ChevronDown,
  Search,
  Loader2,
  AlertCircle,
} from "lucide-react";

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

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Best Discount", value: "discount" },
];

const LIMITS = [12, 24, 48, 100, 300];

function applyFiltersAndSort(
  products: Product[],
  activeCategory: string,
  search: string,
  sort: string,
): Product[] {
  let result = [...products]; //why write like this?

  if (activeCategory !== "all") result = result.filter((p) => p.category.replace(/-/g, " ") ===
    activeCategory.replace(/-/g, " "));

  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)),
    );
  }
  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      result.sort((a, b) => b.discountPercentage - a.discountPercentage);
      break;
  }

  return result;
}

export default function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [limit, setLimit] = useState(24);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = applyFiltersAndSort(products, activeCategory, search, sort);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(
          `https://dummyjson.com/products?limit=${limit}&select=id,title,price,discountPercentage,rating,stock,brand,category,thumbnail,description`,
        );
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();

        if (cancelled) return; // component unmounted — skip setState

        setProducts(data.products);
        setCategories(
          Array.from(new Set(data.products.map((p: Product) => p.category))),
        );
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    }; // cleanup: React automatically runs this when component unmounts.(user leaves page)
  }, [limit, retryKey]); //why limit and retryKey?

  return (
    <section className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          All Products
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          {loading
            ? "Loading..."
            : `Showing ${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center justify-between mb-6 bg-white rounded-2xl shadow-sm border border-slate-100 p-3 sm:p-4">
        {/*  Left section -input */}
        <div className="flex items-center gap-2 flex-1 min-w-40 max-w-xs bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <Search className="size-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none w-full"
          />
        </div>

        {/* Right section select & Limit-show */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* select option */}
          <div className="relative flex items-center gap-1.5 bg-slate-50 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
            <SlidersHorizontal className="size-4 text-slate-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer appearance-none pr-5"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="size-3 text-slate-400 absolute right-3 pointer-events-none" />
          </div>

          {/* Limit show */}
          <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="bg-transparent focus:outline-none cursor-pointer appearance-none pr-5"
            >
              {LIMITS.map((l) => (
                <option key={l} value={l}>
                  Show {l}
                </option>
              ))}
            </select>
            <ChevronDown className="size-3 text-slate-400 absolute right-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* categories Pills */}
      {categories.length > 0 && (
        <div
          className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 mb-6
        
         max-h-28 overflow-y-auto
        sm:max-h-none sm:overflow-visible

        pr-1 scrollbar-hide
        "
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              activeCategory === "all"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>{
                  setActiveCategory(cat)
                  console.log(cat);
              }}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold border transition-all capitalize mx-1 overflow-hidden ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              {cat.replace(/-/g, " ")}
              {/* what is this  {cat.replace(/-/g, " ")} */}
            </button>
          ))}
        </div>
      )}

      {/* Loadig products */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="size-10 animate-spin text-indigo-500" />
          <p className="text-sm text-slate-600">Fetching products…</p>
        </div>
      )}

      {/* Error  or Failed to load product , try again*/}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <AlertCircle className="size-10 text-rose-400" />
          <p className="font-medium text-slate-600">Failed to load products</p>
          <button
            onClick={() => setRetryKey((k) => k + 1)}
            // why im making the retry number + 1?
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty for Search or Category */}
      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-400">
          <Search className="size-10" />
          <p className="font-medium text-slate-600">No products found</p>
          <p className="text-sm">Try a different search or category</p>
        </div>
      )}

      {/* Grid for show each products */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
// 

// here only limit make fetch api calls then if retry then also api calls
//after that the api return values get sorted, searched , categories by the applyFiltersAndSort fun.
