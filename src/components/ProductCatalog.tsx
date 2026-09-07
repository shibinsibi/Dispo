import React, { useState, useMemo } from 'react';
import { ProductItem, ProductCategory } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { ProductModal } from './ProductModal';
import { 
  Search, 
  Filter, 
  Rotate3d, 
  Leaf, 
  ShieldCheck, 
  FileText, 
  Plus, 
  Check, 
  Eye, 
  ChevronRight,
  PackageCheck,
  Package,
  Layers,
  Sparkles,
  ShoppingBag,
  Star,
  Camera,
  ArrowRight
} from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (product: ProductItem, quantity: number, size: string) => void;
  onBuyNow: (product: ProductItem, quantity: number, size: string) => void;
  onViewIn3DStudio: (type: 'cup' | 'container' | 'box' | 'foil' | 'glove') => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart,
  onBuyNow,
  onViewIn3DStudio
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyEco, setOnlyEco] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories: { id: ProductCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'All Products', icon: '📦' },
    { id: 'packaging', label: 'Food Packaging', icon: '🍱' },
    { id: 'tableware', label: 'Tableware & Dining', icon: '🍽️' },
    { id: 'hygiene', label: 'Hygiene & Medical', icon: '🧤' },
    { id: 'custom', label: 'Custom Branding', icon: '✨' }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesEco = !onlyEco || item.ecoFriendly;

      return matchesCategory && matchesSearch && matchesEco;
    });
  }, [activeCategory, searchQuery, onlyEco]);

  const handleQuickAdd = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1, product.sizes[0] || 'Standard');
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const handleQuickBuy = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onBuyNow(product, 1, product.sizes[0] || 'Standard');
  };

  return (
    <section id="products" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest rounded-full mb-2">
              Online Packaging Store
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
              Shop Food Packaging & Tableware
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-2xl">
              Factory direct rates from Silvassa plant. Order online with instant GST invoice, real-time photo inspection, and fast dispatch across India.
            </p>
          </div>

          {/* Eco toggle switch */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <button
              onClick={() => setOnlyEco(!onlyEco)}
              className={`flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer ${
                onlyEco ? 'text-sky-700' : 'text-slate-600'
              }`}
            >
              <Leaf className={`w-4 h-4 ${onlyEco ? 'text-sky-600 fill-sky-100' : 'text-slate-400'}`} />
              <span>Show Eco-Friendly Only</span>
            </button>
            <div 
              onClick={() => setOnlyEco(!onlyEco)}
              className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${
                onlyEco ? 'bg-sky-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${onlyEco ? 'translate-x-5' : ''}`} />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100/70 text-slate-700 hover:bg-slate-100 hover:text-sky-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search containers, cups, foil..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-sky-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = addedItemIds[product.id];
              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-white rounded-2xl border border-slate-200/90 hover:border-sky-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Card Visual Header with Real Photo */}
                  <div className="relative h-56 bg-slate-100 p-4 flex flex-col justify-between overflow-hidden">
                    
                    {/* Real Product Photography */}
                    <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors z-0" />
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Top Badges */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-md text-[11px] font-bold tracking-wider text-white uppercase shadow-xs">
                        {product.subcategory}
                      </span>
                      {product.badge && (
                        <span className="px-2.5 py-1 rounded-md bg-sky-600 text-white text-[11px] font-bold shadow-md shadow-sky-600/30">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Bottom overlay pills */}
                    <div className="relative z-10 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/85 hover:bg-slate-900 text-white text-[11px] font-semibold flex items-center gap-1.5 backdrop-blur-md transition-colors cursor-pointer border border-slate-700/60"
                        title="Inspect 360° real photos & 3D"
                      >
                        <Camera className="w-3.5 h-3.5 text-sky-400" />
                        <span>360° Real Photos</span>
                      </button>

                      {product.ecoFriendly && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[11px] font-medium flex items-center gap-1 border border-emerald-500/40">
                          <Leaf className="w-3 h-3 text-emerald-400" /> Eco
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Rating & Stock */}
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{product.rating}</span>
                          <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                        </div>
                        <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                          In Stock ({product.stockCount} packs)
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1 font-['Outfit']">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2">
                        {product.tagline}
                      </p>

                      {/* Pricing Tag */}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-slate-900 font-mono">
                          ₹{product.price}
                        </span>
                        <span className="text-xs line-through text-slate-400 font-mono">
                          ₹{product.originalPrice}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-bold">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                        {product.packSize}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        id={`quick-add-${product.id}`}
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-sky-600" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>

                      <button
                        id={`buy-now-${product.id}`}
                        onClick={(e) => handleQuickBuy(product, e)}
                        className="py-2 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm shadow-sky-500/20 cursor-pointer transition-colors"
                      >
                        Buy Now
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer shrink-0"
                        title="Inspect 360° Real Photos & 3D"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No packaging products match your search</h3>
            <p className="text-sm text-slate-500 mb-6">
              Try adjusting your keyword or reset filters to browse all categories.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setOnlyEco(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Product Details & 360° Photo Inspection Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          onViewIn3DStudio={onViewIn3DStudio}
        />
      )}
    </section>
  );
};
