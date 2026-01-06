import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        dedupe: [
            '@codemirror/state',
            '@codemirror/view',
            '@codemirror/language',
        ],
    },
    optimizeDeps: {
        include: [
            '@codemirror/state',
            '@codemirror/view',
            '@codemirror/basic-setup',
        ],
    },
    server: {
        port: 4444,
    },
});
