import { defineStore } from 'pinia';

export const useLiveStore = defineStore('live', () => {
    const pageTabs = {
        title: 'Following',
        paths: [
            {
                name: 'Live',
                path: '/following/live',
            },
            {
                name: 'Users',
                path: '/following/users',
            },
        ],
    };

    return {
        pageTabs,
    };
});
