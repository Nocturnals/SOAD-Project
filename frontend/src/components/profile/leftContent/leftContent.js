import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./leftContent.css";

class Organisation {
    constructor(image, title, descr) {
        this.image = image;
        this.title = title;
        this.descr = descr;
    }
}

class OrganisationsLink extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link
                to={this.props.link}
                style={{ textDecoration: "none" }}
                className="btn orgsLink"
            >
                {this.props.name}
            </Link>
        );
    }
}

class LeftContent extends Component {
    constructor(props) {
        super(props);

        this.email = this.props.email;
    }

    // Organisations Components...
    organisationComp = organisations => {
        let orgs = [];
        for (let index = 0; index < organisations.length; index++) {
            const org = organisations[index];
            orgs.push(
                <div className="organisation row" key={index}>
                    <div className="col-3">
                        <div
                            className="orgImage"
                            style={{
                                backgroundImage: `url(${org.image})`
                            }}
                        ></div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-8">
                                <div className="orgTitle row">{org.title}</div>
                                <div className="orgDescr row">{org.descr}</div>
                            </div>
                            <div className="col-4">
                                <button className="orgBtn">
                                    <i
                                        className="fa fa-chevron-right"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return orgs;
    };

    render() {
        const userImg = require("../../media/images/categories/photographer.png");

        const organisations = [
            new Organisation(
                userImg,
                "Nocturnals",
                "This is a Nocturnal's Organisation."
            ),
            new Organisation(
                userImg,
                "Nocturnals",
                "This is a Nocturnal's Organisation."
            ),
            new Organisation(
                userImg,
                "Nocturnals",
                "This is a Nocturnal's Organisation."
            ),
            new Organisation(
                userImg,
                "Nocturnals",
                "This is a Nocturnal's Organisation."
            )
        ];

        return (
            <div>
                <div className="left-content row">
                    <div className="col user">
                        <div className="userImage row justify-content-center">
                            <div className="col">
                                <div className="image-div">
                                    <div
                                        className="user-image"
                                        style={{
                                            backgroundImage: `url(${userImg})`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="following row">
                            <div className="title col-6">
                                <h4>Following</h4>
                                <h6>200</h6>
                            </div>
                            <div className="title col-6">
                                <h4>Followers</h4>
                                <h6>200</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="left-content row organisations">
                    <div className="col">
                        <div className="header row">
                            <div className="col-12">
                                <h6>Organisations</h6>
                            </div>
                        </div>
                        {this.organisationComp(organisations)}
                        <div className="view-more row">
                            <div className="col-12">
                                <OrganisationsLink
                                    link="/user/home"
                                    name="View More"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftContent;
