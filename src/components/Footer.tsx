import React from 'react';
import { 
  Package, 
  Rotate3d, 
  Leaf, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  Download,
  FileCheck
} from 'lucide-react';

interface FooterProps {
  onOpenCatalogModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCatalogModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadBrochure = () => {
    // Generate brochure summary download
    const brochureText = `DISPO WORLD - PRODUCT CATALOGUE & SPECIFICATION GUIDE
Website: https://dispo-world.com/
Headquarters: Industrial Area, Silvassa, Dadra and Nagar Haveli, India
Helpline: +91 98795 00000 | Email: contact@dispo-world.com

PRODUCT CATEGORIES:
1. Food Packaging:
   - Aluminum Foil Meal Containers (250ml - 1000ml)
   - Microwavable Airtight Snap Containers (Round & Rectangular)
   - Heavy-Duty Kraft Paper Carry Bags (Twisted Handle)
   - Commercial Kitchen Aluminum Foil & Cling Film Rolls
   - Paper Noodle & Meal Pails
   - Biodegradable Garbage Bags

2. Tableware & Dining Disposables:
   - Insulated Ripple Wall & Double Wall Paper Cups
   - 100% Compostable Sugarcane Bagasse Plates & Bowls (Donas)
   - Natural Birchwood Cutlery Sets & Coffee Stirrers

3. Hygiene & Safety:
   - Food-Safe Powder-Free Nitrile & Latex Gloves (AQL 1.5)
   - Disposable Spunbond Bouffant Caps (18" & 21")
   - 3-Ply Protective Face Masks

CERTIFICATIONS:
- ISO 9001:2015 Certified Partner
- FSSAI Food Contact Safe & FDA Compliant
- EN 13432 & ASTM D6400 Biodegradable Standards

Contact sales@dispo-world.com for wholesale pricing and customized print runs.`;

    const blob = new Blob([brochureText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Dispo_World_Product_Brochure.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-md">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white font-['Outfit']">
                  DISPO<span className="text-sky-400">WORLD</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                  Packaging & Disposable Solutions
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Dispo World is a leading manufacturer and trader of premium disposable packaging and tableware products based in Silvassa, Dadra and Nagar Haveli, India. Dedicated to food-grade excellence, environmental sustainability, and wholesale reliability.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-sky-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> ISO 9001:2015 Partner
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-sky-400 flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5" /> 100% Food Grade FSSAI
              </span>
            </div>

            <div className="pt-2">
              <button
                id="footer-download-brochure-btn"
                onClick={handleDownloadBrochure}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Download Specification Sheet (.txt)</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollTo('products')} className="hover:text-sky-400 transition-colors cursor-pointer">
                  Product Catalog
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('3d-studio')} className="hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <Rotate3d className="w-3 h-3 text-sky-400" />
                  <span>3D Inspection Studio</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-sky-400 transition-colors cursor-pointer">
                  About Dispo World
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('sustainability')} className="hover:text-sky-400 transition-colors cursor-pointer">
                  Eco & Sustainability
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-sky-400 transition-colors cursor-pointer">
                  Contact & Bulk RFQ
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Product Lines
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Aluminum Foil Containers</li>
              <li>Ripple Wall Paper Cups</li>
              <li>Microwavable Food Tubs</li>
              <li>Bagasse Plates & Donas</li>
              <li>Birchwood Cutlery Sets</li>
              <li>Nitrile & Vinyl Gloves</li>
              <li>Commercial Foil & Cling Rolls</li>
              <li>Twisted Handle Kraft Bags</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Silvassa Hub & Sales
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Industrial Area, Silvassa, Dadra and Nagar Haveli - 396230, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <a href="tel:+919879500000" className="hover:text-white transition-colors">
                  +91 (Silvassa Sales Desk)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <a href="mailto:contact@dispo-world.com" className="hover:text-white transition-colors">
                  contact@dispo-world.com
                </a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              Supply depots & distribution serving 10+ states across India.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Dispo World (dispo-world.com). All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">Official Redesigned Experience</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
