import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <img className="h-16" src="/eda-perfumes-logo.jpeg" alt="ÉCLAT D'AMOUR" />
            </div>
            <div className="mb-6">
              <h3 className="font-light text-base text-gray-900 mb-3 tracking-wide">
                EDA Perfumes
              </h3>
              <p className="text-xs leading-relaxed text-gray-600 font-light mb-6">
                Luxury fragrances crafted for those who appreciate sophistication and elegance.
              </p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <Link 
                href="https://www.facebook.com/eclat.d.amour.508599/" 
                className="p-2 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors"
              >
                <FaFacebookF className="text-sm" />
              </Link>
              <Link 
                href="https://x.com/edaperfumes" 
                className="p-2 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors"
              >
                <FaTwitter className="text-sm" />
              </Link>
              <Link 
                href="https://www.instagram.com/edaperfumes" 
                className="p-2 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors"
              >
                <FaInstagram className="text-sm" />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/eda-perfumes-199787354/" 
                className="p-2 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors"
              >
                <FaLinkedinIn className="text-sm" />
              </Link>
              <Link 
                href="https://www.youtube.com/@edaperfumes" 
                className="p-2 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors"
              >
                <FaYoutube className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-light text-gray-600 mb-6 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-black transition-colors font-light">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-gray-600 hover:text-black transition-colors font-light">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-black transition-colors font-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-black transition-colors font-light">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-light text-gray-600 mb-6 uppercase tracking-widest">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-black transition-colors font-light">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-sm text-gray-600 hover:text-black transition-colors font-light">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/returns-and-refunds-policy" className="text-sm text-gray-600 hover:text-black transition-colors font-light">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-light text-gray-600 mb-6 uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-600 font-light">
                  care@edaperfumes.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-600 font-light">
                  +91 87997 95681
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-600 font-light leading-relaxed">
                  WZ-11B Ground Floor, Sahib Pura, Tilak Nagar, New Delhi - 110018
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-light">
            <div>
              © {new Date().getFullYear()} EDA Perfumes. All rights reserved. Developed by{" "}
              <Link href="https://www.proshala.com" className="text-black hover:underline transition-colors">
                Proshala Tech
              </Link>
            </div>
            <div className="flex items-center gap-2 opacity-60">
              <img className="h-8" src="/badges.png" alt="Payment methods" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
