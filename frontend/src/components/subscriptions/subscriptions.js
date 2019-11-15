import React, { Component } from "react";

import CustomerView from "./customerView";

import "./app.css";
import "./customerView.css";

class Subscriptions extends Component {
    render() {
        return (
            <div class="app-container">
                <div class="app-header">
                    <a href="/customerView">
                        <p class="{% if not admin %} active {% endif %}">
                            CUSTOMER VIEW
                        </p>
                    </a>
                </div>
                <CustomerView products="" />
            </div>
        );
    }
}
