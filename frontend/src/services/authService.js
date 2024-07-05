import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

const register = (username, email, password) => {
  username="ashhad1";
  email="ashhad@gmail.com";
  password="ashhad123";

  return axios.post(API_URL + 'register', {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  email="ashhad1";
  password="ashhad123";
  return axios.post(API_URL + 'login', {
    email,
    password,
  });
};

const getUsers = () => {
  return axios.get(`${API_URL}`);
};

const updateUser = (id, data) => {
  return axios.put(`${API_URL}${id}`, data);
};

const deleteUser = (id) => {
  return axios.delete(`${API_URL}${id}`);
};

const getSecurityTransactions = (params) => {
  const { page, sortField, sortOrder } = params;
  return axios.get(`${API_URL}securities-report?page=${page}&sortField=${sortField}&sortOrder=${sortOrder}`);
};

export default {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser,
  getSecurityTransactions,
};
