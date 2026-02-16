import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cardServerPlugin from './vite-plugin-card-server'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), cardServerPlugin()],
})
