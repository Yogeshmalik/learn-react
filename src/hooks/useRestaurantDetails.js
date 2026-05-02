import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { IMG_CDN_URL, RESTAURANT_DETAILS_URL } from "../constants";

const useRestaurantDetails = (restaurantId) => {
  const [loading, setLoading] = useState(false);
  const [restaurantDetail, setRestaurantDetail] = useState([]);
  const [restaurantCategory, setRestaurantCategory] = useState([]);

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

    const restaurantCategoryInfo =
      restaurantDetailJson?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) =>
          c?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
      );
    setRestaurantDetail(restaurantDetailsInfo);
    setRestaurantCategory(restaurantCategoryInfo);
    setLoading(false);
  };

  return { loading, restaurantDetail, restaurantCategory, setLoading };
};

export default useRestaurantDetails;
