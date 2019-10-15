import React, { Component } from "react";
import ReactDOM from "react-dom";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import ClickedMovie from "./Components/ClickedMovie";
import Search from "./Components/Search";
import { createStore } from "redux";
import allReducer from "./reducers";
import { Provider } from "react-redux";
import PageMovies from "./Components/PageMovies";
import { Auth0Provider } from "./react-auth0-wrapper";
import config from "./auth_config.json";
import NavBar from "./Components/NavBar";

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};
const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/home" exact strict component={Home} />
            <Route path="/Login" component={Login} />
            <Route path="/search" component={Search} />
            <Route path="/movie/:id" component={ClickedMovie} />
            <Route path="/home/page=:id" component={PageMovies} />
            <Route path="/navBar" component={NavBar} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </Auth0Provider>,
  document.getElementById("root")
);
