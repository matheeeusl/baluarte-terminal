import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    strictPort: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  // Preserve IDs needed for querySelector (#screen-area, #knob1, #knob2)
                  cleanupIds: false,
                },
              },
            },
          ],
        },
      },
    }),
  ],
  base: "/baluarte-terminal/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
  },
});
