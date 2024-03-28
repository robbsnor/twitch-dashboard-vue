import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../app/auth/stores/auth.store';

const isLoggedWithTwitch = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
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
            component: () => import('../app/home/containers/HomePage.vue'),
        },
        {
            path: '/playground',
            name: 'Playground',
            component: () => import('../app/playground/containers/PlaygroundPage.vue'),
        },
        {
            path: '/live',
            name: 'live',
            component: () => import('../app/live/containers/LivePage.vue'),
            beforeEnter: [isLoggedWithTwitch],
        },
        {
            path: '/user/:userLogin',
            name: 'user',
            component: () => import('../app/user/containers/UserPage.vue'),
            beforeEnter: [isLoggedWithTwitch],
            // children: [
            //     {
            //         path: '/highlights',
            //         component: () => import('../views/HighlightsView.vue'),
            //     },
            // ]
        },
    ]
});

export default router;
