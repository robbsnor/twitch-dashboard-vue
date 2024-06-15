import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Options {
    user: {
        showThumbnail: boolean;
        showDuration: boolean;
    },
    app: {
        vodDownloadURL?: string;
    };
}

export const useAppOptionsStore = defineStore('app-options',
    () => {
        const options = ref<Options>({
            user: {
                showThumbnail: true,
                showDuration: true,
            },
            app: {},
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
