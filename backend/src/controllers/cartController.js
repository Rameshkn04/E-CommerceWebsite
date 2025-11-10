import { cartService } from '../services/cartService.js';

const getUserId = (req) => req.header('x-user-id') ?? req.user?.id ?? 'anonymous';

export const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(getUserId(req));
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const addItemToCart = async (req, res, next) => {
  try {
    const cart = await cartService.addItem(
      getUserId(req),
      req.body.productId,
      Number.parseInt(req.body.quantity, 10)
    );
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const cart = await cartService.updateItem(
      getUserId(req),
      req.params.productId,
      Number.parseInt(req.body.quantity, 10)
    );
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const removeItemFromCart = async (req, res, next) => {
  try {
    const cart = await cartService.removeItem(getUserId(req), req.params.productId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await cartService.clearCart(getUserId(req));
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

