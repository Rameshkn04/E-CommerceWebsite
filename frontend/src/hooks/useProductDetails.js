import { useEffect, useState, useCallback } from 'react';
import { productService } from '../services/productService.js';

const initialState = {
  data: null,
  isLoading: true,
  error: null
};

export const useProductDetails = (productId) => {
  const [state, setState] = useState(initialState);

  const fetchProduct = useCallback(async () => {
    if (!productId) {
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await productService.getProductById(productId);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: null, isLoading: false, error: error.message });
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    ...state,
    refetch: fetchProduct
  };
};

