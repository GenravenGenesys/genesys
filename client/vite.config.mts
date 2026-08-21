import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
        host: true,
        proxy: {
            '/api': {
                target: process.env.VITE_API_URL || 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                proxyTimeout: 0,
                timeout: 0
            },
        },
    },
    base: process.env.VITE_BASE_PATH || './',
    plugins: [react()],
})
