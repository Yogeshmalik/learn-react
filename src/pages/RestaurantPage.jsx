import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { IMG_CDN_URL, RESTAURANT_DETAILS_URL } from "../constants";
import NoImageFoundImg from "../assets/no-image-found.jpg";
import Shimmer from "../components/Shimmer";
import useRestaurantDetails from "../hooks/useRestaurantDetails";

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const { loading, restaurantDetail, setLoading } =
    useRestaurantDetails(restaurantId);

  console.log("restaurantId", restaurantId);
  const location = useLocation();
  const restaurantData = location?.state?.restaurant;

  return (
    <div className="restaurant-details-page">
      {loading ? (
        <Shimmer />
      ) : (
        <div className="restaurant-details">
          <div>
            <h2>
              Restaurant: {restaurantData?.name} <br />
              Restaurant ID: ({restaurantId})
            </h2>
            {restaurantData?.cloudinaryImageId ? (
              <img
                className="restaurant-details-image"
                src={IMG_CDN_URL + restaurantData?.cloudinaryImageId}
                alt="restaurant-details-image"
              />
            ) : (
              <img
                className="restaurant-details-image"
                src="https://www.ilounge.com/wp-content/uploads/2019/11/no-image-found.jpg"
                alt="restaurant-details-image"
              />
            )}
          </div>
          <ul className="restaurant-details-menu">
            <h1 className="menu-list">Menu</h1>
            {restaurantDetail?.map((item) => (
              <div
                className="restaurant-item-container"
                key={item?.card?.info?.id}
              >
                {item?.card?.info?.imageId && item?.card?.info?.name && (
                  <>
                    <img
                      className="restaurant-item-image"
                      src={IMG_CDN_URL + item?.card?.info?.imageId}
                      alt="restaurant-details-image"
                    />
                    <li
                      className="restaurant-details-menu-list"
                      key={item?.card?.info?.id}
                    >
                      {item?.card?.info?.name}
                    </li>
                  </>
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
