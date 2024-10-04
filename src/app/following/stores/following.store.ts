import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFollowingStore = defineStore('following', () => {
    const filter = ref<string>();
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
            {
                name: 'Games',
                path: '/following/games',
            },
        ],
    };

    return {
        pageTabs,
        filter,
    };
},
    {
        persist: true,
    }
);
