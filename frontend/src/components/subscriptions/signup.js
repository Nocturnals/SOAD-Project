import React, { Component } from "react";

import "./signUpScript";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.plan = this.props.plan;
        this.alert = this.props.alert;
    }

    render() {
        return (
            <div>
                <div className="sign-up">
                    <h2>
                        Sign up for {this.this.plan.name} &mdash;{" "}
                        {this.this.plan.amount} /
                        {this.this.plan.interval_count > 1
                            ? this.this.plan.interval_count +
                              " " +
                              this.this.plan.interval +
                              "s"
                            : this.this.plan.interval}
                    </h2>
                    {this.alert === "success" ? (
                        <div>
                            <p>
                                Your payment was successful. Congrats, you've
                                successfully signed up!{" "}
                            </p>
                        </div>
                    ) : this.alert === "error" ? (
                        <div>
                            <p>
                                Your payment was unsuccessful. Please try again.
                            </p>
                        </div>
                    ) : (
                        <div className="sign-up-container">
                            <form
                                action="/processPayment"
                                method="POST"
                                id="payment-form"
                            >
                                <input
                                    type="hidden"
                                    value={this.plan.id}
                                    name="planId"
                                />
                                <input
                                    type="hidden"
                                    value={this.plan.amount}
                                    name="planAmount"
                                />
                                <input
                                    type="hidden"
                                    value={this.plan.name}
                                    name="planName"
                                />
                                <input
                                    type="hidden"
                                    value={this.plan.interval}
                                    name="planInterval"
                                />
                                <input
                                    type="hidden"
                                    value={this.plan.interval_count}
                                    name="planIntervalCount"
                                />

                                <label>Email Address</label>
                                <input
                                    placeholder="Your Email Address"
                                    name="customerEmail"
                                />
                                <div className="form-row">
                                    <label for="card-element">
                                        Credit or debit card
                                    </label>
                                    <div id="card-element"></div>

                                    <div id="card-errors" role="alert"></div>
                                </div>

                                <input
                                    className="btn"
                                    type="submit"
                                    value={"Pay " + this.plan.amount}
                                />
                            </form>
                        </div>
                    )}
                </div>

                <input
                    className="btn"
                    type="submit"
                    id="cancel"
                    value="cancel"
                />
            </div>
        );
    }
}

export default SignUp;
