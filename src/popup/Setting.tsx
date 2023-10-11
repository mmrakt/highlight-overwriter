import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getStorage, sendMessageToContents, setStorage } from "../utils/chrome";
import { FromPopup } from "../config";

const Setting = () => {
  const [enableSwap, setEnableSwap] = useState<boolean | null>(null);
  // const [editIgnoreList, setEditIgnoreList] = useState<string[]|null>(null)
  const [ignoreList, setIgnoreList] = useState<string[] | null>(null);
  console.log(ignoreList);
  useEffect(() => {
    getStorage(["enableSwap", "ignoreList"]).then(
      ({ enableSwap, ignoreList }) => {
        setEnableSwap(enableSwap);
        setIgnoreList(ignoreList);
      }
    );
  }, []);
  const handleChangeEnableSwap = () => {
    setEnableSwap(!enableSwap);
    setStorage({ enableSwap: !enableSwap });
    sendMessageToContents(FromPopup.toggle_enable_swap);
  };

  const handleInputEnter = (e: any, index: number) => {
    console.log("hoge");
    if (e.key !== "Enter") return;

    console.log(ignoreList, index);
    if (
      !ignoreList ||
      ignoreList.length !== index + 1 ||
      ignoreList[index] === ""
    )
      return;

    console.log("piyo");
    setIgnoreList([...ignoreList, ""]);
  };

  console.log();
  return (
    <div className="w-[400px]">
      <Header />
      <div className=" flex flex-col p-4 space-y-4">
        <div className="flex justify-between">
          <label htmlFor="syntaxSelect" className="text-md font-bold">
            Enable Syntax Swap
          </label>
          <label className="relative inline-flex cursor-pointer items-center">
            {enableSwap !== null && (
              <>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  onChange={handleChangeEnableSwap}
                  defaultChecked={enableSwap}
                />
                <div className="border-color peer h-4 w-10 rounded-full bg-gray-400 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
              </>
            )}
          </label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="syntaxSelect" className="text-md font-bold">
            Ignore Site List
          </label>
          {ignoreList !== null && (
            <div className="flex flex-col">
              {ignoreList.map((ignore, i) => (
                <input
                  type="text"
                  key={i}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={ignore}
                  onChange={(e) => {
                    setIgnoreList;
                  }}
                  onKeyDown={(e) => {
                    handleInputEnter(e, i);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;
