import React, { Component } from "react";

import "./mainLoader.css";

class MainLoader extends Component {
    render() {
        return (
            <div className="loadLayer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    {/* --- L --- */}
                    <path
                        className="loading-path loa"
                        d="M12 27 L9 27 L9 22"
                    ></path>
                    <path
                        className="loading-path-rev loa"
                        d="M12 26.5 L9.5 26.5 L9.5 22"
                    ></path>

                    {/* --- O --- */}
                    <ellipse
                        className="loading-path loa"
                        cx="15"
                        cy="24.5"
                        rx="2"
                        ry="2.6"
                    ></ellipse>
                    <ellipse
                        className="loading-path-rev loa"
                        cx="15"
                        cy="24.5"
                        rx="1.5"
                        ry="2.1"
                    ></ellipse>

                    {/* --- A --- */}
                    <path
                        className="loading-path loa"
                        d="M23 27 L20.5 22 L18 27"
                    ></path>
                    <path
                        className="loading-path-rev loa"
                        d="M22.5 27 L20.5 23 L18.5 27"
                    ></path>

                    {/* --- D --- */}
                    <path
                        className="loading-path ding"
                        d="M25 27 a1.2,1 0 0,0 0,-5 Z"
                    ></path>
                    <path
                        className="loading-path-rev ding"
                        d="M24.5 27 a1.2,1 0 0,0 0,-5 Z"
                    ></path>

                    {/* --- I --- */}
                    <path
                        className="loading-path ding"
                        d="M29.5 27 L29.5 22"
                    ></path>
                    <path
                        className="loading-path-rev ding"
                        d="M30 27 L30 22"
                    ></path>

                    {/* --- N --- */}
                    <path
                        className="loading-path ding"
                        d="M36 22 L36 27 L32 22 L32 27"
                    ></path>
                    <path
                        className="loading-path-rev ding"
                        d="M35.5 22 L35.5 26.4 L32.5 22.6 L32.5 27"
                    ></path>

                    {/* --- G --- */}
                    <path
                        className="loading-path ding"
                        d="M40.5 22 a1.2,1.1 0 0,0 0,5 L40.5 25.5 L40 25.5"
                    ></path>
                    <path
                        className="loading-path-rev ding"
                        d="M40.5 22.75 a 1.2,1 0 0,0 0,3.5 L40.5 25.5 L40 25.5"
                    ></path>
                </svg>
            </div>
        );
    }
}

export default MainLoader;
