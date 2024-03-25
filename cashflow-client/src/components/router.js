import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from './UserLogin.vue';

const routes = [
  { path: '/login', component: UserLogin }
  // { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } } // Add your Dashboard route
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