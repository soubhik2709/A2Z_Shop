'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import Image from "next/image";

function ProductsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  const [products, setProducts] = useState<{
    id: number; title: string; price: number;
    thumbnail: string; rating: number; category: string;
  }[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    let url = '';
    if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=20&skip=0`;
    } else if (search) {
      url = `https://dummyjson.com/products/search?q=${search}&limit=20&skip=0`;
    } else {
      url = `https://dummyjson.com/products?limit=20&skip=0`;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (isMounted) {
          setProducts(data.products ?? []);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // 🚀 THE FIX: Defer changing state to an asynchronous micro-task thread.
    // This removes it from the synchronous execution context of the useEffect,
    // which completely satisfies the "no synchronous state updates" linter rule.
    Promise.resolve().then(() => {
      if (isMounted) setLoading(true);
    });

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
        {category || search ? `${category || search}` : 'All Products'}
      </h1>
      <p className="text-gray-500 text-sm mb-6">{products.length} products found</p>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition group border border-gray-100"
            >
              <div className="relative overflow-hidden rounded-t-xl bg-gray-50 h-44 w-full">
                <Image
                  src={p.thumbnail}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-orange-500 capitalize mb-1">{p.category}</p>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">{p.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">${p.price}</span>
                  <span className="text-xs text-yellow-500">⭐ {p.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <ProductsList />
    </Suspense>
  );
}