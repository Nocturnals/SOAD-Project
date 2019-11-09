import React from "react";

import NavBar from "../nav bar/navBar";
import FirstSection from "./first_section";
import SecondSection from "./secong_section";
import ThirdSection from "./third-section";

class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="lpMainDiv">
                    <FirstSection />
                    <SecondSection />
                    <ThirdSection />
                </div>
            </div>
        );
    }
}

export default LandingPage;
