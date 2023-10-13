import hljs from "highlight.js";
import { getStorage, runtime } from "../utils/chrome";
import { FromPopup } from "../config";

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

const handleEnableSwap = async () => {
  const toggledEnableSwap = (await getStorage(["enableSwap"])).enableSwap;
  if (toggledEnableSwap) {
    appendCssLink();
    hljs.highlightAll();
  } else {
    removeCssLink();
    // TODO: reloadなしで元に戻す方法
    location.reload();
  }
};

const isIgnoreSite = async () => {
  const ignoreList = (await getStorage(["ignoreList"])).ignoreList;
  const currentUrl = location.href;
  let isIgnoreSite = false;
  for (const ignore of ignoreList) {
    const ignoreUrl = new URL(ignore);
    let ignoreStr = ignoreUrl.hostname + ignoreUrl.pathname;
    ignoreStr = ignoreStr.replace("*", ".*");
    const pattern = new RegExp(`(http|https)://${ignoreStr}`);
    if (pattern.test(currentUrl)) {
      isIgnoreSite = true;
    }
  }

  return isIgnoreSite;
};

const init = async () => {
  const enableSwap = (await getStorage(["enableSwap"])).enableSwap;
  if (enableSwap && !(await isIgnoreSite())) {
    appendCssLink();
    hljs.highlightAll();
  }
};

runtime.onMessage.addListener(async (message: FromPopup) => {
  switch (message) {
    case "update-theme":
      removeCssLink();
      appendCssLink();
      break;
    case "toggle-enable-swap":
      handleEnableSwap();
      break;
    case "update-ignore-list":
      if (await isIgnoreSite()) {
        removeCssLink();
        location.reload();
      }
      break;
  }
});

init();
