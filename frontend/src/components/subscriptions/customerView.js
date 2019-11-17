import React, { Component } from "react";

class CustomerView extends Component {
    constructor(props) {
        super(props);

        this.products = this.props.products;
    }

    plansComp = plans => {
        let planComps = [];
        for (let index = 0; index < plans.length; index++) {
            const plan = plans[index];
            planComps.push(
                <div class="customer-view-plan">
                    <form action="/signUp" method="POST">
                        {/* <input
                            type="hidden"
                            value={product.name}
                            name="productName"
                        /> */}
                        <input type="hidden" value={plan.id} name="planId" />
                        <input
                            type="hidden"
                            value={plan.nickname}
                            name="planName"
                        />
                        <input
                            type="hidden"
                            value={plan.amount}
                            name="planAmount"
                        />
                        <input
                            type="hidden"
                            value={plan.interval}
                            name="planInterval"
                        />
                        <input
                            type="hidden"
                            value={plan.interval_count}
                            name="planIntervalCount"
                        />
                        <h3>
                            {plan.nickname} &mdash; {plan.amount} /
                            {plan.interval_count > 1
                                ? plan.interval_count + " " + plan.interval
                                : plan.interval}
                            s
                        </h3>
                        <input class="btn" type="submit" value="Sign Up" />
                    </form>
                </div>
            );
        }
    };

    render() {
        return (
            <div class="customer-view">
                <div class="customer-view-plans">
                    {this.plansComp(this.products)}
                </div>
            </div>
        );
    }
}

export default CustomerView;
