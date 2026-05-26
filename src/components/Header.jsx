import { useState, useContext, useEffect } from "react";
import { TitleImg } from "../utils/constants";
import { Link, useNavigate } from "react-router";
import Button from "./Button";
import Cart from "../pages/Cart";
import useOnline from "../hooks/useOnline";
import UserContext from "../providers/UserContext";
import UserDropdownMenu from "./UserDropdownMenu";
import { useSelector } from "react-redux";

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
  const isOnline = useOnline();
  return (
    <ul className="navitem-list flex space-x-1 md:space-x-5 items-center">
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
      <span label="Online Status" className="ml- text-2xl">
        {isOnline ? (
          <img
            src={
              "https://cdn-icons-png.flaticon.com/512/7749/7749544.png" ||
              "https://png.pngtree.com/png-vector/20230926/ourmid/pngtree-green-wifi-symbol-network-png-image_10115831.png"
            }
            className="w-10 h-auto flex"
          />
        ) : (
          "🔴"
        )}
      </span>
    </ul>
  );
};

const CartButton = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);
  console.log("cartItems", cartItems);
  return (
    <Link to="/cart" className="flex items-center ">
      <Button
        label={`Cart (${cartItems.length})`}
        src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/shopping-cart-trolley-icon.png"
        // onClick={navigate("/cart")}
      />
    </Link>
  );
};

const Header = () => {
  return (
    <div className="header-component p-2 rounded-b-4xl opacity-95 bg-gray-100 h-16 md:h-20 w-full shadow-lg z-50 items-center fixed top-0 right-0 left-0 mb-2 overflow-hidde">
      <span className="max-w-7xl w-full flex justify-between h-full items-center mx-auto">
        <Title />
        <NavItems />
        <span className="flex space-x-1 md:space-x-">
          <CartButton />
          <UserDropdownMenu />
        </span>
      </span>
    </div>
  );
};

export default Header;
