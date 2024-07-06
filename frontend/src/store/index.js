import Vue from 'vue';
import Vuex from 'vuex';
import authService from '@/services/authService';
import router from '../router';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: {},
    transactions: [],
    totalTransactions: 0,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT(state) {
      state.token = '';
      state.user = {};
      localStorage.removeItem('token');
    },
    SET_TRANSACTIONS(state, { transactions, total }) {
      state.transactions = transactions;
      state.totalTransactions = total;
    },
  },
  actions: {
    async register({ commit }, user) {
      const response = await authService.register(user.username, user.email, user.password);
      const token = response.data.token;
      localStorage.setItem('token', token);
      commit('SET_USER', response.data);
      commit('SET_TOKEN', token);

      if(token) {
        router.push('/login');
      }
    },
    async login({ commit }, user) {
      const response = await authService.login(user.email, user.password);
      const token = response.data.token;
      localStorage.setItem('token', token);
      commit('SET_USER', response.data);
      commit('SET_TOKEN', token);

      router.push('/securities');
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
    async fetchTransactions({ commit }, params) {
      try {
        const response = await authService.getSecurityTransactions(params);
        commit('SET_TRANSACTIONS', {
          transactions: response.data.transactions,
          total: response.data.total,
        });
        return {
          data: response.data.transactions,
          total: response.data.total,
        };
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user,
    transactions: (state) => state.transactions,
    totalTransactions: (state) => state.totalTransactions,
  },
});
