import React, { useState, useMemo } from 'react';
import { CartItem, OrderSummary } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  FileText, 
  Printer, 
  MessageSquare,
  Sparkles,
  ChevronLeft,
  Percent,
  Lock,
  Building2
} from 'lucide-react';

interface CartCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  onContinueShopping?: () => void;
}

export const CartCheckoutModal: React.FC<CartCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping
}) => {
  if (!isOpen) return null;

  // Checkout steps: 'cart' -> 'checkout' -> 'confirmed'
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');

  // Customer & Shipping state
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [gstin, setGstin] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Gujarat');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod' | 'invoice'>('upi');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number; discountFixed: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Confirmed Order details
  const [confirmedOrder, setConfirmedOrder] = useState<OrderSummary | null>(null);

  // Totals calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.pricePerPack * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountPercent > 0) {
      return Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    }
    return appliedCoupon.discountFixed;
  }, [subtotal, appliedCoupon]);

  const freeShippingThreshold = 1500;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 120;
  const amountAfterDiscount = Math.max(0, subtotal - discountAmount);
  // 18% GST calculation
  const gstAmount = Math.round(amountAfterDiscount * 0.18);
  const grandTotal = amountAfterDiscount + gstAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME10') {
      setAppliedCoupon({ code: 'WELCOME10', discountPercent: 10, discountFixed: 0 });
    } else if (code === 'DISPO50') {
      setAppliedCoupon({ code: 'DISPO50', discountPercent: 0, discountFixed: 50 });
    } else if (code === 'FREESHIP') {
      setAppliedCoupon({ code: 'FREESHIP', discountPercent: 0, discountFixed: shippingFee });
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10 or DISPO50.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = 'DW-ORD-' + Math.floor(100000 + Math.random() * 900000);
    const order: OrderSummary = {
      orderId,
      items: [...cartItems],
      subtotal,
      discount: discountAmount,
      gst: gstAmount,
      shipping: shippingFee,
      total: grandTotal,
      customer: {
        name: customerName,
        email,
        phone,
        company: company || undefined,
        gstin: gstin || undefined
      },
      shippingAddress: {
        addressLine,
        city,
        state,
        pincode
      },
      paymentMethod,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      estimatedDelivery: '3 - 5 Business Days via Express Road Logistics'
    };

    setConfirmedOrder(order);
    setStep('confirmed');
    onClearCart();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            {step === 'checkout' && (
              <button
                onClick={() => setStep('cart')}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Back to Cart"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
                {step === 'cart' && 'Your Shopping Cart'}
                {step === 'checkout' && 'Secure Checkout'}
                {step === 'confirmed' && 'Order Confirmed!'}
              </h2>
              <p className="text-xs text-slate-500">
                {step === 'cart' && `${cartItems.length} unique packaging items`}
                {step === 'checkout' && 'Direct Dispatch from Silvassa Plant'}
                {step === 'confirmed' && `Order #${confirmedOrder?.orderId}`}
              </p>
            </div>
          </div>

          <button
            id="cart-modal-close"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* VIEW 1: CART ITEMS & SUMMARY */}
        {step === 'cart' && (
          <div className="p-5 sm:p-8 flex flex-col space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Your cart is currently empty</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  Explore our food containers, ripple cups, bagasse tableware, and packaging rolls.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    if (onContinueShopping) onContinueShopping();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-sky-500/20 cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Free shipping banner */}
                <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-3.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-sky-800 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-sky-600" />
                      {subtotal >= freeShippingThreshold ? (
                        <span className="text-emerald-700 font-bold">🎉 Congratulations! You unlocked FREE Priority Shipping!</span>
                      ) : (
                        <span>Add ₹{freeShippingThreshold - subtotal} more for FREE Priority Shipping</span>
                      )}
                    </span>
                    <span>{Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%</span>
                  </div>
                  <div className="w-full bg-sky-200/60 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3 divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span className="font-semibold text-sky-700">{item.selectedSize}</span>
                          <span>•</span>
                          <span>₹{item.pricePerPack} / pack</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                          {item.product.packSize}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                            title="Decrease packs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-slate-800 min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                            title="Increase packs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="w-20 text-right">
                          <div className="text-sm font-bold text-slate-900">
                            ₹{item.pricePerPack * item.quantity}
                          </div>
                        </div>

                        {/* Remove item */}
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon applicator */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Percent className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Coupon Code (e.g. WELCOME10, DISPO50)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 uppercase font-mono focus:outline-sky-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Coupon &quot;{appliedCoupon.code}&quot; applied successfully!</span>
                    </div>
                  )}
                  {couponError && (
                    <div className="text-xs text-rose-500 mt-1">{couponError}</div>
                  )}
                </form>

                {/* Totals Breakdown */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal:</span>
                    <span className="font-semibold text-slate-900 font-mono">₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount:</span>
                      <span className="font-semibold font-mono">-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>GST (18% Business Tax Input):</span>
                    <span className="font-semibold text-slate-900 font-mono">₹{gstAmount}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Shipping & Handling:</span>
                    <span className="font-semibold text-slate-900 font-mono">
                      {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shippingFee}`}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                    <span>Grand Total (Incl. GST):</span>
                    <span className="text-sky-700 font-mono text-base">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Primary Action: Proceed to Checkout */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={onClose}
                    className="sm:w-1/3 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                  <button
                    id="proceed-to-checkout-btn"
                    onClick={() => setStep('checkout')}
                    className="flex-1 py-3 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* VIEW 2: CHECKOUT FORM */}
        {step === 'checkout' && (
          <form onSubmit={handlePlaceOrder} className="p-5 sm:p-8 space-y-6">
            {/* Step 1: Customer Contact Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Contact & Business Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address (For Tax Invoice) *</label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@restaurant.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    GSTIN (Optional for Tax Credit)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 24AAAAA0000A1Z5"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 uppercase font-mono focus:outline-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Shipping Address</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address, Building, Kitchen / Store *</label>
                  <input
                    type="text"
                    required
                    placeholder="Unit 4B, Food Hub Complex, MG Road"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-sky-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="Surat / Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-sky-500 bg-white"
                    >
                      <option value="Gujarat">Gujarat</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Dadra & Nagar Haveli">Dadra & Nagar Haveli (Silvassa)</option>
                      <option value="Daman & Diu">Daman & Diu</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Other">Other States</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="396230"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono focus:outline-sky-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Select Payment Method</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'upi', label: 'Instant UPI / QR Code', icon: QrCode, desc: 'Google Pay, PhonePe, Paytm (Zero Fee)' },
                  { id: 'card', label: 'Debit / Credit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                  { id: 'cod', label: 'Cash on Delivery', icon: Truck, desc: 'Pay when packages arrive at kitchen' },
                  { id: 'invoice', label: 'B2B Net-30 Invoice', icon: FileText, desc: 'Pre-approved commercial credit' }
                ].map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <label
                      key={pm.id}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === pm.id
                          ? 'border-sky-600 bg-sky-50/50 shadow-xs ring-1 ring-sky-500'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={pm.id}
                        checked={paymentMethod === pm.id}
                        onChange={() => setPaymentMethod(pm.id as any)}
                        className="mt-0.5 text-sky-600 focus:ring-sky-500"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-sky-600" />
                          <span>{pm.label}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{pm.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* UPI Preview box if UPI selected */}
              {paymentMethod === 'upi' && (
                <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-sky-400">Scan & Pay via any UPI App</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">UPI ID: <span className="font-mono text-white font-bold">dispoworld@icici</span></div>
                    <div className="text-[10px] text-slate-400 mt-1">Instant payment verification enabled</div>
                  </div>
                  <div className="w-16 h-16 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center">
                    <QrCode className="w-14 h-14 text-slate-900" />
                  </div>
                </div>
              )}
            </div>

            {/* Total Summary and Place Order */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500">Total Payable Amount:</div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  ₹{grandTotal} <span className="text-xs font-normal text-slate-500">(Incl. GST)</span>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Edit Cart
                </button>
                <button
                  type="submit"
                  id="place-order-btn"
                  className="flex-1 sm:flex-initial px-8 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold shadow-lg shadow-sky-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Place Order • ₹{grandTotal}</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* VIEW 3: ORDER CONFIRMATION */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="p-6 sm:p-10 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                Order Dispatched Soon
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-['Outfit']">
                Thank you for your order!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                We have received your order. A digital GST invoice receipt has been sent to <span className="font-semibold text-slate-900">{confirmedOrder.customer.email}</span>.
              </p>
            </div>

            {/* Order details card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3 max-w-lg mx-auto text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Order Reference ID:</span>
                <span className="font-mono font-bold text-sm text-slate-900">{confirmedOrder.orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Customer Name:</span>
                <span className="font-semibold text-slate-800">{confirmedOrder.customer.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-semibold text-slate-800 text-right truncate max-w-[200px]">
                  {confirmedOrder.shippingAddress.addressLine}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.pincode}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-700">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-700">Total Paid:</span>
                <span className="font-mono font-extrabold text-sm text-sky-700">₹{confirmedOrder.total}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrintReceipt}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print GST Invoice Receipt</span>
              </button>

              <a
                href={`https://wa.me/919879500000?text=Hi%20Dispo%20World%2C%20I%20just%20placed%20order%20${confirmedOrder.orderId}%20for%20packaging%20supplies.`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-sky-500/20 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Track on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setStep('cart');
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
