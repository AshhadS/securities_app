import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import UsersView from '@/views/UsersView.vue';
import SecurityTransactionsTable from '@/views/SecurityTransactionsTable.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/register', name: 'Register', component: RegisterView },
    { path: '/users', name: 'UsersView', component: UsersView },
    { path: '/securities', name: 'SecurityTransactionsTable', component: SecurityTransactionsTable },
  ],
});

export default router;
