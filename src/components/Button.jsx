

const Button = ({ label, onClick, type, src, color }) => {

  const colorMap = {
    orange: "text-orange-400 hover:bg-orange-400 border-orange-400",
    green: "text-green-600 hover:bg-green-600 border-green-600",
    blue: "text-blue-400 hover:bg-blue-400 border-blue-400",
    red: "text-red-400 hover:bg-red-400 border-red-400",
  };
  const selectedColor = colorMap[color] || colorMap.orange;
  
  return (
    <button
      onClick={onClick}
      type={type}
      className={`button-component md:min-w-20 w-fit h-auto rounded-md space-x-1 cursor-pointer text-orange-40 hover:text-white hover:bg-orange-40 items-center flex border-orange-40 justify-center p-1 md:p-1.5 w-ful transition-all duration-300 ease-in-out
        ${selectedColor}
        ${src ? "border-0 md:border" : "border"}
        `}
    >
      {src && (
        <img
          className="reset-icon max-h-6 md:max-h-5 cursor-pointer hover:bg-orange-"
          src={src}
          alt="Icon"
        />
      )}
      <span className={src ? "hidden md:flex" : "flex"}>
        {label.toUpperCase()}
      </span>
    </button>
  );
};

export default Button;
