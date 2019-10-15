const getFilter = (state = "?all=", action) => {
  switch (action.type) {
    case "SELECT_FILTER":
      return action.payload;
    default:
      return state;
  }
};
export default getFilter;
