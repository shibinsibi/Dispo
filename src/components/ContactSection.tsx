import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Truck,
  Building,
  ShieldCheck,
  Package
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryType: 'Bulk Wholesale Order',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the Minimum Order Quantity (MOQ) for wholesale orders?',
      a: 'For standard in-stock packaging (aluminum containers, ripple cups, plastic boxes), our MOQ starts from 2,500 to 5,000 units depending on size. For custom logo printed packaging, custom production runs start at just 2,500 units.'
    },
    {
      q: 'Can I request physical product samples before placing a large order?',
      a: 'Yes, absolutely! We provide complimentary sample verification kits for restaurants, QSR chains, and corporate buyers so you can test leakproof integrity, heat retention, and fit with your actual recipes.'
    },
    {
      q: 'Where are your products manufactured and dispatched from?',
      a: 'Our primary manufacturing and automated warehousing facility is strategically situated in the industrial hub of Silvassa, Dadra and Nagar Haveli, India. This central location facilitates rapid freight dispatch across Maharashtra, Gujarat, and nationwide.'
    },
    {
      q: 'What certifications do Dispo World packaging products hold?',
      a: 'Our products and manufacturing partner facilities comply with ISO 9001:2015 quality protocols, FSSAI direct food contact compliance, EN 13432 compostability standards (for bagasse items), and FDA 21 CFR standards.'
    },
    {
      q: 'What is the turnaround time for custom branded packaging?',
      a: 'Standard custom printing turnaround is 10–14 business days from final 3D artwork and digital proof approval. We also provide express production scheduling for urgent franchise openings.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-slate-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest mb-3">
            Get In Touch & Request Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Connect with Dispo World Sales
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Speak directly with our packaging specialists for customized wholesale quotes, free sample kits, and factory-direct distribution pricing.
          </p>
        </div>

        {/* Contact Grid: Form on Left, Office & Logistics Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* RFQ Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] mb-1">
              Request a Commercial Quote / Sample Pack
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out this quick form. Our Silvassa sales desk responds within 2 business hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-sky-50 rounded-2xl border border-sky-200 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-sky-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  Inquiry Received!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. A representative from Dispo World Silvassa will contact you at <span className="font-semibold">{formData.email}</span> / <span className="font-semibold">{formData.phone}</span> shortly with your custom price sheet.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Brand Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Urban Tandoor Cloud Kitchens"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. vikram@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Purpose</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-sky-500"
                  >
                    <option value="Bulk Wholesale Order">Bulk Wholesale Purchase</option>
                    <option value="Custom Logo Printing">Custom Logo Printing & 3D Artwork</option>
                    <option value="Free Sample Kit Request">Free Sample Kit Request</option>
                    <option value="Distributor / Franchise Partnership">Distributor / Franchise Partnership</option>
                    <option value="Eco Transition Consultation">Compostable / Eco Packaging Switch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Requirements & Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the products you need, estimated monthly volumes, sizes, or custom printing requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Quotation Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Plant Location & Direct Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Plant Details */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-['Outfit']">
                    Manufacturing & Operations Hub
                  </h4>
                  <p className="text-xs text-slate-500">Dispo World Head Office</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span>Industrial Area, Silvassa, Dadra and Nagar Haveli - 396230, India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>Wholesale Helpline: +91 98795 00000 / +91 (Silvassa Desk)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>contact@dispo-world.com / sales@dispo-world.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>Monday - Saturday: 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919879500000?text=Hello%20Dispo%20World%2C%20I%20am%20interested%20in%20your%20disposable%20packaging%20products."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-sky-200"
                >
                  <MessageSquare className="w-4 h-4 text-sky-600" />
                  <span>Chat Directly on WhatsApp (+91)</span>
                </a>
              </div>
            </div>

            {/* Distribution Network Map Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-['Outfit']">
                    Pan-India Distribution Fleet
                  </h4>
                  <p className="text-xs text-slate-400">Serving 10+ States with express freight</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Direct container-load and palletized dispatch to Maharashtra, Gujarat, Delhi NCR, Karnataka, Tamil Nadu, Telangana, Rajasthan, Madhya Pradesh, and Uttar Pradesh.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Fast 24-48h dispatch
                </span>
                <span>ISO Certified Partners</span>
              </div>
            </div>

          </div>

        </div>

        {/* Frequently Asked Questions (FAQ) Accordion */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500">
                Everything you need to know regarding MOQ, shipping, and custom printing
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-3.5 px-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-800 text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
