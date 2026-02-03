'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, ArrowLeft, Smartphone, ShoppingBag, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../../lib/woocommerceApi';
import { productToSlug } from '../../../lib/slug';

// --- CONSTANTS ---
// Using generic images for the category thumbnails to match the clean "icon" look
// You can replace these src URLs with your actual transparent PNGs for better results
const IPHONE_SERIES = [
  { id: '17', name: 'iPhone 17 Series', icon: 'iphone', keywords: ['iphone 17', '17 pro'] },
  { id: '16', name: 'iPhone 16 Series', icon: 'iphone', keywords: ['iphone 16', '16 pro'] },
  { id: '15', name: 'iPhone 15 Series', icon: 'iphone', keywords: ['iphone 15', '15 pro'] },
  { id: '14', name: 'iPhone 14 Series', icon: 'iphone', keywords: ['iphone 14', '14 pro'] },
  { id: 'older', name: 'Classic iPhones', icon: 'iphone', keywords: ['iphone 13', 'iphone 12', 'iphone 11'] },
  // Added extra categories to match the vibe of the screenshot if needed later
  // { id: 'accessories', name: 'Accessories', icon: 'case', keywords: ['case', 'cover'] },
];

const TOP_NAV_CHIPS = [
  { id: 'devices', label: 'Devices', icon: <Smartphone className="w-3 h-3" />, active: true },
  { id: 'glaze', label: 'Glaze Case', icon: <ShoppingBag className="w-3 h-3" />, active: false },
  { id: 'magsafe', label: 'MagSafe', icon: <div className="w-3 h-3 rounded-full border border-current" />, active: false },
];

// --- TYPES ---
interface Category {
  id: number;
  name: string;
  slug?: string;
}

interface ImageData {
  src: string;
}

interface Attribute {
  option: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  description?: string;
  short_description?: string;
  images?: ImageData[]; 
  categories?: Category[];
  attributes?: Attribute[];
  date_created?: string;
}

// --- HELPER FUNCTIONS ---
function detectSeries(productName: string): string {
  const lowerName = productName.toLowerCase();
  if (lowerName.includes('iphone 17')) return '17';
  if (lowerName.includes('iphone 16')) return '16';
  if (lowerName.includes('iphone 15')) return '15';
  if (lowerName.includes('iphone 14')) return '14';
  if (['iphone 13', 'iphone 12', 'iphone 11', 'iphone x', 'iphone se'].some(k => lowerName.includes(k))) return 'older';
  return 'other';
}

function getIphoneVersion(name: string): number {
  const match = name.match(/iphone\s*(\d+)/i);
  if (match && match[1]) return parseInt(match[1], 10);
  return 0;
}

// --- MAIN COMPONENT ---
export default function AppleCollectionPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');

  // FETCH DATA
  const { data: products } = useQuery<Product[]>({
    queryKey: ['apple-products'],
    queryFn: async () => {
      const result = await fetchProducts();
      return ((result || []) as unknown as Product[]).filter((p) => 
        p.name.toLowerCase().includes('iphone') || 
        p.categories?.some(c => c.name.toLowerCase().includes('apple'))
      );
    },
    staleTime: 60_000,
  });

  // FILTER LOGIC
  const results = useMemo(() => {
    if (!products) return [];
    const filtered = activeCategory 
      ? products.filter(p => detectSeries(p.name) === activeCategory)
      : products;

    return filtered.sort((a, b) => {
      const verA = getIphoneVersion(a.name);
      const verB = getIphoneVersion(b.name);
      if (verA !== verB) return verB - verA; 
      return parseFloat(b.price || '0') - parseFloat(a.price || '0');
    });
  }, [products, activeCategory]);

  // HELPER: Get first image for category thumbnail
  const getSeriesImage = (seriesId: string) => {
    if (!products) return null;
    const rep = products.find(p => detectSeries(p.name) === seriesId);
    return rep?.images?.[0]?.src || null;
  };


  // --- RENDER HELPERS ---
  const CategoryRow = ({ series }: { series: typeof IPHONE_SERIES[0] }) => {
    const imageSrc = getSeriesImage(series.id);
    
    return (
      <div 
        onClick={() => setActiveCategory(series.id)}
        className="flex items-stretch gap-4 cursor-pointer group"
      >
        {/* Left Square (Image) */}
        <div className="w-24 h-24 flex-shrink-0 bg-white rounded-3xl p-2 flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-black transition-colors">
          <div className="relative w-full h-full">
             {imageSrc ? (
               <Image 
                 src={imageSrc} 
                 alt={series.name}
                 fill
                 className="object-contain p-1 mix-blend-multiply"
               />
             ) : (
               <Smartphone className="w-8 h-8 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
             )}
          </div>
        </div>

        {/* Right Bar (Text) */}
        <div className="flex-1 bg-white rounded-3xl px-6 flex items-center justify-between shadow-sm border border-gray-100 group-hover:border-black transition-colors">
          <span className="text-lg font-medium text-gray-900">{series.name}</span>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-gray-900 font-sans pb-20">
      
      {/* Top Search & Nav Area */}
      <div className="sticky top-0 z-30 bg-[#F5F5F7]/95 backdrop-blur-md pt-4 pb-2 px-4 space-y-4">
        
        {/* Search Bar (Rounded Pill) */}
        <div className="relative shadow-sm">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-white h-12 rounded-full px-12 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          {searchInput && <X onClick={() => setSearchInput('')} className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" />}
        </div>

        {/* Chip Navigation (Horizontal Scroll) */}
        {!activeCategory && (
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <button className="flex-shrink-0 w-10 h-10 rounded-full border border-black flex items-center justify-center">
               <span className="block w-1.5 h-1.5 bg-black rounded-sm mb-0.5" />
               <span className="block w-1.5 h-1.5 bg-black rounded-sm" />
            </button>
            {TOP_NAV_CHIPS.map(chip => (
              <button 
                key={chip.id}
                className={`flex items-center gap-2 px-5 h-10 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  chip.active 
                    ? 'bg-black text-white' 
                    : 'bg-white text-gray-900 border border-transparent'
                }`}
              >
                {chip.icon}
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {/* Header Title when deeper in nav */}
        {activeCategory && (
           <div className="flex items-center gap-2 pt-2">
             <button onClick={() => setActiveCategory(null)} className="p-2 hover:bg-white rounded-full">
               <ArrowLeft className="w-6 h-6" />
             </button>
             <h1 className="text-2xl font-bold tracking-tight">
               {IPHONE_SERIES.find(s => s.id === activeCategory)?.name}
             </h1>
           </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-4">
        
        {/* VIEW 1: CATEGORY LIST (Reference Style) */}
        {!activeCategory ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold px-1 mb-4">Apple</h2>
            <div className="flex flex-col gap-4">
              {IPHONE_SERIES.map((series) => (
                <CategoryRow key={series.id} series={series} />
              ))}
            </div>
          </div>
        ) : (
          
          /* VIEW 2: PRODUCT GRID */
          <div className="grid grid-cols-2 gap-4">
             {results.length === 0 ? (
               <div className="col-span-full py-20 text-center text-gray-500">
                 No products found in this series.
               </div>
             ) : (
               results.map((product) => (
                 <Link 
                   key={product.id}
                   href={`/product/${productToSlug(product)}`}
                   className="bg-white rounded-3xl p-4 flex flex-col items-center gap-3 shadow-sm border border-transparent hover:border-black transition-all"
                 >
                   <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                     {product.images?.[0] ? (
                       <Image
                         src={product.images[0].src}
                         alt={product.name}
                         fill
                         className="object-cover mix-blend-multiply"
                       />
                     ) : (
                       <Smartphone className="w-10 h-10 text-gray-300 absolute inset-0 m-auto" />
                     )}
                   </div>
                   
                   <div className="text-center w-full">
                     <h3 className="text-sm font-medium line-clamp-2 leading-tight min-h-[2.5em]">
                       {product.name}
                     </h3>
                     <p className="text-sm font-bold mt-2">
                       ₹{parseFloat(product.price || '0').toLocaleString()}
                     </p>
                   </div>
                 </Link>
               ))
             )}
          </div>
        )}
      </div>
    </main>
  );
}
