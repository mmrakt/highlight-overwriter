import SyntaxHighlighter from "react-syntax-highlighter";
import { themes, Theme } from "../config/themes";
import { useEffect, useState } from "react";
import { getStorage, sendMessageToContents, setStorage } from "../utils/chrome";
import { StorageValue } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import { FromPopup } from "../config";
import Header from "../components/Header";

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
    <div className="w-[400px]">
      <Header />
      <div className="flex flex-col p-4 space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="syntaxSelect" className="text-lg font-bold">
            Select Theme
          </label>
          <select
            id="syntaxSelect"
            className="p-2 border rounded"
            onChange={(e) => {
              handleChange(e);
            }}
            value={selectedTheme}
          >
            {themes.map((theme, index) => (
              <option key={index} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="uploadCSS" className="text-lg font-bold">
            Upload Custom CSS
          </label>
          <input
            type="file"
            accept=".css"
            id="uploadCSS"
            className="p-2 border rounded"
          />
          <button className="p-2 bg-blue-500 text-white rounded">Upload</button>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold">Preview</label>
          {selectedTheme && <Preview themeName={selectedTheme} />}
        </div>

        <button
          onClick={handleApply}
          className="p-2 bg-green-500 text-white rounded"
          disabled={isApplying}
        >
          {isApplying ? (
            <LoadingSpinner className="block mx-auto" />
          ) : (
            <>Apply</>
          )}
        </button>
      </div>
    </div>
  );
};

export default SelectTheme;
