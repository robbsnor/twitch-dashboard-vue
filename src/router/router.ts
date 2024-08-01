import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { AuthGuard } from './guards/auth.guard';
import { authRoutes } from './routes/auth.route';
import { followingRoutes } from './routes/following.rout';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/app/home/containers/HomePage.vue'),
        },
        ...authRoutes,
        ...followingRoutes,
        {
            path: '/games/:gameSlug',
            name: 'game',
            component: () => import('@/app/games/containers/GamePage.vue'),
            beforeEnter: [AuthGuard.isLoggedWithTwitch],
        },
        {
            path: '/user/:userLogin',
            name: 'user',
            component: () => import('@/app/user/containers/UserPage.vue'),
            beforeEnter: [AuthGuard.isLoggedWithTwitch],
        },
        {
            path: '/playground',
            name: 'playground',
            component: () => import('@/app/playground/containers/PlaygroundPage.vue'),
        },
    ]
});

export default router;
