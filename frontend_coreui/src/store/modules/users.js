import axios from 'axios';

export default {
  namespaced: true,
  state: {
    users: [],
    user: null,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      const response = await axios.get('/api/users');
      commit('setUsers', response.data);
    },
    async fetchUser({ commit }, id) {
      const response = await axios.get(`/api/users/${id}`);
      commit('setUser', response.data);
    },
    async createUser({ dispatch }, user) {
      await axios.post('/api/users', user);
      dispatch('fetchUsers');
    },
    async updateUser({ dispatch }, user) {
      await axios.put(`/api/users/${user.id}`, user);
      dispatch('fetchUsers');
    },
    async deleteUser({ dispatch }, id) {
      await axios.delete(`/api/users/${id}`);
      dispatch('fetchUsers');
    },
  },
};
