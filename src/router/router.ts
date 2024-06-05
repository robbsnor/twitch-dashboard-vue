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
            path: '/logout',
            name: 'logout',
            component: () => import('../app/auth/containers/LogoutPage.vue'),
        },
        {
            path: '/playground',
            name: 'playground',
            component: () => import('../app/playground/containers/PlaygroundPage.vue'),
        },
        {
            path: '/following',
            name: 'following',
            beforeEnter: [isLoggedWithTwitch],
            component: () => import('../app/following/layouts/FollowingLayout.vue'),
            children: [
                {
                    path: 'live',
                    name: 'live',
                    component: () => import('../app/following/containers/LivePage.vue'),
                },
                {
                    path: 'users',
                    name: 'users',
                    component: () => import('../app/following/containers/UsersPage.vue'),
                },
                {
                    path: 'games',
                    name: 'games',
                    component: () => import('../app/following/containers/GamesPage.vue'),
                },
            ]
        },
        {
            path: '/user/:userLogin',
            name: 'user',
            component: () => import('../app/user/containers/UserPage.vue'),
            beforeEnter: [isLoggedWithTwitch],
        },
    ]
});

export default router;
