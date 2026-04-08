import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
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
    base: './',
    plugins: [react()],
})
