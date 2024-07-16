import type { RouteRecordRaw } from 'vue-router';
import { AuthGuard } from '../guards/auth.guard';

export const followingRoutes: RouteRecordRaw[] = [
    {
        path: '/following',
        name: 'following',
        beforeEnter: [AuthGuard.isLoggedWithTwitch],
        component: () => import('@/app/following/layouts/FollowingLayout.vue'),
        children: [
            {
                path: 'live',
                name: 'live',
                component: () => import('@/app/following/containers/LivePage.vue'),
            },
            {
                path: 'users',
                name: 'users',
                component: () => import('@/app/following/containers/UsersPage.vue'),
            },
            {
                path: 'games',
                name: 'games',
                component: () => import('@/app/following/containers/GamesPage.vue'),
            },
        ]
    },
];
