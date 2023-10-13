import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { getStorage, setStorage } from "../utils/chrome";
import { toIgnoreListOfForm, toIgnoreListOfStorage } from "../utils";
import { IgnoreList } from "../types";

const IgnoreList = () => {
  const [ignoreList, setIgnoreList] = useState<string[] | null>(null);
  useEffect(() => {
    getStorage(["ignoreList"]).then(({ ignoreList }) => {
      setIgnoreList(ignoreList);
    });
  }, []);

  if (ignoreList === null) return null;

  return (
    <IgnoreListForm registeredIgnoreList={toIgnoreListOfForm(ignoreList)} />
  );
};

type Props = {
  registeredIgnoreList: { value: string }[];
};

const IgnoreListForm = ({ registeredIgnoreList }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      ignoreList: [...registeredIgnoreList, { value: "" }],
    },
  });
  const { fields, prepend, append, remove, replace } = useFieldArray({
    control,
    name: "ignoreList",
  });
  const onSubmit = ({ ignoreList }: { ignoreList: IgnoreList }) => {
    if (!isDirty) return;

    // setStorage(toIgnoreListOfStorage(ignoreList));
  };

  const handleInputEnter = (e: any, id: string) => {
    if (e.key !== "Enter") return;

    const findIndex = fields.findIndex((field) => field.id === id);
    if (!findIndex) return;

    // 最後尾のfieldが空でない場合
    // TODO: watch()以外で最新のvalueを参照する方法調べる
    if (
      findIndex <= 0 ||
      fields.length !== findIndex + 1 ||
      watch(`ignoreList.${findIndex}.value`) === ""
    )
      return;

    append({ value: "" });
  };

  const handleInputBlur = (index: number) => {
    // 最後の要素の時
    if (index + 1 === fields.length) {
      if (watch(`ignoreList.${index}.value`) === "") return;
      append({ value: "" });
    } else {
      if (watch(`ignoreList.${index}.value`) !== "") return;
      remove(index);
    }
  };

  return (
    <div className="flex justify-between">
      <label htmlFor="syntaxSelect" className="text-md font-bold">
        Ignore Site List
      </label>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          {fields.map((field, index) => (
            <input
              type="text"
              key={field.id}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // onKeyDown={(e) => {
              //   handleInputEnter(e, field.id);
              // }}
              {...register(`ignoreList.${index}.value`)}
              onBlur={() => {
                handleInputBlur(index);
              }}
            />
          ))}
        </div>
        <div className="mt-2 ">
          <button
            type="submit"
            className=" rounded-md px-2 py-1 bg-blue-700 text-white hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default IgnoreList;