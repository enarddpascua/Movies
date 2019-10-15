import React from "react";
import "../Styles/PageNavigation/pageNav.css";
import Pagination from "react-pagination-library";
import axios from "axios";
import { connect } from "react-redux";
import { pageMov } from "../actions";
import { withRouter } from "react-router";

class PageNavigation extends React.Component {
  state = {
    currentPage: 1
  };

  changeCurrentPage = async numPage => {
    this.setState({
      currentPage: numPage
    });
    await axios({
      method: "GET",
      url: `http://192.168.100.222:3000/home?page=${numPage}`
    })
      .then(res => {
        this.props.PageNavigation(res.data);
        this.props.history.push(`/home/page=${numPage}`);
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.state !== this.props.state) {
      this.changeCurrentPage();
    }
  }

  render() {
    return (
      <div className="pageNav">
        <Pagination
          currentPage={this.state.currentPage}
          totalPages={10}
          changeCurrentPage={this.changeCurrentPage}
        ></Pagination>
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
      PageNavigation: pageMov
    }
  )(PageNavigation)
);
