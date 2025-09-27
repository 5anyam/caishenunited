'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import CartIcon from "./CartIcon";
import { useIsMobile } from "../hooks/use-mobile";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiHeart } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { BiChevronDown, BiUser } from "react-icons/bi";
import { useTypewriter } from 'react-simple-typewriter';

const navItems = [
  { name: "Home", to: "/" },
  { 
    name: "For Her", 
    to: "/shop/for-her",
    icon: "💃",
    submenu: [
      { name: "Bite Me", to: "https://www.edaperfumes.com/product/eclat-damour-bite-me-seductive-floral-citrus-eau-de-parfum-jasmine-rose-patchouli-vanilla-luxury-fragrance-long-lasting-premium-edp-100ml", price: "₹999", badge: "Bestseller" },
      { name: "Nude Poison", to: "https://www.edaperfumes.com/product/eclat-damour-nude-poison-elegant-unisex-eau-de-parfum-sophisticated-citrus-floral-woody-blend-long-lasting-luxury-fragrance-100ml", price: "₹999", badge: "New" }
    ]
  },
  { 
    name: "For Him", 
    to: "/shop/for-him",
    icon: "🕺", 
    submenu: [
      { name: "Lusty Nights", to: "https://www.edaperfumes.com/product/eclat-damour-lusty-nights-premium-unisex-eau-de-parfum-bold-citrus-spicy-woody-luxury-fragrance-long-lasting-signature-scent-100ml", price: "₹999", badge: "Bestseller" },
      { name: "Guilty Midnight", to: "https://www.edaperfumes.com/product/eclat-damour-guilty-midnight-shades-premium-eau-de-parfum-bold-unisex-luxury-fragrance-long-lasting-citrus-spicy-woody-notes-100ml", price: "₹999", badge: "New" }
    ]
  },
  { name: "Collections", to: "/collections" },
  { name: "About Us", to: "/about" },
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

  const [text] = useTypewriter({
    words: ['Search seductive fragrances...', 'Dark Knight', 'Seductive Rose', 'Midnight Desire', 'Savage Beast'],
    loop: 0,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent body scroll
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
    }, 300);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-gray-900 to-slate-950 border-b border-gray-800/50 shadow-2xl backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left: Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <img 
                    className="h-8 md:h-12 transition-all duration-300 group-hover:scale-105 rounded-lg" 
                    src="/eda-perfumes-logo.jpeg" 
                    alt='EDA Perfumes' 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-white font-bold text-lg tracking-wider">EDA</span>
                  <span className="text-rose-400 text-xs font-medium tracking-widest">PERFUMES</span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center" ref={menuRef}>
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <div
                      className="relative"
                      onMouseEnter={() => handleSubmenuMouseEnter(item.name)}
                      onMouseLeave={handleSubmenuMouseLeave}
                    >
                      <button
                        className={`font-semibold transition-all duration-300 flex items-center gap-2 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-rose-500/10 hover:to-pink-500/10 border border-transparent hover:border-rose-500/20 group text-sm lg:text-base ${
                          location.startsWith(item.to) ? "text-rose-400 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-rose-500/20" : "text-white hover:text-rose-300"
                        }`}
                      >
                        {item.name}
                        <BiChevronDown className={`transition-transform duration-300 text-sm ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Desktop Submenu */}
                      <div className={`absolute top-full left-0 mt-2 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 shadow-2xl rounded-2xl border border-gray-700/50 min-w-80 transition-all duration-300 backdrop-blur-xl z-50 ${
                        activeSubmenu === item.name ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-4'
                      }`}>
                        <div className="p-4">
                          <div className="text-xs text-rose-400 font-bold tracking-widest uppercase mb-3 px-2">
                            {item.name === 'For Her' ? 'Seductive Collection' : 'Bold Collection'}
                          </div>
                          <div className="space-y-1">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.to}
                                className={`block px-4 py-3 text-sm transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-rose-500/10 hover:to-pink-500/10 border border-transparent hover:border-rose-500/20 group ${
                                  location === subItem.to ? 'text-rose-400 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-rose-500/20' : 'text-gray-300 hover:text-white'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{subItem.name}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                                      subItem.badge === 'New' ? 'bg-purple-500/20 text-purple-300' :
                                      subItem.badge === 'Bestseller' ? 'bg-amber-500/20 text-amber-300' :
                                      subItem.badge === 'Hot' ? 'bg-red-500/20 text-red-300' :
                                      subItem.badge === 'Premium' ? 'bg-rose-500/20 text-rose-300' :
                                      'bg-gray-500/20 text-gray-300'
                                    }`}>
                                      {subItem.badge}
                                    </span>
                                  </div>
                                  <span className="text-rose-400 font-bold">{subItem.price}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.to}
                      className={`font-semibold transition-all duration-300 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-rose-500/10 hover:to-pink-500/10 border border-transparent hover:border-rose-500/20 text-sm lg:text-base ${
                        location === item.to ? "text-rose-400 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-rose-500/20" : "text-white hover:text-rose-300"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Desktop Search */}
              {!isMobile && (
                <form className="hidden lg:flex border-2 border-gray-700/50 rounded-xl items-center overflow-hidden group focus-within:border-rose-500/50 transition-all duration-300 bg-gradient-to-r from-gray-800/50 to-slate-800/50 backdrop-blur-sm" onSubmit={handleSearch}>
                  <input
                    type="text"
                    className="px-4 py-2 text-white focus:outline-none text-sm w-48 xl:w-64 bg-transparent placeholder-gray-400 font-medium"
                    placeholder={text}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="border-l-2 border-gray-700/50 text-gray-400 px-3 py-2 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-600 hover:text-white transition-all duration-300"
                  >
                    <FiSearch className="text-lg" />
                  </button>
                </form>
              )}

              {/* Mobile Search */}
              {isMobile && !showMobileSearch && (
                <button
                  className="text-white p-2 hover:bg-rose-500/20 rounded-xl transition-all duration-300"
                  onClick={() => setShowMobileSearch(true)}
                >
                  <FiSearch className="text-xl" />
                </button>
              )}

              {isMobile && showMobileSearch && (
                <form className="flex border-2 border-gray-700/50 rounded-xl items-center overflow-hidden focus-within:border-rose-500/50 transition-all duration-300 bg-gradient-to-r from-gray-800/50 to-slate-800/50" onSubmit={handleSearch}>
                  <input
                    type="text"
                    className="px-3 py-2 text-white focus:outline-none text-sm w-32 bg-transparent placeholder-gray-400"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="border-l-2 border-gray-700/50 text-gray-400 px-3 py-2 hover:bg-rose-500 hover:text-white transition-all duration-300"
                  >
                    <FiSearch />
                  </button>
                </form>
              )}

              {/* Wishlist - Desktop only */}
              <button className="hidden lg:flex text-white p-2 hover:bg-rose-500/20 rounded-xl transition-all duration-300 relative">
                <FiHeart className="text-xl" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">2</span>
              </button>

              {/* Cart */}
              <div className="flex items-center">
                <CartIcon />
              </div>

              {/* Profile - Desktop only */}
              <button className="hidden lg:flex text-white p-2 hover:bg-rose-500/20 rounded-xl transition-all duration-300">
                <BiUser className="text-xl" />
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-white p-2 hover:bg-rose-500/20 rounded-xl transition-all duration-300 z-50 relative"
              >
                {mobileMenuOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenuAlt3 className="text-2xl" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile App-Style Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 shadow-2xl border-l border-gray-700/50 z-50 transition-all duration-500 backdrop-blur-xl lg:hidden ${
        mobileMenuOpen ? 'opacity-100 visible transform translate-x-0' : 'opacity-0 invisible transform translate-x-full'
      }`}>
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <img className="h-10 rounded-lg" src="/eda-perfumes-logo.jpeg" alt='EDA Perfumes' />
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg">EDA</span>
              <span className="text-rose-400 text-xs font-medium">PERFUMES</span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white p-2 hover:bg-rose-500/20 rounded-xl transition-all duration-300"
          >
            <HiOutlineX className="text-2xl" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col p-6 space-y-2 h-full overflow-y-auto pb-20">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div>
                  <button
                    className={`font-semibold text-lg px-4 py-4 rounded-xl transition-all duration-300 flex items-center justify-between w-full border border-transparent hover:border-rose-500/20 ${
                      location.startsWith(item.to) ? "text-rose-400 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-rose-500/20" : "text-white hover:text-rose-300 hover:bg-gradient-to-r hover:from-rose-500/10 hover:to-pink-500/10"
                    }`}
                    onClick={() => setMobileActiveSubmenu(mobileActiveSubmenu === item.name ? null : item.name)}
                  >
                    <div className="flex items-center gap-3">
                      {item.name}
                    </div>
                    <BiChevronDown className={`transition-transform duration-300 ${mobileActiveSubmenu === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Mobile Submenu */}
                  <div className={`ml-4 mt-2 space-y-1 transition-all duration-500 overflow-hidden ${
                    mobileActiveSubmenu === item.name ? 'opacity-100 visible max-h-96' : 'opacity-0 invisible max-h-0'
                  }`}>
                    <div className="text-xs text-rose-400 font-bold tracking-widest uppercase mb-2 px-2">
                      {item.name === 'For Her' ? 'Seductive Collection' : 'Bold Collection'}
                    </div>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.to}
                        className={`block px-4 py-3 text-sm rounded-xl transition-all duration-300 border border-transparent hover:border-rose-500/20 ${
                          location === subItem.to ? 'text-rose-400 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-rose-500/20' : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-rose-500/10 hover:to-pink-500/10'
                        }`}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileActiveSubmenu(null);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{subItem.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                              subItem.badge === 'New' ? 'bg-purple-500/20 text-purple-300' :
                              subItem.badge === 'Bestseller' ? 'bg-amber-500/20 text-amber-300' :
                              subItem.badge === 'Hot' ? 'bg-red-500/20 text-red-300' :
                              subItem.badge === 'Premium' ? 'bg-rose-500/20 text-rose-300' :
                              'bg-gray-500/20 text-gray-300'
                            }`}>
                              {subItem.badge}
                            </span>
                          </div>
                          <span className="text-rose-400 font-bold text-xs">{subItem.price}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.to}
                  className={`font-semibold text-lg px-4 py-4 rounded-xl transition-all duration-300 block border border-transparent hover:border-rose-500/20 ${
                    location === item.to ? "text-rose-400 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-rose-500/20" : "text-white hover:text-rose-300 hover:bg-gradient-to-r hover:from-rose-500/10 hover:to-pink-500/10"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Profile Section */}
          <div className="mt-8 pt-6 border-t border-gray-700/50 space-y-2">
            <Link
              href="/wishlist"
              className="flex items-center gap-3 px-4 py-3 text-white hover:text-rose-300 hover:bg-gradient-to-r hover:from-rose-500/10 hover:to-pink-500/10 rounded-xl transition-all duration-300 relative"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiHeart className="text-xl" />
              <span className="font-medium">Wishlist</span>
              <span className="absolute top-1 left-7 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">2</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 text-white hover:text-rose-300 hover:bg-gradient-to-r hover:from-rose-500/10 hover:to-pink-500/10 rounded-xl transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BiUser className="text-xl" />
              <span className="font-medium">My Profile</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
