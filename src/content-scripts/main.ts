import hljs from "highlight.js";
import { getStorage, runtime } from "../utils/chrome";

const CSS_LINK_ID = "syntax-swap-style";
const createCssLink = async () => {
  const cssLink = document.createElement("link");
  cssLink.type = "text/css";
  cssLink.rel = "stylesheet";
  cssLink.id = CSS_LINK_ID;

  const themeName = (await getStorage(["themeName"])).themeName;

  cssLink.href = `http://localhost:5173/styles/${themeName}.css`;
  return cssLink;
};

const appendCssLink = async () => {
  document.getElementsByTagName("head")[0].appendChild(await createCssLink());
};

const removeCssLink = () => {
  document.getElementById(CSS_LINK_ID)?.remove();
};

runtime.onMessage.addListener((message) => {
  switch (message) {
    case "update-theme":
      removeCssLink();
      appendCssLink();
  }
});

appendCssLink();
hljs.highlightAll();
