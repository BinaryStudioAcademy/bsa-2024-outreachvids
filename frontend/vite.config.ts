import { fileURLToPath } from 'node:url';

import reactPlugin from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
    const {
        VITE_APP_DEVELOPMENT_PORT,
        VITE_APP_API_ORIGIN_URL,
        VITE_APP_PROXY_SERVER_URL,
    } = loadEnv(mode, process.cwd());

    return defineConfig({
        build: {
            outDir: 'build',
        },
        plugins: [
            reactPlugin(),
            VitePWA({
                registerType: 'autoUpdate',
                injectRegister: false,

                pwaAssets: {
                    disabled: false,
                    config: true,
                },

                manifest: {
                    name: 'OutreachVids',
                    short_name: 'OV',
                    description:
                        'Create personalized sales videos using generated video content and AI-generated avatars.',
                    theme_color: '#eb5500',
                    background_color: '#0a0049',
                },

                workbox: {
                    globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
                    cleanupOutdatedCaches: true,
                    clientsClaim: true,
                },

                devOptions: {
                    enabled: true,
                    navigateFallback: 'index.html',
                    suppressWarnings: true,
                    type: 'module',
                },
            }),
        ],
        server: {
            port: Number(VITE_APP_DEVELOPMENT_PORT),
            proxy: {
                [VITE_APP_API_ORIGIN_URL as string]: {
                    target: VITE_APP_PROXY_SERVER_URL,
                    changeOrigin: true,
                },
            },
        },
        resolve: {
            alias: [
                {
                    find: '~',
                    replacement: fileURLToPath(new URL('src', import.meta.url)),
                },
            ],
        },
    });
};

export default config;
