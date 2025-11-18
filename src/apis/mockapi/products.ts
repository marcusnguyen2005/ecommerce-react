import { Product } from '../../types';
import productsData from '../../data/products.json';

// Convert JSON data to Product[] with proper rating structure
const normalizeProducts = (data: any[]): Product[] => {
  return data.map((item) => ({
    ...item,
    rating: item.rating || {
      rate: item.rating_rate || 0,
      count: item.rating_count || 0,
    },
  }));
};

export const mockApi = {
  getAll: async (): Promise<Product[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return normalizeProducts(productsData);
  },

  getById: async (id: number | string): Promise<Product> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    const product = productsData.find((p: any) => String(p.id) === String(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return normalizeProducts([product])[0];
  },
};

