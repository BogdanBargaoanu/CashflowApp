import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from './components/UserLogin.vue';
import RegistrationPage from './components/RegistrationPage.vue';
import DashboardPage from './components/DashboardPage.vue';
import CashFlowLog from './components/CashFlowLog.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: UserLogin },
  { path: '/register', component: RegistrationPage},
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/cashflow-log', component: CashFlowLog, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !localStorage.getItem('user-token')) {
    next('/login');
  } else {
    next();
  }
});

export default router;