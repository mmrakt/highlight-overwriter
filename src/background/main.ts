import { DEFAULT_THEME_NAME } from "../config/themes";
import { runtime, getStorage, setStorage } from "../utils/chrome";

// installed event
runtime.onInstalled.addListener(async () => {
  getStorage(["themeName"]).then(({ themeName }) => {
    if (!themeName) {
      setStorage({
        themeName: DEFAULT_THEME_NAME,
        enableSwap: true,
        ignoreList: [""],
      });
    }
  });
});
