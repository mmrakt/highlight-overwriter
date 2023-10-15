import { $displayPage } from "../store/displayPage";
import Cogwheel from "./Cogwheel";
import { useStore } from "@nanostores/react";
import LeftArrow from "./LeftArrow";
import logo from "../assets/logo.svg";

const Header = () => {
  const displayPage = useStore($displayPage);

  return (
    <div className="h-10 relative flex justify-center pt-2">
      {displayPage === "selectTheme" && (
        <button
          className="absolute right-3 top-3"
          onClick={() => {
            $displayPage.set("setting");
          }}
        >
          <Cogwheel />
        </button>
      )}
      <span className="flex flex-row gap-2 items-center text-base">
        <img src={logo} alt="" width={24} height={24} />
        Syntax Swap
      </span>
      {displayPage === "setting" && (
        <button
          className="absolute left-4 top-4"
          onClick={() => {
            $displayPage.set("selectTheme");
          }}
        >
          <LeftArrow />
        </button>
      )}
    </div>
  );
};

export default Header;
