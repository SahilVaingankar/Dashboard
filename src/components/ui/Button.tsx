interface ButtonProps {
  color: "red" | "blue" | "green" | "white";
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const colorClasses = {
  red: "bg-red-500 active:bg-red-700 hover:bg-red-400",
  blue: "bg-blue-500 active:bg-blue-700 hover:bg-blue-400",
  green: "bg-green-500 active:bg-green-700 hover:bg-green-400",
  white: "bg-white active:bg-white hover:bg-gray-400 text-black",
};

const Button = ({ color, text, type, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${colorClasses[color]} p-2 rounded-md cursor-pointer hover:outline hover:outline-white active:bg-${color}-700`}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
