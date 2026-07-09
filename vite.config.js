import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: "192.168.0.16",
    port: 3002,
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        privacy: "privacy-policy.html",
        terms: "terms-conditions.html",
      },
    },
  },
});
