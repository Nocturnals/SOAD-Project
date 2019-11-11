import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";

import "./App.css";

import { setCurrentUser, logout } from "./actions/user.athentication";

import LandingPage from "./components/landing page/landing_page";
import AuthenticationPage from "./components/authentication/authentication";
import Combo from "./components/combo/combo";

if (localStorage.userToken) {
    setAuthToken(localStorage.userToken);
    const decoded = jwt_decode(localStorage.userToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = "/login";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/user/:type" component={Combo} />
                    <Route
                        exact
                        path="/auth/:type"
                        component={AuthenticationPage}
                    />
                </Router>
            </Provider>
        );
    }
}

export default App;
