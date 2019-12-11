import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import jwt_decode from "jwt-decode";

import "./App.css";

import { logout, getUserWithToken } from "./actions/authActions";

import MainAppComponents from "./AppComponents";

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
                return <Redirect to="/" />;
            }
        }
        store.dispatch({ type: "LOAD_DONE" });
        store.dispatch({ type: "ALERT_CLEAR" });
    }

    render() {
        return (
            <Provider store={store}>
                <MainAppComponents />
            </Provider>
        );
    }
}

export default App;
