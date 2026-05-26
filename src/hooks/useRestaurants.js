import { useEffect, useState } from "react";
import { RESTAURANT_LIST_URL } from "../utils/constants";

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

    const restaurantGridWidget = dataJson?.data?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget",
    );
    const restaurantsData = restaurantGridWidget.filter(
      (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants,
    );
    // console.log("restaurantGridWidget useRes", restaurantGridWidget);
    setAllRestaurants(restaurantsData);
    setLoading(false);
  };
  return { loading, allRestaurants, setLoading };
};

export default useRestaurant;
