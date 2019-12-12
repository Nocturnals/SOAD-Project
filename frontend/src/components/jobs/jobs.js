import React, { Component } from "react";
import { Route } from "react-router-dom";

import NavBar from "../nav bar/navBar";
import AskJob from "./askJob/askJob";
import PostJobOffer from "./postJobOffer/postJobOffer";

import "./jobs.css";

class Jobs extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="container-fluid jobs">
                    <Route exact path="/job/ask" component={AskJob} />
                    <Route exact path="/job/offer" component={PostJobOffer} />
                </div>
            </React.Fragment>
        );
    }
}

export default Jobs;
