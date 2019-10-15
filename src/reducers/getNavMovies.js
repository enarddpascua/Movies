const navigateMovies = (state = [], action) => {
  switch (action.type) {
    case "NAVIGATE_MOVIES":
      return action.payload;
    default:
      return state;
  }
};
export default navigateMovies;
