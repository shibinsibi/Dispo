import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Truck, 
  Award, 
  Leaf, 
  Users, 
  Sparkles, 
  ArrowRight,
  Factory,
  Check
} from 'lucide-react';
import { CERTIFICATIONS, INDUSTRIES_SERVED, COMPANY_STATS } from '../data/products';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Corporate Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest rounded-full">
              Company Overview & Operations
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Leading the Packaging & Disposable Industry from <span className="text-sky-600">Silvassa</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Dispo World is a dedicated manufacturer and supply chain partner specializing in advanced food-grade packaging, eco-friendly tableware, and hygiene disposables. Founded with a vision to combine hygienic reliability with planet-friendly materials, we support over 1,000 corporate clients across hospitality, food-tech, and commercial retail.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900">Silvassa Strategic Manufacturing Hub: </span>
                  Centralized high-capacity production facility in Dadra & Nagar Haveli enabling prompt nationwide dispatch and tariff advantages.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900">Rigorous 100% Food-Grade Testing: </span>
                  Every batch of aluminum containers, ripple wall paper cups, and plastic containers adheres to stringent FDA and FSSAI standards.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900">Custom Brand Printing & Digital 3D Prototyping: </span>
                  We help emerging and established food chains convert standard packaging into distinctive brand assets with custom print runs.
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Facility Showcase Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative shadow-2xl border border-slate-800 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                  <div className="text-xs uppercase tracking-widest text-sky-400 font-semibold">Manufacturing Hub</div>
                  <div className="text-xl font-bold font-['Outfit'] mt-0.5">Silvassa Facility, India</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Factory className="w-6 h-6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                  <div className="text-2xl font-extrabold text-white font-['Outfit']">500K+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Daily Unit Capacity</div>
                </div>
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                  <div className="text-2xl font-extrabold text-white font-['Outfit']">10+ States</div>
                  <div className="text-xs text-slate-400 mt-0.5">Freight Network</div>
                </div>
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                  <div className="text-2xl font-extrabold text-sky-400 font-['Outfit']">ISO 9001</div>
                  <div className="text-xs text-slate-400 mt-0.5">Certified Partner</div>
                </div>
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                  <div className="text-2xl font-extrabold text-white font-['Outfit']">Zero Leak</div>
                  <div className="text-xs text-slate-400 mt-0.5">Purity Guarantee</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-sky-400" /> Dispatched nationwide within 48h
                </span>
                <span className="text-sky-400 font-semibold">Silvassa, D&NH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Certifications Row */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Tested, Audited & Certified Standards
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Our products undergo continuous quality checkpoints from raw granule inspection to finished box sealing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-sky-300 hover:bg-white transition-all shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{cert.name}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Industries We Serve */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-2">
              Sectors & Market Verticals
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Engineered for Diverse Commercial Applications
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              From fast-paced quick service dining to sterile healthcare protocols, Dispo World delivers purpose-built disposables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES_SERVED.map((ind, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-sky-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5 text-sky-600" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-['Outfit']">{ind.name}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
