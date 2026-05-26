import { useState } from "react";
import { useParams } from "react-router";
import useRestaurantDetails from "../hooks/useRestaurantDetails";
import { IMG_CDN_URL } from "../utils/constants";
import Button from "./Button";
import ItemList from "./ItemList";

const RestaurantCategory = ({
  restaurantCategoryInfo,
  category,
  setShowItems,
  showItems,
}) => {
  // console.log("category", category);
  const { restaurantId } = useParams();

  const displayItems = () => {
    setShowItems();
  };

  return (
    <div className="flex flex-col rounded-lg md:my-2 md:min-h-20 space-y-2 max-w-5xl mx-auto ">
      <div className="flex flex-col justify-between m-2 mx-auto w-full">
        <div
          className="flex text-lg justify-between bg-gray-300 py-1 px-3 md:py-4 md:px-6 rounded-t-lg cursor-pointer hover:shadow-lg shadow-amber-200"
          onClick={displayItems}
        >
          <span className="flex font-semibold md:font-bold">
            {category?.card?.card?.title} ({category?.card?.card?.title?.length}
            )
          </span>
          <span className="flex pb-1 items-center h-full">&#x2304;</span>
        </div>
        {showItems && (
          <div className="block z-20">
            <ItemList itemCards={category?.card?.card?.itemCards} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCategory;
