import { FromContents } from "../config";
import { Theme } from "../config/themes";

export type StorageValue = {
  themeName: Theme;
};

export type StorageKey = keyof StorageValue;

export type Message = {
  type: FromContents;
  data?: any;
};
