/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import api from '../api/axios';
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
  user: null,
  isSignedIn: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggedIn: false,
  signup: async (credentials) => {
    set({ isSignedIn: true });
    try {
      const { data } = await api.post('/auth/signup', credentials);
      set({ user: data.user, isSignedIn: true });
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      set({ isSignedIn: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggedIn: true });
    try {
      const { data } = await api.post('/auth/login', credentials);
      set({ user: data.user, isLoggedIn: true });
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      set({ isLoggedIn: false, user: null });
    }
  },
  logout: async () => {
    set({ isLoggingOut: false });
    try {
      await api.post('/auth/logout');
      set({ user: null, isLoggingOut: false });
      toast.success('Logged out successfully.');
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      set({ isLoggingOut: false });
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const { data } = await api.get('/auth/checkAuth');
      set({ user: data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));

export default useAuthStore;
