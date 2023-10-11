import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

const LeftArrow = ({ className }: Props) => {
  return (
    <div
      className={twMerge(
        "icon-border-color block h-3 w-3 border-gray-800 rotate-45 border-b-[2px] border-l-[2px]",
        className
      )}
    ></div>
  );
};

export default LeftArrow;
