import React, { Component } from "react";
import { Auth0Lock } from "auth0-lock";

const auth0Options = {
  auth: {
    responseType: "token id_token",
    redirectUrl: "http://localhost:3000"
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

class Login extends Component {
  handleClick = () => {
    lock.show();
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Login</button>
      </div>
    );
  }
}

export default Login;
