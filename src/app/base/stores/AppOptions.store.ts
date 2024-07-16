import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppOptionsStore = defineStore('app-options',
    () => {
        const options = ref({
            user: {
                showThumbnail: true,
                showDuration: true,
            },
        });

        const toggleUserShowThumbnail = () => {
            options.value.user.showThumbnail = !options.value.user.showThumbnail;
        };

        const toggleUserShowDuration = () => {
            options.value.user.showDuration = !options.value.user.showDuration;
        };

        return {
            options,
            toggleUserShowThumbnail,
            toggleUserShowDuration,
        };
    },
    {
        persist: true,
    }
);
