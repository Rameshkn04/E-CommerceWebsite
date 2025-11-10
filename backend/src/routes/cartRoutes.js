import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  addItemToCart,
  clearCart,
  getCart,
  removeItemFromCart,
  updateCartItem
} from '../controllers/cartController.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

router.get('/', getCart);

router.post(
  '/items',
  [
    body('productId').isMongoId().withMessage('productId must be a valid MongoDB ObjectId'),
    body('quantity').isInt({ min: 1 }).withMessage('quantity must be at least 1')
  ],
  validateRequest,
  addItemToCart
);

router.put(
  '/items/:productId',
  [
    param('productId').isMongoId().withMessage('productId must be a valid MongoDB ObjectId'),
    body('quantity').isInt({ min: 0 }).withMessage('quantity must be zero or greater')
  ],
  validateRequest,
  updateCartItem
);

router.delete(
  '/items/:productId',
  [param('productId').isMongoId().withMessage('productId must be a valid MongoDB ObjectId')],
  validateRequest,
  removeItemFromCart
);

router.delete('/', clearCart);

export default router;

