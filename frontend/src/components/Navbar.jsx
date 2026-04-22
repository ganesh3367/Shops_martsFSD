import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Moon, Sun, User, Package, LogOut, ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { clearUser } from '../store/userSlice';
import { logoutUser } from '../services/authService';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Collection' },
  { to: '/about', label: 'About' },
];

// ── Avatar component ──────────────────────────────────────────
const UserAvatar = ({ user, size = 'sm' }) => {
  const dim = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  const initials = user.displayName
    ? user.displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : (user.email?.[0] ?? '?').toUpperCase();

  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt={user.displayName || 'User'}
        referrerPolicy="no-referrer"
        className={`${dim} rounded-full object-cover ring-2 ring-accent/30`}
      />
    );
  }
  return (
    <div className={`${dim} rounded-full bg-accent text-white font-bold flex items-center justify-center`}>
      {initials}
    </div>
  );
};

const Navbar = ({ onToggleDark, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const cartItems = useSelector((s) => s.cart.items);
  const { currentUser, isAuthenticated } = useSelector((s) => s.user);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Click-outside for user dropdown
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    await logoutUser();
    dispatch(clearUser());
    toast.success('Signed out successfully.');
    navigate('/');
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-stone-100 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-xl font-serif font-bold tracking-tight text-primary hover:text-accent transition-colors">
            FURNIT<span className="text-accent">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative text-sm font-medium transition-colors group ${
                  isActive(to) ? 'text-accent' : 'text-primary hover:text-accent'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-accent transition-all duration-300 ${
                    isActive(to) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop right icons */}
          <div className="hidden md:flex items-center gap-0.5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className={`p-2.5 rounded-full transition-colors ${searchOpen ? 'bg-stone-100 text-accent' : 'hover:bg-stone-100 text-primary'}`}
            >
              <Search size={17} />
            </button>

            {/* Dark mode */}
            <button
              onClick={onToggleDark}
              aria-label="Toggle theme"
              className="p-2.5 rounded-full hover:bg-stone-100 text-primary transition-colors"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative p-2.5 rounded-full hover:bg-stone-100 text-primary transition-colors ml-0.5"
            >
              <ShoppingBag size={17} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 h-4 w-4 bg-accent text-white text-[9px] font-bold flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* User menu */}
            {isAuthenticated && currentUser ? (
              <div className="relative ml-1" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-stone-50 transition-colors"
                  aria-label="User menu"
                >
                  <UserAvatar user={currentUser} />
                  <ChevronDown
                    size={14}
                    className={`text-stone-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white border border-stone-100 shadow-xl py-1 z-50"
                    >
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-stone-100">
                        <p className="text-sm font-semibold text-primary truncate">
                          {currentUser.displayName || 'Furnit Member'}
                        </p>
                        <p className="text-xs text-stone-400 truncate">{currentUser.email}</p>
                      </div>

                      {/* Links */}
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-primary transition-colors"
                      >
                        <User size={15} className="text-stone-400" /> My Profile
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => { setUserMenuOpen(false); }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-primary transition-colors"
                      >
                        <Package size={15} className="text-stone-400" /> My Orders
                      </Link>

                      <div className="border-t border-stone-100 mt-1 pt-1">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-1 flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold hover:bg-accent transition-colors duration-200"
              >
                <User size={15} /> Sign In
              </Link>
            )}
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-1">
            <Link to="/cart" className="relative p-2 text-primary" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-accent text-white text-[8px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-2 text-primary"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Desktop search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="hidden md:block border-t border-stone-100 overflow-hidden"
            >
              <div className="py-3 flex items-center gap-3">
                <Search size={15} className="text-stone-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search furniture, rooms, styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm outline-none bg-transparent text-primary placeholder-stone-400"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-xs text-stone-400 hover:text-primary transition-colors shrink-0"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-stone-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-5">
              {/* Mobile search */}
              <div className="flex items-center gap-2.5 bg-stone-50 px-4 py-3">
                <Search size={15} className="text-stone-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm w-full outline-none text-primary placeholder-stone-400"
                />
              </div>

              {/* Mobile user info */}
              {isAuthenticated && currentUser && (
                <div className="flex items-center gap-3 px-2 py-3 bg-stone-50">
                  <UserAvatar user={currentUser} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-primary truncate">
                      {currentUser.displayName || 'Furnit Member'}
                    </p>
                    <p className="text-xs text-stone-400 truncate">{currentUser.email}</p>
                  </div>
                </div>
              )}

              {/* Nav links */}
              <div className="space-y-0.5">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className={`block px-2 py-3.5 text-base font-medium border-b border-stone-50 ${
                      isActive(to) ? 'text-accent' : 'text-primary'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-2 py-3.5 text-base font-medium border-b border-stone-50 text-primary">
                      My Profile
                    </Link>
                    <button
                      onClick={async () => { setIsOpen(false); await handleSignOut(); }}
                      className="block w-full text-left px-2 py-3.5 text-base font-medium text-red-500"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block px-2 py-3.5 text-base font-medium text-primary">
                    Sign In / Register
                  </Link>
                )}
              </div>

              {/* Bottom row */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <button onClick={onToggleDark} className="flex items-center gap-2 text-sm text-primary font-medium">
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
