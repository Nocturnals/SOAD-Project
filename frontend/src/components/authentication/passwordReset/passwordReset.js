import React, { Component } from "react";

import "./passwordReset.css";

class PasswordResetComp extends Component {
    render() {
        return (
            <div className="password-reset container-fluid">
                <div className="passwordResetRow row">
                    <form className="passwordReset col">
                        <div className="header row">
                            <div className="col">
                                <h2>Password Reset</h2>
                            </div>
                        </div>
                        <div className="inputs row">
                            <div className="col-9">
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter Password"
                                />
                            </div>
                            <div className="col-9">
                                <input
                                    type="password"
                                    required
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </div>
                        <div className="submit row">
                            <div className="col-9">
                                <button>Change Password</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default PasswordResetComp;
