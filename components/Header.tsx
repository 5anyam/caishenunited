'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import CartIcon from "./CartIcon";
import { useIsMobile } from "../hooks/use-mobile";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { Phone } from "lucide-react";

interface NavItem {
  name: string;
  to: string;
  submenu?: { name: string; to: string }[];
}

const navItems: NavItem[] = [
  { name: "HOME", to: "/" },
  { 
    name: "PHONE COVERS", 
    to: "/device/covers",
    submenu: [
      { name: "iPhone Covers", to: "/device/iphone-covers" },
      { name: "Samsung Covers", to: "/device/samsung-covers" },
      { name: "OnePlus Covers", to: "/device/oneplus-covers" },
    ]
  },
  { 
    name: "ACCESSORIES", 
    to: "/device/accessories",
    submenu: [
      { name: "Chargers", to: "/device/chargers" },
      { name: "Charger Covers", to: "/device/charger-covers" },
      { name: "Cables", to: "/device/cables" },
      { name: "Sticky Pad", to: "device/sticky-pad" },
    ]
  },
  { name: "COLLECTIONS", to: "/collections" },
  { name: "ABOUT", to: "/about" },
];

export default function Header() {
  const location = usePathname();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setShowMobileSearch(false);
    }
  }

  const handleSubmenuMouseEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveSubmenu(menuName);
  };

  const handleSubmenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200);
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-black text-white text-xs py-2 px-4 text-center">
        <p>Buy 2 Get 10% Off | Buy 3 Get 15% - Discount Auto-applied at checkout</p>
      </div>


      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Left Side - Search/Menu */}
            <div className="flex items-center gap-2">
              {isMobile ? (
                <>
                  {/* Mobile Menu Toggle */}
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="p-2"
                    aria-label="Open menu"
                  >
                    <HiOutlineMenuAlt3 className="text-2xl text-gray-700" />
                  </button>
                  {/* Mobile Search Button */}
                  <button 
                    onClick={() => setShowMobileSearch(true)}
                    className="p-2"
                    aria-label="Search"
                  >
                    <FiSearch className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowMobileSearch(true)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Search"
                >
                  <FiSearch className="w-5 h-5 text-gray-700" />
                </button>
              )}
            </div>

            {/* Centered Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <img 
                src="/logo.png" 
                alt="Caishen United"
                className="h-12 md:h-18 w-auto object-contain"
              />
            </Link>

            {/* Right Icons - Cart & Phone */}
            <div className="flex items-center gap-2">
              {/* Desktop Phone Number */}
              {!isMobile && (
                <a 
                  href="tel:+919911636888" 
                  className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 hover:text-black transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 9911636888</span>
                </a>
              )}
              <CartIcon />
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block border-t border-gray-200 bg-white" ref={menuRef}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <div
                      className="relative"
                      onMouseEnter={() => handleSubmenuMouseEnter(item.name)}
                      onMouseLeave={handleSubmenuMouseLeave}
                    >
                      <button
                        className={`px-6 py-4 text-xs font-medium tracking-wider transition-colors flex items-center gap-1 ${
                          location.startsWith(item.to) 
                            ? "text-black" 
                            : "text-gray-700 hover:text-black"
                        }`}
                      >
                        {item.name}
                        <BiChevronDown className={`text-sm transition-transform duration-300 ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown */}
                      <div className={`absolute top-full left-0 mt-0 bg-white border border-gray-200 min-w-[220px] shadow-lg transition-all duration-300 rounded ${
                        activeSubmenu === item.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}>
                        <div className="py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.to}
                              className={`block px-5 py-2.5 text-sm transition-all duration-200 ${
                                location === subItem.to 
                                  ? 'text-black bg-gray-50 font-medium' 
                                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.to}
                      className={`block px-6 py-4 text-xs font-medium tracking-wider transition-colors ${
                        location === item.to 
                          ? "text-black" 
                          : "text-gray-700 hover:text-black"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Search Modal */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white w-full max-w-2xl mx-4 rounded-lg p-6 shadow-xl">
            <form onSubmit={handleSearch} className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-900"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowMobileSearch(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label="Close search"
              >
                <HiOutlineX className="w-5 h-5 text-gray-400" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <img src="/logo.png" alt="Logo" className="h-12" />
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <HiOutlineX className="text-2xl text-gray-900" />
              </button>
            </div>
            
            {/* Mobile Phone Number */}
            <div className="p-4 border-b border-gray-100">
              <a 
                href="tel:+919911636888" 
                className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+91 9911636888</span>
              </a>
            </div>

            <nav className="p-4">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100">
                  {item.submenu ? (
                    <div>
                      <button
                        className="w-full flex items-center justify-between py-4 text-sm font-medium text-gray-900"
                        onClick={() => setMobileActiveSubmenu(mobileActiveSubmenu === item.name ? null : item.name)}
                      >
                        {item.name}
                        <BiChevronDown className={`transition-transform ${mobileActiveSubmenu === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`overflow-hidden transition-all ${mobileActiveSubmenu === item.name ? 'max-h-96' : 'max-h-0'}`}>
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.to}
                            className="block py-2 pl-4 text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.to}
                      className="block py-4 text-sm font-medium text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
