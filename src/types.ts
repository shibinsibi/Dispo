export type ProductCategory = 'all' | 'packaging' | 'tableware' | 'hygiene' | 'custom';

export interface ProductItem {
  id: string;
  name: string;
  category: 'packaging' | 'tableware' | 'hygiene' | 'custom';
  subcategory: string;
  tagline: string;
  description: string;
  material: string;
  features: string[];
  sizes: string[];
  moq: string; // Minimum Order Quantity
  foodGrade: boolean;
  ecoFriendly: boolean;
  badge?: string;
  threeDType: 'cup' | 'container' | 'box' | 'foil' | 'glove';
  imagePlaceholderColor: string;
  iconName: string;
  
  // E-commerce Fields
  price: number; // in INR ₹
  originalPrice: number;
  packSize: string; // e.g. "Pack of 100 pcs"
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  sku: string;
  imageUrl: string;
  galleryUrls: string[];
  photo360Angles: {
    angle: number;
    label: string;
    url: string;
    caption: string;
  }[];
  bulkPricing: {
    range: string;
    pricePerPack: number;
    discountPercent: number;
  }[];

  specs: {
    label: string;
    value: string;
  }[];
}

export interface CartItem {
  product: ProductItem;
  quantity: number; // Number of packs
  selectedSize: string;
  pricePerPack: number;
}

export interface OrderCustomerInfo {
  name: string;
  email: string;
  phone: string;
  company?: string;
  gstin?: string;
}

export interface OrderShippingAddress {
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderSummary {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  gst: number;
  shipping: number;
  total: number;
  customer: OrderCustomerInfo;
  shippingAddress: OrderShippingAddress;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod' | 'invoice';
  createdAt: string;
  estimatedDelivery: string;
}

export interface QuoteItem {
  product: ProductItem;
  quantity: number;
  size: string;
  notes?: string;
}

export type MaterialFinish = 'kraft' | 'white' | 'aluminum' | 'bagasse';

