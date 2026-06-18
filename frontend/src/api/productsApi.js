import api from './axiosConfig';

export const getProductsRequest = (params) => api.get('/products', { params });
export const getProductRequest = (id) => api.get(`/products/${id}`);
export const getCategoriesRequest = () => api.get('/products/categories');
export const createProductRequest = (data) => api.post('/products', data);
export const updateProductRequest = (id, data) => api.put(`/products/${id}`, data);
export const deleteProductRequest = (id) => api.delete(`/products/${id}`);
