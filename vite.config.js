import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Use relative asset paths so the same build works on custom domains and repo subpaths.
  base: "./",
  server: {
    port: 5173,
    // If 5173 is taken (e.g. another `npm run dev`), use the next free port instead of failing.
    strictPort: false
  }
});






