/*
 * @Author: 王志永
 * @Date: 2026-03-20 18:42:48
 * @LastEditors: 王志永
 * @LastEditTime: 2026-03-20 18:48:04
 * @Description: 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
