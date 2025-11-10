import { Product } from '../models/Product.js';

export const productService = {
  async listProducts(filters = {}) {
    const query = {};

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.brand) {
      query.brand = filters.brand;
    }

    return Product.find(query).sort({ createdAt: -1 });
  },

  async getProductById(productId) {
    return Product.findById(productId);
  }
};

