import SyntaxHighlighter from "react-syntax-highlighter";
import { themes, Theme } from "../config/themes";
import { useEffect, useState } from "react";
import { getStorage, sendMessageToContents, setStorage } from "../utils/chrome";
import { StorageValue } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import { FromPopup } from "../config";
import Header from "../components/Header";
import SelectboxRow from "../components/SelectboxRow";
import Button from "../components/Button";

const Preview = ({ themeName }: { themeName: string }) => {
  const [themeStyle, setThemeStyle] = useState();
  useEffect(() => {
    const loadThemeStyle = async () => {
      try {
        const theme = await import(
          `../../node_modules/react-syntax-highlighter/dist/esm/styles/hljs/${themeName}.js`
        );
        setThemeStyle(theme.default);
      } catch (error) {
        console.error(error);
      }
    };

    loadThemeStyle();
  });
  return (
    <SyntaxHighlighter language="javascript" style={themeStyle}>
      {`const example = 'Hello, world!';\nconsole.log(example);`}
    </SyntaxHighlighter>
  );
};

const SelectTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>("");
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    getStorage(["themeName"]).then((data: StorageValue) => {
      setSelectedTheme(data.themeName as Theme);
    });
  }, []);

  const handleChange = (e: any) => {
    if (e.target.value) {
      setSelectedTheme(e.target.value);
    }
  };
  const handleApply = () => {
    setIsApplying(true);
    setStorage({ themeName: selectedTheme }).then(() => {
      setIsApplying(false);

      updateContentPage();
    });
  };

  const updateContentPage = () => {
    sendMessageToContents(FromPopup.update_theme);
  };
  return (
    <div className="w-[350px]">
      <Header />
      <div className="flex flex-col p-4 space-y-4">
        <SelectboxRow
          labelText="Theme"
          options={themes}
          selectedValue={selectedTheme}
          handleChange={handleChange}
        />
        <SelectboxRow
          labelText="Preview"
          options={["JavaScript", "PHP", "Python", "Java", "C++"]}
          // handleChange={handleChange}
        />

        <div className="flex flex-col space-y-2">
          {selectedTheme && <Preview themeName={selectedTheme} />}
        </div>

        <div className="self-end">
          <Button text="Apply" type="button" handleClick={handleApply} />
        </div>
      </div>
    </div>
  );
};

export default SelectTheme;
