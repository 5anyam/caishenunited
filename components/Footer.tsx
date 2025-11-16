import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Mail, Phone, MapPin, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <img className="h-16 sm:h-18" src="/logo.png" alt="Caishen United" />
            </div>
            <div className="mb-6">
              <h3 className="font-light text-sm text-gray-900 mb-3 tracking-[0.12em] uppercase">
                Caishen United
              </h3>
              <p className="text-xs leading-relaxed text-gray-600 font-light mb-6">
                Premium phone protection crafted for those who demand excellence. Where military-grade durability meets timeless design.
              </p>
            </div>
            
            {/* Trust Badge */}
            <div className="flex items-center gap-2 mb-6 text-gray-600">
              <Shield className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Lifetime Warranty</span>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <Link 
                target="_blank"
                href="https://www.facebook.com/caishenunited" 
                className="p-2.5 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xs" />
              </Link>
              <Link 
                target="_blank"
                href="https://x.com/caishenunited" 
                className="p-2.5 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xs" />
              </Link>
              <Link 
                target="_blank"
                href="https://www.instagram.com/caishenunited" 
                className="p-2.5 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xs" />
              </Link>
              <Link 
                target="_blank"
                href="https://www.linkedin.com/company/caishenunited" 
                className="p-2.5 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-xs" />
              </Link>
              <Link 
                target="_blank"
                href="https://www.youtube.com/@caishenunited" 
                className="p-2.5 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                aria-label="YouTube"
              >
                <FaYoutube className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div className="md:col-span-1">
            <h4 className="text-[10px] font-medium text-gray-500 mb-6 uppercase tracking-[0.2em]">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/device/iphone-covers" className="text-xs text-gray-600 hover:text-black transition-colors font-light">
                  iPhone Covers
                </Link>
              </li>
              <li>
                <Link href="/shop/samsung-covers" className="text-xs text-gray-600 hover:text-black transition-colors font-light">
                  Samsung Cases
                </Link>
              </li>
              <li>
                <Link href="/shop/oneplus-covers" className="text-xs text-gray-600 hover:text-black transition-colors font-light">
                  OnePlus Cases
                </Link>
              </li>
              <li>
                <Link href="/device/chargers" className="text-xs text-gray-600 hover:text-black transition-colors font-light">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-xs text-gray-600 hover:text-black transition-colors font-light">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Links */}
          <div className="md:col-span-1">
            <h4 className="text-[10px] font-medium text-gray-500 mb-6 uppercase tracking-[0.2em]">
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-xs text-gray-600 hover:text-black transition-colors font-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs text-gray-600 hover:text-black transition-colors font-light">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-xs text-gray-600 hover:text-black transition-colors font-light">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns-and-refunds-policy" className="text-xs text-gray-600 hover:text-black transition-colors font-light">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/warranty-replacement-policy" className="text-xs text-gray-600 hover:text-black transition-colors font-light">
                  Warranty Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-1">
            <h4 className="text-[10px] font-medium text-gray-500 mb-6 uppercase tracking-[0.2em]">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:support@caishenunited.com"
                  className="text-xs text-gray-600 hover:text-black transition-colors font-light"
                >
                  support@caishenunited.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <a 
                  href="tel:+919911636888"
                  className="text-xs text-gray-600 hover:text-black transition-colors font-light"
                >
                  +91 9911636888
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-600 font-light leading-relaxed">
                  Rohini, Delhi<br />
                </span>
              </li>
            </ul>

            {/* Legal Links - Mobile Friendly */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h5 className="text-[10px] font-medium text-gray-500 mb-3 uppercase tracking-[0.2em]">
                Legal
              </h5>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-xs text-gray-600 hover:text-black transition-colors font-light">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="text-xs text-gray-600 hover:text-black transition-colors font-light">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-sm font-light text-gray-900 mb-3 tracking-wide uppercase">
              Stay Updated
            </h4>
            <p className="text-xs text-gray-600 font-light mb-6">
              Join our community and be the first to know about new launches and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-xs border border-gray-200 focus:border-black focus:outline-none transition-colors font-light"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-light">
            <div className="text-center sm:text-left">
              © {new Date().getFullYear()} Caishen United. All rights reserved. Crafted by{" "}
              <Link href="https://www.proshala.com" className="text-black hover:underline transition-colors font-medium">
                Proshala Tech
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-wider">We Accept</span>
              <div className="flex items-center gap-2 opacity-60">
                <img className="h-6" src="/badges.png" alt="Payment methods" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
