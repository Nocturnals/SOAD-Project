import React from "react";

import NavBar from "../nav bar/navBarN";
import FirstSection from "./first_section";
import SecondSection from "./second_section";
import ThirdSection from "./third_section";
import Footer from "./footer";

import "./landing_page.css";

class LandingPage extends React.Component {
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

export default LandingPage;
