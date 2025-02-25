import { defineConfig } from "vite";
import fs from "fs-extra";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    server: {
      port: 8080,
    },
    plugins: [
      {
        name: "copy-neutralino-js",
        writeBundle() {
          const sourcePath = path.resolve(__dirname, "neutralino.js");
          const destPath = path.resolve(__dirname, "dist", "neutralino.js");

          fs.copySync(sourcePath, destPath);

          console.log("neutralino.js был скопирован в dist/");
        },
      },
    ],
  };
});
