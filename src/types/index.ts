export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: 'gowns' | 'ethnic' | 'coords' | 'western' | 'party' | 'beauty' | 'accessories';
  categoryLabel: string;
  tag?: 'NEW ARRIVAL' | 'HAUTE COUTURE' | 'BESTSELLER' | 'LIMITED EDITION' | 'SALE';
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  description: string;
  details: {
    fabric: string;
    fit: string;
    care: string;
    origin: string;
  };
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  itemCount: number;
  image: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  season: string;
  image: string;
  model: string;
  description: string;
  hotspots: {
    x: number; // percentage from left
    y: number; // percentage from top
    productId: string;
    title: string;
    price: number;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  rating: number;
  quote: string;
  purchasedItem: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}
