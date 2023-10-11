import { $displayPage } from "../store/displayPage";
import Cogwheel from "./Cogwheel";
import { useStore } from "@nanostores/react";
import LeftArrow from "./LeftArrow";

const Header = () => {
  const displayPage = useStore($displayPage);

  return (
    <div className="font-bold flex justify-between items-center bg-gray-200 p-4 h-10">
      {displayPage === "selectTheme" ? (
        <span></span>
      ) : (
        <button
          className=""
          onClick={() => {
            $displayPage.set("selectTheme");
          }}
        >
          <LeftArrow />
        </button>
      )}
      Syntax Swap
      {displayPage === "setting" ? (
        <span></span>
      ) : (
        <button
          className=""
          onClick={() => {
            $displayPage.set("setting");
          }}
        >
          <Cogwheel />
        </button>
      )}
    </div>
  );
};

export default Header;
