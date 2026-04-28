export const filterInfo = (searchInput, allRestaurants) =>
  allRestaurants.filter((filterData) =>
    filterData.info.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

