import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { IMG_CDN_URL, RESTAURANT_DETAILS_URL } from "../constants";
import NoImageFoundImg from "../assets/no-image-found.jpg";
import Shimmer from "../components/Shimmer";
import useRestaurantDetails from "../hooks/useRestaurantDetails";
import RestaurantCategory from "../components/RestaurantCategory";

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const { loading, restaurantDetail, setLoading, restaurantCategory } =
    useRestaurantDetails(restaurantId);

  console.log("restaurantId", restaurantId);
  const location = useLocation();
  const restaurantData = location?.state?.restaurant;

  return (
    <div className="restaurant-details-page max-w-7xl w-full mx-auto p-2 md:p-0">
      {loading ? (
        <Shimmer />
      ) : (
        <div className="restaurant-details md:flex space-x-4 justify-between max-w-5xl mx-auto w-full">
          <div className="text-center items-center flex flex-col md:text-left">
            <h2 className="font-semibold text-xl">
              Restaurant: {restaurantData?.name} <br />
              Restaurant ID: {restaurantId}
            </h2>
            {restaurantData?.cloudinaryImageId ? (
              <img
                className="restaurant-details-image max-w-96 my-2 rounded-md w-full h-auto"
                src={IMG_CDN_URL + restaurantData?.cloudinaryImageId}
                alt="restaurant-details-image"
              />
            ) : (
              <img
                className="restaurant-details-image max-w-96 my-2 rounded-md w-full h-auto"
                src="https://www.ilounge.com/wp-content/uploads/2019/11/no-image-found.jpg"
                alt="restaurant-details-image"
              />
            )}
          </div>
          <ul className="restaurant-details-menu flex flex-col w-ful">
            <h1 className="menu-list text-2xl font-semibold text-center mt-6 md:mt-0 mb-6">
              Menu
            </h1>
            {restaurantDetail?.map((item) => (
              <div
                className="restaurant-item-container w-full flex gap-2 items-center"
                key={item?.card?.info?.id}
              >
                {item?.card?.info?.imageId && item?.card?.info?.name && (
                  <>
                    <li
                      className="restaurant-details-menu-list w-full text-xl font-semibold hover:text-orange-400"
                      key={item?.card?.info?.id}
                    >
                      {item?.card?.info?.name}
                    </li>
                    <img
                      className="restaurant-item-image w-full max-w-28 max-h-28 my-2 rounded-md hover:scale-150 transition-all ease-in-out duration-300"
                      src={IMG_CDN_URL + item?.card?.info?.imageId}
                      alt="restaurant-details-image"
                    />
                  </>
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
      <RestaurantCategory restaurantCategory={restaurantCategory} />
    </div>
  );
};

export default RestaurantPage;
