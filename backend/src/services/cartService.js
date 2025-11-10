import { Product } from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';

const carts = new Map(); // userId -> { items: [{ productId, quantity }] }

const normalizeUserId = (userId) => userId ?? 'anonymous';

export const cartService = {
  async getCart(userId) {
    const normalizedUserId = normalizeUserId(userId);
    const cart = carts.get(normalizedUserId);

    if (!cart) {
      return { items: [], totalItems: 0 };
    }

    const populatedItems = await Promise.all(
      cart.items.map(async ({ productId, quantity }) => {
        const product = await Product.findById(productId);
        if (!product) {
          return null;
        }

        return {
          product,
          quantity
        };
      })
    );

    const filteredItems = populatedItems.filter(Boolean);
    const totalItems = filteredItems.reduce((acc, item) => acc + item.quantity, 0);

    return { items: filteredItems, totalItems };
  },

  async addItem(userId, productId, quantity) {
    const normalizedUserId = normalizeUserId(userId);
    const product = await Product.findById(productId);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    const cart = carts.get(normalizedUserId) || { items: [] };
    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    carts.set(normalizedUserId, cart);

    return this.getCart(normalizedUserId);
  },

  async updateItem(userId, productId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(userId, productId);
    }

    const normalizedUserId = normalizeUserId(userId);
    const cart = carts.get(normalizedUserId);

    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    const existingItem = cart.items.find((item) => item.productId === productId);

    if (!existingItem) {
      throw new ApiError(404, 'Item not found in cart');
    }

    existingItem.quantity = quantity;
    carts.set(normalizedUserId, cart);

    return this.getCart(normalizedUserId);
  },

  async removeItem(userId, productId) {
    const normalizedUserId = normalizeUserId(userId);
    const cart = carts.get(normalizedUserId);

    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    cart.items = cart.items.filter((item) => item.productId !== productId);
    carts.set(normalizedUserId, cart);

    return this.getCart(normalizedUserId);
  },

  clearCart(userId) {
    const normalizedUserId = normalizeUserId(userId);
    carts.delete(normalizedUserId);
    return { items: [], totalItems: 0 };
  }
};

