import { FromContents } from "../config";
import { Theme } from "../config/themes";
import { Language } from "../config/languages";

export type StorageValue = {
  themeName: Theme;
  enableSwap: boolean;
  ignoreList: string[];
  previewLanguage: Language;
};

export type StorageKey = keyof StorageValue;

export type Message = {
  type: FromContents;
  data?: any;
};

export type DisplayPage = "selectTheme" | "setting";

export type IgnoreList = {
  value: string;
}[];
