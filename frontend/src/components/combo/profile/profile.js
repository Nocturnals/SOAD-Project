import React, { Component } from "react";

import LeftContent from "./leftContent/leftContent";
import PostComp from "./post/post";

import "./profile.css";

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

        // Defining Elements
        const posts = [
            new Post("John Doe", "3 min", "Epic Coder", "India", false),
            new Post("Hemanth", "10 min", "Epic Coder", "India", true),
            new Post("Vishwanth", "20 min", "Epic Coder", "India", false),
            new Post("Nikhil", "59 min", "Epic Coder", "India", true)
        ];

        return (
            <div className="profile row">
                <div className="col">
                    <div className="coverImage row"></div>
                    <div className="profile-content row">
                        <div className="col-3">
                            <LeftContent email="mail.mail.com" />
                        </div>
                        <div className="col-6">
                            <div className="uploadPost row">
                                <div className="col">
                                    <div className="row justify-content-between">
                                        <div className="col-4">
                                            <div
                                                className="post-user-image"
                                                style={{
                                                    backgroundImage: `url(${postUserImage})`
                                                }}
                                            ></div>
                                        </div>
                                        <div className="col-4 align-self-center">
                                            <div className="post-button">
                                                <button>Post Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.postCards(posts)}
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePage;
