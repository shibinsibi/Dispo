import React, { useState } from 'react';
import { ThreeCanvas } from './ThreeCanvas';
import { MaterialFinish } from '../types';
import { 
  ArrowRight, 
  Rotate3d, 
  ShieldCheck, 
  Leaf, 
  CheckCircle2, 
  Sparkles, 
  Download,
  Building2,
  Users,
  Compass,
  Award
} from 'lucide-react';
import { COMPANY_STATS } from '../data/products';

interface HeroProps {
  onExploreProducts: () => void;
  onOpen3DStudio: () => void;
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  onOpen3DStudio,
  onRequestQuote
}) => {
  const [heroModel, setHeroModel] = useState<'cup' | 'container' | 'box'>('container');
  const [heroFinish, setHeroFinish] = useState<MaterialFinish>('aluminum');

  return (
    <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-sky-50">
      {/* Subtle background decorative shapes matching Sleek Interface */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-sky-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition & Headings (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Tag - Sleek Interface style */}
            <div className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest rounded-full shadow-xs">
              Direct Manufacturer & Wholesale Exporter • Silvassa, India
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Next-Gen <span className="text-sky-600">Disposable & Packaging</span> Solutions.
            </h1>

            {/* Subhead */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              From leakproof aluminum meal containers and triple-wall ripple cups to 100% biodegradable bagasse tableware and hygiene essentials. Manufactured with certified food-grade precision for cloud kitchens, restaurants, and retail chains.
            </p>

            {/* Value Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>100% Food-Grade & FSSAI Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>ISO 9001:2015 Manufacturing Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>Eco-Friendly & Recyclable Options</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>Custom Logo Printing & Bulk Pricing</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="hero-explore-products-btn"
                onClick={onExploreProducts}
                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-3d-studio-btn"
                onClick={onOpen3DStudio}
                className="px-6 py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-200 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Rotate3d className="w-4 h-4" />
                <span>Interactive 3D Studio</span>
              </button>

              <button
                id="hero-request-quote-btn"
                onClick={onRequestQuote}
                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Our Standards & RFQ</span>
              </button>
            </div>

            {/* Trust Quote / Quick Metric Banner */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">1,000+</span>
                <span>Active Business Clients</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">10+ States</span>
                <span>Pan-India Distribution</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-2 text-sky-700 font-medium">
                <Leaf className="w-3.5 h-3.5 text-sky-600" />
                <span>Eco-Certified Lines</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Feature Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* 3D Showcase Card with sleek elevated shadow */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] p-4 sm:p-6 relative backdrop-blur-sm overflow-hidden">
              
              {/* Card Header with 3D Status */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                    <Rotate3d className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Live 3D Product Model
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Touch / drag to rotate 360°
                    </p>
                  </div>
                </div>

                {/* Model switcher buttons */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                  <button
                    onClick={() => { setHeroModel('container'); setHeroFinish('aluminum'); }}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      heroModel === 'container' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Foil Tray
                  </button>
                  <button
                    onClick={() => { setHeroModel('cup'); setHeroFinish('kraft'); }}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      heroModel === 'cup' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Ripple Cup
                  </button>
                  <button
                    onClick={() => { setHeroModel('box'); setHeroFinish('bagasse'); }}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      heroModel === 'box' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Meal Box
                  </button>
                </div>
              </div>

              {/* 3D Canvas Viewport */}
              <div className="h-[290px] sm:h-[320px] w-full rounded-2xl bg-gradient-to-b from-slate-50 to-sky-50/50 my-3 relative overflow-hidden border border-slate-100 flex items-center justify-center">
                <ThreeCanvas
                  modelType={heroModel}
                  finish={heroFinish}
                  wireframe={false}
                  autoRotate={true}
                  className="w-full h-full"
                  cameraDistance={3.8}
                />

                {/* Gesture hint */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-slate-600 border border-slate-200/60 shadow-xs flex items-center gap-1.5 pointer-events-none">
                  <Compass className="w-3 h-3 text-sky-600" />
                  <span>Interactive WebGL 3D</span>
                </div>

                <div className="absolute top-3 right-3 bg-sky-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                  {heroModel === 'container' ? 'Heavy-Duty Foil' : heroModel === 'cup' ? 'Ripple Insulation' : 'Compostable'}
                </div>
              </div>

              {/* Card Footer with Quick Specs */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
                <div>
                  <span className="font-semibold text-slate-900">
                    {heroModel === 'container' ? 'Aluminum Foil Container' : heroModel === 'cup' ? 'Ripple Wall Kraft Cup' : 'Sugarcane Bagasse Meal Box'}
                  </span>
                  <p className="text-[11px] text-slate-500">
                    {heroModel === 'container' ? 'Oven & Leakproof crimped seal' : heroModel === 'cup' ? 'No sleeve required • Heat barrier' : '100% Biodegradable in 90 days'}
                  </p>
                </div>

                <button
                  onClick={onOpen3DStudio}
                  className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Full 3D Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>

            {/* Decorative Floating Metric Card */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xl items-center gap-3 animate-bounce-slight">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">100% Quality Assured</div>
                <div className="text-[11px] text-slate-500">Tested raw materials & clean packaging</div>
              </div>
            </div>

          </div>

        </div>

        {/* Global Statistics Ribbon */}
        <div className="mt-16 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          {COMPANY_STATS.map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
                {idx === 0 && <Users className="w-5 h-5" />}
                {idx === 1 && <Award className="w-5 h-5" />}
                {idx === 2 && <Building2 className="w-5 h-5" />}
                {idx === 3 && <ShieldCheck className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 font-['Outfit']">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
