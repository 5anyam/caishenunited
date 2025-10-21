"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../lib/woocommerceApi";
import ProductCard from "../../../components/ProductCard";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  images?: { src: string }[];
  categories?: { id: number; name: string; slug?: string }[];
}

const isCombo = (p: Product): boolean => {
  const cats = p.categories || [];
  const inComboCategory = cats.some((c) =>
    /combo|duo|set|bundle/i.test(c.name || c.slug || "")
  );
  const nameLooksCombo = /combo|duo|set|bundle/i.test(p.name || "");
  return inComboCategory || nameLooksCombo;
};

export default function CombosPage() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["combos-page-products"],
    queryFn: async () => {
      const result = await fetchProducts(); // If your API supports category filter, use it here
      return (result || []) as Product[];
    },
  });

  const combos = (data || []).filter(isCombo);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Combo Perfumes
          </h1>
          <p className="text-gray-600 mt-2">
            Explore all our value‑packed fragrance duos.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-rose-500">Loading…</div>
        ) : error ? (
          <div className="text-center text-red-500">Couldn&apos;t load combos.</div>
        ) : combos.length === 0 ? (
          <div className="text-center text-gray-500">No combo products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {combos.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
