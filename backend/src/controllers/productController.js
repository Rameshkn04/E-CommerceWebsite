import { productService } from '../services/productService.js';
import { ApiError } from '../utils/ApiError.js';

export const getProducts = async (req, res, next) => {
  try {
    const products = await productService.listProducts({
      category: req.query.category,
      brand: req.query.brand
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.productId);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

