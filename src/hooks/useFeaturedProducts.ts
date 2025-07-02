// src/hooks/useFeaturedProducts.ts
import { useState, useEffect } from 'react';
import type { ProductWithExtras } from '@/types/product';

export default function useFeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductWithExtras[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/products/featured');
        if (!res.ok) throw new Error('Failed to fetch featured products');
        const data = await res.json();
        setFeaturedProducts(data.products ?? []);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { featuredProducts, loading, error };
}
