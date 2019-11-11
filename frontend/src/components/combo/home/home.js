import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import "./home.css";

// Post Element Class...
class Post {
    constructor(title) {
        this.title = title;
    }
}

// Home Page Component...
class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    // Generates Cards of Posts...
    postCards = postDetails => {
        let postCards = [];
        for (let index = 0; index < postDetails.length; index++) {
            const post = postDetails[index];
            postCards.push(
                <div className="post" key={index}>
                    <h2>{post.title}</h2>
                </div>
            );
        }

        return postCards;
    };

    // Rendering...
    render() {
        // Defining Elements
        const posts = [
            new Post("Post-1"),
            new Post("Post-2"),
            new Post("Post-3"),
            new Post("Post-4")
        ];

        return (
            <div className="home-content row">
                <div className="personal-content col-3 border"></div>
                <div className="posts col-6 border">
                    {this.postCards(posts)}
                </div>
                <div className="suggestions col-3 border"></div>
            </div>
        );
    }
}

export default HomePage;
