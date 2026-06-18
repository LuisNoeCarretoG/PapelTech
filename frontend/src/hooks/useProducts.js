import { useEffect, useState } from 'react';
import { getProductsRequest } from '../api/productsApi';

export function useProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    getProductsRequest(params)
      .then((res) => {
        if (active) setProducts(res.data.products || []);
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.message || 'Error al cargar productos');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [params.search, params.categoria]);

  return { products, loading, error, setProducts };
}
