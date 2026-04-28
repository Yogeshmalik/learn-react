const Button = ({ label, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="button-component min-w-20 h-auto rounded-md cursor-pointer text-orange-400 hover:text-white hover:bg-orange-400 items-center flex border border-orange-400 justify-center p-1.5 w-full transition-all duration-300 ease-in-out"
    >
      {label}
    </button>
  );
};

export default Button;
