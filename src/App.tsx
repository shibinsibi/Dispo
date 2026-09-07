/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThreeDShowcase } from './components/ThreeDShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { AboutSection } from './components/AboutSection';
import { SustainabilitySection } from './components/SustainabilitySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartCheckoutModal } from './components/CartCheckoutModal';
import { ProductItem, CartItem } from './types';
import { PRODUCTS_DATA } from './data/products';
import { MessageSquare, ShoppingBag, CheckCircle2, ArrowUp, Truck } from 'lucide-react';

export default function App() {
  // E-Commerce Shopping Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS_DATA[0], // Aluminum Foil Container
      quantity: 2,
      selectedSize: '660 ml (Pack of 100 pcs)',
      pricePerPack: PRODUCTS_DATA[0].price
    },
    {
      product: PRODUCTS_DATA[1], // Ripple Wall Cup
      quantity: 1,
      selectedSize: '250 ml (8 oz) (Pack of 100 pcs)',
      pricePerPack: PRODUCTS_DATA[1].price
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: ProductItem, quantity: number, size: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedSize: size,
            pricePerPack: product.price
          }
        ];
      }
    });
    showToast(`Added ${quantity} pack(s) of ${product.name} to Cart!`);
  };

  const handleBuyNow = (product: ProductItem, quantity: number, size: string) => {
    handleAddToCart(product, quantity, size);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleViewIn3DStudio = (type: 'cup' | 'container' | 'box' | 'foil' | 'glove') => {
    const studioEl = document.getElementById('3d-studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
      // Trigger tab click after short delay
      setTimeout(() => {
        const tabBtn = document.getElementById(`3d-tab-${type}`);
        if (tabBtn) tabBtn.click();
      }, 300);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans'] selection:bg-sky-600 selection:text-white flex flex-col">
      {/* Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCatalog={() => scrollTo('products')}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 1. Hero Section with Live 3D Preview & Direct Store CTA */}
        <Hero
          onExploreProducts={() => scrollTo('products')}
          onOpen3DStudio={() => scrollTo('3d-studio')}
          onRequestQuote={() => setIsCartOpen(true)}
        />

        {/* 2. Interactive 360° Real-Time Photo & 3D Inspection Studio */}
        <ThreeDShowcase
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

        {/* 3. Comprehensive E-Commerce Product Catalog */}
        <ProductCatalog
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewIn3DStudio={handleViewIn3DStudio}
        />

        {/* 4. Company Background, Silvassa Hub & Certifications */}
        <AboutSection />

        {/* 5. Sustainability & Eco-Friendly Initiative */}
        <SustainabilitySection
          onExploreEco={() => {
            scrollTo('products');
            const catBtn = document.getElementById('cat-filter-tableware');
            if (catBtn) catBtn.click();
          }}
        />

        {/* 6. Contact, Bulk Inquiries & FAQ */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenCatalogModal={() => scrollTo('products')} />

      {/* Floating Cart & Quick Contact Action Buttons */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Floating Cart Button */}
        {cartItems.length > 0 && (
          <button
            id="floating-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="p-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-2 group cursor-pointer border border-slate-700/80 hover:scale-105"
            title="Open Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-bold hidden sm:inline font-['Outfit']">Cart</span>
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[11px] font-extrabold flex items-center justify-center shadow-md">
              {totalCartCount}
            </span>
          </button>
        )}

        {/* WhatsApp Direct Help */}
        <a
          id="floating-whatsapp-btn"
          href="https://wa.me/919879500000?text=Hello%20Dispo%20World%2C%20I%20would%20like%20to%20order%20food%20packaging%20supplies."
          target="_blank"
          rel="noreferrer"
          className="p-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white shadow-xl shadow-sky-500/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          title="Chat with Dispo World Silvassa Desk"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-bold hidden sm:inline">Order Support</span>
        </a>
      </aside>

      {/* E-Commerce Shopping Cart & Checkout Modal */}
      <CartCheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onContinueShopping={() => scrollTo('products')}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-sky-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
