import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

const register = (username, email, password) => {
  return axios.post(API_URL + 'register', {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
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
  console.log(params);
  const { page, sortField, sortOrder, search, pageSize, fromDate, toDate, portfolioNumber, shareSymbol, securityCurrency } = params;

  let url = `${API_URL}securities-report?page=${page}&sortField=${sortField}&sortOrder=${sortOrder}&search=${search}`;
  
  if(fromDate) 
    url += `&fromDate=${fromDate}`;

  if(toDate) 
    url += `&toDate=${toDate}`;

  if(portfolioNumber) 
    url += `&portfolioNumber=${portfolioNumber}`;
  
  if(shareSymbol) 
    url += `&shareSymbol=${shareSymbol}`;
  
  if(securityCurrency) 
    url += `&securityCurrency=${securityCurrency}`;

  if(pageSize)
    url += `&itemsPerPage=${pageSize}`;


  return axios.get(url);
};

export default {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser,
  getSecurityTransactions,
};
