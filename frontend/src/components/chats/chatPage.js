import React, { Component } from "react";

import NavBar from "../nav bar/navBar";
import { ChatClass, ChatTile } from "./helpers/chatTile";
import { Chat } from "./chat";

import "./chats.css";

class ChatPage extends Component {
    constructor(props) {
        super(props);

        this.profileImage = require("../media/images/categories/photographer.png");

        this.chats = [
            new ChatClass(
                this.profileImage,
                "Vishwanth",
                "Red Hat Hacker",
                "You",
                "Hello!",
                "11-10-2019",
                "12:00 pm"
            ),
            new ChatClass(
                this.profileImage,
                "Nikhil",
                "Data Scientist",
                "Nikhil",
                "Hello!",
                "10-10-2019",
                "9:00 am"
            ),
            new ChatClass(
                this.profileImage,
                "Sunny",
                "Cyber Crime Investigator",
                "Sunny",
                "Hello!",
                "8-10-2019",
                "12:00 pm"
            ),
            new ChatClass(
                this.profileImage,
                "Hemanth",
                "Game Developer",
                "You",
                "Hello!",
                "8-10-2019",
                "11:00 pm"
            ),
            new ChatClass(
                this.profileImage,
                "Veman",
                "Mathematics Professor",
                "You",
                "Hello!",
                "5-10-2019",
                "2:00 pm"
            ),
            new ChatClass(
                this.profileImage,
                "Anonymous",
                "No Job Secured",
                "Anonymous",
                "Hello!",
                "5-10-2019",
                "12:00 pm"
            ),
            new ChatClass(
                this.profileImage,
                "Group Chat",
                "Group of jobs",
                "You",
                "Hello!",
                "5-10-2019",
                "1:00 pm"
            )
        ];

        this.state = {
            currentChat: this.chats[0],
            searchInput: "",
            chatSearchList: this.chats,
            messageInput: ""
        };

        this.changeCurrChat = this.changeCurrChat.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
        this.updateSearchList = this.updateSearchList.bind(this);
    }

    componentDidMount() {
        document
            .getElementById("chat")
            .scrollTo(0, document.getElementById("chat").scrollHeight);
    }

    // Handling Input Change...
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (name === "searchInput") {
            this.updateSearchList(value);
        }
    };

    // Handling Input submission...
    handleInputSubmit = e => {
        e.preventDefault();
    };

    // Search Resluts...
    updateSearchList = value => {
        let updatedSearchList = [];

        for (let index = 0; index < this.chats.length; index++) {
            const chat = this.chats[index];
            if (
                chat.name
                    .toLowerCase()
                    .replace(/\s/g, "")
                    .includes(value.toLowerCase().replace(/\s/g, ""))
            ) {
                updatedSearchList.push(chat);
            }
        }

        this.setState({
            chatSearchList: updatedSearchList
        });
    };

    // Chats Tiles...
    chatTiles = () => {
        let chatTiles = [];
        for (let index = 0; index < this.state.chatSearchList.length; index++) {
            const chat = this.state.chatSearchList[index];
            chatTiles.push(
                <button
                    className={
                        "chatTile" +
                        (this.state.currentChat === chat ? " chatActive" : "")
                    }
                    key={index}
                    onClick={() => {
                        this.changeCurrChat(index);
                    }}
                >
                    <ChatTile
                        profileImage={chat.profileImage}
                        name={chat.name}
                        lastUser={chat.lastUser}
                        lastMsg={chat.lastMsg}
                        date={chat.date}
                        time={chat.time}
                    />
                </button>
            );
        }

        return chatTiles;
    };

    // Change Current Chat...
    changeCurrChat = index => {
        this.setState({
            currentChat: this.chats[index]
        });
    };

    render() {
        const { searchInput } = this.state;

        return (
            <React.Fragment>
                <NavBar />
                <div className="container-fluid chatPage">
                    <div className="row box">
                        <div className="col-3 leftContent">
                            <div className="row header justify-content-between">
                                <div className="col align-self-center">
                                    <h6 className="heading">Messenger</h6>
                                </div>
                                <button className="newChat">
                                    <i
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                            <div className="row body">
                                <div className="col">
                                    <div className="row searchChats">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="searchInput"
                                                placeholder="Search for a chat"
                                                name="searchInput"
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                value={searchInput}
                                            />
                                        </div>
                                    </div>
                                    <div className="row chatTiles">
                                        <div className="col">
                                            {this.chatTiles()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 chatBox">
                            <Chat
                                user={this.state.currentChat}
                                handleInputChange={this.handleInputChange}
                                handleInputSubmit={this.handleInputSubmit}
                                messageInput={this.state.messageInput}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ChatPage;
