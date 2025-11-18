export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number | string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  onSale?: boolean;
  description?: string;
  category?: string;
  categories?: string[];
  image: string;
  rating?: Rating;
  rating_rate?: number;
  rating_count?: number;
}

