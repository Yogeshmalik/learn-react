import { useContext } from "react";
import UserContext from "../providers/UserContext";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart } from "../store/cartSlice";
import ItemList from "../components/ItemList";

const Cart = () => {
  const data = useContext(UserContext);
  const firstName = data?.loggedInUser?.trim().split(" ")[0];

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex flex-col gap-4 p-2 max-w-7xl w-full mx-auto items-center overflow-auto">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="flex text-xl md:text-3xl uppercase font-semibold text-orange-400 items-center mx-auto">
          {firstName}'s Cart ({cartItems.length} Items)
        </h1>
        <Button label="Clear Cart" onClick={handleClearCart} color="red" />
      </div>
      <div className="flex flex-col md:max-w-[50%] pb-10">
        <ItemList isCart={true} itemCards={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
