import React from 'react';
import { 
  Leaf, 
  Recycle, 
  Sun, 
  Droplets, 
  CheckCircle2, 
  ArrowRight, 
  Trees, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface SustainabilitySectionProps {
  onExploreEco: () => void;
}

export const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({ onExploreEco }) => {
  const steps = [
    {
      num: '01',
      title: 'Agricultural Upcycling',
      desc: 'We repurpose sugarcane bagasse fiber and agri-residues that would otherwise be burned in fields.',
      icon: '🌾'
    },
    {
      num: '02',
      title: 'Non-Toxic Molding',
      desc: 'Heat-pressed with zero plastic binders, waxes, PFAS, or harmful chemicals. 100% food-safe.',
      icon: '⚙️'
    },
    {
      num: '03',
      title: 'Durable Commercial Use',
      desc: 'Handles piping hot gravies, oven baking, and freezing down to -20°C without leaking.',
      icon: '🍲'
    },
    {
      num: '04',
      title: 'Compost in 90 Days',
      desc: 'Decomposes naturally in commercial composting or soil within 90 days, returning as organic fertilizer.',
      icon: '🌱'
    }
  ];

  return (
    <section id="sustainability" className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-widest mb-4">
            Sustainable Packaging Initiative
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Protecting Your Food & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300">Preserving Our Planet</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Dispo World actively assists food brands, hotel chains, and catering organizations in transitioning from single-use plastics to certified compostable bagasse, recyclable aluminum, and responsibly sourced kraft paper.
          </p>
        </div>

        {/* 4-Step Circular Life Cycle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 relative flex flex-col justify-between hover:border-sky-500/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                    Step {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2 group-hover:text-sky-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1 text-[11px] text-sky-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Microplastic Residue</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comparative Impact Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl font-bold text-white font-['Outfit']">
                Why Switch from Conventional Plastics to Dispo Eco Lines?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Traditional plastic cutlery and foam containers linger in landfills for upwards of 400 years, leaching petrochemicals into soil. Our sugarcane bagasse tableware and water-barrier paper cups breakdown cleanly in commercial and home compost systems without harming flora or fauna.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
                  <div className="text-xl font-bold text-sky-400 font-mono">90 Days</div>
                  <div className="text-xs text-slate-400 mt-0.5">Full Compost Time</div>
                </div>
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
                  <div className="text-xl font-bold text-sky-400 font-mono">100% FSC</div>
                  <div className="text-xs text-slate-400 mt-0.5">Ethical Pulp Sourcing</div>
                </div>
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 col-span-2 sm:col-span-1">
                  <div className="text-xl font-bold text-sky-400 font-mono">0% Plastic</div>
                  <div className="text-xs text-slate-400 mt-0.5">Pure Natural Fibers</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-2xl border border-sky-500/20 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Recycle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Request an Eco Transition Consultation
              </h4>
              <p className="text-xs text-slate-300">
                Let our packaging engineers analyze your existing takeout packaging and propose cost-neutral compostable alternatives.
              </p>
              <button
                id="eco-consult-btn"
                onClick={onExploreEco}
                className="w-full py-3 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Browse Eco-Friendly Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
