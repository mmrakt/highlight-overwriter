import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getStorage, sendMessageToContents, setStorage } from "../utils/chrome";
import { FromPopup } from "../config";
import IgnoreList from "../components/IgnoreList";

const Setting = () => {
  const [enableSwap, setEnableSwap] = useState<boolean | null>(null);
  useEffect(() => {
    getStorage(["enableSwap"]).then(({ enableSwap }) => {
      setEnableSwap(enableSwap);
    });
  }, []);
  const handleChangeEnableSwap = () => {
    // setEnableSwap(!enableSwap);
    // setStorage({ enableSwap: !enableSwap });
    // sendMessageToContents(FromPopup.toggle_enable_swap);
  };

  return (
    <div className="w-[350px]">
      <Header />
      <div className=" flex flex-col p-4 space-y-6">
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-default"></div>{" "}
              </>
            )}
          </label>
        </div>
        <IgnoreList />
      </div>
    </div>
  );
};

export default Setting;
