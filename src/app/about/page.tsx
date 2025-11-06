"use client"
import React, { useState } from 'react';
import { X, Shield, Smartphone } from 'lucide-react';
import Link from 'next/link';

// Contact Modal Component
function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    setIsOpen(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block px-10 py-4 text-xs text-white bg-black hover:bg-gray-900 transition-all duration-300 tracking-widest uppercase font-medium"
      >
        Get in Touch
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 max-w-md w-full mx-4 border border-gray-100 shadow-xl">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
              <h3 className="text-lg font-light text-gray-900 tracking-wide uppercase text-xs">Contact Us</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors text-xs font-light"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors text-xs font-light"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors text-xs font-light"
              />
              <textarea
                placeholder="Your message..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors text-xs font-light resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 text-xs tracking-widest uppercase font-medium hover:bg-gray-900 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20 space-y-24">
        {/* Hero Section */}
        <section className="text-center border-b border-gray-100 pb-20">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
            Our Story
          </p>
          <h1 className="text-4xl lg:text-6xl font-light mb-6 text-gray-900 tracking-tight">
            About Caishen United
          </h1>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8"></div>
          <p className="text-sm lg:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Premium phone protection inspired by the ancient deity of prosperity. We craft protection 
            that transcends the ordinary, where military-grade durability embraces timeless design.
          </p>
        </section>
        
        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-50/20 via-transparent to-transparent"></div>
            <div className="text-center p-8 relative z-10">
              <Shield className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-light text-gray-900 tracking-wide">Our Mission</h3>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              Why We Exist
            </p>
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-gray-900 tracking-tight">
              Protection Meets Prestige
            </h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed font-light">
              We believe your devices deserve more than basic protection. They deserve cases that reflect 
              your taste, withstand your lifestyle, and enhance your everyday experience. Each Caishen 
              United product is meticulously engineered to provide uncompromising protection while 
              maintaining the sleek aesthetics you demand.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Inspired by Caishen, the god of wealth and prosperity, our brand embodies fortune through 
              excellence—delivering products that protect your most valuable digital assets with dignity and style.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-b border-gray-100 py-20">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              What Drives Us
            </p>
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-gray-900 tracking-tight">
              Core Values
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'Quality', desc: 'Premium materials and precision engineering in every product' },
              { title: 'Protection', desc: 'Military-grade durability tested to exceed industry standards' },
              { title: 'Design', desc: 'Timeless aesthetics that complement modern devices' },
              { title: 'Trust', desc: 'Lifetime warranty backed by unwavering customer support' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 border-2 border-gray-200 group-hover:border-black transition-colors duration-300 flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 group-hover:text-black transition-colors font-light text-sm">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-medium text-xs mb-3 text-gray-900 tracking-wider uppercase">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Excellence */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              Our Process
            </p>
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-gray-900 tracking-tight">
              Engineered to Perfection
            </h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed font-light">
              Every Caishen United product undergoes rigorous testing to ensure it meets our exacting 
              standards. From material selection to final inspection, we never compromise.
            </p>
            <div className="bg-gray-50 p-6 border-l-2 border-black">
              <h3 className="font-medium text-xs text-gray-900 mb-3 uppercase tracking-widest">
                Testing Standards
              </h3>
              <p className="text-gray-600 text-xs font-light leading-relaxed mb-3">
                Drop tested from 10 feet multiple times on concrete surfaces
              </p>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Scratch resistance verified against keys, coins, and abrasive materials
              </p>
            </div>
          </div>
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-50/20 via-transparent to-transparent"></div>
            <div className="text-center p-8 relative z-10">
              <Smartphone className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-light text-gray-900 tracking-wide">Precision Crafted</h3>
            </div>
          </div>
        </section>

        {/* Customer Journey */}
        <section className="border-t border-gray-100 pt-20">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              Your Experience
            </p>
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-gray-900 tracking-tight">
              The Caishen Journey
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Browse", desc: "Explore our premium collection" },
              { step: "02", title: "Select", desc: "Choose your perfect fit" },
              { step: "03", title: "Protect", desc: "Enjoy military-grade safety" },
              { step: "04", title: "Elevate", desc: "Experience timeless design" },
              { step: "05", title: "Trust", desc: "Backed by lifetime warranty" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-14 h-14 border border-gray-200 group-hover:bg-black group-hover:border-black transition-all duration-300 flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-900 group-hover:text-white transition-colors font-light text-sm">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-medium text-xs mb-2 text-gray-900 tracking-wide uppercase">{item.title}</h3>
                <p className="text-gray-600 text-[11px] leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-2xl font-light text-gray-900 tracking-wide mb-2">Premium Quality</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Guaranteed Excellence</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              What Sets Us Apart
            </p>
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-gray-900 tracking-tight">
              The Caishen Advantage
            </h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed font-light">
              When you choose Caishen United, you are choosing more than a phone case. You are investing 
              in peace of mind, superior craftsmanship, and a brand that stands behind every product.
            </p>
            <div className="space-y-4">
              <div className="flex items-start border-l-2 border-gray-900 pl-4">
                <p className="text-gray-600 text-xs font-light">Aerospace-grade materials for maximum durability</p>
              </div>
              <div className="flex items-start border-l-2 border-gray-900 pl-4">
                <p className="text-gray-600 text-xs font-light">Wireless charging compatible with all MagSafe accessories</p>
              </div>
              <div className="flex items-start border-l-2 border-gray-900 pl-4">
                <p className="text-gray-600 text-xs font-light">Raised bezels protect screen and camera lenses</p>
              </div>
              <div className="flex items-start border-l-2 border-gray-900 pl-4">
                <p className="text-gray-600 text-xs font-light">Anti-yellowing technology keeps cases pristine</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center border-t border-gray-100 pt-20 pb-8">
          <h2 className="text-3xl lg:text-5xl font-light mb-6 text-gray-900 tracking-tight">
            Elevate Your Protection
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8"></div>
          <p className="text-sm mb-10 text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the perfect fusion of military-grade protection and sophisticated design. 
            Your device deserves the Caishen treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="inline-block px-10 py-4 text-xs text-white bg-black hover:bg-gray-900 transition-all duration-300 tracking-widest uppercase font-medium"
            >
              Shop Collection
            </Link>
            <ContactModal />
          </div>
        </section>
      </div>
    </main>
  );
}
