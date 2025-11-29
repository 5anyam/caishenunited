"use client"
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Headphones } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">
        {/* Hero Section */}
        <section className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
            Get in Touch
          </p>
          <h1 className="text-4xl lg:text-6xl font-light mb-6 text-gray-900 tracking-tight">
            We&apos;re Here to Help
          </h1>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8"></div>
          <p className="text-sm lg:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Have questions about our premium phone cases and accessories? Our team is ready to assist you 
            with product inquiries, order support, or custom requests.
          </p>
        </section>

        {/* Contact Information Cards */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 border border-gray-100 hover:border-gray-300 transition-all duration-300 group rounded-lg">
            <div className="w-14 h-14 border border-gray-200 group-hover:border-black group-hover:bg-black transition-all duration-300 flex items-center justify-center mx-auto mb-6 rounded">
              <Mail className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xs font-medium text-gray-900 mb-4 text-center uppercase tracking-wider">Email Us</h3>
            <p className="text-xs text-gray-600 text-center mb-4 font-light leading-relaxed">
              Send us an email and we&apos;ll respond within 24 hours
            </p>
            <div className="text-center">
              <a 
                href="mailto:support@caishenunited.com" 
                className="text-xs text-gray-900 hover:text-black font-light transition-colors"
              >
                support@caishenunited.com
              </a>
            </div>
          </div>

          <div className="bg-white p-8 border border-gray-100 hover:border-gray-300 transition-all duration-300 group rounded-lg">
            <div className="w-14 h-14 border border-gray-200 group-hover:border-black group-hover:bg-black transition-all duration-300 flex items-center justify-center mx-auto mb-6 rounded">
              <Phone className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xs font-medium text-gray-900 mb-4 text-center uppercase tracking-wider">Call Us</h3>
            <p className="text-xs text-gray-600 text-center mb-4 font-light leading-relaxed">
              Speak directly with our product experts
            </p>
            <div className="text-center">
              <a 
                href="tel:+919911636888" 
                className="text-xs text-gray-900 hover:text-black font-light transition-colors"
              >
                +91 9911636888
              </a>
            </div>
          </div>

          <div className="bg-white p-8 border border-gray-100 hover:border-gray-300 transition-all duration-300 group rounded-lg">
            <div className="w-14 h-14 border border-gray-200 group-hover:border-black group-hover:bg-black transition-all duration-300 flex items-center justify-center mx-auto mb-6 rounded">
              <MapPin className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xs font-medium text-gray-900 mb-4 text-center uppercase tracking-wider">Visit Us</h3>
            <p className="text-xs text-gray-600 text-center mb-4 font-light leading-relaxed">
              Come visit our Head Office
            </p>
            <div className="text-center">
              <address className="text-xs text-gray-900 not-italic font-light leading-relaxed">
                Sector 15, Rohini<br/>
                New Delhi, Delhi 110085<br/>
                India
              </address>
            </div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form - Light Theme */}
          <div className="bg-white p-10 border border-gray-200 rounded-lg">
            <h2 className="text-2xl lg:text-3xl font-light mb-6 text-gray-900 tracking-tight">
              Send us a Message
            </h2>
            <p className="text-xs text-gray-600 mb-8 font-light leading-relaxed">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-black transition-colors text-sm text-gray-900 font-light bg-white"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-black transition-colors text-sm text-gray-900 font-light bg-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-black transition-colors text-sm text-gray-900 font-light bg-white"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-black transition-colors text-sm text-gray-900 font-light bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="product">Product Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="bulk">Bulk Order</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-black transition-colors text-sm text-gray-900 font-light resize-none bg-white"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded font-medium text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center disabled:bg-gray-400"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Office Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 border border-gray-100 rounded-lg">
              <h3 className="text-xl lg:text-2xl font-light mb-8 text-gray-900 tracking-tight">
                Visit Our Showroom
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-xs text-gray-900 mb-2 uppercase tracking-wider">Address</h4>
                    <address className="text-xs text-gray-600 not-italic leading-relaxed font-light">
                      Caishen United<br />
                      Sector 15, Rohini<br />
                      New Delhi, Delhi 110089<br />
                      India
                    </address>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-xs text-gray-900 mb-2 uppercase tracking-wider">Business Hours</h4>
                    <div className="text-xs text-gray-600 space-y-1 font-light">
                      <p>Monday - Friday: 10:00 AM - 7:00 PM</p>
                      <p>Saturday: 10:00 AM - 6:00 PM</p>
                      <p>Sunday: 11:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Headphones className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-xs text-gray-900 mb-2 uppercase tracking-wider">Customer Support</h4>
                    <div className="text-xs text-gray-600 space-y-1 font-light">
                      <p>24/7 Email Support</p>
                      <p>Phone Support: Mon-Sat, 10 AM - 7 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-80 border border-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-50/20 via-transparent to-transparent"></div>
              <div className="text-center relative z-10">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-base font-light text-gray-900 mb-2 tracking-wide">Find Us Here</h4>
                <p className="text-xs text-gray-600 font-light">Sector 15, Rohini, New Delhi</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-gray-100 pt-20">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium">
              Common Questions
            </p>
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 border border-gray-100 rounded-lg">
                <h3 className="font-medium text-xs mb-3 text-gray-900 uppercase tracking-wider">
                  How quickly will I receive a response?
                </h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  We respond to emails within 24 hours and phone calls are answered during business hours, Monday through Saturday.
                </p>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-100 rounded-lg">
                <h3 className="font-medium text-xs mb-3 text-gray-900 uppercase tracking-wider">
                  Do you offer product consultations?
                </h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  Yes, our experts can help you choose the perfect case for your device model and lifestyle needs.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 border border-gray-100 rounded-lg">
                <h3 className="font-medium text-xs mb-3 text-gray-900 uppercase tracking-wider">
                  Can I visit your showroom without an appointment?
                </h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  Walk-ins are welcome during business hours, though appointments ensure dedicated attention from our team.
                </p>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-100 rounded-lg">
                <h3 className="font-medium text-xs mb-3 text-gray-900 uppercase tracking-wider">
                  How do I file a warranty claim?
                </h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  Contact us via email with your order number and photos. Our team will guide you through the simple process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-black p-16 rounded-lg text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-light mb-4 tracking-tight">
              Ready to Protect Your Device?
            </h2>
            <p className="text-sm mb-8 text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              Contact us today and discover why thousands trust Caishen United for premium device protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919911636888"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-black rounded text-xs font-medium uppercase tracking-widest hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
              <a
                href="mailto:support@caishenunited.com"
                className="inline-flex items-center justify-center px-10 py-4 border-2 border-white rounded text-white text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
