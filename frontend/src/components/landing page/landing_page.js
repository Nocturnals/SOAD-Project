import React from "react";

import NavBar from "../nav bar/navBarN";
import FirstSection from "./first_section";
import SecondSection from "./secong_section";
import ThirdSection from "./third_section";

class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="lpMainDiv container-fluid">
                    <div className="lpBackground"></div>
                    <FirstSection />
                    <SecondSection />
                    <ThirdSection />
                </div>
            </div>
        );
    }
}

export default LandingPage;
