import Vue from 'vue';
import App from './App.vue';
import CoreuiVue from '@coreui/vue';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import router from './router';
import store from './store';
import axios from 'axios';

Vue.config.productionTip = false;

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

Vue.use(CoreuiVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

