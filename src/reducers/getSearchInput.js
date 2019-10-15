const searchInput = (state = "", action) => {
  switch (action.type) {
    case "INPUT_SEARCH":
      return action.payload;

    default:
      return state;
  }
};
export default searchInput;
