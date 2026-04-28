import { useState } from "react";
import { TitleImg } from "../constants";
import { Link } from "react-router";
import Button from "./Button";

const Title = () => {
  return (
    <Link to="/" className="title-div">
      <img
        className="title-img flex max-w-40 h-auto w-full"
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
  },
  {
    page: "About",
    link: "/about",
  },
  {
    page: "Contact",
    link: "/contact",
  },
];

const NavItems = () => {
  return (
    <ul className="navitem-list flex space-x-5 items-center">
      {navLinks.map((item) => {
        return (
          <Link to={item.link} key={item.link} className="Link">
            <li className=" font-semibold hover:text-orange-400">
              {" "}
              {item.page}{" "}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

const LoginLogoutButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAuth");
    window.location.href = "auth/login";
  };

  return (
    <div className="login-logout-buttons flex items-center">
      {isLoggedIn ? (
        <Button onClick={handleLogout} label="Logout" />
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
    <div className="header-component flex justify-between p-2 border h-18 w-full">
      <Title />
      <NavItems />
      <LoginLogoutButtons />
    </div>
  );
};

export default Header;
