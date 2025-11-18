import { supabase } from './client';
import { Product } from '../../types';

const TABLE_NAME = 'product1';

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error fetching products:', error.message);
      throw error;
    }
    
    return data || [];
  },

  getById: async (id: number): Promise<Product | null> => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching product:', error.message);
      throw error;
    }
    
    return data;
  },

  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([product])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating product:', error.message);
      throw error;
    }
    
    return data;
  },

  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(product)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating product:', error.message);
      throw error;
    }
    
    return data;
  },

  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error.message);
      throw error;
    }
  },
};

