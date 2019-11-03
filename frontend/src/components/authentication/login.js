import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { login, logout } from '../../actions';
import isValidEmail from '../../validation/emailValidation';


class LoginComp extends Component {

    constructor(props) {
        super(props);

        this.props.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false,
            validEmail: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        const { email } = this.state;
        if (email && !isValidEmail(email)) {
            console.log(email);
            
            this.setState({validEmail: false});
        }
        else {
            this.setState({validEmail: true});
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    render() {
        // const img = require('../media/images/authentication/login_sideback.png')

        const { isLoading } = this.props.auth;
        const { email, password, submitted, validEmail } = this.state;
        
        return (
            <div className="login_main">
                {console.log(validEmail)}
                <form name="form" onSubmit={this.handleSubmit} className="form comp">
                    <h2>LOG IN</h2>
                    <div className={'form_group email' + ((submitted && !email) || !validEmail ? ' has-error' : 'no-error')}>
                        {/* <label htmlFor="email">Email</label> */}
                        <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} placeholder="Email..." />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form_group password' + (submitted && !password ? ' has-error' : '')}>
                        {/* <label htmlFor="password">Password</label> */}
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Password..." />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form_group">
                        <button className="login_btn" disabled={isLoading}>LOG IN</button>
                        {isLoading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    <div className="form_group reg_btn">
                        Don't have an account?&nbsp;
                        <Link to="/register" className="reg_link"> Register</Link>
                        &nbsp;now
                    </div>
                </form>
                <div className="image comp"></div>
            </div>
        )
    }
}


LoginComp.propTypes = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    alert: state.alert
})
export default connect(mapStateToProps, { login, logout })(LoginComp)