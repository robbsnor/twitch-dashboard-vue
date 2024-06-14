import { fileURLToPath, URL } from 'node:url';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                name: "Twitch Dashboard",
                short_name: "Dashboard",
                display: "standalone",
                theme_color: "#000000",
                background_color: "#000000",
                start_url: "/following/live",
                icons: [
                    {
                        src: 'pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'maskable-icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    },
                ]
            },
        }),
    ],
    build: {
        chunkSizeWarningLimit: 1000,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import '/src/assets/styles/functions/rem';
                    @import '/src/assets/styles/mixins/screen';
                    @import '/src/assets/styles/mixins/container';
                    @import '/src/assets/styles/mixins/line-clamp';
                    @import '/src/assets/styles/var/size';
                    @import '/src/assets/styles/var/color';
                `
            }
        }
    }
});
