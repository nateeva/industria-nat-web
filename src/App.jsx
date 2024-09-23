import { BrowserRouter, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Tienda } from './components/pages/Tienda';
import { Checkout } from './components/pages/Checkout';
import { Envio } from './components/pages/Envio';
import { AppContextProvider } from './context/AppContext';
import { CartContent } from './components/carrito/CartContent';
import PageNoteFound from './components/PageNoteFound';
import LimpiarCarrito from './components/checkout/LimpiarCarrito';
import { Login } from './components/pages/Login';
import { Admin } from './components/pages/Admin';
import { AdminProductos } from './components/admin/AdminProductos';
import { AdminVentas } from './components/admin/AdminVentas';
import { AdminEnvios } from './components/admin/AdminEnvios';
import ProtectedRoute from './components/utils/ProtectedRoute'

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/envio" element={<Envio />} />
          <Route path="/carrito" element={<CartContent />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/limpiarcarrito" element={<LimpiarCarrito />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/productos" element={<ProtectedRoute><AdminProductos /></ProtectedRoute>} />
          <Route path="/admin/ventas" element={<ProtectedRoute><AdminVentas /></ProtectedRoute>} />
          <Route path="/admin/envios" element={<ProtectedRoute><AdminEnvios /></ProtectedRoute>} />

          <Route path='*' element={<PageNoteFound />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
