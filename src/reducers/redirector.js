const alreadySearched = (state = false, action) => {
  switch (action.type) {
    case "ALREADY_SEARCHED":
      return !state;

    default:
      return state;
  }
};
export default alreadySearched;
