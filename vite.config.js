import { defineConfig } from "vite"

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: "./lib/main.js",
      name: "ViteCodeRemoval",
      fileName: "main",
    },
  },
})
