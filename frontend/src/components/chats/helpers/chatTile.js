import React, { Component } from "react";

import Img from "react-image";

export class ChatClass {
    constructor(profileImage, name, job, lastUser, lastMsg, date, time) {
        this.profileImage = profileImage;
        this.name = name;
        this.job = job;
        this.lastUser = lastUser;
        this.lastMsg = lastMsg;
        this.date = date;
        this.time = time;
    }
}

export class ChatTile extends Component {
    render() {
        const {
            profileImage,
            name,
            lastUser,
            lastMsg,
            date,
            time
        } = this.props;

        return (
            <div className="row">
                <div className="col-4 profilePic">
                    <Img src={profileImage} className="chatImage" />
                </div>
                <div className="col-5 lastChat">
                    <div className="row">
                        <h6 className="chatName">{name}</h6>
                    </div>
                    <div className="row">
                        <h6 className="message">
                            {lastUser}: {lastMsg}
                        </h6>
                    </div>
                </div>
                <div className="col-3 chatTime align-self-center">
                    <h6 className="date">{date}</h6>
                    <h6 className="time">{time}</h6>
                </div>
            </div>
        );
    }
}
