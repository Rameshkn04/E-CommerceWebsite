import { apiClient } from './apiClient.js';

export const cartService = {
  async getCart() {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  async addItem(productId, quantity = 1) {
    const response = await apiClient.post('/cart/items', { productId, quantity });
    return response.data;
  },

  async updateItem(productId, quantity) {
    const response = await apiClient.put(`/cart/items/${productId}`, { quantity });
    return response.data;
  },

  async removeItem(productId) {
    const response = await apiClient.delete(`/cart/items/${productId}`);
    return response.data;
  },

  async clearCart() {
    const response = await apiClient.delete('/cart');
    return response.data;
  }
};

