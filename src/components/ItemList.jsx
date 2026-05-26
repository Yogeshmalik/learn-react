import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import Button from "./Button";
import { addItem } from "../store/cartSlice";

const ItemList = ({ itemCards }) => {
  const dispatch = useDispatch();
  const handleAddItems = (item) => {
    dispatch(addItem(item));
  };

  // const itemCards = categoryItem?.card?.card?.itemCards;

  return (
    <div>
      {itemCards?.map((item) => (
        <span
          className=" bg-gray-100 px-4 flex w-full justify-betwee items-cente"
          key={item?.card?.info?.id}
        >
          <ul
            className="border-b last:border- border-gray-300 flex w-full p-2 justify-between space-x-2 items-cente"
            key={item?.card?.info?.id}
          >
            <li className="w-full items-start my-2">
              <span className="flex font-semibold md:text-lg w-ful">
                {item?.card?.info?.name}
              </span>
              <span>
                {item?.card?.info?.finalPrice &&
                  item?.card?.info?.defaultPrice && (
                    <div className="flex space-x-2 md:text-lg">
                      <span className="pr-1 line-through font-medium text-gray-500">
                        ₹ {item?.card?.info?.defaultPrice / 100}
                      </span>
                      <span className="pr-1 bg-violet-600 rounded-tl-xl rounded-br-xl text-white font-medium">
                        ₹ {item?.card?.info?.finalPrice / 100}
                      </span>
                    </div>
                  )}
              </span>
              <span>
                {!item?.card?.info?.defaultPrice &&
                  !item?.card?.info?.finalPrice &&
                  item?.card?.info?.price && (
                    <div className="flex space-x-2 md:text-lg">
                      <span className="pr-1 font-medium text-gray-900">
                        ₹ {item?.card?.info?.price / 100}
                      </span>
                    </div>
                  )}
              </span>
              <span>
                {!item?.card?.info?.defaultPrice &&
                  item?.card?.info?.finalPrice &&
                  item?.card?.info?.price && (
                    <div className="flex space-x-2 md:text-lg">
                      <span className="pr-1 line-through font-medium text-gray-500">
                        ₹ {item?.card?.info?.price / 100}
                      </span>
                      <span className="pr-1 bg-violet-600 rounded-tl-xl rounded-br-xl text-white font-medium">
                        ₹ {item?.card?.info?.finalPrice / 100}
                      </span>
                    </div>
                  )}
              </span>
              <span>
                {item?.card?.info?.defaultPrice &&
                  !item?.card?.info?.finalPrice && (
                    <div className="flex space-x-2 md:text-lg">
                      <span className="pr-1 font-medium text-gray-900">
                        ₹ {item?.card?.info?.defaultPrice / 100}
                      </span>
                    </div>
                  )}
              </span>
              <div className="rating-time flex space-x-1 align-middle items-center">
                {item?.card?.info?.ratings?.aggregatedRating?.ratingCount && (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                      strokecolor="rgba(2, 6, 12, 0.92)"
                      fillcolor="rgba(2, 6, 12, 0.92)"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="9"
                        fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                      ></circle>
                      <path
                        d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                        fill="white"
                      ></path>
                      <defs>
                        <linearGradient
                          id="StoreRating20_svg__paint0_linear_32982_71567"
                          x1="10"
                          y1="1"
                          x2="10"
                          y2="19"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#21973B"></stop>
                          <stop offset="1" stopColor="#128540"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="font-semibold">
                      {item?.card?.info?.ratings?.aggregatedRating?.rating}
                    </span>
                  </>
                )}
                {item?.card?.info?.ratings?.aggregatedRating.ratingCountV2 && (
                  <span className="font-semibold">
                    (
                    {item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2}
                    )
                  </span>
                )}
              </div>
              {item?.card?.info?.description && (
                <span className="flex py-4 text-gray-700">
                  {item?.card?.info?.description}
                </span>
              )}
            </li>
            <div className="flex w-full h-full my-auto max-h-28 max-w-24 md:max-h-28 md:max-w-42 items-center justify-center relative">
              {item?.card?.info?.imageId ? (
                <img
                  src={IMG_CDN_URL + item?.card?.info?.imageId}
                  alt="Dish Image"
                  className="flex self-center w-full h-full max-h-24 max-w-24 md:max-h-28 ml-auto md:max-w-42 object-cover rounded-xl shadow-lg hover:shadow-violet-400 transition-all ease-in-out duration-300 hover:scale-125"
                />
              ) : (
                <img
                  src="https://www.ilounge.com/wp-content/uploads/2019/11/no-image-found.jpg"
                  alt="Dish Image"
                  className="flex self-center w-full h-full max-h-24 max-w-16 md:max-h-28 ml-auto md:max-w-42 object-cover rounded-xl shadow-lg hover:shadow-violet-400 transition-all ease-in-out duration-300 hover:scale-125"
                />
              )}
              <Button
                size="small"
                color="black"
                label="Add+"
                className="absolute bottom-2.5 md:bottom-1.5"
                onClick={() => handleAddItems(item)}
              />
            </div>
          </ul>
        </span>
      ))}
    </div>
  );
};

export default ItemList;
