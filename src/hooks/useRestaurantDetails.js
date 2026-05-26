import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { IMG_CDN_URL, RESTAURANT_DETAILS_URL } from "../utils/constants";

const useRestaurantDetails = (restaurantId) => {
  const [loading, setLoading] = useState(false);
  const [restaurantDetail, setRestaurantDetail] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  const RESTAURANT_URL = RESTAURANT_DETAILS_URL + restaurantId;

  useEffect(() => {
    getRestaurantDetails();
  }, []);

  const getRestaurantDetails = async () => {
    setLoading(true);
    const restaurantDetailFetch = await fetch(RESTAURANT_URL);
    const restaurantDetailJson = await restaurantDetailFetch.json();

    const restDetailArray =
      restaurantDetailJson?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR
        .cards;

    const restaurantDetailsInfo = restDetailArray[4]?.card?.card?.itemCards;

    const restaurantInfoData =
      restaurantDetailJson?.data?.cards[2]?.card?.card?.info;
    // console.log('restaurantInfoData',restaurantInfoData)

    setRestaurantInfo(restaurantInfoData);
    setRestaurantDetail(restDetailArray);
    setLoading(false);
  };

  return {
    loading,
    restaurantInfo,
    restaurantDetail,
    setLoading,
  };
};

export default useRestaurantDetails;
