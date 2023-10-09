import SyntaxHighlighter from "react-syntax-highlighter";
import { themes, Theme } from "../config/themes";
import { useEffect, useState } from "react";

const Preview = ({ themeName }: { themeName: string }) => {
  const [themeStyle, setThemeStyle] = useState();
  useEffect(() => {
    const loadThemeStyle = async () => {
      const theme = await import(
        `../../node_modules/react-syntax-highlighter/dist/esm/styles/hljs/${themeName}.js`
      );
      setThemeStyle(theme.default);
    };

    loadThemeStyle();
  });
  return (
    <SyntaxHighlighter language="javascript" style={themeStyle}>
      {`const example = 'Hello, world!';\nconsole.log(example);`}
    </SyntaxHighlighter>
  );
};

const Popup = () => {
  const defaultTheme = "vs";
  const [selectedTheme, setSelectedTheme] = useState<Theme>(defaultTheme);

  const handleChange = (e: any) => {
    if (e.target.value) {
      setSelectedTheme(e.target.value);
    }
  };
  return (
    <div className="w-[400px] flex flex-col p-4 space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="syntaxSelect" className="text-lg font-bold">
          Select Syntax Highlight
        </label>
        <select
          id="syntaxSelect"
          className="p-2 border rounded"
          onChange={(e) => {
            handleChange(e);
          }}
          defaultValue={selectedTheme}
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
        <Preview themeName={selectedTheme} />
      </div>

      <button className="p-2 bg-green-500 text-white rounded">Apply</button>
    </div>
  );
};

export default Popup;
