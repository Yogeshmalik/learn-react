import RestaurantCard from "../components/RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "../components/Shimmer";
import { Link, NavLink, useParams } from "react-router";
import { RESTAURANT_LIST_URL } from "../constants";
import { filterInfo } from "../utils/helper";
import useRestaurants from "../hooks/useRestaurants";

const Body = () => {
  const { restaurantId } = useParams();
  const [searchInput, setSearchInput] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  // const [allRestaurants, setAllRestaurants] = useState([]);
  // const [loading, setLoading] = useState(false);
  const { allRestaurants, loading, setLoading } = useRestaurants();

  useEffect(() => {
    setFilteredRestaurants(allRestaurants);
  }, [allRestaurants]);

  const resetSearch = () => {
    setSearchInput("");
    setFilteredRestaurants(allRestaurants);
  };

  return (
    <div className="body-container flex flex-col p-2 my-2 overflow-auto max-w-7xl mx-auto">
      <div className="search-bar-container flex max-h-8 rounded-md max-w-fit justify-center overflow-hidden border border-black p-2 w-full items-center space-x-1">
        <input
          className="search-bar outline-0"
          type="text"
          maxLength={20}
          placeholder="Search Yummy Food"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button className="search-button">
          <img
            className="search-icon max-h-5 cursor-pointer"
            src="https://www.svgrepo.com/show/356535/search-button.svg"
            alt="search icon"
            onClick={() => {
              setLoading(true);
              const info = filterInfo(searchInput, allRestaurants);
              setFilteredRestaurants(info);
              setLoading(false);
            }}
          />
        </button>
        <button className="reset-button">
          <img
            className="reset-icon max-h-5 cursor-pointer"
            src="https://www.vhv.rs/dpng/d/248-2482573_repeat-reset-icon-svg-hd-png-download.png"
            alt="Reset icon"
            onClick={resetSearch}
          />
        </button>
      </div>
      <>
        {filteredRestaurants?.length ? (
          <p className="restaurants-length font-semibold my-2">
            Showing {filteredRestaurants?.length} Restaurants
          </p>
        ) : (
          ""
        )}
      </>
      {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurants flex flex-wrap gap-4 mx-auto w-full justify-between">
          <>
            {filteredRestaurants?.map((restaurant) => {
              return (
                <Link
                  key={restaurant?.info?.id}
                  to={`/restaurant-details/${restaurant?.info?.id}`}
                  state={{ restaurant: restaurant?.info }}
                  className="restaurant-card-link flex flex-col justify-between max-w-40 md:max-w-70 w-full" 
                >
                  <RestaurantCard {...restaurant?.info} />
                </Link>
              );
            })}
          </>
        </div>
      )}
    </div>
  );
};

export default Body;
