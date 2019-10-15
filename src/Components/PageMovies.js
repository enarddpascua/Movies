import React, { Component } from "react";
import "../Styles/PageMovie/pageMovie.css";
import { connect } from "react-redux";
import { pageMov } from "../actions";
import HeadBar from "./HeadBar";
import { Link } from "react-router-dom";
import PageNavigation from "../Components/PageNavigation";

class PageMovies extends Component {
  state = {
    movContainer: ""
  };

  getData = () => {
    console.log(this.props.state);
    const nextMov = this.props.state;
    const getRes = nextMov.result;
    const rend = getRes.map((mov, i) => {
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
            <p>
              {mov.title} ({mov.year})
            </p>
          </Link>
        </div>
      );
    });
    this.setState({
      movContainer: rend
    });
  };

  getCurrentPage = e => {
    e.preventDefault();
    this.props.currentPage(e.target.value);
  };

  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.state !== this.props.state) {
      this.getData();
    }
  }

  render() {
    return (
      <div>
        <HeadBar />
        <PageNavigation />
        <div className="mainContainer">{this.state.movContainer}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state: state.pageMovies };
};
export default connect(
  mapStateToProps,
  {
    pageMov
  }
)(PageMovies);
