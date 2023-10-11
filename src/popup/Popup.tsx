import SelectTheme from "./SelectTheme";
import { useStore } from "@nanostores/react";
import { $displayPage } from "../store/displayPage";
import Setting from "./Setting";

const Popup = () => {
  const displayPage = useStore($displayPage);
  switch (displayPage) {
    case "selectTheme":
      return <SelectTheme />;
    case "setting":
      return <Setting />;
  }
};

export default Popup;
