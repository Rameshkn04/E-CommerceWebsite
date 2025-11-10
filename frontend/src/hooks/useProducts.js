import { useEffect, useState, useCallback } from 'react';
import { productService } from '../services/productService.js';

const initialState = {
  data: [],
  isLoading: true,
  error: null
};

export const useProducts = (filters) => {
  const [state, setState] = useState(initialState);

  const fetchProducts = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await productService.getProducts(filters);
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: [], isLoading: false, error: error.message });
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    ...state,
    refetch: fetchProducts
  };
};

