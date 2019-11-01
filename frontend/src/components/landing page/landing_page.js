import React from 'react'
import FirstSection from './first_section'
import SecondSection from './secong_section'
import ThridSection from './third-section'
import ThirdSection from './third-section'



class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <FirstSection />
                <SecondSection />
                <ThirdSection />
            </div>
        )
    }
}


export default LandingPage;
