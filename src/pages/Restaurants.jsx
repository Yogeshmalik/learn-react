import RestaurantCard, { withVegLabel } from "../components/RestaurantCard";
import { useContext, useEffect, useMemo, useState } from "react";
import Shimmer from "../components/Shimmer";
import { Link, NavLink, useParams } from "react-router";
import { RESTAURANT_LIST_URL } from "../constants";
import { filterInfo } from "../utils/helper";
import useRestaurants from "../hooks/useRestaurants";
import useOnline from "../hooks/useOnline";
import UserContext from "../providers/UserContext";
import Button from "../components/Button";

const Body = () => {
  const isOnline = useOnline();
  const { restaurantId } = useParams();
  const [searchInput, setSearchInput] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const { allRestaurants, loading, setLoading } = useRestaurants();
  const RestaurantCardVeg = withVegLabel(RestaurantCard);
  const { userName, setUserName, loggedInUser } = useContext(UserContext);

  // console.log("filteredRestaurants", filteredRestaurants);

  const normalizedRestaurants = useMemo(() => {
    const combined = allRestaurants.flatMap(
      (item) =>
        item?.card?.card?.gridElements?.infoWithStyle?.restaurants || [],
    );

    return Array.from(new Map(combined.map((r) => [r?.info?.id, r])).values());
  }, [allRestaurants]);

  const topRatedRestaurants = normalizedRestaurants?.filter(
    (top) => top.info.avgRating >= 4.5,
  );
  console.log("topRatedRestaurants", topRatedRestaurants);

  useEffect(() => {
    setFilteredRestaurants(normalizedRestaurants);
  }, [normalizedRestaurants]);

  console.log("uniqueRestaurants", normalizedRestaurants);

  const resetSearch = () => {
    setSearchInput("");
    setFilteredRestaurants(normalizedRestaurants);
  };

  return (
    <div className="body-container flex flex-col p-2 my-2 overflow-auto max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <div className="search-bar-container self-start flex max-h-8 rounded-md max-w-fit justify-center overflow-hidden border border-black p-2 w-full items-center space-x-1">
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
                const info = filterInfo(searchInput, normalizedRestaurants);
                setFilteredRestaurants(info);
                setLoading(false);
              }}
            />
          </button>
        </div>
        <span className="flex space-x-3">
          <Button
            size="small"
            color="green"
            label="Top Rated Restaurants"
            className="w-fit py-2 md:py-0"
            onClick={() => setFilteredRestaurants(topRatedRestaurants)}
          />
          <Button
            size="medium"
            color="blue"
            src="https://cdn-icons-png.magnific.com/256/11507/11507214.png?semt=ais_white_label"
            className="p-0 px-0 md:pl-2.5 pr-0"
            onClick={resetSearch}
          />
        </span>
        {/* <button className="reset-button">
          <img
            className="reset-icon max-h-5 cursor-pointer"
            src="https://www.vhv.rs/dpng/d/248-2482573_repeat-reset-icon-svg-hd-png-download.png"
            alt="Reset icon"
            onClick={resetSearch}
          />
        </button> */}
        <input
          className="search-bar outline-0 hidden bg-gray-200 self-start md:flex max-h-8 rounded-md max-w-fit justify-center overflow-hidden border border-black p-2 w-full items-center space-x-1 font-semibold text-center"
          type="text"
          maxLength={20}
          placeholder="Provide User Name"
          value={loggedInUser}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
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
      {filteredRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurants flex flex-wrap grow gap-4 h-full mx-auto w-full justify-between md:justify-start xl:justify-between">
          <>
            {filteredRestaurants?.map((restaurant) => {
              return (
                <Link
                  key={restaurant?.info?.id}
                  to={`/restaurant-details/${restaurant?.info?.id}`}
                  state={{ restaurant: restaurant?.info }}
                  className="restaurant-card-link mx-auto md:mx-0 flex flex-col grow items-stretch max-w-48 md:max-w-72 w-full"
                >
                  {restaurant?.info?.veg ? (
                    <RestaurantCardVeg {...restaurant?.info} />
                  ) : (
                    <RestaurantCard {...restaurant?.info} />
                  )}
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
