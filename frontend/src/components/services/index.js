import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getPlans } from "../../actions/index";

class ServicePlans extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requestAction: false
        };
    }
    componentDidMount() {
        if (!this.state.requestAction) {
            this.props.getPlans();
        }
    }

    showAllPlans = plans => {
        let comps = [];

        for (let index = 0; index < plans.length; index++) {
            const plan = plans[index];
            comps.push(
                <div className="col-3">
                    <button>{plan.name}</button>
                </div>
            );
        }

        return comps;
    };

    render() {
        const { servicePlans } = this.props;

        return (
            <div className="container-fluid services">
                <div className="row">
                    {servicePlans.plans
                        ? this.showAllPlans(servicePlans.plans)
                        : null}
                </div>
            </div>
        );
    }
}

ServicePlans.propTypes = {
    getPlans: PropTypes.func.isRequired,
    servicePlans: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    servicePlans: state.servicePlans
});

export default connect(mapStateToProps, { getPlans })(ServicePlans);
