// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
import type { ProductWithExtras } from '@/types/product';

interface UseProductsParams {
  page: number;
  roomFilter: string;
  category: string;
  search: string;
}

export default function useProducts({ page, roomFilter, category, search }: UseProductsParams) {
  const [products, setProducts] = useState<ProductWithExtras[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = new URL('/api/products', window.location.origin);
        url.searchParams.append('page', String(page));
        url.searchParams.append('pageSize', '12');
        if (roomFilter) url.searchParams.append('room', roomFilter);
        if (category && category !== 'All') url.searchParams.append('category', category);
        if (debouncedSearch) url.searchParams.append('search', debouncedSearch);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Failed to fetch products');

        const data = await res.json();
        setProducts(data.products ?? []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, roomFilter, category, debouncedSearch]);

  return { products, loading, error };
}
