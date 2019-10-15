export const searchedMov = movie => {
  return {
    type: "SEARCHED_MOVIES",
    payload: movie
  };
};

export const redirects = () => {
  return {
    type: "ALREADY_SEARCHED"
  };
};

export const pageMov = movie => {
  return {
    type: "NAVIGATE_MOVIES",
    payload: movie
  };
};

export const searchTerms = input => {
  return {
    type: "INPUT_SEARCH",
    payload: input
  };
};

export const selectFilter = value => {
  return {
    type: "SELECT_FILTER",
    payload: value
  };
};
