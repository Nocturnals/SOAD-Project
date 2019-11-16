import React, { Component } from "react";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.plan = this.props.plan;
        this.alert = this.props.alert;
    }

    render() {
        return (
            <div class="sign-up">
                <h2>
                    Sign up for {this.plan.name} &mdash; {this.plan.amount} /
                    {this.plan.interval_count > 1
                        ? this.plan.interval_count +
                          " " +
                          this.plan.interval +
                          "s"
                        : this.plan.interval}
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
                        <p>Your payment was unsuccessful. Please try again.</p>
                    </div>
                ) : (
                    <div class="sign-up-container">
                        <form
                            action="/processPayment"
                            method="POST"
                            id="payment-form"
                        >
                            <input
                                type="hidden"
                                value="{{ product.name }}"
                                name="productName"
                            />
                            <input
                                type="hidden"
                                value="{{ plan.id }}"
                                name="planId"
                            />
                            <input
                                type="hidden"
                                value="{{ plan.amount }}"
                                name="planAmount"
                            />
                            <input
                                type="hidden"
                                value="{{ plan.name }}"
                                name="planName"
                            />
                            <input
                                type="hidden"
                                value="{{ plan.interval }}"
                                name="planInterval"
                            />
                            <input
                                type="hidden"
                                value="{{ plan.interval_count }}"
                                name="planIntervalCount"
                            />

                            <label>Email Address</label>
                            <input
                                placeholder="Your Email Address"
                                name="customerEmail"
                            />
                            <div class="form-row">
                                <label for="card-element">
                                    Credit or debit card
                                </label>
                                <div id="card-element"></div>

                                <div id="card-errors" role="alert"></div>
                            </div>

                            <input
                                class="btn"
                                type="submit"
                                value="Pay {{ plan.amount }}"
                            />
                        </form>
                    </div>
                )}
            </div>
        );
    }
}
