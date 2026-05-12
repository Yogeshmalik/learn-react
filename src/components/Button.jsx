const Button = ({ label, onClick, type, src, color, className, size }) => {
  const colorMap = {
    orange:
      "text-orange-400 hover:bg-orange-400 border-orange-400 hover:text-white",
    green:
      "text-green-600 hover:bg-green-600 border-green-600 hover:text-white",
    blue: "text-blue-400 hover:bg-blue-400 border-blue-400 hover:text-white",
    red: "text-red-500 hover:bg-red-500 border-red-500 hover:text-white",
    black: "text-white bg-black hover:bg-white border-black hover:text-black",
    white: "text-black bg-white hover:bg-black border-black hover:text-black",
    noColor: "",
  };
  const selectedColor = colorMap[color] || colorMap.orange;

  const sizeMap = {
    small: "md:min-w-none w-fit h-auto p-1 font-medium text-sm",
    regular: "md:min-w- w-fit h-auto p-0.5 md:p-1.5 font-semibold text-base",
    large: "md:min-w- w-fit h-auto p-3 md:p-2 font-semibold text-lg",
  };
  const selectedSize = sizeMap[size] || sizeMap.regular;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`button-component rounded-md cursor-pointer items-center flex justify-center transition-colors duration-300 ease-in-out active:scale-95
        ${selectedColor}
        ${selectedSize}
        ${className}
        ${src ? "border-0 md:border space-x-1" : "border"}
        `}
    >
      {src && (
        <img
          className="reset-icon max-h-6 md:max-h-5 cursor-pointer hover:bg-orange- bg-none"
          src={src}
          alt="Icon"
        />
      )}
      <span className={`uppercase ${src ? "hidden md:flex" : "flex"}`}>
        {label && label}
      </span>
    </button>
  );
};

export default Button;
