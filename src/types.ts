export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number; // in Euros
  packSize: string; // e.g., "6-pack (330ml)"
  image: string;
  category: 'black' | 'oat' | 'flavored' | 'nitro';
  caffeineMg: number;
  roast: 'Light-Medium' | 'Medium' | 'Medium-Dark';
  origin: string;
  flavorNotes: string[];
  description: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription: boolean; // 15% discount if true
  frequency?: '2weeks' | '4weeks';
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}
