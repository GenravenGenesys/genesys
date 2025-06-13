import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    base: './',
    plugins: [react()],
    build: {
        outDir: '../server/src/main/resources/static/',
        emptyOutDir: true,
    }
})
