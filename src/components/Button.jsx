const Button = ({ label, onClick, type, src }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`button-component md:min-w-20 w-fit h-auto rounded-md space-x-1 cursor-pointer text-orange-400 hover:text-white hover:bg-orange-400 items-center flex  border-orange-400 justify-center md:p-1.5 w-ful transition-all duration-300 ease-in-out
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
