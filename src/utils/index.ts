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
