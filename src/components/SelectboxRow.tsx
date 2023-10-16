import { ChangeEvent } from "react";
import { Language } from "../config/languages";
import { Theme } from "../config/themes";

type Props = {
  labelText: string;
  options: Theme[] | Language[];
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedValue?: string;
};

const SelectboxRow = ({
  labelText,
  options,
  handleChange,
  selectedValue,
}: Props) => {
  return (
    <div className="flex flex-row items-center space-y-2 justify-between">
      <label htmlFor="syntaxSelect" className="text-sm">
        {labelText}
      </label>
      <select
        id="syntaxSelect"
        className="p-1 border rounded w-52"
        onChange={(event) => {
          handleChange(event);
        }}
        value={selectedValue}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectboxRow;
