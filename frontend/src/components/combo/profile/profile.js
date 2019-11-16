import React, { Component } from "react";

import PostComp from "../post/post";
import LeftContent from "./leftContent/leftContent";
import RightContent from "./rightContent/rightContent";

import "./profile.css";

// Post Element Class...
class Post {
    constructor(name, time, job, location, liked) {
        this.name = name;
        this.time = time;
        this.job = job;
        this.location = location;
        this.liked = liked;
    }
}

class ProfilePage extends Component {
    componentDidMount() {
        document.body.scrollTo(0, 0);
    }

    // Generates Cards of Posts...
    postCards = postDetails => {
        let postCards = [];
        for (let i = 0; i < postDetails.length; i++) {
            const post = postDetails[i];
            const post_details = {
                name: post.name,
                time: post.time,
                job: post.job,
                liked: post.liked,
                location: post.location
            };
            postCards.push(<PostComp post_details={post_details} index={i} />);
        }

        return postCards;
    };

    render() {
        const postUserImage = require("../../media/images/categories/photographer.png");
        const coverimage = require("../../media/images/profile/cover.jpg");

        // Defining Elements
        const posts = [
            new Post("Vishwanth", "3 min", "Epic Coder", "India", false),
            new Post("Vishwanth", "10 min", "Epic Coder", "India", true),
            new Post("Vishwanth", "20 min", "Epic Coder", "India", false),
            new Post("Vishwanth", "59 min", "Epic Coder", "India", true)
        ];

        return (
            <div className="profile row">
                <div className="col">
                    <div
                        className="coverImage row"
                        style={{ backgroundImage: `url(${coverimage})` }}
                    ></div>
                    <div className="profile-content row">
                        <div className="col-3">
                            <LeftContent email="mail.mail.com" />
                        </div>
                        <div className="col-6">
                            <div className="userContent row">
                                <div className="col">
                                    <div className="row">
                                        <div className="userName col">
                                            <h3>Vishwanth</h3>
                                        </div>
                                        <div className="userMail col align-self-center">
                                            <h6>
                                                <i
                                                    class="fa fa-envelope"
                                                    aria-hidden="true"
                                                ></i>
                                                &nbsp;&nbsp;&nbsp;venkatvishwanth.s17@iiits.in
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="userJob col">
                                            <h4>Professional Red Hat Hacker</h4>
                                        </div>
                                        <div className="userLocation col">
                                            <h4>
                                                <i
                                                    class="fa fa-map-marker"
                                                    aria-hidden="true"
                                                ></i>
                                                &nbsp;&nbsp;India
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="nav row">
                                        <div className="col-2">
                                            <button>
                                                <i
                                                    className="fa fa-newspaper-o"
                                                    aria-hidden="true"
                                                ></i>
                                                <h6>Feed</h6>
                                            </button>
                                        </div>
                                        <div className="col-2">
                                            <button>
                                                <i
                                                    className="fa fa-info"
                                                    aria-hidden="true"
                                                ></i>
                                                <h6>Info</h6>
                                            </button>
                                        </div>
                                        <div className="col-2">
                                            <button>
                                                <i
                                                    className="fa fa-newspaper-o"
                                                    aria-hidden="true"
                                                ></i>
                                                <h6>Work</h6>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.postCards(posts)}
                        </div>
                        <div className="col-3">
                            <RightContent />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePage;
