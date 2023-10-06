/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@dashboard": path.resolve(__dirname, "./src/dashboard"),
      "@src": path.resolve(__dirname, "./src"),
    },
  },
  base: "/", // the base URL should be set to the root path ("/") because Vercel handles the routing and serves your app from the root.
  plugins: [react()],
  server: {
    port: 3000,
  },
});