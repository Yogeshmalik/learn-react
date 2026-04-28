import { useEffect, useState } from "react";
import { RESTAURANT_LIST_URL } from "../constants";

const useRestaurant = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    const fetchData = await fetch(RESTAURANT_LIST_URL);
    const dataJson = await fetchData.json();
    const restaurantsData =
      dataJson?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    console.log("restaurantsData", restaurantsData);
    // setFilteredRestaurants(restaurantsData);
    setAllRestaurants(restaurantsData);
    setLoading(false);
  };
  return { loading, allRestaurants, setLoading };
};

export default useRestaurant;
