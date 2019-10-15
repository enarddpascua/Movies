import React from "react";
import "../Styles/Search/searchPage.css";
import { Link } from "react-router-dom";
import HeadBar from "./HeadBar";
import { connect } from "react-redux";
import { searchedMov } from "../actions";
import PageNavigation from "../Components/PageNavigation";
import { withRouter } from "react-router";

class Search extends React.Component {
  state = {
    searchedMovies: ""
  };

  renderSearch = () => {
    const resContainer = this.props.state;
    const result = resContainer.result;
    console.log(result);
    const searchLogs = result.map((mov, i) => {
      return (
        <div key={i}>
          <Link to={`/movie/${mov._id}`}>
            <img
              src={mov.poster}
              alt={mov.title}
              onError={e => {
                e.target.onerror = null;
                e.target.src = "/error.jpeg";
              }}
            />
            <p>{mov.title}</p>
          </Link>
        </div>
      );
    });
    this.setState({
      searchedMovies: searchLogs
    });
  };
  componentDidMount() {
    this.renderSearch();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.state !== this.props.state) {
      this.renderSearch();
    }
  }

  render() {
    return (
      <div>
        <HeadBar />
        <PageNavigation />
        {this.state.searchedMovies.length !== 0 ? (
          <div className="mainContainer">{this.state.searchedMovies}</div>
        ) : (
          <div className="noResultContainer">
            <h1>No Results Found!</h1>
            <h5
              onClick={() => {
                this.props.history.push("/home");
              }}
            >
              Go back to home
            </h5>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { state: state.searched };
};
export default withRouter(
  connect(
    mapStateToProps,
    {
      searchedMovies: searchedMov
    }
  )(Search)
);
