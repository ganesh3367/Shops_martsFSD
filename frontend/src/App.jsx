import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  const [isDark, setIsDark] = React.useState(false);

  // Initialise Firebase auth listener → syncs to Redux on every reload
  useAuth();

  const toggleDarkMode = () => {
    setIsDark((v) => !v);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar onToggleDark={toggleDarkMode} isDark={isDark} />

      <main className="flex-grow">
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/products"      element={<Products />} />
          <Route path="/products/:id"  element={<ProductDetails />} />
          <Route path="/cart"          element={<Cart />} />
          <Route path="/login"         element={<Auth />} />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
