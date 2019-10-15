import auth0 from "auth0-js";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "gabestremos.auth0.com",
    clientID: "AdvJn6zajHg3JEfoXS7sJu4cr5gp1TGL",
    redirectUrl: "http://localhost:3000",
    responseType: "token id_token",
    scope: "openid"
  });

  constructor() {
    this.login = this.login.bind(this);
  }
  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIN * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        this.location.hash = "";
      } else if (err) {
        console.log(err);
      }
    });
  }
  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
