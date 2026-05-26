import { useEffect, useMemo, useState, lazy } from "react";
import { useParams } from "react-router";
import { IMG_CDN_URL, RESTAURANT_DETAILS_URL } from "../utils/constants";
import NoImageFoundImg from "../../public/assets/no-image-found.jpg";
import Shimmer from "../components/Shimmer";
import useRestaurantDetails from "../hooks/useRestaurantDetails";
import useRestaurants from "../hooks/useRestaurants";
import RestaurantCategory from "../components/RestaurantCategory";

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const { loading, restaurantInfo, restaurantDetail } =
    useRestaurantDetails(restaurantId);
  const [showItems, setShowItems] = useState(0);
  const [showAddress, setShowAddress] = useState(true);

  const handleAddress = () => {
    return setShowAddress(!showAddress);
  };

  console.log("restaurantId", restaurantId);
  // console.log("restaurantInfo", restaurantInfo);

  const restaurantCategoryInfo = restaurantDetail?.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
  );
  // console.log("restaurantCategoryInfo ResPage", restaurantCategoryInfo);

  return (
    <div className="restaurant-details-page max-w-7xl w-full mx-auto p-2 md:p-0">
      {loading ? (
        <Shimmer />
      ) : (
        <>
          <div className="restaurant-details md:flex space-x-4 justify-between max-w-5xl mx-auto w-full">
            <div className="items-cente mb-5 md:my-5 rounded-2xl p-4 md:p-10 flex mx-auto justify-between w-full shadow-2xl">
              <div className="font-semibold md:flex flex-col uppercase items-cente space-x-2 space-y-1">
                <div className="flex md:flex-row flex-col flex-wrap justify-start md:items-center text-left space-x-1 w-fu">
                  <span className="flex text-xl font-bold md:text-3xl text-black">
                    {restaurantInfo?.name || "Restaurant"}
                  </span>
                  <span className="text-sm md:text-lg text-gray-400 italic font-normal">
                    ({restaurantId || "Restaurant ID"})
                  </span>
                </div>

                <span className="flex text-sm md:text-lg italic text-amber-500">
                  {restaurantInfo?.cuisines.join(", ")}
                </span>
                <span className="flex text-sm md:text-lg italic text-green-500">
                  Cost For Two: ₹ {restaurantInfo?.costForTwo / 100}
                </span>
                <span
                  onClick={handleAddress}
                  className={`text-sm md:text-lg w-fit max-w-44 md:max-w-none text-black cursor-pointer 
                    ${showAddress ? "hidden" : "flex"}
                  `}
                >
                  <label className="no-underline">📍</label>
                  <span className="underline">
                    {restaurantInfo?.labels[1]?.message}
                  </span>
                </span>
                <span
                  onClick={handleAddress}
                  className={`text-sm md:text-lg w-fit max-w-44 md:max-w-none text-black cursor-pointer
                    ${!showAddress ? "hidden" : "flex"}
                  `}
                >
                  <label className="no-underline">📍</label>
                  <span className="underline">
                    {restaurantInfo?.locality}, {restaurantInfo?.areaName}
                  </span>
                </span>
              </div>

              {restaurantInfo?.cloudinaryImageId ? (
                <img
                  className="restaurant-details-image max-w-42 max-h-36 md:max-w-96 md:max-h-48 object-cover object-top md:object-center my2 rounded-md w-full md:h-fit shadow hover:shadow-violet-400 transition-all ease-in-out duration-300 hover:scale-125"
                  src={IMG_CDN_URL + restaurantInfo?.cloudinaryImageId}
                  alt="restaurant-details-image"
                />
              ) : (
                <img
                  className="restaurant-details-image md:max-w-96 md:max-h-48 object-cover my2 rounded-md w-full h-fit shadow hover:shadow-violet-400 transition-all ease-in-out duration-300 hover:scale-125"
                  src="https://www.ilounge.com/wp-content/uploads/2019/11/no-image-found.jpg"
                  alt="restaurant-details-image"
                />
              )}
            </div>
          </div>
          {restaurantCategoryInfo.map((categoryList, i) => (
            <RestaurantCategory
              category={categoryList}
              key={categoryList?.card?.card?.title}
              showItems={i === showItems}
              setShowItems={() =>
                setShowItems((prev) => (prev === i ? null : i))
              }
            />
          ))}
        </>
      )}
    </div>
  );
};

export default RestaurantPage;
