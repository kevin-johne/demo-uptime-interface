import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nanoid } from "nanoid";

const localPort = 3001;
const target = "https://uptime.com";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      VITE_SECRET: nanoid(32),
    },
  },
  server: {
    host: true,
    port: localPort,
    proxy: {
      "/api": {
        target,
        changeOrigin: true,
      },
    },
  },
});
