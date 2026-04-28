import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { IMG_CDN_URL, RESTAURANT_DETAILS_URL } from "../constants";

const useRestaurantDetails = (restaurantId) => {
  const [loading, setLoading] = useState(false);
  const [restaurantDetail, setRestaurantDetail] = useState([]);

  const RESTAURANT_URL = RESTAURANT_DETAILS_URL + restaurantId;

  useEffect(() => {
    getRestaurantDetails();
  }, []);

  const getRestaurantDetails = async () => {
    setLoading(true);
    const restaurantDetailFetch = await fetch(RESTAURANT_URL);
    const restaurantDetailJson = await restaurantDetailFetch.json();
    console.log("restaurant-details", restaurantDetailJson?.data?.cards);
    const restaurantDetailsInfo =
      restaurantDetailJson?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR
        ?.cards[4]?.card?.card?.itemCards;
    setRestaurantDetail(restaurantDetailsInfo);
    setLoading(false);
    console.log("restaurantDetailsInfo", restaurantDetailsInfo);
  };

  return { loading, restaurantDetail, setLoading };
};

export default useRestaurantDetails;
