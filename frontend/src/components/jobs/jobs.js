import React, { Component } from "react";
import { Route } from "react-router-dom";

import NavBar from "../nav bar/navBar";
import AskJob from "./askJob/askJob";

import "./jobs.css";

class Jobs extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="container-fluid jobs">
                    <Route exact path="/jobs/ask" component={AskJob} />
                </div>
            </React.Fragment>
        );
    }
}

export default Jobs;
