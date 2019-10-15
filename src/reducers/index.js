import { combineReducers } from "redux";
import searchedMovie from "./getSearchedMovies";
import alreadySearched from "./redirector";
import navigateMovies from "./getNavMovies";
import searchInput from "./getSearchInput";
import getFilter from "./getFilter";

const allReducers = combineReducers({
  searched: searchedMovie,
  boolSearch: alreadySearched,
  pageMovies: navigateMovies,
  input: searchInput,
  filter: getFilter
});

export default allReducers;
