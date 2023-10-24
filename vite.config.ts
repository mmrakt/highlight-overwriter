import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";
import { version } from "./extension-version.json";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Syntax Swap",
  description:
    "Overwrite the syntax highlighting of code blocks on a web page with your favorite theme",
  version,
  icons: {
    "16": "public/img/icon-16.png",
    "48": "public/img/icon-48.png",
    "128": "public/img/icon-128.png",
  },
  action: { default_popup: "popup.html" },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content-scripts/main.ts"],
    },
  ],
  background: {
    service_worker: "src/background/main.ts",
    type: "module",
  },
  permissions: ["storage", "activeTab"],
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  publicDir: false,
});
