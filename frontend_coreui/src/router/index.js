import Vue from 'vue';
import Router  from 'vue-router';
import LoginView from '../views/LoginPageView.vue';
import RegisterView from '../views/RegisterPageView.vue';
import UserListView from '../views/UserListView.vue';
import UserFormView from '../views/UserFormView.vue';
import SecurityListView from '../views/SecurityListView.vue';
import HomeView from '../views/HomeView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/users', component: UserListView },
    { path: '/users/new', component: UserFormView },
    { path: '/users/:id', component: UserFormView },
    { path: '/securities', component: SecurityListView },
  ],
});
