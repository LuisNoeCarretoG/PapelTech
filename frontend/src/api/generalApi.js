import api from './axiosConfig';

export const getClientsRequest = () => api.get('/clients');
export const createClientRequest = (data) => api.post('/clients', data);
export const getSalesRequest = () => api.get('/sales');
export const createSaleRequest = (data) => api.post('/sales', data);
export const getServicesRequest = () => api.get('/services');
export const createServiceRequest = (data) => api.post('/services', data);
export const updateServiceRequest = (id, data) => api.put(`/services/${id}`, data);
export const getUsersRequest = () => api.get('/users');
