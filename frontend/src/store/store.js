import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import productReducer from './productSlice';
import wishlistReducer from './wishlistSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
    wishlist: wishlistReducer,
  },
});
