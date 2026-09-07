import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Rotate3d, 
  Phone, 
  Menu, 
  X, 
  ShoppingBag, 
  Leaf, 
  ShieldCheck, 
  Mail, 
  Camera,
  ArrowRight,
  Truck
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  cartTotal?: number;
  onOpenCart: () => void;
  onOpenCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal = 0,
  onOpenCart,
  onOpenCatalog
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5' 
        : 'bg-white/90 backdrop-blur-sm py-3.5'
    }`}>
      {/* Top micro-bar for corporate info & free shipping alert */}
      <div className="hidden lg:block border-b border-slate-100 pb-2 mb-2 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-sky-700 font-semibold">
              <Truck className="w-3.5 h-3.5 text-sky-600" /> Free Priority Express Delivery on orders over ₹1,500
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" /> 100% Food-Grade Certified & Compostable Packaging
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" /> Direct Silvassa Plant Pricing
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="mailto:orders@dispo-world.com" 
              className="hover:text-sky-600 flex items-center gap-1 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" /> orders@dispo-world.com
            </a>
            <span className="text-slate-300">|</span>
            <a 
              href="tel:+919879500000" 
              className="hover:text-sky-600 flex items-center gap-1 font-semibold text-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" /> +91 (Silvassa Desk)
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a 
            href="#" 
            id="brand-logo"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-['Outfit']">
                  DISPO<span className="text-sky-600">WORLD</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
                  STORE
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                Food Packaging & Disposables
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-products"
              onClick={() => scrollTo('products')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 rounded-xl hover:bg-sky-50 transition-colors cursor-pointer"
            >
              Shop Catalog
            </button>
            <button
              id="nav-3d-studio"
              onClick={() => scrollTo('3d-studio')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 rounded-xl hover:bg-sky-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-sky-600" />
              <span>360° Studio</span>
            </button>
            <button
              id="nav-about"
              onClick={() => scrollTo('about')}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-sky-600 rounded-xl hover:bg-sky-50 transition-colors cursor-pointer"
            >
              About Plant
            </button>
            <button
              id="nav-sustainability"
              onClick={() => scrollTo('sustainability')}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-sky-600 rounded-xl hover:bg-sky-50 transition-colors cursor-pointer"
            >
              Eco Solutions
            </button>
            <button
              id="nav-contact"
              onClick={() => scrollTo('contact')}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-sky-600 rounded-xl hover:bg-sky-50 transition-colors cursor-pointer"
            >
              Contact & Bulk
            </button>
          </nav>

          {/* Action CTAs: E-commerce Cart + Direct WhatsApp / Quote */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* E-Commerce Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2 text-sm font-bold text-slate-900 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 rounded-2xl transition-all border border-slate-200 cursor-pointer flex items-center gap-2 shadow-xs"
              title="View Shopping Cart & Checkout"
            >
              <ShoppingBag className="w-4 h-4 text-sky-600" />
              <span className="hidden sm:inline font-['Outfit']">Cart</span>
              {cartCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[11px] font-extrabold flex items-center justify-center animate-pulse shadow-sm">
                  {cartCount}
                </span>
              ) : (
                <span className="text-xs text-slate-400 font-normal hidden sm:inline">(0)</span>
              )}
            </button>

            {/* Direct Shop Catalog Button */}
            <button
              id="nav-shop-now-cta"
              onClick={() => scrollTo('products')}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white text-sm font-bold rounded-full shadow-lg shadow-sky-500/25 hover:bg-sky-700 transition-all cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 mt-2 shadow-lg animate-in slide-in-from-top">
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => scrollTo('products')}
              className="flex items-center justify-between py-2.5 px-3 text-sm font-semibold text-slate-800 rounded-xl hover:bg-slate-50 text-left"
            >
              <span>Shop All Products</span>
              <Package className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollTo('3d-studio')}
              className="flex items-center justify-between py-2.5 px-3 text-sm font-semibold text-sky-700 rounded-xl bg-sky-50 text-left"
            >
              <span className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-sky-600" /> 360° Real Photo Studio
              </span>
              <span className="text-[10px] bg-sky-200 text-sky-800 px-1.5 py-0.5 rounded-md font-bold">Inspect</span>
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="flex items-center justify-between py-2.5 px-3 text-sm font-medium text-slate-800 rounded-xl hover:bg-slate-50 text-left"
            >
              <span>Silvassa Manufacturing Plant</span>
              <ShieldCheck className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollTo('sustainability')}
              className="flex items-center justify-between py-2.5 px-3 text-sm font-medium text-slate-800 rounded-xl hover:bg-slate-50 text-left"
            >
              <span>Eco-Friendly & Bagasse</span>
              <Leaf className="w-4 h-4 text-emerald-600" />
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="flex items-center justify-between py-2.5 px-3 text-sm font-medium text-slate-800 rounded-xl hover:bg-slate-50 text-left"
            >
              <span>Contact & Bulk Order Help</span>
              <Mail className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-sky-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-sky-500/25"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Open Shopping Cart ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
