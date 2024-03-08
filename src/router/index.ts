import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAuthStore } from './../app/auth/stores/auth.store';

const isLoggedTwitch = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();
    const loggedIn = !!authStore.user;

    if (!loggedIn) return next({ name: 'home' });
    next();
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/live',
            name: 'live',
            component: () => import('../views/LiveView.vue'),
            beforeEnter: [isLoggedTwitch]
        },
    ]
});

export default router;
