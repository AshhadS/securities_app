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
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post(`${server_url}/api/login`, credentials);
      commit('setUser', response.data.user);
      commit('setToken', response.data.token);
    },
    async fetchUsers({ commit }) {
      const response = await axios.get(`${server_url}/api/users`);
      commit('setUsers', response.data);
    },
    async fetchUser({ commit }, id) {
      const response = await axios.get(`${server_url}/api/users/${id}`);
      commit('setUser', response.data);
    },
    async createUser({ dispatch }, user) {
      await axios.post(`${server_url}/api/users`, user);
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
  },
  getters: {
    isAuthenticated: state => !!state.user,
    users: state => state.users,
  },
});

export default store;
