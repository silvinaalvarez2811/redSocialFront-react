import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": "http://localhost:5000",
      "/posts": "http://localhost:5000",
      "/comments": "http://localhost:5000",
      "/tags": "http://localhost:5000",
    },
  },
});
