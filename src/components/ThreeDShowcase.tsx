import React, { useState } from 'react';
import { ThreeCanvas } from './ThreeCanvas';
import { Photo360Viewer, InspectionHotspot } from './Photo360Viewer';
import { MaterialFinish, ProductItem } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { 
  Rotate3d, 
  Layers, 
  Sparkles, 
  Eye, 
  FileText, 
  CheckCircle2, 
  Maximize2, 
  Compass,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Camera,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Percent,
  Truck
} from 'lucide-react';

interface ThreeDShowcaseProps {
  onAddToCart: (product: ProductItem, quantity: number, size: string) => void;
  onBuyNow: (product: ProductItem, quantity: number, size: string) => void;
  onOpenQuoteWithModel?: (modelName: string) => void;
}

export const ThreeDShowcase: React.FC<ThreeDShowcaseProps> = ({ 
  onAddToCart,
  onBuyNow,
  onOpenQuoteWithModel 
}) => {
  const [selectedModel, setSelectedModel] = useState<'cup' | 'container' | 'box' | 'foil' | 'glove'>('cup');
  const [viewMode, setViewMode] = useState<'realphoto' | 'webgl3d'>('realphoto');
  const [finish, setFinish] = useState<MaterialFinish>('kraft');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<string>('250 ml (8 oz)');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Map model types to catalog items
  const productMap: Record<'cup' | 'container' | 'box' | 'foil' | 'glove', ProductItem> = {
    cup: PRODUCTS_DATA.find((p) => p.id === 'dw-ripple-cup') || PRODUCTS_DATA[1],
    container: PRODUCTS_DATA.find((p) => p.id === 'dw-al-cont') || PRODUCTS_DATA[0],
    box: PRODUCTS_DATA.find((p) => p.id === 'dw-bagasse-plate') || PRODUCTS_DATA[3],
    foil: PRODUCTS_DATA.find((p) => p.id === 'dw-foil-rolls') || PRODUCTS_DATA[5],
    glove: PRODUCTS_DATA.find((p) => p.id === 'dw-gloves') || PRODUCTS_DATA[7]
  };

  const currentProduct = productMap[selectedModel];

  // Hotspots for real photo inspection
  const modelHotspots: Record<'cup' | 'container' | 'box' | 'foil' | 'glove', InspectionHotspot[]> = {
    cup: [
      { x: 50, y: 22, title: 'Ultrasonic Rim Bead', desc: 'Precision rolled lip guarantees a snap-tight, 100% leakproof seal with sipper lids.', tag: 'Sealing' },
      { x: 52, y: 55, title: 'Triple-Layer Thermal Wall', desc: 'Corrugated kraft fluting traps insulating air pockets, keeping drinks hot while cool to touch.', tag: 'Insulation' },
      { x: 50, y: 88, title: 'Recessed Leakproof Base', desc: 'Double folded and heat-fused bottom prevents moisture seepage during prolonged holding.', tag: 'Integrity' }
    ],
    container: [
      { x: 50, y: 20, title: 'Wrinkle-Resistant Rim', desc: 'Crimped edges seal foil-laminated lids tightly to trap gravy aromas and prevent transit spills.', tag: 'Locking' },
      { x: 48, y: 50, title: 'Reinforced Sidewall Ribs', desc: 'Vertical embossed fluting provides structural rigidity preventing container collapse.', tag: 'Durability' },
      { x: 72, y: 75, title: '55-Micron Pure Aluminum', desc: 'Infinitely recyclable virgin metal safely withstands freezer to +280°C oven heating.', tag: 'Food-Safe' }
    ],
    box: [
      { x: 50, y: 28, title: 'Organic Sugarcane Fiber', desc: '100% agricultural bagasse by-product, unbleached, and composts naturally within 90 days.', tag: 'Compostable' },
      { x: 65, y: 52, title: 'Deep Greaseproof Lip', desc: 'Form-pressed rim prevents curries and heavy sauces from overflowing without plastic liner.', tag: 'Anti-Spill' }
    ],
    foil: [
      { x: 30, y: 35, title: '18-Micron Industrial Heavy', desc: 'Tear-resistant commercial thickness ideal for high-temperature roasting and airtight wrapping.', tag: 'Gauge' },
      { x: 75, y: 70, title: 'Safety Slide Cutter Box', desc: 'Smooth built-in track cutter prevents jagged edges and finger cuts in fast-paced kitchens.', tag: 'Ergonomics' }
    ],
    glove: [
      { x: 40, y: 32, title: 'Micro-Textured Fingertips', desc: 'Enhanced tactile grip enables non-slip handling of wet utensils, glassware, and oily foods.', tag: 'Traction' },
      { x: 55, y: 85, title: 'Rolled Beaded Cuff', desc: 'Reinforced cuff prevents roll-down and tearing during rapid donning in commercial kitchens.', tag: 'Hygiene' }
    ]
  };

  const handleAddToCartClick = () => {
    onAddToCart(currentProduct, quantity, selectedSize);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNowClick = () => {
    onBuyNow(currentProduct, quantity, selectedSize);
  };

  return (
    <section id="3d-studio" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Camera className="w-4 h-4 text-sky-400 animate-pulse" />
            <span>360° Real-Time Photo Inspection Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 font-['Outfit']">
            Inspect in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-cyan-400">360° Real Photos</span> & 3D
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Drag to spin authentic studio photographs in real-time, click inspection hotspots to examine crimp seals and fluting, or toggle the 3D WebGL mesh before ordering.
          </p>
        </div>

        {/* Model Category Selector Bar */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {[
            { id: 'cup', label: 'Ripple Paper Cup', icon: '☕' },
            { id: 'container', label: 'Meal Container', icon: '🍱' },
            { id: 'box', label: 'Bagasse Tableware', icon: '🍽️' },
            { id: 'foil', label: 'Kitchen Foil Roll', icon: '🥈' },
            { id: 'glove', label: 'Hygiene & Glove', icon: '🧤' }
          ].map((item) => (
            <button
              key={item.id}
              id={`3d-tab-${item.id}`}
              onClick={() => {
                const modelKey = item.id as any;
                setSelectedModel(modelKey);
                const prod = productMap[modelKey];
                if (prod && prod.sizes.length > 0) {
                  setSelectedSize(prod.sizes[0]);
                }
                if (item.id === 'foil') setFinish('aluminum');
                else if (item.id === 'cup') setFinish('kraft');
                else if (item.id === 'glove') setFinish('white');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                selectedModel === item.id
                  ? 'bg-sky-600 text-white font-bold shadow-lg shadow-sky-500/30 scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Studio Workspace: Left Viewer (360° Photo / 3D), Right E-commerce & Specs (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-950/80 border border-slate-800 rounded-3xl p-4 sm:p-8 backdrop-blur-xl shadow-2xl">
          
          {/* Left Viewport (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* View Mode Toggle Switch (Real Photos vs WebGL 3D) */}
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                <span className="font-mono uppercase tracking-wider text-slate-300">
                  {viewMode === 'realphoto' ? '360° Real-Time Studio Photos' : 'Interactive 3D WebGL Canvas'}
                </span>
              </div>

              {/* Mode Toggle Pills */}
              <div className="flex items-center bg-slate-900 border border-slate-700/70 p-1 rounded-xl">
                <button
                  id="toggle-realphoto-mode-btn"
                  onClick={() => setViewMode('realphoto')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'realphoto'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>360° Real Photos</span>
                </button>
                <button
                  id="toggle-webgl3d-mode-btn"
                  onClick={() => setViewMode('webgl3d')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'webgl3d'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Rotate3d className="w-3.5 h-3.5" />
                  <span>3D WebGL</span>
                </button>
              </div>
            </div>

            {/* Main Stage */}
            {viewMode === 'realphoto' ? (
              <Photo360Viewer
                angles={currentProduct.photo360Angles}
                productName={currentProduct.name}
                category={currentProduct.subcategory}
                hotspots={modelHotspots[selectedModel]}
                className="w-full h-[360px] sm:h-[430px]"
                showControls={true}
              />
            ) : (
              /* WebGL 3D Mesh Canvas */
              <div className="w-full flex flex-col items-center">
                <div className="w-full h-[360px] sm:h-[430px] bg-gradient-to-b from-slate-900/90 to-slate-950/90 rounded-2xl border border-slate-800 relative flex items-center justify-center shadow-inner overflow-hidden">
                  <ThreeCanvas
                    modelType={selectedModel}
                    finish={finish}
                    wireframe={wireframe}
                    autoRotate={autoRotate}
                    className="w-full h-full"
                  />

                  {/* Wireframe and auto-rotate controls */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <button
                      onClick={() => setAutoRotate(!autoRotate)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium backdrop-blur-md cursor-pointer ${
                        autoRotate ? 'bg-sky-600 text-white' : 'bg-slate-900/80 text-slate-300'
                      }`}
                    >
                      {autoRotate ? 'Spin: ON' : 'Spin: OFF'}
                    </button>
                    <button
                      onClick={() => setWireframe(!wireframe)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium backdrop-blur-md cursor-pointer ${
                        wireframe ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-900/80 text-slate-300'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{wireframe ? 'Shaded' : 'Wireframe'}</span>
                    </button>
                  </div>
                </div>

                {/* Material palette selector */}
                <div className="w-full mt-3 flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span>3D Material Finish:</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[
                      { id: 'kraft', name: 'Kraft', color: 'bg-amber-700' },
                      { id: 'white', name: 'White', color: 'bg-slate-100' },
                      { id: 'aluminum', name: 'Aluminum', color: 'bg-slate-300' },
                      { id: 'bagasse', name: 'Bagasse', color: 'bg-amber-200' }
                    ].map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => setFinish(mat.id as MaterialFinish)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium cursor-pointer ${
                          finish === mat.id
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${mat.color}`} />
                        <span>{mat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Guarantee Pills */}
            <div className="w-full mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 px-2">
              <span className="flex items-center gap-1 text-sky-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Real Silvassa Factory Photos
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> FSSAI Food Contact Safe
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <Truck className="w-3.5 h-3.5 text-sky-400" /> Ships within 24 Hours
              </span>
            </div>

          </div>

          {/* Right E-Commerce & Specification Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-slate-800">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  {currentProduct.subcategory}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                  In Stock ({currentProduct.stockCount} packs)
                </span>
              </div>

              {/* Product Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-['Outfit']">
                {currentProduct.name}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                {currentProduct.tagline}
              </p>

              {/* E-Commerce Price Tag */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 mb-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white font-mono">
                    ₹{currentProduct.price}
                  </span>
                  <span className="text-sm line-through text-slate-500 font-mono">
                    ₹{currentProduct.originalPrice}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                    Save {Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100)}%
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span className="font-semibold text-slate-200">{currentProduct.packSize}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">GST Input Tax Credit Available</span>
                </div>
              </div>

              {/* Pack Size / Variant Selector */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Select Size / Specification:
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-500/30'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wholesale Tier Discount Grid */}
              <div className="mb-5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-sky-400" />
                  <span>Wholesale Bulk Discount Tiers</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {currentProduct.bulkPricing.map((tier, idx) => (
                    <div key={idx} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">{tier.range}</div>
                      <div className="text-xs font-bold text-slate-100 font-mono mt-0.5">₹{tier.pricePerPack}</div>
                      <div className="text-[10px] text-sky-400 font-semibold">
                        {tier.discountPercent > 0 ? `-${tier.discountPercent}% OFF` : 'Standard'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Picker & Direct Actions */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-300">Quantity:</span>
                  <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-white min-w-[32px] text-center font-mono">
                      {quantity} {quantity === 1 ? 'pack' : 'packs'}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Total: <span className="text-white font-bold font-mono">₹{currentProduct.price * quantity}</span>
                  </span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    id="3d-add-to-cart-btn"
                    onClick={handleAddToCartClick}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      addedSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-sky-400" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    id="3d-buy-now-btn"
                    onClick={handleBuyNowClick}
                    className="py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-sky-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Specs Matrix */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>Technical Specifications</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {currentProduct.specs.map((s, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/60">
                    <div className="text-[10px] text-slate-400">{s.label}</div>
                    <div className="text-xs font-semibold text-slate-200 truncate mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
