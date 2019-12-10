import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Chat extends Component {
    messagesComp = () => {
        const { auth } = this.props;
        let messages = [];
        for (let index = 0; index < 3; index++) {
            messages.push(
                <React.Fragment key={index}>
                    <div className="row myMessage">
                        <div className="col">
                            <div className="row chatDetails justify-content-end">
                                <span className="datetime">
                                    12:00PM, 11-10-2019&nbsp;&nbsp;
                                </span>
                                <Link
                                    to={
                                        "/artist/" +
                                        (auth.user && auth.user.name)
                                    }
                                    className="user"
                                >
                                    You
                                </Link>
                            </div>
                            <div className="row justify-content-end">
                                <div className="message">
                                    Hi Vincent, how are you? How is the project
                                    coming along?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row otherMessage">
                        <div className="col">
                            <div className="row chatDetails">
                                <Link
                                    to={"/artist/" + this.props.user.name}
                                    className="user"
                                >
                                    {this.props.user.name}
                                </Link>
                                <h6 className="datetime">
                                    &nbsp;&nbsp;&nbsp;12:00PM, 11-10-2019
                                </h6>
                            </div>
                            <div className="row">
                                <div className="message">
                                    Are we meeting today? Project has been
                                    already finished and I have results to show
                                    you.
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        return messages;
    };

    render() {
        const {
            user,
            handleInputChange,
            handleInputSubmit,
            messageInput
        } = this.props;

        return (
            <React.Fragment>
                <div className="row header justify-content-between">
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
                <div className="row body">
                    <div className="col">
                        <div className="row chat" id="chat">
                            <div className="col">{this.messagesComp()}</div>
                        </div>
                        {/* Input Buttons */}
                        <form onSubmit={handleInputSubmit}>
                            <div className="row chatInput">
                                <div
                                    className={
                                        "inputButtons" +
                                        (messageInput ? " noDisplay" : "")
                                    }
                                >
                                    <button className="inputButton image">
                                        <i
                                            className="fa fa-picture-o"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                    <button className="inputButton file">
                                        <i
                                            className="fa fa-paperclip"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        placeholder="Type input here..."
                                        name="messageInput"
                                        onChange={handleInputChange}
                                        value={messageInput}
                                    />
                                </div>
                                <button type="submit" className="submitButton">
                                    <i
                                        className="fa fa-paper-plane"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
