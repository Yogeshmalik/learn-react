import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";
import useOnline from "../hooks/useOnline";
import UserContext from "../providers/UserContext";

const UserDropdownMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const isOnline = useOnline();
  const navigate = useNavigate();
  const data = useContext(UserContext);
  // console.log("data-UserDropdownMenu", data);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAuth");
    // Clear the saved name
    localStorage.removeItem("userName");
    navigate("/auth/login");
  };

  const firstNameLetter = data?.loggedInUser?.charAt(0).toUpperCase();
  // console.log('firstNameLetter',firstNameLetter)

  const UserDropdownItems = [
    {
      label: data?.loggedInUser,
      icon: "https://cdn-icons-png.flaticon.com/512/9653/9653907.png",
      color: "bg-blue-500 text-white font-semibold border-b",
      disabled: true,
    },
    isLoggedIn
      ? {
          icon: "https://cdn-icons-png.flaticon.com/512/12635/12635060.png",
          label: "Logout",
          color:
            "bg-white text-red-500 hover:bg-red-600 hover:text-white font-semibold cursor-pointer",
          action: handleLogout,
        }
      : {
          icon: "https://cdn-icons-png.flaticon.com/512/9653/9653907.png",
          label: "Login",
          color:
            "bg-green-500 text-white hover:bg-green-600 font-semibold border-b cursor-pointer",
          action: () => {
            setIsLoggedIn(true);
            navigate("/auth/login");
          },
        },
  ];

  useEffect(() => {
    const handleClickOutside = () => setShowMenu(false);
    if (showMenu) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [showMenu]);

  return (
    <div className="relative ">
      <span className=" rounded-full">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu((prev) => !prev);
          }}
          color="orange"
          className="md:rounded-full rounded-[50%] md:px-3 p-1 px-3 py-1 h-auto md:h-auto md:w-full w-full"
          label={firstNameLetter || "User"}
          // src="https://cdn-icons-png.flaticon.com/512/17552/17552541.png"
        />
      </span>

      {showMenu && (
        <div className="absolute right-0 mt-2 min-w-40 md:w-full bg-white shadow-lg hover:shadow-amber-500 rounded-xl z-50">
          {UserDropdownItems?.map((dropownItem) => (
            <span
              key={dropownItem.label}
              onClick={(e) => {
                e.stopPropagation();
                if (!dropownItem.disabled && dropownItem.action)
                  dropownItem.action();
              }}
              className={`flex items-center space-x-2 px-2 py-1 text-sm w-full uppercase border-b border-b-gray-200 first:rounded-t-md last:rounded-b-md last:border-b-0 mt- 
                    ${
                      dropownItem.disabled
                        ? "cursor-default "
                        : dropownItem.color
                    }`}
            >
              <img
                src={dropownItem?.icon}
                alt={dropownItem.label}
                className="flex w-6 h-6"
              />
              <span className="font-semibold">{dropownItem?.label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
export default UserDropdownMenu;
