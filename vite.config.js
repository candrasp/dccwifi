import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [tailwindcss(), cloudflare()],
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