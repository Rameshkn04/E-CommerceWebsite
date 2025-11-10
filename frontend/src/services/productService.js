import { apiClient } from './apiClient.js';

export const productService = {
  async getProducts(params = {}) {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  async getProductById(productId) {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  }
};

