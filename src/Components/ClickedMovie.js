import React from "react";
import HeadBar from "./HeadBar";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "../Styles/Home/logo.jpg";
import "../Styles/MovieDetails/error.jpeg";
import "../Styles/MovieDetails/clickedMovie.css";
import { pageMov } from "../actions";

class ClickedMovie extends React.Component {
  state = {
    clickedMov: [],
    updateModal: false,
    title: "",
    year: null,
    genre: "",
    duration: null,
    rated: "",
    director: "",
    actor: "",
    writer: "",
    synopsis: ""
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get(`http://192.168.100.222:3000/movie/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          clickedMov: res.data[0]
        });
      });
  }

  arranger = () => {
    const getContext = this.state.clickedMov.actors.map((arr, i) => {
      return <p key={i}>{arr}</p>;
    });
    console.log(getContext);
    return getContext;
  };

  handleDeleteMovie = async () => {
    var conf = window.confirm("Are you sure you wish to delete this movie?");
    if (conf) {
      console.log(conf);

      const getToken = localStorage.getItem("idToken");
      await axios({
        method: "GET",
        url: `http://192.168.100.222:3000/delete/${this.props.match.params.id}`,
        headers: {
          Authorization: "Bearer " + getToken
        }
      })
        .then(response => {
          console.log(response);
        })
        .then(this.props.history.push("/home"));
    }
  };
  handleUpdateMovie = async () => {
    const getToken = localStorage.getItem("idToken");
    await axios({
      method: "GET",
      url: `http://192.168.100.222:3000/update/${this.props.match.params.id}`,
      headers: {
        Authorization: "Bearer " + getToken
      }
    })
      .then(response => {
        console.log(response);
      })
      .then(
        this.setState(prevState => ({
          updateModal: !prevState.updateModal
        }))
      );
  };
  getTitleInput = event => {
    this.setState({
      title: event.target.value
    });
  };
  getYearInput = event => {
    this.setState({
      year: event.target.value
    });
  };
  getGenreInput = event => {
    this.setState({
      genre: event.target.value
    });
  };
  getDurationInput = event => {
    this.setState({
      duration: event.target.value
    });
  };
  getRatedInput = event => {
    this.setState({
      rated: event.target.value
    });
  };
  getDirectorInput = event => {
    this.setState({
      director: event.target.value
    });
  };
  getActorInput = event => {
    this.setState({
      actor: event.target.value
    });
  };
  getWriterInput = event => {
    this.setState({
      writer: event.target.value
    });
  };
  getSynopsisInput = event => {
    this.setState({
      synopsis: event.target.value
    });
  };

  handleSaveUpdate = async () => {
    var conf = window.confirm("Save?");
    if (conf) {
      const data = {
        title: this.state.title,
        year: this.state.year,
        genres: this.state.genre,
        runtime: this.state.duration,
        rated: this.state.rated,
        director: this.state.director,
        actors: this.state.actor,
        writers: this.state.writer,
        plot: this.state.synopsis
      };

      const getToken = localStorage.getItem("idToken");
      await axios({
        method: "PUT",
        url: `http://192.168.100.222:3000/update/${this.props.match.params.id}`,
        headers: {
          Authorization: "Bearer " + getToken
        },
        data: data
      }).then(res => {
        window.location.reload();
      });
    }
  };

  handleCancel = () => {
    this.setState(prevState => ({
      updateModal: !prevState.updateModal
    }));
  };
  componentDidUpdate(prevState) {
    if (prevState !== this.props.state) {
      axios.get(
        `http://192.168.100.222:3000/movie/${this.props.match.params.id}`
      );
    }
  }

  render() {
    const {
      poster,
      title,
      director,
      plot,
      genres,
      actors,
      year,
      rated,
      writers,
      runtime
    } = this.state.clickedMov;

    var access = localStorage.getItem("access_token");
    return (
      <div>
        <header>
          <HeadBar />
        </header>
        <div className="rootContainer">
          <div className="clickedMovContainer">
            <img
              src={poster}
              alt={title}
              onError={e => {
                e.target.onerror = null;
                e.target.src = "/error.jpeg";
              }}
            />
            <div className="detailscontainer">
              {this.state.updateModal ? (
                <div className="modalContainer">
                  <form className="formContainer">
                    <label className="formTitle">
                      Title:
                      <input
                        onChange={this.getTitleInput}
                        placeholder={title}
                      />
                    </label>
                    <label className="formYear">
                      Year:
                      <input placeholder={year} onChange={this.getYearInput} />
                      <br />
                    </label>
                    <label className="formGenres">
                      Genre(s):
                      <input
                        placeholder={genres}
                        onChange={this.getGenreInput}
                      />
                      <br />
                    </label>
                    <label className="formDuration">
                      Duration:
                      <input
                        placeholder={runtime}
                        onChange={this.getDurationInput}
                      />
                      <br />
                    </label>
                    <label className="formRated">
                      Rated:
                      <input
                        placeholder={rated}
                        onChange={this.getRatedInput}
                      />
                      <br />
                    </label>
                    <label className="formDirector">
                      Director(s):
                      <input
                        placeholder={director}
                        onChange={this.getDirectorInput}
                      />
                      <br />
                    </label>
                    <label className="formActor">
                      Actor(s):
                      <input
                        placeholder={actors}
                        onChange={this.getActorInput}
                      />
                      <br />
                    </label>
                    <label className="formWriter">
                      Writer(s):
                      <input
                        placeholder={writers}
                        onChange={this.getWriterInput}
                      />
                    </label>
                    <br />
                    <label className="formSynopsis">
                      <span>Synopsis:</span>
                      <textarea
                        placeholder={plot}
                        onChange={this.getSynopsisInput}
                      />
                    </label>
                  </form>
                  <div className="updateBtn">
                    <button
                      className="semantic ui green button"
                      onClick={this.handleSaveUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="semantic ui red button"
                      onClick={this.handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
              <h1>
                {title} ({year})
              </h1>

              <h5>
                Genre(s):{" "}
                {[genres].map(arr => {
                  return `${arr + "\n"}`;
                })}
              </h5>
              <h5>Duration: {runtime}mins</h5>
              <h5> RATED: {rated}</h5>
              <h4>Directed by: {director}</h4>
              <h3>
                Actor(s):{" "}
                {[actors].map(arr => {
                  return `${arr}\n`;
                })}
              </h3>
              <h3>
                Writer(s):{" "}
                {[writers].map(arr => {
                  return `${arr}\n`;
                })}
              </h3>
            </div>
            <div className="plot">
              <p>Synopsis: {plot}</p>
            </div>
            <div className="backContainer">
              <button
                className="backBtn"
                onClick={() => {
                  this.props.history.goBack();
                }}
              >
                Back
              </button>
              {access ? (
                <div className="adminBtn">
                  <button
                    onClick={this.handleDeleteMovie}
                    className="semantic ui red button"
                  >
                    Delete Movie
                  </button>
                  <button
                    className="semantic ui green button"
                    onClick={this.handleUpdateMovie}
                  >
                    Update
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
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
      getMovies: pageMov
    }
  )(ClickedMovie)
);
