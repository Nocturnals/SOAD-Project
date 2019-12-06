import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Chat extends Component {
    render() {
        const { user } = this.props;

        return (
            <React.Fragment>
                <div className="row header justify-content-between h-9">
                    <div className="col align-self-center">
                        <h6 className="userName">
                            <Link to={"/artist/" + user.name} className="link">
                                {user.name}
                            </Link>
                        </h6>
                        <h6 className="job">{user.job}</h6>
                    </div>
                    <button>
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="row body h-75">
                    <div className="col">
                        <div className="row chat">
                            <div className="col"></div>
                        </div>
                        <div className="row chatInput">
                            <div className="col">
                                <input
                                    type="text"
                                    placeholder="Type input here..."
                                />
                            </div>
                            <button className="sendButton">
                                <i
                                    className="fa fa-paper-plane"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
