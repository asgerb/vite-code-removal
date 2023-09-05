import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    clearOutputPath: true,
    minify: false,
    lib: {
      entry: {
        admin: resolve(__dirname, "admin.js"),
      },
      name: "@asgerb/vite-code-removal",
    },
  },
})
