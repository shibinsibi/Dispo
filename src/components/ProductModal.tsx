import React, { useState } from 'react';
import { ProductItem } from '../types';
import { ThreeCanvas } from './ThreeCanvas';
import { Photo360Viewer } from './Photo360Viewer';
import { 
  X, 
  CheckCircle2, 
  Rotate3d, 
  Plus, 
  Minus,
  FileText, 
  ShieldCheck, 
  Leaf, 
  ArrowRight,
  Package,
  Layers,
  Camera,
  ShoppingBag,
  Star,
  Truck,
  Check,
  Percent
} from 'lucide-react';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, quantity: number, size: string) => void;
  onBuyNow: (product: ProductItem, quantity: number, size: string) => void;
  onViewIn3DStudio: (type: 'cup' | 'container' | 'box' | 'foil' | 'glove') => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onViewIn3DStudio
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'realphoto' | 'webgl3d'>('realphoto');
  const [activePhotoUrl, setActivePhotoUrl] = useState<string>(product.imageUrl);
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          id="product-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-8">
          
          {/* Left Column: 360° Real Photos & 3D Viewer (5 cols) */}
          <div className="md:col-span-5 flex flex-col space-y-3">
            
            {/* View Mode Toggle Header */}
            <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('realphoto')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'realphoto'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-sky-600" />
                <span>360° Real Photos</span>
              </button>
              <button
                onClick={() => setViewMode('webgl3d')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'webgl3d'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Rotate3d className="w-3.5 h-3.5 text-sky-600" />
                <span>3D Model</span>
              </button>
            </div>

            {/* Viewer Box */}
            <div className="w-full h-72 sm:h-80 rounded-2xl bg-slate-950 border border-slate-800 relative flex items-center justify-center overflow-hidden">
              {viewMode === 'realphoto' ? (
                <Photo360Viewer
                  angles={product.photo360Angles}
                  productName={product.name}
                  category={product.subcategory}
                  className="w-full h-full"
                  showControls={false}
                />
              ) : (
                <ThreeCanvas
                  modelType={product.threeDType}
                  finish={product.threeDType === 'foil' ? 'aluminum' : product.threeDType === 'cup' ? 'kraft' : product.threeDType === 'glove' ? 'white' : 'bagasse'}
                  wireframe={false}
                  autoRotate={true}
                  className="w-full h-full"
                  cameraDistance={4.0}
                />
              )}
            </div>

            {/* Real Photo Thumbnail Strip */}
            {product.galleryUrls && product.galleryUrls.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.galleryUrls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoUrl(url)}
                    className="w-14 h-14 rounded-xl border border-slate-200 overflow-hidden shrink-0 hover:opacity-100 transition-all cursor-pointer focus:ring-2 focus:ring-sky-500"
                  >
                    <img 
                      src={url} 
                      alt={`${product.name} angle ${idx + 1}`} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Full 3D Inspection Studio CTA */}
            <button
              id="modal-view-in-studio-btn"
              onClick={() => {
                onClose();
                onViewIn3DStudio(product.threeDType);
              }}
              className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Rotate3d className="w-4 h-4 text-sky-400 animate-spin-slow" />
              <span>Inspect in Full Studio with Turntable</span>
            </button>
          </div>

          {/* Right Column: Information, Pricing, Sizing & Actions (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
                  {product.subcategory}
                </span>
                {product.ecoFriendly && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium flex items-center gap-1 border border-emerald-200/60">
                    <Leaf className="w-3 h-3 text-emerald-600" /> Eco-Friendly
                  </span>
                )}
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs ml-auto">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
                {product.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {product.tagline}
              </p>

              {/* E-Commerce Pricing Box */}
              <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-extrabold text-slate-900 font-mono">
                    ₹{product.price}
                  </span>
                  <span className="text-xs line-through text-slate-400 font-mono">
                    ₹{product.originalPrice}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-bold text-xs">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                  <span className="font-semibold text-slate-700">{product.packSize}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-medium">In Stock ({product.stockCount} packs)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Size / Variant Selector */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Select Size / Specification:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bulk Discount Tiers */}
              <div className="mt-4 bg-sky-50/50 p-2.5 rounded-xl border border-sky-100">
                <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Percent className="w-3 h-3 text-sky-600" />
                  <span>Bulk Discount Tiers (Instant Savings)</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  {product.bulkPricing.map((tier, idx) => (
                    <div key={idx} className="bg-white p-1.5 rounded-lg border border-sky-200/60">
                      <div className="text-[10px] text-slate-500">{tier.range}</div>
                      <div className="text-xs font-bold text-slate-900 font-mono">₹{tier.pricePerPack}</div>
                      <div className="text-[9px] text-sky-700 font-semibold">
                        {tier.discountPercent > 0 ? `Save ${tier.discountPercent}%` : 'Standard'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Factory Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Material</span>
                    <span className="font-semibold text-slate-800">{product.material}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Food Grade Standard</span>
                    <span className="font-semibold text-emerald-700">FSSAI / FDA Compliant</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Actions: Quantity + Add to Cart + Buy Now */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Packs:</span>
                  <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900 min-w-[28px] text-center font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400">Total: </span>
                  <span className="text-base font-extrabold text-slate-900 font-mono">
                    ₹{product.price * quantity}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedToast
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-sky-600" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  id="modal-buy-now-btn"
                  onClick={handleBuy}
                  className="py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
