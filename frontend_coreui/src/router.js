import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
import Login from './components/LoginView.vue';
import Register from './components/RegisterView.vue';

Vue.use(Router);

export default new Router({
  routes: [
    // { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
  ]
});