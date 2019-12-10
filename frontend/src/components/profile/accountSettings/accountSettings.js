import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import NavBar from "../../nav bar/navBar";
import GeneralSettings from "./general/general";
import ChangePassword from "./changePassword/changePassword";
import Privacy from "./privacy/privacy";

import "./accountSettings.css";

class AccountSettingsComp extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="container-fluid accountSettings">
                    <div className="row main">
                        <div className="col">
                            <div className="row header"></div>
                            <div className="row settings">
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <ul className="nav mb-3">
                                                <li className="nav-item">
                                                    <Link
                                                        to="/user-account-settings/general"
                                                        className="nav-link"
                                                    >
                                                        General
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link
                                                        to="/user-account-settings/change-password"
                                                        className="nav-link"
                                                    >
                                                        Change Password
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link
                                                        to="/user-account-settings/privacy"
                                                        className="nav-link"
                                                    >
                                                        Privacy
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Route
                                                exact
                                                path="/user-account-settings/general"
                                                component={GeneralSettings}
                                            />

                                            <Route
                                                exact
                                                path="/user-account-settings/change-password"
                                                component={ChangePassword}
                                            />
                                            <Route
                                                exact
                                                path="/user-account-settings/privacy"
                                                component={Privacy}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AccountSettingsComp;
