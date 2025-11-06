'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import CartIcon from "./CartIcon";
import { useIsMobile } from "../hooks/use-mobile";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";

const navItems = [
  { name: "Home", to: "/" },
  { 
    name: "Phone Covers", 
    to: "/shop/covers",
    submenu: [
      { name: "iPhone Cases", to: "/shop/covers/iphone" },
      { name: "Samsung Cases", to: "/shop/covers/samsung" },
      { name: "OnePlus Cases", to: "/shop/covers/oneplus" },
      { name: "Realme Cases", to: "/shop/covers/realme" },
      { name: "Xiaomi Cases", to: "/shop/covers/xiaomi" },
    ]
  },
  { 
    name: "Accessories", 
    to: "/shop/accessories",
    submenu: [
      { name: "Chargers", to: "/shop/accessories/chargers" },
      { name: "Cables", to: "/shop/accessories/cables" },
      { name: "Screen Guards", to: "/shop/accessories/screen-guards" },
      { name: "Phone Holders", to: "/shop/accessories/holders" },
    ]
  },
  { name: "Collections", to: "/collections" },
  { name: "About", to: "/about" },
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
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo + Brand - Now visible on mobile */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                <img 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 transition-transform duration-300 group-hover:scale-105" 
                  src="/logo.png" 
                  alt='Caishen United' 
                />
                {/* Brand name visible on all screens */}
                <div className="border-l border-gray-200 pl-2 sm:pl-3 ml-1">
                  <span className="block text-black font-light text-xs sm:text-sm lg:text-lg tracking-[0.12em] sm:tracking-[0.15em] leading-none">
                    CAISHEN UNITED
                  </span>
                  <span className="block text-gray-400 text-[7px] sm:text-[8px] lg:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] uppercase mt-0.5 sm:mt-1">
                    Premium Protection
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav - Smaller font */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center" ref={menuRef}>
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <div
                      className="relative"
                      onMouseEnter={() => handleSubmenuMouseEnter(item.name)}
                      onMouseLeave={handleSubmenuMouseLeave}
                    >
                      <button
                        className={`text-xs uppercase tracking-[0.12em] font-medium transition-all duration-300 py-2 flex items-center gap-1 ${
                          location.startsWith(item.to) 
                            ? "text-black" 
                            : "text-gray-500 hover:text-black"
                        }`}
                      >
                        {item.name}
                        <BiChevronDown className={`text-sm transition-transform duration-300 ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Minimal Premium Dropdown */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-6 bg-white border border-gray-100 min-w-[220px] transition-all duration-300 ${
                        activeSubmenu === item.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}>
                        <div className="py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.to}
                              className={`block px-5 py-2.5 text-xs transition-all duration-200 ${
                                location === subItem.to 
                                  ? 'text-black bg-gray-50 font-medium' 
                                  : 'text-gray-600 hover:text-black hover:bg-gray-50 font-light'
                              }`}
                            >
                              <span className="tracking-wide">{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.to}
                      className={`text-xs uppercase tracking-[0.12em] font-medium transition-all duration-300 py-2 ${
                        location === item.to 
                          ? "text-black" 
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 lg:gap-6 justify-end">
              {/* Desktop Search */}
              {!isMobile && (
                <form className="hidden lg:flex items-center group relative" onSubmit={handleSearch}>
                  <input
                    type="text"
                    className="w-48 xl:w-56 px-4 py-2 text-xs text-black bg-gray-50 border border-gray-200 focus:border-black focus:bg-white focus:outline-none transition-all duration-300 font-light placeholder:text-gray-400"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 text-gray-400 hover:text-black transition-colors duration-300"
                  >
                    <FiSearch className="text-base" />
                  </button>
                </form>
              )}

              {/* Mobile Search */}
              {isMobile && !showMobileSearch && (
                <button
                  className="text-gray-500 hover:text-black transition-colors p-1.5"
                  onClick={() => setShowMobileSearch(true)}
                >
                  <FiSearch className="text-lg sm:text-xl" />
                </button>
              )}

              {isMobile && showMobileSearch && (
                <form className="flex items-center relative" onSubmit={handleSearch}>
                  <input
                    type="text"
                    className="w-32 sm:w-40 px-3 py-1.5 text-xs text-black bg-gray-50 border border-gray-200 focus:border-black focus:outline-none placeholder:text-gray-400 font-light"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="absolute right-2 text-gray-400"
                    onClick={() => setShowMobileSearch(false)}
                  >
                    <HiOutlineX className="text-base" />
                  </button>
                </form>
              )}

              {/* Cart */}
              <div className="flex items-center">
                <CartIcon />
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-gray-500 hover:text-black transition-colors p-1.5"
              >
                {mobileMenuOpen ? <HiOutlineX className="text-xl sm:text-2xl" /> : <HiOutlineMenuAlt3 className="text-xl sm:text-2xl" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - Premium Slide-in */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transition-transform duration-300 lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-5 sm:py-6 border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3">
            <img className="h-9 sm:h-10" src="/logo.png" alt='Caishen United' />
            <div>
              <span className="block text-black font-light text-xs sm:text-sm tracking-[0.12em]">
                CAISHEN UNITED
              </span>
              <span className="block text-gray-400 text-[7px] sm:text-[8px] tracking-[0.2em] uppercase mt-0.5">
                Premium Protection
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-500 hover:text-black transition-colors p-1"
          >
            <HiOutlineX className="text-xl sm:text-2xl" />
          </button>
        </div>

        {/* Nav - Smaller font sizes */}
        <nav className="flex flex-col px-3 sm:px-4 py-4 sm:py-6 space-y-0.5 h-full overflow-y-auto pb-24">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div>
                  <button
                    className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs uppercase tracking-[0.1em] font-medium transition-colors flex items-center justify-between ${
                      location.startsWith(item.to) 
                        ? "text-black" 
                        : "text-gray-600 hover:text-black"
                    }`}
                    onClick={() => setMobileActiveSubmenu(mobileActiveSubmenu === item.name ? null : item.name)}
                  >
                    {item.name}
                    <BiChevronDown className={`text-sm transition-transform duration-300 ${mobileActiveSubmenu === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`ml-3 sm:ml-4 transition-all duration-300 overflow-hidden ${
                    mobileActiveSubmenu === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.to}
                        className={`block px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs transition-colors border-l-2 ${
                          location === subItem.to 
                            ? 'text-black border-black font-medium' 
                            : 'text-gray-500 border-gray-200 hover:text-black hover:border-gray-400 font-light'
                        }`}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileActiveSubmenu(null);
                        }}
                      >
                        <span className="tracking-wide">{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.to}
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs uppercase tracking-[0.1em] font-medium transition-colors ${
                    location === item.to 
                      ? "text-black" 
                      : "text-gray-600 hover:text-black"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 border-t border-gray-100 bg-white">
            <p className="text-[9px] sm:text-[10px] text-gray-400 text-center tracking-wider">
              Premium Protection. Timeless Design.
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
