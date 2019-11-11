import React, { Component } from "react";

class PostComp extends Component {
    constructor(props, title) {
        super(props);
        this.title = title;
    }

    render() {
        return (
            <div className="post">
                <h2>{this.title}</h2>
            </div>
        );
    }
}

export default PostComp;
