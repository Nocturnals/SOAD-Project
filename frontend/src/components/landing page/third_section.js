import React from "react";
import { Link } from "react-router-dom";

class CompetitionCard {
    constructor(title, toLink, descr) {
        this.title = title;
        this.toLink = toLink;
        this.descr = descr;
    }
}

class ThirdSection extends React.Component {
    cardComp = card => {
        return (
            <div className="col-5 p-3 mb-4">
                <div className="title">
                    <h4>{card.title}</h4>
                </div>
                <h3>
                    <Link to={card.toLink} style={{ textDecoration: "none" }}>
                        {card.title}
                    </Link>
                </h3>
                <p>{card.descr}</p>
            </div>
        );
    };

    cardComps = cards => {
        let comps = [];
        for (let index = 0; index < cards.length; index++) {
            const card1 = cards[index];
            const card2 = cards[index + 1];
            comps.push(
                <div className="row justify-content-around">
                    {this.cardComp(card1)}
                    {card2 ? this.cardComp(card2) : null}
                </div>
            );
            index++;
        }
        return comps;
    };

    render() {
        const img = require("../media/images/cat.svg");

        const competitionCards = [
            new CompetitionCard(
                "Competition-1",
                "/",
                "Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system"
            ),
            new CompetitionCard(
                "Competition-2",
                "/",
                "Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system"
            ),
            new CompetitionCard(
                "Competition-3",
                "/",
                "Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system"
            ),
            new CompetitionCard(
                "Competition-4",
                "/",
                "Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system"
            )
        ];

        return (
            <div className="section thirdSection row">
                <div className="block">
                    <h1 className="heading">Top 4 ongoing Competitions</h1>
                    <div className="container competition">
                        {this.cardComps(competitionCards)}
                    </div>
                    <Link to="/login" style={{ float: "right" }}>
                        More Competitions -->{" "}
                    </Link>
                </div>
                <div className="block">
                    <img src={img} alt="Artist Colab" className="cont"></img>
                </div>
            </div>
        );
    }
}

export default ThirdSection;
