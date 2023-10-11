import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Syntax Swap",
  description: "Overwrite syntax highlight",
  version: "0.1.0",
  action: { default_popup: "popup.html" },
  content_scripts: [
    {
      matches: ["https://zenn.dev/dotdotdot/articles/*", "https://qiita.com/*"],
      js: ["src/content-scripts/main.ts"],
    },
  ],
  background: {
    service_worker: "src/background/main.ts",
    type: "module",
  },
  permissions: ["storage", "tabs", "notifications"],
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
