'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";
import CartIcon from "./CartIcon";
import { useIsMobile } from "../hooks/use-mobile";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { Phone, User, LogOut, LogIn } from "lucide-react";

interface NavItem {
  name: string;
  to: string;
  submenu?: { name: string; to: string }[];
}

const navItems: NavItem[] = [
  { name: "HOME", to: "/" },
  { 
    name: "PHONE COVERS", 
    to: "/shop/covers",
    submenu: [
      { name: "iPhone Covers", to: "/shop/iphone-covers" },
      { name: "Samsung Covers", to: "/shop/samsung-covers" },
      { name: "OnePlus Covers", to: "/shop/oneplus-covers" },
    ]
  },
  { 
    name: "ACCESSORIES", 
    to: "/shop/accessories",
    submenu: [
      { name: "Chargers", to: "/shop/chargers" },
      { name: "Charger Covers", to: "/shop/charger-covers" },
      { name: "Cables", to: "/shop/cables" },
      { name: "Other Accessories", to: "/shop/other-accessories" },
    ]
  },
  { name: "COLLECTIONS", to: "/collections" },
  { name: "ABOUT", to: "/about" },
];

export default function Header() {
  const location = usePathname();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [showDesktopSearch, setShowDesktopSearch] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check authentication status
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    setIsAuthenticated(auth === "true");
    setUserEmail(email || "");
  }, [location]); // Re-check on route change

  // Clear search input when URL changes
  useEffect(() => {
    setSearch("");
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (showDesktopSearch) setShowDesktopSearch(false);
        if (showMobileSearch) setShowMobileSearch(false);
        if (showUserMenu) setShowUserMenu(false);
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
  }, [mobileMenuOpen, showDesktopSearch, showMobileSearch, showUserMenu]);

  useEffect(() => {
    if (showDesktopSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showDesktopSearch]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmedSearch = search.trim();
    
    if (trimmedSearch) {
      setShowDesktopSearch(false);
      setShowMobileSearch(false);
      const searchUrl = `/search?q=${encodeURIComponent(trimmedSearch)}`;
      
      if (location === '/search') {
        window.location.href = searchUrl;
      } else {
        router.push(searchUrl);
      }
      
      setTimeout(() => {
        setSearch("");
      }, 100);
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userEmail");
      setIsAuthenticated(false);
      setUserEmail("");
      setShowUserMenu(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
      {/* Main Header - Narrow with Rounded Edges */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="max-w-[95%] lg:max-w-6xl mx-auto">
          {/* Top Bar with Logo and Icons */}
          <div className="px-4 border-b border-gray-200">
            <div className="flex items-center justify-between h-20">
              {/* Left Side - Menu/Search */}
              <div className="flex items-center gap-2">
                {isMobile ? (
                  <>
                    <button
                      onClick={() => setMobileMenuOpen(true)}
                      className="p-2"
                      aria-label="Open menu"
                    >
                      <HiOutlineMenuAlt3 className="text-2xl text-gray-700" />
                    </button>
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
                    onClick={() => setShowDesktopSearch(!showDesktopSearch)}
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
                  className="h-12 md:h-16 w-auto object-contain"
                />
              </Link>

              {/* Right Icons */}
              <div className="flex items-center gap-2">
                {/* User Menu - Desktop */}
                {!isMobile && (
                  <div className="relative" ref={userMenuRef}>
                    {isAuthenticated ? (
                      <>
                        <button
                          onClick={() => setShowUserMenu(!showUserMenu)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          aria-label="User menu"
                        >
                          <User className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* User Dropdown */}
                        {showUserMenu && (
                          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                            <div className="px-4 py-2 border-b border-gray-100">
                              <p className="text-xs text-gray-500">Signed in as</p>
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {userEmail}
                              </p>
                            </div>
                            <button
                              onClick={handleLogout}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                              <LogOut className="w-4 h-4" />
                              Logout
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href="/login"
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Login"
                      >
                        <LogIn className="w-5 h-5 text-gray-700" />
                      </Link>
                    )}
                  </div>
                )}

                <CartIcon />
              </div>
            </div>
          </div>

          {/* Desktop Search Bar - Below Logo */}
          {!isMobile && showDesktopSearch && (
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 text-gray-900 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowDesktopSearch(false);
                      setSearch("");
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-gray-200 rounded-full p-1 transition-colors"
                    aria-label="Close search"
                  >
                    <HiOutlineX className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Desktop Navigation - Rounded Edges */}
          <nav className="hidden lg:block" ref={menuRef}>
            <div className="bg-white rounded-b-2xl shadow-sm">
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
                        <div className={`absolute top-full left-0 mt-0 bg-white border border-gray-200 min-w-[220px] shadow-lg transition-all duration-300 rounded-lg ${
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
        </div>
      </header>

      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white w-full max-w-2xl mx-4 rounded-xl p-6 shadow-xl">
            <form onSubmit={handleSearch} className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-full focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 text-gray-900"
                autoFocus
              />
              <button
                type="button"
                onClick={() => {
                  setShowMobileSearch(false);
                  setSearch("");
                }}
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
          <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 overflow-y-auto shadow-2xl rounded-r-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <img src="/logo.png" alt="Logo" className="h-12" />
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <HiOutlineX className="text-2xl text-gray-900" />
              </button>
            </div>
            
            {/* Mobile User Section */}
            {isAuthenticated ? (
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-700" />
                    <div>
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 border-b border-gray-100">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              </div>
            )}

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
