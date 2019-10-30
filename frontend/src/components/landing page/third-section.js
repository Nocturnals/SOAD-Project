import React from 'react'
import './landing_page.css'



class ThirdSection extends React.Component {

    render() {
        const img = require('../media/images/cat.svg');

        return (
            <div className="section thirdSection">
                <div className="block">
                    <h1 className="cont1">Top 4 ongoing Competitions</h1>
                    <div className="content">
                    </div>
                </div>
                <div className="block">
                    <img src={img} alt="Artist Colab" className="cont"></img>
                </div>
            </div>
        )
    }
}


export default ThirdSection;
