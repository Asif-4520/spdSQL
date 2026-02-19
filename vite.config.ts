import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

const APP_VERSION = "1.0.0";
const BUILD_TIMESTAMP = Date.now();

export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify(APP_VERSION),
        __BUILD_TIMESTAMP__: JSON.stringify(BUILD_TIMESTAMP),
    },
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: false,
            },
            injectRegister: "auto",
            includeAssets: [
                "assets/**/*.png",
                "assets/**/*.ico",
                "extension/*.wasm",
            ],
            manifest: {
                name: "spdSQL — Browser SQL Playground",
                short_name: "spdSQL",
                description:
                    "Browser-based SQL playground. Run SQL queries locally without any database setup.",
                start_url: "/?source=pwa",
                display: "standalone",
                background_color: "#0f172a",
                theme_color: "#6366f1",
                icons: [
                    {
                        src: "/assets/light/android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/assets/light/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "/assets/light/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
                screenshots: [
                    {
                        src: "/screenshot/Desktop.png",
                        sizes: "1922x944",
                        type: "image/png",
                        form_factor: "wide",
                        label: "SQL editor and query runner",
                    },
                    {
                        src: "/screenshot/mobile.png",
                        sizes: "828x1792",
                        type: "image/png",
                        form_factor: "narrow",
                        label: "Results view on mobile",
                    },
                ],
                shortcuts: [
                    {
                        name: "SQL Playground",
                        short_name: "Playground",
                        description: "Open SQL editor",
                        url: "/app",
                        icons: [
                            {
                                src: "/assets/light/android-chrome-192x192.png",
                                sizes: "192x192",
                            },
                        ],
                    },
                ],
            },
            workbox: {
                maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
                globPatterns: ["**/*.{js,css,html,wasm,png,svg,ico}"],
                cleanupOutdatedCaches: true,
                skipWaiting: true,
                clientsClaim: true,
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "google-fonts-cache",
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "image-cache",
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 30,
                            },
                        },
                    },
                    {
                        urlPattern: /\.(?:js|css)$/,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "static-resources",
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 60 * 24 * 7,
                            },
                        },
                    },
                    {
                        urlPattern: /\.wasm$/,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "wasm-cache",
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 90,
                            },
                        },
                    },
                    {
                        urlPattern: /\.csv$/,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "csv-data-cache",
                            expiration: {
                                maxEntries: 20,
                                maxAgeSeconds: 60 * 60 * 24,
                            },
                        },
                    },
                ],
            },
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name]-[hash]-${BUILD_TIMESTAMP}.js`,
                chunkFileNames: `assets/[name]-[hash]-${BUILD_TIMESTAMP}.js`,
                assetFileNames: `assets/[name]-[hash]-${BUILD_TIMESTAMP}.[ext]`,
                manualChunks: {
                    "duckdb-wasm": ["@duckdb/duckdb-wasm"],
                    codemirror: [
                        "@codemirror/state",
                        "@codemirror/view",
                        "@codemirror/commands",
                        "@codemirror/lang-sql",
                    ],
                    vendor: ["react", "react-dom", "react-router"],
                },
            },
        },
        sourcemap: false,
        minify: "esbuild",
        chunkSizeWarningLimit: 1000,
        assetsInlineLimit: 0,
    },
    resolve: {
        dedupe: [
            "@codemirror/state",
            "@codemirror/view",
            "@codemirror/language",
        ],
    },
    optimizeDeps: {
        include: [
            "@codemirror/state",
            "@codemirror/view",
            "@codemirror/basic-setup",
        ],
    },
    server: {
        port: 4444,
    },
});
