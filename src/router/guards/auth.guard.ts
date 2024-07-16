import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "../../app/auth/stores/auth.store";

export class AuthGuard {
    public static isLoggedWithTwitch(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
        const authStore = useAuthStore();
        const loggedIn = !!authStore.user;

        if (!loggedIn) return next({ name: 'home' });
        next();
    };
}
