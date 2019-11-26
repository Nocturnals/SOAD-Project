import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import NavBar from "../nav bar/navBar";
import FirstSection from "./first_section";
import SecondSection from "./second_section";
import ThirdSection from "./third_section";
import Footer from "./footer";

import "./landing_page.css";

class LandingPageComp extends Component {
    // After Mounring the Component...
    componentDidMount() {
        document.body.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="lpMainDiv container-fluid">
                    <div className="lpBackground"></div>
                    <FirstSection />
                    <SecondSection />
                    <ThirdSection />
                    <Footer />
                </div>
            </div>
        );
    }
}

class LandingPage extends Component {
    render() {
        return <LandingPageComp />;
    }
}

LandingPage.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(LandingPage);
