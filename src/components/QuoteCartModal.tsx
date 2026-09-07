import React, { useState } from 'react';
import { QuoteItem } from '../types';
import { 
  X, 
  Trash2, 
  Send, 
  CheckCircle2, 
  FileText, 
  Package, 
  MessageSquare, 
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface QuoteCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const QuoteCartModal: React.FC<QuoteCartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll
}) => {
  if (!isOpen) return null;

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [customBranding, setCustomBranding] = useState(false);
  const [requestSamples, setRequestSamples] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [quoteTicketId, setQuoteTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = 'DW-' + Math.floor(100000 + Math.random() * 900000);
    setQuoteTicketId(ticketId);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
                Wholesale RFQ & Sample Request
              </h2>
              <p className="text-xs text-slate-500">
                Direct factory pricing from Dispo World Silvassa facility
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">
                Inquiry Successfully Submitted!
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                Thank you, <span className="font-semibold">{contactName || 'Valued Customer'}</span>. Your quotation reference ticket is:
              </p>
              <div className="inline-block mt-3 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-mono font-bold text-lg">
                {quoteTicketId}
              </div>
            </div>

            <div className="bg-sky-50 rounded-2xl p-4 text-xs text-sky-800 border border-sky-200/80 max-w-md mx-auto text-left space-y-1.5">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-600" /> Next Steps:
              </div>
              <p>• Our Silvassa sales team will review your specifications and MOQ discounts within 2 business hours.</p>
              <p>• A tailored commercial proforma and digital 3D branding proof will be sent to {email || 'your email'}.</p>
              {requestSamples && <p>• Complimentary sample pack dispatched to {city || 'your destination'} via priority courier.</p>}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClearAll();
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Done & Return to Catalog
              </button>
              <a
                href={`https://wa.me/919879500000?text=Hi%20Dispo%20World%2C%20I%20have%20submitted%20RFQ%20${quoteTicketId}%20for%20packaging%20supplies.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Follow up on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          /* RFQ Cart & Form */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Selected Items List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Selected Packaging Products ({items.length})
                </span>
                {items.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <Package className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">Your RFQ inquiry list is empty</p>
                  <p className="text-xs text-slate-500 mt-1">Browse products from our catalog and click "Add to Quote Request".</p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold cursor-pointer"
                  >
                    Browse Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div 
                      key={item.product.id}
                      className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs"
                    >
                      <div className="flex-1">
                        <div className="font-bold text-slate-900">{item.product.name}</div>
                        <div className="text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>Size: {item.size}</span>
                          <span>•</span>
                          <span>Material: {item.product.material.split('(')[0]}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500">Qty:</span>
                          <input
                            type="number"
                            min="500"
                            step="500"
                            value={item.quantity}
                            onChange={(e) => onUpdateQuantity(item.product.id, Math.max(100, parseInt(e.target.value) || 0))}
                            className="w-20 px-2 py-1 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800 text-center focus:outline-sky-500"
                          />
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-200 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-200">
                {/* Checkbox Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-sky-50/50">
                    <input
                      type="checkbox"
                      checked={customBranding}
                      onChange={(e) => setCustomBranding(e.target.checked)}
                      className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Custom Logo Printing
                      </span>
                      <p className="text-slate-500 mt-0.5">Include 3D artwork mockup & brand ink quotation</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-sky-50/50">
                    <input
                      type="checkbox"
                      checked={requestSamples}
                      onChange={(e) => setRequestSamples(e.target.checked)}
                      className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-sky-600" /> Include Physical Sample Kit
                      </span>
                      <p className="text-slate-500 mt-0.5">Dispatched to your office/restaurant for testing</p>
                    </div>
                  </label>
                </div>

                {/* Contact Information Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Company / Restaurant Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Spice Route Cloud Kitchens"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. procurement@restaurant.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-sky-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Delivery City & State</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, Maharashtra / Bangalore, Karnataka"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-sky-500"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="submit-rfq-btn"
                    className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Wholesale RFQ & Sample Request</span>
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    No payment required upfront. Official commercial quote delivered within 2 hours.
                  </p>
                </div>
              </form>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
