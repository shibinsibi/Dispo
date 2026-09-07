import { ProductItem } from '../types';
import rippleCupStudioImg from '../assets/images/ripple_paper_cup_studio_1788767985471.jpg';
import foilContainerStudioImg from '../assets/images/aluminum_foil_container_studio_1788768002933.jpg';
import showcaseStudioImg from '../assets/images/dispo_packaging_showcase_1788767964826.jpg';

export { rippleCupStudioImg, foilContainerStudioImg, showcaseStudioImg };

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'dw-al-cont',
    name: 'Aluminum Foil Meal Containers',
    category: 'packaging',
    subcategory: 'Foil Packaging',
    tagline: 'Oven-safe, heat-retaining food containers with wrinkle-resistant rims',
    description: 'Manufactured from 100% pure food-grade virgin aluminum. Ideal for takeout gravies, biryani, baking, catering, and meal delivery. Features leak-resistant folded edges and tight foil-laminated cardboard lids.',
    material: 'Virgin Food-Grade Aluminum (Recyclable)',
    price: 420,
    originalPrice: 550,
    packSize: 'Pack of 100 pcs (with Laminated Board Lids)',
    inStock: true,
    stockCount: 850,
    rating: 4.9,
    reviewsCount: 142,
    sku: 'DW-ALM-650',
    imageUrl: foilContainerStudioImg,
    galleryUrls: [
      foilContainerStudioImg,
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'
    ],
    photo360Angles: [
      { angle: 0, label: 'Front View (0°)', url: foilContainerStudioImg, caption: 'Frontal rectangular perspective with crimp edges' },
      { angle: 45, label: '3/4 Isometric (45°)', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', caption: 'High angle showing interior depth and food volume' },
      { angle: 90, label: 'Lateral Profile (90°)', url: foilContainerStudioImg, caption: 'Side elevation showing folded vertical ribs' },
      { angle: 135, label: 'Rear Quarter (135°)', url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80', caption: 'Laminated lid closure and rim seal' },
      { angle: 180, label: 'Back Elevation (180°)', url: foilContainerStudioImg, caption: 'Exterior mirror finish and heat distribution base' },
      { angle: 225, label: 'Reverse Angle (225°)', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', caption: 'Stacking nested flutes for transport stability' },
      { angle: 270, label: 'Top-Down Rim (270°)', url: foilContainerStudioImg, caption: 'Airtight rim crimping seal test' },
      { angle: 315, label: 'Macro Texture (315°)', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', caption: '55-micron pure food-grade foil texture detail' }
    ],
    bulkPricing: [
      { range: '1 - 4 Packs', pricePerPack: 420, discountPercent: 0 },
      { range: '5 - 19 Packs', pricePerPack: 385, discountPercent: 8 },
      { range: '20+ Packs (Wholesale)', pricePerPack: 345, discountPercent: 18 }
    ],
    features: [
      'High temperature tolerance (-40°C to +280°C)',
      '100% infinitely recyclable material',
      'Leakproof crimpable edge design',
      'Locks in food aroma and moisture',
      'Microwave safe with modern certified specs'
    ],
    sizes: ['250 ml', '450 ml', '660 ml', '750 ml', '1000 ml'],
    moq: '1 Pack (100 pcs)',
    foodGrade: true,
    ecoFriendly: true,
    badge: 'Bestseller',
    threeDType: 'container',
    imagePlaceholderColor: '#94a3b8',
    iconName: 'Box',
    specs: [
      { label: 'Thickness', value: '45 - 65 Microns' },
      { label: 'Closure Type', value: 'Laminated Board Lid / Crimp Rim' },
      { label: 'Certification', value: 'ISO 9001:2015, FSSAI Food Contact' },
      { label: 'Country of Origin', value: 'Made in Silvassa, India' }
    ]
  },
  {
    id: 'dw-ripple-cup',
    name: 'Insulated Ripple Wall Paper Cups',
    category: 'tableware',
    subcategory: 'Beverage Packaging',
    tagline: 'Three-layer corrugated wall for superior heat insulation without sleeves',
    description: 'Engineered with a triple-layer thermal barrier that keeps hot beverages warm while comfortable to hold without a secondary cup sleeve. Lined with food-grade water-based or PLA coating to prevent leaks.',
    material: 'FSC Certified Kraft Board + Eco PLA Coating',
    price: 360,
    originalPrice: 480,
    packSize: 'Pack of 100 pcs (with Sipper Dome Lids)',
    inStock: true,
    stockCount: 1200,
    rating: 4.95,
    reviewsCount: 218,
    sku: 'DW-RPC-250',
    imageUrl: rippleCupStudioImg,
    galleryUrls: [
      rippleCupStudioImg,
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'
    ],
    photo360Angles: [
      { angle: 0, label: 'Front Angle (0°)', url: rippleCupStudioImg, caption: 'Frontal profile showing corrugated vertical fluting' },
      { angle: 45, label: 'Isometric 3/4 (45°)', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', caption: 'High perspective showing rim bead and steam seal' },
      { angle: 90, label: 'Profile Side (90°)', url: rippleCupStudioImg, caption: 'Double-walled thermal insulation chamber' },
      { angle: 135, label: 'Rear Perspective (135°)', url: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80', caption: 'Tight ultrasonic bottom seam preventing bottom leaks' },
      { angle: 180, label: 'Back View (180°)', url: rippleCupStudioImg, caption: 'Ergonomic tactile grip without hot spots' },
      { angle: 225, label: 'Reverse 3/4 (225°)', url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80', caption: 'Comfort-hold outer kraft wall in natural tone' },
      { angle: 270, label: 'Top Sipper Dome (270°)', url: rippleCupStudioImg, caption: 'Snap-click sipper lid with aroma air release' },
      { angle: 315, label: 'Macro Texture (315°)', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', caption: '300 GSM kraft fluting close-up inspection' }
    ],
    bulkPricing: [
      { range: '1 - 4 Packs', pricePerPack: 360, discountPercent: 0 },
      { range: '5 - 19 Packs', pricePerPack: 325, discountPercent: 10 },
      { range: '20+ Packs (Wholesale)', pricePerPack: 295, discountPercent: 18 }
    ],
    features: [
      'Triple-wall heat barrier eliminates need for sleeves',
      'Comfortable tactile grip surface',
      'Zero odor, 100% food safe ink printing',
      'Snap-tight leakproof lid compatibility',
      'Biodegradable & compostable variants available'
    ],
    sizes: ['150 ml (5 oz)', '200 ml (7 oz)', '250 ml (8 oz)', '350 ml (12 oz)'],
    moq: '1 Pack (100 pcs)',
    foodGrade: true,
    ecoFriendly: true,
    badge: 'Eco Pick',
    threeDType: 'cup',
    imagePlaceholderColor: '#b45309',
    iconName: 'Coffee',
    specs: [
      { label: 'Paper GSM', value: '300 GSM Outer + 280 GSM Inner' },
      { label: 'Lining', value: 'Food-safe aqueous barrier / PE / PLA' },
      { label: 'Color Options', value: 'Natural Kraft, Matte Black, Custom Print' },
      { label: 'Lid Options', value: 'White/Black Sipper Dome Lids' }
    ]
  },
  {
    id: 'dw-plastic-cont',
    name: 'Microwavable Airtight Containers',
    category: 'packaging',
    subcategory: 'Plastic Containers',
    tagline: 'BPA-free transparent & black containers with anti-fog snap lids',
    description: 'Designed for cloud kitchens, restaurant takeout, and meal prep companies. Features airtight snap-lock seals that prevent soup, curry, and sauce spillage during transit. Reusable and dishwasher safe.',
    material: 'Virgin Polypropylene (PP5 - 100% BPA Free)',
    price: 490,
    originalPrice: 620,
    packSize: 'Pack of 50 pcs (with Anti-Leak Snap Lids)',
    inStock: true,
    stockCount: 620,
    rating: 4.88,
    reviewsCount: 96,
    sku: 'DW-PP-750',
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    ],
    photo360Angles: [
      { angle: 0, label: 'Front Profile (0°)', url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80', caption: 'High-clarity PP5 container showing stackable lid' },
      { angle: 45, label: '3/4 High View (45°)', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', caption: 'Compartment food organization and leak test' },
      { angle: 90, label: 'Side Rim (90°)', url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80', caption: 'Click-lock hermetic seal gasket detail' },
      { angle: 180, label: 'Rear Angle (180°)', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', caption: 'Dishwasher & microwave safe thermal base' }
    ],
    bulkPricing: [
      { range: '1 - 4 Packs', pricePerPack: 490, discountPercent: 0 },
      { range: '5 - 19 Packs', pricePerPack: 445, discountPercent: 9 },
      { range: '20+ Packs (Wholesale)', pricePerPack: 399, discountPercent: 18 }
    ],
    features: [
      'Heavy-duty microwave & freezer safe (-20°C to 120°C)',
      'Ultra-secure snap closure with audible seal click',
      'Stackable nesting structure saves shelf space',
      'Clear high-clarity lid for product display',
      'Grease, oil, and acid resistant'
    ],
    sizes: ['500 ml', '650 ml', '750 ml', '1000 ml', '1200 ml'],
    moq: '1 Pack (50 pcs)',
    foodGrade: true,
    ecoFriendly: false,
    badge: 'Popular',
    threeDType: 'container',
    imagePlaceholderColor: '#0284c7',
    iconName: 'Package',
    specs: [
      { label: 'Resin Type', value: 'Food Grade Polypropylene 05' },
      { label: 'Shape', value: 'Round & Rectangular Available' },
      { label: 'Safety', value: 'BPA-Free, Phthalate-Free' },
      { label: 'Customization', value: 'In-mould labeling (IML) available' }
    ]
  },
  {
    id: 'dw-bagasse-plate',
    name: 'Sugarcane Bagasse Plates & Donas',
    category: 'tableware',
    subcategory: 'Compostable Tableware',
    tagline: '100% compostable plates, bowls, and meal trays made from sugarcane residue',
    description: 'An eco-friendly alternative to single-use plastics and paper coated with non-biodegradable polymers. Decomposes naturally within 90 days in commercial compost. Rigid, soak-proof, and suitable for heavy meals.',
    material: '100% Agricultural Sugarcane Bagasse Fiber',
    price: 390,
    originalPrice: 520,
    packSize: 'Pack of 100 pcs (9" Round Dinner Plates)',
    inStock: true,
    stockCount: 940,
    rating: 4.93,
    reviewsCount: 164,
    sku: 'DW-BAG-9R',
    imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
    ],
    photo360Angles: [
      { angle: 0, label: 'Direct Top (0°)', url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80', caption: 'Unbleached natural bagasse fibrous surface' },
      { angle: 45, label: 'Isometric Angle (45°)', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', caption: 'Deep lip prevents gravy overflow' },
      { angle: 90, label: 'Rim Profile (90°)', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', caption: 'Heat-pressed edge rigidity without bending' },
      { angle: 180, label: 'Underside Flutes (180°)', url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80', caption: 'Natural biodegradable compostable grain' }
    ],
    bulkPricing: [
      { range: '1 - 4 Packs', pricePerPack: 390, discountPercent: 0 },
      { range: '5 - 19 Packs', pricePerPack: 350, discountPercent: 10 },
      { range: '20+ Packs (Wholesale)', pricePerPack: 315, discountPercent: 19 }
    ],
    features: [
      'Commercial & home compostable within 90 days',
      'Oil & water resistant up to 100°C',
      'Zero plastic, wax, or toxic chemical binders',
      'Sturdy structure does not bend under gravies',
      'Natural unbleached bamboo/sugarcane beige finish'
    ],
    sizes: ['6" Dona Bowl', '7" Snack Plate', '9" Round Dinner', '10" 3-Compartment', '12" 5-Compartment'],
    moq: '1 Pack (100 pcs)',
    foodGrade: true,
    ecoFriendly: true,
    badge: '100% Compostable',
    threeDType: 'box',
    imagePlaceholderColor: '#65a30d',
    iconName: 'Utensils',
    specs: [
      { label: 'Biodegradability', value: 'EN 13432 & ASTM D6400 Certified' },
      { label: 'Temperature Range', value: '-20°C to 120°C' },
      { label: 'Shelf Life', value: '24 Months in dry storage' },
      { label: 'Origin', value: 'Renewable Agri-waste by-product' }
    ]
  },
  {
    id: 'dw-kraft-bags',
    name: 'Heavy-Duty Kraft Paper Carry Bags',
    category: 'packaging',
    subcategory: 'Paper Bags',
    tagline: 'Twisted handle retail and food delivery bags with reinforced bottoms',
    description: 'Sustainably sourced brown kraft and bleached white paper carrier bags designed for high tear strength. Reinforced bottom gusset stands upright independently for quick packing in busy retail stores and restaurants.',
    material: 'Sustainably Sourced Virgin Kraft Paper (FSC Certified)',
    price: 550,
    originalPrice: 720,
    packSize: 'Pack of 100 pcs (Medium 10x5x13")',
    inStock: true,
    stockCount: 500,
    rating: 4.87,
    reviewsCount: 78,
    sku: 'DW-KBG-M10',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
    ],
    photo360Angles: [
      { angle: 0, label: 'Front (0°)', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', caption: 'Virgin brown kraft bag with twisted handle cord' },
      { angle: 45, label: 'Gusset Corner (45°)', url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80', caption: 'Reinforced bottom patch tested up to 8kg load' }
    ],
    bulkPricing: [
      { range: '1 - 4 Packs', pricePerPack: 550, discountPercent: 0 },
      { range: '5 - 19 Packs', pricePerPack: 495, discountPercent: 10 },
      { range: '20+ Packs (Wholesale)', pricePerPack: 440, discountPercent: 20 }
    ],
    features: [
      'Reinforced twisted paper handle with strong glued patch',
      'Stands upright easily with block bottom design',
      'Supports up to 5-10 kg payload without tearing',
      'Non-toxic water-based food-safe inks for branding',
      '100% recyclable with regular paper waste'
    ],
    sizes: ['Small (8x4x10")', 'Medium (10x5x13")', 'Large (12x6x16")', 'Takeaway Flat (11x8x12")'],
    moq: '1 Pack (100 pcs)',
    foodGrade: true,
    ecoFriendly: true,
    badge: 'Eco Choice',
    threeDType: 'box',
    imagePlaceholderColor: '#d97706',
    iconName: 'ShoppingBag',
    specs: [
      { label: 'GSM Options', value: '80 GSM, 100 GSM, 120 GSM' },
      { label: 'Handle Type', value: 'Twisted Paper Cord / Flat Folded' },
      { label: 'Printing', value: 'Up to 4-color Flexographic Printing' },
      { label: 'Load Capacity', value: 'Up to 10 kg tested' }
    ]
  },
  {
    id: 'dw-foil-rolls',
    name: 'Commercial Aluminum Foil & Cling Film Rolls',
    category: 'packaging',
    subcategory: 'Kitchen Rolls',
    tagline: 'High-grade commercial packaging rolls with built-in slide cutter boxes',
    description: 'Essential for commercial catering kitchens, bakeries, and cloud kitchens. Heavy-duty aluminum foil preserves heat and seals freshness, while premium PVC/PE cling film provides high cling and puncture resistance.',
    material: 'Pure Food-Grade Aluminum / High-Cling Stretch PE',
    price: 480,
    originalPrice: 640,
    packSize: '1 Industrial Heavy Roll (72m x 300mm with Slide Cutter)',
    inStock: true,
    stockCount: 380,
    rating: 4.9,
    reviewsCount: 112,
    sku: 'DW-AFL-72M',
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    ],
    photo360Angles: [
      { angle: 0, label: 'Dispenser Front (0°)', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80', caption: 'Heavy duty dispenser carton with safety slide cutter' },
      { angle: 90, label: 'Core Side (90°)', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80', caption: '18-micron commercial thickness roll profile' }
    ],
    bulkPricing: [
      { range: '1 - 5 Rolls', pricePerPack: 480, discountPercent: 0 },
      { range: '6 - 24 Rolls', pricePerPack: 430, discountPercent: 10 },
      { range: '25+ Rolls (Wholesale)', pricePerPack: 385, discountPercent: 20 }
    ],
    features: [
      'Heavy-duty commercial thickness prevents tearing',
      'Ergonomic dispensing box with stainless sliding cutter',
      'Provides complete oxygen, aroma, and light barrier',
      'Uniform unrolling without crinkling or snagging',
      'Temperature resistant for roasting, wrapping, and freezing'
    ],
    sizes: ['9 Meters', '18 Meters', '72 Meters Industrial', '1 Kg Roll', '300mm x 300m Cling'],
    moq: '1 Roll',
    foodGrade: true,
    ecoFriendly: true,
    badge: 'Commercial Grade',
    threeDType: 'foil',
    imagePlaceholderColor: '#64748b',
    iconName: 'Scroll',
    specs: [
      { label: 'Foil Thickness', value: '11 to 18 Microns' },
      { label: 'Width Options', value: '300 mm (12") and 450 mm (18")' },
      { label: 'Core Diameter', value: 'Standard 1.5" & 3" Cardboard Core' },
      { label: 'Safety', value: 'Direct food contact certified' }
    ]
  },
  {
    id: 'dw-wooden-cutlery',
    name: 'Natural Birchwood Cutlery & Stirrers',
    category: 'tableware',
    subcategory: 'Wooden Tableware',
    tagline: 'Smooth, splinter-free disposable wooden spoons, forks, knives, and stirrers',
    description: 'Made from sustainably harvested FSC-certified natural birchwood. Smooth polished edges ensure comfortable dining without chemical coatings, bleaching, or splinters. Ideal replacement for banned plastic cutlery.',
    material: '100% Solid Birchwood (Chemical-Free)',
    price: 280,
    originalPrice: 380,
    packSize: 'Pack of 100 pcs (160mm Dessert & Meal Spoons)',
    inStock: true,
    stockCount: 1450,
    rating: 4.86,
    reviewsCount: 130,
    sku: 'DW-WOD-160',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80'
    ],
    photo360Angles: [
      { angle: 0, label: 'Cutlery Trio (0°)', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', caption: 'Spoon, fork and knife set in smooth birchwood' }
    ],
    bulkPricing: [
      { range: '1 - 4 Packs', pricePerPack: 280, discountPercent: 0 },
      { range: '5 - 19 Packs', pricePerPack: 250, discountPercent: 11 },
      { range: '20+ Packs (Wholesale)', pricePerPack: 220, discountPercent: 21 }
    ],
    features: [
      'Heat-pressed for ergonomic curve and rigidity',
      'Tumbled and polished for splinter-free dining',
      'Naturally biodegradable in backyard compost',
      'Individually paper-wrapped hygiene options',
      'Resistant to snapping and heat bending'
    ],
    sizes: ['140 mm Spoon', '160 mm Spoon/Fork', '165 mm Knife', '110 mm Coffee Stirrer'],
    moq: '1 Pack (100 pcs)',
    foodGrade: true,
    ecoFriendly: true,
    badge: '100% Natural',
    threeDType: 'box',
    imagePlaceholderColor: '#a16207',
    iconName: 'Sparkles',
    specs: [
      { label: 'Wood Grade', value: 'Grade A Kiln-dried Birchwood' },
      { label: 'Packaging', value: 'Bulk 1000s or Paper Sealed 4-in-1 Kit' },
      { label: 'Decomposition', value: '60 - 90 Days in standard soil' },
      { label: 'Finish', value: 'Chemical-free natural wax buffed' }
    ]
  },
  {
    id: 'dw-gloves',
    name: 'Food-Safe Nitrile & Latex Gloves',
    category: 'hygiene',
    subcategory: 'Hand Protection',
    tagline: 'Powder-free tactile disposable gloves for food handling, healthcare & hygiene',
    description: 'Manufactured for high sensitivity, puncture resistance, and non-allergenic food contact. Textured fingertips offer reliable grip in wet and oily kitchen environments. Ambidextrous with beaded cuff for easy donning.',
    material: 'Medical-Grade Nitrile & Vinyl Elastomer (Powder-Free)',
    price: 450,
    originalPrice: 600,
    packSize: 'Dispenser Box of 100 pcs (Medium / Blue)',
    inStock: true,
    stockCount: 880,
    rating: 4.92,
    reviewsCount: 154,
    sku: 'DW-NTR-BLU',
    imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80'
    ],
    photo360Angles: [
      { angle: 0, label: 'Front (0°)', url: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80', caption: 'Medical-grade AQL 1.5 powder-free blue nitrile glove' }
    ],
    bulkPricing: [
      { range: '1 - 4 Boxes', pricePerPack: 450, discountPercent: 0 },
      { range: '5 - 19 Boxes', pricePerPack: 405, discountPercent: 10 },
      { range: '20+ Boxes (Wholesale)', pricePerPack: 360, discountPercent: 20 }
    ],
    features: [
      '100% latex-free nitrile options prevent skin allergies',
      'Micro-textured fingertips for secure utensil handling',
      'Beaded cuff prevents roll-down during vigorous work',
      'Certified for food contact and chemical splash safety',
      'Available in Medical Blue, Clean White, and Chef Black'
    ],
    sizes: ['Small (S)', 'Medium (M)', 'Large (L)', 'Extra Large (XL)'],
    moq: '1 Box (100 pcs)',
    foodGrade: true,
    ecoFriendly: false,
    badge: 'Safety Certified',
    threeDType: 'glove',
    imagePlaceholderColor: '#2563eb',
    iconName: 'ShieldCheck',
    specs: [
      { label: 'AQL Level', value: 'AQL 1.5 Medical Grade' },
      { label: 'Box Packing', value: '100 pieces per dispenser box' },
      { label: 'Tensile Strength', value: '>= 14 MPa min elongation 500%' },
      { label: 'Standard', value: 'EN 455, ASTM D6319, FDA 21 CFR' }
    ]
  },
  {
    id: 'dw-bouffant-caps',
    name: 'Disposable Elastic Bouffant Caps',
    category: 'hygiene',
    subcategory: 'Head Wear',
    tagline: 'Lightweight breathable non-woven head covers for commercial kitchens & labs',
    description: 'Essential hair containment gear for food processing plants, restaurant kitchens, pharmaceutical labs, and hospitals. Made from spunbond polypropylene that breathes easily while securely holding hair in place.',
    material: 'Spunbond Non-Woven Polypropylene (10 - 14 GSM)',
    price: 190,
    originalPrice: 260,
    packSize: 'Pack of 100 pcs (21" Medical Blue)',
    inStock: true,
    stockCount: 1600,
    rating: 4.82,
    reviewsCount: 65,
    sku: 'DW-BFC-100',
    imageUrl: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=800&q=80'
    ],
    photo360Angles: [
      { angle: 0, label: 'Front (0°)', url: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=800&q=80', caption: 'Elastic spunbond breathable bouffant cap' }
    ],
    bulkPricing: [
      { range: '1 - 4 Packs', pricePerPack: 190, discountPercent: 0 },
      { range: '5 - 19 Packs', pricePerPack: 170, discountPercent: 11 },
      { range: '20+ Packs (Wholesale)', pricePerPack: 150, discountPercent: 21 }
    ],
    features: [
      'Soft double-stitched elastic band for comfortable fit',
      'Breathable spunbond fabric prevents heat buildup',
      'Compact strip packaging opens into generous dome',
      'Lint-free and water repellent',
      'Available in Medical Blue, Clean White, and Green'
    ],
    sizes: ['18 Inch', '21 Inch', '24 Inch (Large volume hair)'],
    moq: '1 Pack (100 pcs)',
    foodGrade: true,
    ecoFriendly: false,
    badge: 'Essential',
    threeDType: 'glove',
    imagePlaceholderColor: '#0ea5e9',
    iconName: 'Award',
    specs: [
      { label: 'Weight', value: '12 GSM Virgin Spunbond' },
      { label: 'Packing', value: '100 pcs/polybag, 1000 pcs/carton' },
      { label: 'Elastic', value: 'Latex-free double elastic band' },
      { label: 'Application', value: 'HACCP & GMP compliant facility gear' }
    ]
  },
  {
    id: 'dw-garbage-bags',
    name: 'Heavy-Duty Biodegradable Garbage Bags',
    category: 'packaging',
    subcategory: 'Waste Management',
    tagline: 'Puncture-proof oxo-biodegradable trash bags with star-sealed bottoms',
    description: 'Engineered for commercial hotel waste, restaurant wet kitchen scraps, and office sanitation. Star-sealed bottom evenly distributes waste weight and eliminates leakages even with moist food debris.',
    material: 'Recycled & Bio-based Polyethylene with D2W additive',
    price: 320,
    originalPrice: 420,
    packSize: 'Pack of 3 Rolls (90 Bags Total, 24 x 32" Medium)',
    inStock: true,
    stockCount: 720,
    rating: 4.84,
    reviewsCount: 88,
    sku: 'DW-GBG-MED',
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80'
    ],
    photo360Angles: [
      { angle: 0, label: 'Roll (0°)', url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80', caption: 'Puncture-proof star sealed garbage bag roll' }
    ],
    bulkPricing: [
      { range: '1 - 4 Packs', pricePerPack: 320, discountPercent: 0 },
      { range: '5 - 19 Packs', pricePerPack: 290, discountPercent: 9 },
      { range: '20+ Packs (Wholesale)', pricePerPack: 260, discountPercent: 19 }
    ],
    features: [
      'Star-sealed leak-proof bottom construction',
      'High dart-drop puncture resistance against bones & edges',
      'Convenient tear-off perforated roll dispensing',
      'Heavy-load capacity from 5 kg to 35 kg',
      'Color-coded for bio-waste segregation (Black, Blue, Green)'
    ],
    sizes: ['19 x 21" (Small/Pedal Bin)', '24 x 32" (Medium)', '30 x 50" (Heavy Jumbo)'],
    moq: '1 Pack (3 Rolls)',
    foodGrade: false,
    ecoFriendly: true,
    badge: 'Heavy Duty',
    threeDType: 'box',
    imagePlaceholderColor: '#334155',
    iconName: 'Trash2',
    specs: [
      { label: 'Micron Rating', value: '25 to 55 Microns heavy gauge' },
      { label: 'Bottom Seal', value: 'Star bottom 8-fold gusset' },
      { label: 'Packaging', value: '30 pcs / roll or 50 pcs / roll' },
      { label: 'Segregation', value: 'Wet (Green), Dry (Blue), General (Black)' }
    ]
  },
  {
    id: 'dw-takeout-box',
    name: 'Paper Noodle & Food Pail Boxes',
    category: 'packaging',
    subcategory: 'Fast Food Packaging',
    tagline: 'Folded leakproof food pails for noodles, gravies, rice, and snacks',
    description: 'Traditional wire-handle or tab-lock paper pails created with one-piece folded leakproof construction. Perfect for Asian cuisine, fried appetizers, salads, and rice bowls. Retains steam while venting excess moisture.',
    material: 'Pure Bleached / Unbleached Virgin Kraft Paperboard',
    price: 520,
    originalPrice: 680,
    packSize: 'Pack of 100 pcs (26 oz / 750 ml)',
    inStock: true,
    stockCount: 650,
    rating: 4.89,
    reviewsCount: 104,
    sku: 'DW-PAIL-750',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'
    ],
    photo360Angles: [
      { angle: 0, label: 'Pail Front (0°)', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', caption: 'One-piece seamless leakproof food pail' }
    ],
    bulkPricing: [
      { range: '1 - 4 Packs', pricePerPack: 520, discountPercent: 0 },
      { range: '5 - 19 Packs', pricePerPack: 470, discountPercent: 10 },
      { range: '20+ Packs (Wholesale)', pricePerPack: 420, discountPercent: 19 }
    ],
    features: [
      'One-piece seamless fold ensures no corner leaks',
      'Micro-venting flap design prevents soggy food',
      'Heat insulating construction stays comfortable to hold',
      'Optional wire handle or self-locking tab lid',
      'Custom printing with up to 6 high-definition colors'
    ],
    sizes: ['16 oz (500 ml)', '26 oz (750 ml)', '32 oz (1000 ml)'],
    moq: '1 Pack (100 pcs)',
    foodGrade: true,
    ecoFriendly: true,
    badge: 'Customizable',
    threeDType: 'box',
    imagePlaceholderColor: '#ea580c',
    iconName: 'Layers',
    specs: [
      { label: 'Board Caliper', value: '320 GSM SBS Board' },
      { label: 'Interior Barrier', value: 'Water-based barrier / PE greaseproof' },
      { label: 'Assembly', value: 'Pre-assembled ready to pack' },
      { label: 'Heat Index', value: 'Safe up to 100°C' }
    ]
  },
  {
    id: 'dw-custom-print',
    name: 'Custom Brand-Printed Packaging Starter Kit',
    category: 'custom',
    subcategory: 'Bespoke Branding',
    tagline: 'Your logo, custom colors, and dimensions across cups, bags, and meal boxes',
    description: 'Transform your takeout packaging into a walking billboard for your brand. We offer end-to-end custom flexographic and offset printing with low minimum order quantities, complimentary 3D mockup design, and rapid delivery.',
    material: 'Applicable across Kraft, Bagasse, Paper & Plastics',
    price: 2500,
    originalPrice: 3200,
    packSize: 'Proofing + 3D Virtual Prototype + Pre-Production Batch Deposit',
    inStock: true,
    stockCount: 100,
    rating: 4.98,
    reviewsCount: 240,
    sku: 'DW-CST-PRN',
    imageUrl: showcaseStudioImg,
    galleryUrls: [
      showcaseStudioImg,
      rippleCupStudioImg,
      foilContainerStudioImg
    ],
    photo360Angles: [
      { angle: 0, label: 'Full Collection (0°)', url: showcaseStudioImg, caption: 'Custom branded coffee cups, bags, foil containers, and cutlery' }
    ],
    bulkPricing: [
      { range: 'Starter Proofing', pricePerPack: 2500, discountPercent: 0 },
      { range: 'Production Run (2,500+ pcs)', pricePerPack: 2200, discountPercent: 12 },
      { range: 'Franchise Fleet (10,000+ pcs)', pricePerPack: 1950, discountPercent: 22 }
    ],
    features: [
      'Low MOQ starting from just 2,500 pieces for print runs',
      'Complimentary packaging structural & graphic design support',
      'Food-safe, odor-free certified soy and water-based inks',
      'Spot UV, foil stamping, and embossed textures available',
      'Pan-India consolidated distribution and storage support'
    ],
    sizes: ['All Standard & Custom Sizes Tailored to You'],
    moq: '1 Custom Batch',
    foodGrade: true,
    ecoFriendly: true,
    badge: 'Custom Made',
    threeDType: 'cup',
    imagePlaceholderColor: '#059669',
    iconName: 'Sparkles',
    specs: [
      { label: 'Ink Type', value: 'Soy-based & Aqueous Food Safe' },
      { label: 'Turnaround', value: '10 - 14 Business Days after proof approval' },
      { label: 'Design Proofing', value: 'Interactive 3D digital mockup included' },
      { label: 'Sampling', value: 'Physical pre-production sample on request' }
    ]
  }
];

export const COMPANY_STATS = [
  { label: 'Happy Clients', value: '1,000+', icon: 'Users' },
  { label: 'Years in Industry', value: '5+ Years', icon: 'Award' },
  { label: 'States Distributed', value: '10+ States', icon: 'MapPin' },
  { label: 'Quality Assurance', value: '100% Certified', icon: 'ShieldCheck' }
];

export const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', desc: 'Quality Management Systems Certified Partner', icon: 'ShieldCheck' },
  { name: 'FSSAI Food Contact', desc: '100% Food-Grade Virgin Raw Materials', icon: 'CheckCircle2' },
  { name: 'EN 13432 Compostable', desc: 'Industrial & Home Compostable Biodegradable Lines', icon: 'Leaf' },
  { name: 'FSC Certified Paper', desc: 'Responsibly Managed Forest Fiber Sourcing', icon: 'Trees' }
];

export const INDUSTRIES_SERVED = [
  {
    name: 'Restaurants & QSRs',
    desc: 'Leakproof meal boxes, takeout bags, and portion containers for high-volume dining.',
    icon: 'UtensilsCrossed'
  },
  {
    name: 'Cloud Kitchens & Food-Tech',
    desc: 'Spill-free, tamper-evident containers engineered for delivery bikes and fast packing.',
    icon: 'Flame'
  },
  {
    name: 'Hotels, Cafes & Catering',
    desc: 'Aesthetic ripple wall cups, premium birchwood cutlery, and banquet section trays.',
    icon: 'Coffee'
  },
  {
    name: 'Hospitals & Healthcare',
    desc: 'Hygienic disposable gloves, surgical bouffant caps, and sanitized dining disposables.',
    icon: 'HeartPulse'
  },
  {
    name: 'Retail & Supermarkets',
    desc: 'Wholesale branded paper carrier bags, cling rolls, garbage bags, and counter items.',
    icon: 'Store'
  },
  {
    name: 'Corporate Events & Banquets',
    desc: 'Eco-friendly biodegradable bagasse tableware reducing cleanup time and environmental footprint.',
    icon: 'Building2'
  }
];
