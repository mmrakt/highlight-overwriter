import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { getStorage, sendMessageToContents, setStorage } from "../utils/chrome";
import { toIgnoreListOfForm, toIgnoreListOfStorage } from "../utils";
import { IgnoreList as IgnoreListType } from "../types";
import { FromPopup } from "../config";
import Button from "./Button";

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
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      ignoreList: [...registeredIgnoreList, { value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ignoreList",
  });
  const onSubmit = ({ ignoreList }: { ignoreList: IgnoreListType }) => {
    if (!isDirty) return;

    getStorage(["ignoreList"]).then(({ ignoreList }) => {
      console.log(ignoreList);
    });
    try {
      setStorage({
        ignoreList: toIgnoreListOfStorage(ignoreList).slice(
          0,
          ignoreList.length - 1
        ),
      });
      sendMessageToContents(FromPopup.update_ignore_list);
    } catch (error) {
      console.error(error);
    }
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
      <label htmlFor="ignoreList" className="text-md font-bold">
        Ignore Site List
      </label>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col">
          {fields.map((field, index) => (
            <input
              type="text"
              key={field.id}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(`ignoreList.${index}.value`)}
              onBlur={() => {
                handleInputBlur(index);
              }}
            />
          ))}
        </div>
        <div className="mt-2 self-end">
          <Button text="Save" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default IgnoreList;
