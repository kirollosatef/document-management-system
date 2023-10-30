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
      "@store": path.resolve(__dirname, "./src/store"),
      "@src": path.resolve(__dirname, "./src"),
    },
  },
  base: "/", // the base URL should be set to the root path ("/") because Vercel handles the routing and serves your app from the root.
  plugins: [react()],
  server: {
    // host: "0.0.0.0", // allows the server to accept connections on all IPv4 addresses
    port: 3000,
    proxy: {
      "/api": "http://localhost:8080" , //import.meta.env.VITE_API,
    },
  },
});
