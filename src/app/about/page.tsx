"use client"
import React, { useState } from 'react';
import { X, Shield, Smartphone, Headphones, Cable, Zap, CheckCircle, Award, Crown, Star } from 'lucide-react';
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
            Welcome to Caishen United, your one-stop destination for everything mobile! If you believe that your smartphone is more than just a device, you are in the right place. We are passionate tech enthusiasts, curators of style, and everyday problem-solvers who make it easy for you to accessorize your digital life.
          </p>
        </section>
        
        {/* Who Are We */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-50/20 via-transparent to-transparent"></div>
            <div className="text-center p-6 relative z-10">
              <Smartphone className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-light text-gray-900 tracking-wide">Who We Are</h3>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              Our Foundation
            </p>
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-gray-900 tracking-tight">
              Dynamic Team of Gadget Lovers
            </h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed font-light">
              We are a dynamic team obsessed with all things mobile. Started by gadget-lovers, Caishen United has grown into a trusted online hub for mobile accessories that combine durability, practicality, and great design.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              We know every smartphone owner is unique—your accessories should reflect that too! From sleek protection to innovative charging solutions, we bring you products that enhance your digital lifestyle.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="border-t border-b border-gray-100 py-20">
          <div className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              Our Products
            </p>
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-gray-900 tracking-tight">
              What Do We Offer?
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Your gadget deserves the best. We stock a carefully chosen selection of premium accessories.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { 
                icon: Shield, 
                title: 'Stylish Mobile Covers', 
                desc: 'Protect your device in style with cases that match your mood—sleek, rugged, quirky, or classic.' 
              },
              { 
                icon: Zap, 
                title: 'Fast Chargers & Cables', 
                desc: 'Whether you\'re always on the move or need a speedy charge at home, we\'ve got you covered.' 
              },
              { 
                icon: Cable, 
                title: 'Innovative Charger Covers', 
                desc: 'Spruce up your space and keep your chargers safe with our fun, functional charger covers.' 
              },
              { 
                icon: Headphones, 
                title: 'Crisp Sound Headphones', 
                desc: 'Music, calls, gaming—we bring immersive audio right to your ears.' 
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 border-2 border-gray-200 group-hover:border-black transition-colors duration-300 flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="font-medium text-xs mb-3 text-gray-900 tracking-wider uppercase">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs font-light leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              Our Advantage
            </p>
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-gray-900 tracking-tight">
              Why Choose Us?
            </h2>
            <div className="space-y-6">
              {[
                { 
                  icon: Star, 
                  title: 'Latest Arrivals', 
                  desc: 'We track tech trends so you always get the freshest styles and best innovations.' 
                },
                { 
                  icon: Award, 
                  title: 'Customer First', 
                  desc: 'Got a question or a special request? Our friendly team is always listening.' 
                },
                { 
                  icon: Zap, 
                  title: 'Fast & Secure Delivery', 
                  desc: 'Wherever you are, your accessories reach you quickly—safe, sealed, and ready to use.' 
                },
                { 
                  icon: CheckCircle, 
                  title: 'Easy Shopping Experience', 
                  desc: 'Browse, compare, pick. Shopping with us is as smooth as your new screen protector!' 
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 border border-gray-200 group-hover:border-black transition-colors duration-300 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xs mb-2 text-gray-900 tracking-wide uppercase">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-xs font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-50/20 via-transparent to-transparent"></div>
            <div className="text-center p-6 relative z-10">
              <Crown className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-light text-gray-900 tracking-wide">Premium Quality</h3>
            </div>
          </div>
        </section>

        {/* Our Promise */}
        <section className="border-t border-gray-100 pt-20">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              Our Commitment
            </p>
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-gray-900 tracking-tight">
              Your Satisfaction Is Our Promise
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Only Premium, Genuine Accessories",
                desc: "Every product meets rigorous standards for quality and reliability, so you get accessories that protect, enhance, and last."
              },
              {
                title: "Shop Confidently with Caishen United",
                desc: "Experience secure payments, easy returns, and transparent warranty coverage on every purchase. Our seamless process ensures convenience, reliability, and peace of mind."
              },
              {
                title: "Responsive Support That Cares",
                desc: "Our team is always ready to help with product queries, order updates, or after-sales assistance—ensuring you're never left without guidance."
              },
              {
                title: "Style, Innovation, and Compatibility",
                desc: "Every accessory is chosen for both function and fashion—your mobile device deserves solutions that fit your life perfectly."
              },
              {
                title: "Honest, Transparent Service",
                desc: "What you see is what you get, with accurate product descriptions, real customer reviews, and no hidden surprises."
              },
              {
                title: "We Stand Behind Every Promise",
                desc: "To keep you powered, connected, and satisfied, every single day. Quality shouldn't break the bank—every product here is tried and tested for performance."
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 border-l-2 border-black hover:bg-gray-100 transition-colors duration-300">
                <h3 className="font-medium text-xs text-gray-900 mb-3 uppercase tracking-widest">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Community Section */}
        <section className="text-center border-t border-gray-100 pt-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              Join Our Community
            </p>
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-gray-900 tracking-tight">
              Let us Stay Connected
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-8"></div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed font-light">
              We are more than a website; we are a community. Follow us on social media for exclusive deals, quick hacks, and gadget inspiration. Have a suggestion? Want to see a new product? We thrive on your feedback!
            </p>
            <p className="text-base text-gray-900 font-light italic">
              At Caishen United, we do not just accessorize phones—we accessorize your life. Discover the difference today!
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center border-t border-gray-100 pt-20 pb-8">
          <h2 className="text-3xl lg:text-5xl font-light mb-6 text-gray-900 tracking-tight">
            Elevate Your Mobile Experience
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8"></div>
          <p className="text-sm mb-10 text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the perfect fusion of quality, style, and innovation. Your device deserves the Caishen treatment—where every accessory is crafted to enhance your digital lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/collections"
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
