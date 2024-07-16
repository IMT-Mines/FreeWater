import { createRouter, createWebHistory } from 'vue-router';
import CitiesList from '@/components/CitiesList.vue';
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';

const routes = [
    { path: '/', component: CitiesList },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
