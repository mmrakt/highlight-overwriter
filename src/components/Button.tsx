type Props = {
  text: string;
  type?: "button" | "submit";
  handleClick?: () => void;
};
const Button = ({ text, type, handleClick }: Props) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className="rounded-md px-2 py-1 bg-primary-default text-white hover:bg-primary-light"
    >
      {text}
    </button>
  );
};

export default Button;
