import { FromContents } from "../config";
import { Theme } from "../config/themes";

export type StorageValue = {
  themeName: Theme;
  enableSwap: boolean;
  ignoreList: string[];
};

export type StorageKey = keyof StorageValue;

export type Message = {
  type: FromContents;
  data?: any;
};

export type DisplayPage = "selectTheme" | "setting";
