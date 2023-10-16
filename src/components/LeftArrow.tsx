import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

const LeftArrow = ({ className }: Props) => {
  return (
    <div
      className={twMerge(
        "icon-border block h-3 w-3 rotate-45 border-b-[2px] border-l-[2px]",
        className
      )}
    ></div>
  );
};

export default LeftArrow;
