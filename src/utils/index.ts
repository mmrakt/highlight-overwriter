import { Theme } from "../config/themes";
import { IgnoreList } from "../types";

export const toIgnoreListOfForm = (ignoreList: string[]) => {
  return ignoreList?.map((ignore) => {
    return { value: ignore };
  });
};
export const toIgnoreListOfStorage = (ignoreList: IgnoreList) => {
  return ignoreList?.map((ignore) => {
    return ignore.value;
  });
};
export const loadThemeStyle = async (
  themeName: Theme,
  callback: (value: any) => void
) => {
  try {
    const theme = await import(
      `../../node_modules/react-syntax-highlighter/dist/esm/styles/hljs/${themeName}.js`
    );
    callback(theme.default);
  } catch (error) {
    console.error(error);
  }
};
