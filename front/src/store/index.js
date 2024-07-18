import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    isAuthenticated: false
  },
  mutations: {
    setAuth(state, { isAuthenticated, user }) {
      state.isAuthenticated = isAuthenticated;
    },
    clearAuth(state) {
      state.isAuthenticated = false;
    }
  },
  actions: {
    async checkAuth({ commit }) {
      try {
        const response = await axios.get('http://localhost:10000/auth');
        commit('setAuth', {
          isAuthenticated: response.data.authenticated
        });
      } catch (error) {
        commit('clearAuth');
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('http://localhost:10000/logout');
        document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        commit('clearAuth');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  }
});