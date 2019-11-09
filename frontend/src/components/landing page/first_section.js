import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

import "./landing_page.css";

class FirstSection extends React.Component {
    render() {
        const img = require("../media/images/v10-header4.svg");

        return (
            <div className="section firstSection">
                <div className="block">
                    <img src={img} alt="Artist Colab" className="cont"></img>
                </div>
                <div className="block">
                    <div className="content">
                        <p className="cont1">Platform for collaboration.</p>
                        {/* <p className="cont2">Know the performance of various artists around the world</p> */}
                        <div className="cont3">
                            <ul>
                                <li>
                                    {" "}
                                    Know the performance of various artists
                                    around the world
                                </li>
                                <li>
                                    {" "}
                                    Choose the best you think from the artists
                                </li>
                                <li>
                                    {" "}
                                    Work in a more better way than ever before
                                </li>
                            </ul>
                        </div>
                        <div className="login-signup">
                            <Link to="/register">
                                <button>Join Us</button>
                            </Link>
                            <button id="know-more">
                                Know More &nbsp;
                                <i
                                    className="fa fa-arrow-down"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FirstSection;
