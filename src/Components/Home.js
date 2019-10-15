import React, { Component } from "react";
import "../Styles/Home/home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import HeadBar from "./HeadBar";
import { searchedMov, searchTerms } from "../actions";
import { pageMov } from "../actions";
import { connect } from "react-redux";
import PageNavigation from "../Components/PageNavigation";
import "react-pagination-library/build/css/index.css";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      movieDetails: "",
      searchInput: "",
      selectedOption: "?all=",
      filteredMov: [],
      searchedMov: "",
      renderBool: false
    };
  }
  getAllMovies = async () => {
    await axios
      .get("http://192.168.100.222:3000/home")
      .then(response => {
        this.setState({
          movies: response.data.result
        });
        this.movies();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleStatePass = event => {
    event.preventDefault();
  };

  movies = () => {
    const access = localStorage.getItem("access_token");
    const movieDetails = this.state.movies.map((movDetails, index) => (
      <div key={index} className="moviesContainer">
        }
        <Link to={`/movie/${movDetails._id}`}>
          <img
            src={movDetails.poster}
            alt={movDetails.title}
            onError={e => {
              e.target.onerror = null;
              e.target.src = "/error.jpeg";
            }}
          />
        </Link>
        <p>
          {movDetails.title} ({movDetails.year})
        </p>
      </div>
    ));
    this.setState({
      movieDetails
    });
  };

  handleSelectOptions = value => {
    this.setState({
      selectedOption: value
    });
  };

  handleSearch = searchTerm => {
    this.setState({
      searchInput: searchTerm
    });
  };

  onSearchSubmit = async e => {
    e.preventDefault();
    const searchTerm = this.props.input;
    const selectedFilter = this.state.selectedOption;
    await axios({
      method: "GET",
      url: `http://192.168.100.222:3000/search${selectedFilter}${searchTerm}`
    })
      .then(res => {
        this.props.searchedMovies(res.data);
        this.setState({
          filteredMov: [...res.data.result],
          renderBool: true
        });
        this.props.history.push("/search");
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getAllMovies();
  }

  render() {
    return (
      <div id="homeRoot">
        <HeadBar />
        <div className="container">
          <PageNavigation />
          <div className="mainContainer">{this.state.movieDetails}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  {
    searchedMovies: searchedMov,
    navigatePage: pageMov,
    searchInput: searchTerms
  }
)(Home);
