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
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logout } from "./actions/user.athentication";
import "./App.css";
import LandingPage from "./components/landing page/landing_page";
import AuthenticationPage from "./components/authentication/authentication";

class App extends Component {
    // to verify user already logged in
    componentDidMount() {
        if (localStorage.userToken) {
            setAuthToken(localStorage.userToken);
            const decoded = jwt_decode(localStorage.userToken);
            store.dispatch(setCurrentUser(decoded));

            // if token is expired then logout and redirect to
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                store.dispatch(logout());
                return <Redirect to="/login" />;
            }
        }
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route
                            exact
                            path="/:type"
                            component={AuthenticationPage}
                        />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
