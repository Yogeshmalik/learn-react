import { useState } from "react";
import { TitleImg } from "../constants";
import { Link, useNavigate } from "react-router";
import Button from "./Button";
import useOnline from "../hooks/useOnline";

const Title = () => {
  return (
    <Link to="/" className="title-div">
      <img
        className="title-img flex max-w-28 md:max-w-40 h-auto w-full"
        src={TitleImg}
        alt="title-image"
      />
    </Link>
  );
};

const navLinks = [
  {
    page: "Home",
    link: "/",
    src: "https://gimgs2.nohat.cc/thumb/f/640/home-icon-png-orange--m2i8K9m2N4m2K9m2.jpg",
  },
  {
    page: "About",
    link: "/about",
    src: "https://www.freeiconspng.com/uploads/about-us-icon-29.png",
  },
  {
    page: "Contact",
    link: "/contact",
    src: "https://www.citypng.com/public/uploads/preview/hd-orange-round-circle-phone-icon-png-701751695060018jyrdgtl0mm.png",
  },
];

const NavItems = () => {
  return (
    <ul className="navitem-list flex space-x-5 items-center">
      {navLinks.map((item) => {
        return (
          <Link
            to={item.link}
            key={item.link}
            className="Link flex items-center space-x-1"
          >
            {item.src && (
              <img
                className="max-h-6 md:max-h-5 cursor-pointer hover:bg-white items-center flex"
                src={item.src}
                alt="nav-icon"
              />
            )}
            <li className="md:flex hidden font-semibold hover:text-orange-400">
              {item.page}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

const LoginLogoutButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const isOnline = useOnline();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAuth");
    navigate("/auth/login");
  };

  return (
    <div className="login-logout-buttons flex items-center">
      {isLoggedIn ? (
        <>
          <Button
            onClick={handleLogout}
            label="Logout"
            src={"https://cdn-icons-png.flaticon.com/512/9653/9653907.png"}
          />
          <span className="ml-1 text-2xl">{isOnline ? "🟢" : "🔴"}</span>
        </>
      ) : (
        <Button
          onClick={() => {
            setIsLoggedIn(true);
          }}
          label="Login"
        />
      )}
    </div>
  );
};

const Header = () => {
  return (
    <div className="header-component p-2 rounded-b-4xl opacity-95 bg-gray-100 h-16 md:h-20 w-full shadow-lg z-50 items-center fixed top-0 right-0 left-0 mb-2 overflow-hidden">
      <span className="max-w-7xl w-full flex justify-between h-full items-center mx-auto">
        <Title />
        <NavItems />
        <LoginLogoutButtons />
      </span>
    </div>
  );
};

export default Header;
