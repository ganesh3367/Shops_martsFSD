import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Package, Heart, LogOut, Edit3, Save, Loader2,
  ShoppingBag, MapPin, Phone, Mail, Calendar, Trash2, ArrowRight,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { clearUser } from '../store/userSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { logoutUser, getUserProfile, updateUserProfile } from '../services/authService';
import api from '../api/axiosConfig';

// ── Avatar (photo or initials) ────────────────────────────────
const Avatar = ({ user, size = 'md' }) => {
  const dim = { sm: 'w-8 h-8 text-xs', md: 'w-16 h-16 text-xl', lg: 'w-24 h-24 text-3xl' }[size];
  const initials = user.displayName
    ? user.displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : (user.email?.[0] ?? '?').toUpperCase();

  if (user.photoURL) {
    return <img src={user.photoURL} alt={user.displayName || 'User'} className={`${dim} rounded-full object-cover ring-4 ring-accent/20`} />;
  }
  return (
    <div className={`${dim} rounded-full bg-accent text-white font-bold flex items-center justify-center ring-4 ring-accent/20`}>
      {initials}
    </div>
  );
};

// ── Sidebar nav item ──────────────────────────────────────────
const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 text-left ${
      active
        ? 'bg-accent/10 text-accent border-l-2 border-accent'
        : 'text-stone-500 hover:bg-stone-50 hover:text-primary border-l-2 border-transparent'
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

// ── Status badge ──────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const styles = {
    pending:   'bg-yellow-50 text-yellow-700',
    confirmed: 'bg-blue-50 text-blue-700',
    shipped:   'bg-purple-50 text-purple-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${styles[status] ?? 'bg-stone-100 text-stone-600'}`}>
      {status}
    </span>
  );
};

// ── Account tab ───────────────────────────────────────────────
const AccountTab = ({ user }) => {
  const [profile, setProfile] = useState({ displayName: '', phone: '', address: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getUserProfile(user.uid)
      .then((data) => {
        if (data) setProfile({ displayName: data.displayName || '', phone: data.phone || '', address: data.address || '' });
        else setProfile({ displayName: user.displayName || '', phone: '', address: '' });
      })
      .catch(() => setProfile({ displayName: user.displayName || '', phone: '', address: '' }))
      .finally(() => setLoading(false));
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile(user.uid, profile);
      toast.success('Profile updated!');
      setEditing(false);
    } catch {
      toast.error('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const inputCls = (editable) =>
    `w-full px-4 py-3 text-sm border transition-all outline-none ${
      editable
        ? 'border-stone-200 bg-white focus:border-accent text-primary'
        : 'border-transparent bg-stone-50 text-stone-500 cursor-default'
    }`;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h2 className="font-serif text-2xl font-bold text-primary">Account Information</h2>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            <Edit3 size={14} /> Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button onClick={() => setEditing(false)} className="text-sm text-stone-400 hover:text-primary font-medium">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-primary text-white px-5 py-2 text-sm font-semibold hover:bg-accent transition-colors disabled:opacity-60"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save
            </button>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2">
            Full Name
          </label>
          <input
            type="text"
            disabled={!editing}
            value={profile.displayName}
            onChange={(e) => setProfile((p) => ({ ...p, displayName: e.target.value }))}
            className={inputCls(editing)}
          />
        </div>

        {/* Email (read-only — from Firebase) */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2 flex items-center gap-1.5">
            <Mail size={11} /> Email Address
          </label>
          <input type="email" disabled value={user.email} className={inputCls(false)} />
          {user.emailVerified ? (
            <p className="text-[10px] text-green-600 font-semibold mt-1 flex items-center gap-1">✓ Verified</p>
          ) : (
            <p className="text-[10px] text-amber-500 font-semibold mt-1">Not verified</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2 flex items-center gap-1.5">
            <Phone size={11} /> Phone
          </label>
          <input
            type="tel"
            disabled={!editing}
            placeholder={editing ? '+1 234 567 8900' : 'Not set'}
            value={profile.phone}
            onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
            className={inputCls(editing)}
          />
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2 flex items-center gap-1.5">
            <MapPin size={11} /> Shipping Address
          </label>
          <textarea
            disabled={!editing}
            rows={3}
            placeholder={editing ? '123 Main St, City, State, ZIP' : 'Not set'}
            value={profile.address}
            onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
            className={`${inputCls(editing)} resize-none`}
          />
        </div>
      </div>
    </div>
  );
};

// ── Orders tab ────────────────────────────────────────────────
const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/orders/my-orders')
      .then((res) => setOrders(res.data))
      .catch(() => setError('Could not load orders. Make sure the backend is running.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-primary mb-7">My Orders</h2>

      {error ? (
        <div className="bg-amber-50 border border-amber-100 px-5 py-4 text-sm text-amber-700">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag size={40} className="text-stone-200 mx-auto mb-4" />
          <p className="font-serif text-xl text-stone-400">No orders yet</p>
          <p className="text-stone-400 text-sm mt-2">Your order history will appear here.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors"
          >
            Start Shopping <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-stone-100 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs text-stone-400 font-mono">#{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                    <Calendar size={11} />
                    {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={order.status} />
                  <p className="text-sm font-bold text-primary">₹{order.totalAmount?.toFixed(2)}</p>
                </div>
              </div>
              {order.items?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-t border-stone-50">
                  <div className="w-10 h-12 bg-stone-100 flex-shrink-0 overflow-hidden">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{item.name}</p>
                    <p className="text-xs text-stone-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Wishlist tab ──────────────────────────────────────────────
const WishlistTab = () => {
  const wishlist = useSelector((s) => s.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-primary mb-7">
        My Wishlist <span className="text-stone-300 font-normal text-lg">({wishlist.length})</span>
      </h2>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={40} className="text-stone-200 mx-auto mb-4" />
          <p className="font-serif text-xl text-stone-400">Your wishlist is empty</p>
          <p className="text-stone-400 text-sm mt-2">Save items you love by clicking the heart icon.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors"
          >
            Browse Collection <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-5">
          {wishlist.map((item) => (
            <div key={item.id} className="group relative">
              <Link to={`/products/${item.id}`} className="block">
                <div className="aspect-[3/4] bg-stone-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 px-0.5">
                  <p className="text-sm font-semibold text-primary leading-snug truncate">{item.name}</p>
                  <p className="text-sm font-bold text-accent mt-1">₹{item.price}</p>
                </div>
              </Link>
              <button
                onClick={() => { dispatch(toggleWishlist(item)); toast.success('Removed from wishlist'); }}
                className="absolute top-3 right-3 w-8 h-8 bg-white shadow-md flex items-center justify-center text-stone-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Main Profile page ─────────────────────────────────────────
const Profile = () => {
  const [activeTab, setActiveTab] = useState('account');
  const { currentUser: user } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logoutUser();
    dispatch(clearUser());
    toast.success('Signed out successfully.');
    navigate('/');
  };

  if (!user) return null;

  const memberSince = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : null;

  const tabs = [
    { id: 'account',  label: 'Account',   icon: User },
    { id: 'orders',   label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist',  icon: Heart },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Page title */}
      <div className="mb-10">
        <span className="text-accent text-[11px] font-bold tracking-widest uppercase">Account</span>
        <h1 className="font-serif text-4xl font-bold text-primary mt-1">My Profile</h1>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* ── Sidebar ── */}
        <aside className="lg:col-span-1">
          <div className="bg-stone-50 p-6 mb-4">
            {/* Avatar + info */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Avatar user={user} size="lg" />
              </div>
              <p className="font-semibold text-primary text-base leading-snug">
                {user.displayName || 'Furnit Member'}
              </p>
              <p className="text-xs text-stone-400 mt-1 truncate">{user.email}</p>
              {memberSince && (
                <p className="text-[10px] text-stone-400 mt-2 flex items-center justify-center gap-1">
                  <Calendar size={10} /> Member since {memberSince}
                </p>
              )}
            </div>

            {/* Nav */}
            <nav className="space-y-0.5">
              {tabs.map(({ id, label, icon }) => (
                <NavItem
                  key={id}
                  icon={icon}
                  label={label}
                  active={activeTab === id}
                  onClick={() => setActiveTab(id)}
                />
              ))}
              <div className="pt-3 mt-3 border-t border-stone-200">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 text-left border-l-2 border-transparent"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* ── Content ── */}
        <main className="lg:col-span-3">
          <div className="bg-white border border-stone-100 p-6 sm:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                {activeTab === 'account'  && <AccountTab user={user} />}
                {activeTab === 'orders'   && <OrdersTab />}
                {activeTab === 'wishlist' && <WishlistTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
