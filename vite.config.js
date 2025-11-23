import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/uk-visa-practice/', // ⚠️ 注意：這裡必須跟你的 GitHub Repository 名稱一樣
})