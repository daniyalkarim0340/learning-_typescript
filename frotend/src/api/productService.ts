import apiClient from './apiClient.js';
import { IProduct, CreateProductDto, UpdateProductDto } from './types.js';

export const productService = {
  /**
   * Fetch all products (with optional category filtering)
   */
  getAllProducts: async (category?: string): Promise<IProduct[]> => { 
    const url = category ? `/products?category=${category}` : '/products';
    const response = await apiClient.get<IProduct[]>(url);
    return response.data;
  },

  /**
   * Fetch a single product by its MongoDB _id
   */
  getProductById: async (id: string): Promise<IProduct> => {
    const response = await apiClient.get<IProduct>(`/products/${id}`);
    return response.data;
  },

  /**
   * Create a new product (Admin feature)
   */
  createProduct: async (data: CreateProductDto): Promise<IProduct> => {
    const response = await apiClient.post<IProduct>('/products/create', data);
    return response.data;
  },

  /**
   * Update an existing product
   */
  updateProduct: async (id: string, data: UpdateProductDto): Promise<IProduct> => {
    const response = await apiClient.put<IProduct>(`/products/${id}`, data);
    return response.data;
  },

  /**
   * Delete a product
   */
  deleteProduct: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/products/${id}`);
    return response.data;
  }
};