const searchedMovie = (state = null, action) => {
  switch (action.type) {
    case "SEARCHED_MOVIES":
      return action.payload;

    default:
      return state;
  }
};
export default searchedMovie;
