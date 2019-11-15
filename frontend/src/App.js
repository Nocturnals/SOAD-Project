import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";

import "./App.css";

import { logout, getUserWithToken } from "./actions/authActions";

import LandingPage from "./components/landing page/landing_page";
import AuthenticationPage from "./components/authentication/authentication";
import Combo from "./components/combo/combo";

class App extends Component {
    // to verify user already logged in
    componentDidMount() {
        if (localStorage.userToken) {
            // check for the token
            const decoded = jwt_decode(localStorage.userToken);

            store.dispatch(getUserWithToken(localStorage.userToken));

            // if token is expired then logout and redirect to
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                store.dispatch(logout());
                return <Redirect to="/user/home" />;
            }
        }
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/user/:type" component={Combo} />
                        <Route
                            exact
                            path="/auth/:type"
                            component={AuthenticationPage}
                        />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
