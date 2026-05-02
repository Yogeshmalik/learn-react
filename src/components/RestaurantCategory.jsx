import { useState } from "react";
import { useParams } from "react-router";
import useRestaurantDetails from "../hooks/useRestaurantDetails";
import { IMG_CDN_URL } from "../constants";

const RestaurantCategory = ({ restaurantCategory }) => {
  const [showItems, setShowItems] = useState(true);
  console.log("restaurantCategory", restaurantCategory);

  const displayItems = () => {
    setShowItems((prev) => !prev);
  };

  return (
    <div className="flex flex-col rounded-lg my-2 min-h-20 space-y-2 max-w-5xl mx-auto">
      {restaurantCategory.map((category) => (
        <div
          key={category?.card?.card?.title}
          className="flex flex-col justify-between p-2 cursor-pointer w-full"
          onClick={displayItems}
        >
          <div className="flex justify-between bg-gray-200 py-4 px-2 rounded-lg">
            <span className="flex font-bold">
              {category?.card?.card?.title} (
              {category?.card?.card?.title?.length})
            </span>
            <span className="flex pb-1 items-center h-full">&#x2304;</span>
          </div>
          {showItems && (
            <div className="block">
              {category?.card?.card?.itemCards?.map((item) => (
                <ul
                  className="border-b p-2 flex justify-between"
                  key={item?.card?.info?.id}
                >
                  <li>
                    <span className="flex font-semibold text-xl">
                      {item?.card?.info?.name}
                    </span>
                    <span>
                      {item?.card?.info?.finalPrice &&
                        item?.card?.info?.defaultPrice && (
                          <div className="flex space-x-2 text-lg">
                            <span className="p-1 line-through font-medium text-gray-500">
                              ₹ {item?.card?.info?.defaultPrice / 100}
                            </span>
                            <span className="p-1 bg-violet-600 rounded-tl-xl rounded-br-xl text-white font-medium">
                              ₹ {item?.card?.info?.finalPrice / 100}
                            </span>
                          </div>
                        )}
                    </span>
                    <span>
                      {item?.card?.info?.price && (
                        <div className="flex space-x-2 text-lg">
                          <span className="p-1 font-medium text-gray-900">
                            ₹ {item?.card?.info?.price / 100}
                          </span>
                        </div>
                      )}
                    </span>
                    <span>
                      {item?.card?.info?.defaultPrice && !item?.card?.info?.finalPrice &&(
                        <div className="flex space-x-2 text-lg">
                          <span className="p-1 font-medium text-gray-900">
                            ₹ {item?.card?.info?.defaultPrice / 100}
                          </span>
                        </div>
                      )}
                    </span>
                  </li>
                  <div className="flex relative max-h-46 max-w-40">
                    <img
                      src={IMG_CDN_URL + item?.card?.info?.imageId}
                      alt="Dish Image"
                      className="flex w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </ul>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RestaurantCategory;
