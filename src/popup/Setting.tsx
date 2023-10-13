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
    setEnableSwap(!enableSwap);
    setStorage({ enableSwap: !enableSwap });
    sendMessageToContents(FromPopup.toggle_enable_swap);
  };

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
        <IgnoreList />
      </div>
    </div>
  );
};

export default Setting;
