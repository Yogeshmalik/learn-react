import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { IMG_CDN_URL, RESTAURANT_DETAILS_URL } from "../constants";
import NoImageFoundImg from "../assets/no-image-found.jpg";
import Shimmer from "../components/Shimmer";
import useRestaurantDetails from "../hooks/useRestaurantDetails";
import RestaurantCategory from "../components/RestaurantCategory";

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const { loading, restaurantDetail } = useRestaurantDetails(restaurantId);
  const [showItems, setShowItems] = useState(true);

  const displayItems = () => {
    setShowItems(!showItems);
  };

  console.log("restaurantId", restaurantId);
  console.log("restaurantDetail respage", restaurantDetail);
  const location = useLocation();
  const restaurantData = location?.state?.restaurant;

  const restaurantCategoryInfo = restaurantDetail?.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
  );
  console.log("restaurantCategoryInfo ResPage", restaurantCategoryInfo);

  return (
    <div className="restaurant-details-page max-w-7xl w-full mx-auto p-2 md:p-0">
      {loading ? (
        <Shimmer />
      ) : (
        <>
          <div className="restaurant-details md:flex space-x-4 justify-between max-w-5xl mx-auto w-full">
            <div className="items-cente my-5 rounded-2xl p-4 md:p-10 flex mx-auto justify-between w-full shadow-2xl">
              <div className="font-semibold md:flex flex-col uppercase items-cente space-x-2">
                <div className="flex flex-wrap justify-start items-center text-left space-x-1 w-fu">
                  <span className="flex text-xl font-bold md:text-3xl text-black">
                    {restaurantData?.name || "Restaurant"}
                  </span>
                  <span className="text-sm md:text-lg text-gray-400 italic font-normal">
                    ({restaurantId || "Restaurant ID"})
                  </span>
                </div>

                <span className="flex text-sm md:text-lg italic text-amber-500">
                  {restaurantData?.cuisines.join(", ")}
                </span>
                <span className="flex text-sm md:text-lg italic text-green-500">
                  {restaurantData?.costForTwo}
                </span>
                <span className="flex text-sm md:text-lg text-black">
                  📍{restaurantData?.locality}, {restaurantData?.areaName}
                </span>
              </div>

              {restaurantData?.cloudinaryImageId ? (
                <img
                  className="restaurant-details-image max-w-36 max-h-56 md:max-w-96 md:max-h-48 object-cover my2 rounded-md w-full h-auto shadow hover:shadow-violet-400 transition-all ease-in-out duration-300 hover:scale-125"
                  src={IMG_CDN_URL + restaurantData?.cloudinaryImageId}
                  alt="restaurant-details-image"
                />
              ) : (
                <img
                  className="restaurant-details-image md:max-w-96 md:max-h-48 object-cover my2 rounded-md w-full h-auto shadow hover:shadow-violet-400 transition-all ease-in-out duration-300 hover:scale-125"
                  src="https://www.ilounge.com/wp-content/uploads/2019/11/no-image-found.jpg"
                  alt="restaurant-details-image"
                />
              )}
            </div>
          </div>
          {restaurantCategoryInfo.map((category, i) => (
            <RestaurantCategory
              category={category}
              key={category?.card?.card?.title}
              // displayItems={setShowItems[i]}
            />
          ))}
          {/* <RestaurantCategory restaurantCategoryInfo={restaurantCategoryInfo} /> */}
        </>
      )}
    </div>
  );
};

export default RestaurantPage;
