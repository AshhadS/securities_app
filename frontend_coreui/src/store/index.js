import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const server_url = "http://localhost:5000";

const store = new Vuex.Store({
  state: {
    user: null,
    token: null,
    users: [],
    securityData: [],
    totalData: 0,
    loading: false,
    pagination: {
      page: 1,
      itemsPerPage: 10,
      sortField: "TRADE_DATE",
      sortOrder: false,
      search: '',
      filters: {
        fromDate: '',
        toDate: '',
        portfolioNumber: '',
        shareSymbol: '',
        securityCurrency: ''
      }
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_SECURITY_DATA(state, data) {
      state.securityData = data;
    },
    SET_TOTAL_DATA(state, total) {
      state.totalData = total;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = { ...state.pagination, ...pagination };
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post(`${server_url}/api/login`, credentials);
      commit('SET_USER', response.data.user);
      commit('SET_TOKEN', response.data.token);
    },
    async fetchUsers({ commit }) {
      const response = await axios.get(`${server_url}/api/users`);
      commit('SET_USERS', response.data);
    },
    async fetchUser({ commit }, id) {
      const response = await axios.get(`${server_url}/api/users/user/${id}`);
      commit('SET_USER', response.data);
    },
    async createUser({ dispatch }, user) {
      await axios.post(`${server_url}/api/users/register`, user);
      dispatch('fetchUsers');
    },
    async updateUser({ dispatch }, user) {
      await axios.put(`${server_url}/api/users/${user.id}`, user);
      dispatch('fetchUsers');
    },
    async deleteUser({ dispatch }, id) {
      await axios.delete(`${server_url}/api/users/${id}`);
      dispatch('fetchUsers');
    },
    fetchSecurityData({ commit, state }) {
      commit('SET_LOADING', true);
      const { page, itemsPerPage, sortField, sortOrder, search, filters } = state.pagination;
      const isDesc = (sortOrder)?"DESC":"ASC";

      axios
      .get(`${server_url}/api/users/securities-report`, {
        params: {
          page,
          itemsPerPage: itemsPerPage,
          sortField,
          sortOrder: isDesc,
          search,
          fromDate: filters.fromDate,
          toDate: filters.toDate,
          portfolioNumber: filters.portfolioNumber,
          shareSymbol: filters.shareSymbol,
          securityCurrency: filters.securityCurrency
        }
      })
      .then(response => {

        commit('SET_SECURITY_DATA', response.data.transactions);
        commit('SET_TOTAL_DATA', response.data.total);
      })
      .catch(error => {
        console.error('Error fetching security data:', error);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
    },
    setPagination({ commit, dispatch }, pagination) {
      commit('SET_PAGINATION', pagination);
      dispatch('fetchSecurityData');
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    users: state => state.users,
    securityData: state => state.securityData,
    totalData: state => state.totalData,
    loading: state => state.loading,
    pagination: state => state.pagination
  },
});

export default store;
