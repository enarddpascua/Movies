import React from "react";
import "../Styles/HeadBar/headBar.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { redirects, searchTerms, selectFilter, searchedMov } from "../actions";
import { connect } from "react-redux";
import { Auth0Lock } from "auth0-lock";
import axios from "axios";

const auth0Options = {
  auth: {
    responseType: "token id_token",
    redirectUrl: "http://localhost:3000/home"
  }
};
const clientId = "AdvJn6zajHg3JEfoXS7sJu4cr5gp1TGL";
const domain = "gabestremos.auth0.com";
const lock = new Auth0Lock(clientId, domain, auth0Options);
lock.on("authenticated", function(authResult) {
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      console.log(error);
      return;
    }
    console.log(authResult);
    console.log(profile);
    localStorage.setItem("idToken", authResult.idToken);
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));
  });
});

class HeadBar extends React.Component {
  onSearchSubmit = async e => {
    console.log(this.props);
    e.preventDefault();
    const searchTerm = this.props.input;
    const selectedFilter = this.props.filter;
    await axios({
      method: "GET",
      url: `http://192.168.100.222:3000/search${selectedFilter}${searchTerm}`
    })
      .then(res => {
        console.log(res);
        this.props.searchedMovies(res.data);
        this.props.history.push("/search");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSelectOptions = e => {
    this.props.getFilter(e.target.value);
  };

  handleClick = async () => {
    lock.show();
    await axios({
      method: "GET",
      url: "http://192.168.100.222:3000/home"
    }).then(response => {
      console.log(response);
    });
  };

  sendSearchTerms = e => {
    e.preventDefault();
    this.props.searchInput(e.target.value);
  };

  handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    var access = localStorage.getItem("access_token");
    const profile = localStorage.getItem("profile");
    const getName = JSON.parse(profile);
    return (
      <div id="homeRoot">
        <div className="headBar">
          <Link to="/home">
            <img src="/logo.jpg" alt="logo goes here" />
          </Link>
          <div className="forFilter">
            <p>Filter search:</p>
            <select onChange={this.handleSelectOptions}>
              <option value="?all=">Search All</option>
              <option value="?title=">Search by title</option>
              <option value="?actor=">Search by actor</option>
              <option value="?plot=">Search by plot</option>
            </select>
          </div>
          <div className="searchContainer">
            <input
              onChange={this.sendSearchTerms}
              placeholder="search movies..."
            />

            <button onClick={this.onSearchSubmit} className="searchBtn">
              Search
            </button>
          </div>
          {access ? (
            <div className="nameContainer">
              <span className="nameLoc">Welcome {getName.given_name}!</span>
              <br />
              <button className=" btnLogout" onClick={this.handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="nameContainer">
              <button className="btnLogout" onClick={this.handleClick}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default withRouter(
  connect(
    mapStateToProps,
    {
      alreadySearched: redirects,
      searchInput: searchTerms,
      getFilter: selectFilter,
      searchedMovies: searchedMov
    }
  )(HeadBar)
);
