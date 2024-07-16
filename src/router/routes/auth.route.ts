import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/auth/sign-in',
        name: 'sign-in',
        component: () => import('@/app/auth/containers/SignInPage.vue'),
    },
    {
        path: '/auth/sign-out',
        name: 'sign-out',
        component: () => import('@/app/auth/containers/SignOutPage.vue'),
    },
];
