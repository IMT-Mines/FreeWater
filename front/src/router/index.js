import { createRouter, createWebHistory } from 'vue-router';
import CitiesList from '@/components/CitiesList.vue';
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';
import store from '@/store/index';

const routes = [
  { path: '/', component: CitiesList, meta: { requiresAuth: true } },
  { path: '/signup', component: Signup },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('checkAuth');

  if (to.meta.requiresAuth) {
    if (!store.state.isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
