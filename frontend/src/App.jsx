import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const PublicProducts = lazy(() => import('./pages/PublicProducts'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const PublicServices = lazy(() => import('./pages/PublicServices'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const Clients = lazy(() => import('./pages/Clients'));
const Sales = lazy(() => import('./pages/Sales'));
const Services = lazy(() => import('./pages/Services'));
const ServiceRequest = lazy(() => import('./pages/ServiceRequest'));
const Cart = lazy(() => import('./pages/Cart'));
const Users = lazy(() => import('./pages/Users'));
const Profile = lazy(() => import('./pages/Profile'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Suspense fallback={<div className="center-page">Cargando vista...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productos" element={<PublicProducts />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/servicios-publicos" element={<PublicServices />} />
        <Route path="/no-autorizado" element={<Unauthorized />} />

        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Products />} />
          <Route path="clientes" element={<ProtectedRoute roles={['admin', 'empleado']}><Clients /></ProtectedRoute>} />
          <Route path="ventas" element={<ProtectedRoute roles={['admin', 'empleado']}><Sales /></ProtectedRoute>} />
          <Route path="servicios" element={<ProtectedRoute roles={['admin', 'empleado']}><Services /></ProtectedRoute>} />
          <Route path="solicitar-servicio" element={<ProtectedRoute roles={['cliente']}><ServiceRequest /></ProtectedRoute>} />
          <Route path="carrito" element={<ProtectedRoute roles={['cliente']}><Cart /></ProtectedRoute>} />
          <Route path="usuarios" element={<ProtectedRoute roles={['admin']}><Users /></ProtectedRoute>} />
          <Route path="perfil" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
