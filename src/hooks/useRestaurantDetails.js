import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { IMG_CDN_URL, RESTAURANT_DETAILS_URL } from "../constants";

const useRestaurantDetails = (restaurantId) => {
  const [loading, setLoading] = useState(false);
  const [restaurantDetail, setRestaurantDetail] = useState([]);
  const [restaurantDetail2, setRestaurantDetail2] = useState([]);
  // const [restaurantCategory, setRestaurantCategory] = useState([]);

  const RESTAURANT_URL = RESTAURANT_DETAILS_URL + restaurantId;

  useEffect(() => {
    getRestaurantDetails();
  }, []);

  const getRestaurantDetails = async () => {
    setLoading(true);
    const restaurantDetailFetch = await fetch(RESTAURANT_URL);
    const restaurantDetailJson = await restaurantDetailFetch.json();
    // console.log("restaurant-details", restaurantDetailJson?.data?.cards);

    const restDetailArray =
      restaurantDetailJson?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR.cards;

    const restaurantDetailsInfo =
      restDetailArray[4]?.card?.card?.itemCards;
    console.log("restaurantDetailsInfo", restaurantDetailsInfo);

    console.log(
      "restaurantDetailJson?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR",
      restaurantDetailJson?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR.cards,
      // ?.cards[4]?.card?.card,
    );

    // const restaurantCategoryInfo =
    //   restaurantDetailJson?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    //     (c) =>
    //       c?.card?.card?.["@type"] ===
    //       "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
    //   );
    setRestaurantDetail(restDetailArray);
    setRestaurantDetail2(restDetailArray);
    // setRestaurantCategory(restaurantCategoryInfo);
    setLoading(false);
  };

  return {
    loading,
    restaurantDetail,
    //  restaurantCategory,
    setLoading,
    restaurantDetail2,
  };
};

export default useRestaurantDetails;
