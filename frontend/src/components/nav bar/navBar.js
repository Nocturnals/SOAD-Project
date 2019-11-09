import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import './navBar.css'
import './animations'
import { toggleNavBar, enableBodyScroll } from './animations'



// Constructor Classes
class NavBtnNames {
    constructor(fname = "", lname = "", link = "/", class_name = "navBtn", iconClass = "") {
        this.fname = fname;
        this.lname = lname;
        this.class_name = class_name;
        this.iconClass = iconClass;
        this.link = link;
    }
}
class NavComponents {
    constructor(compClass, buttons) {
        this.compClass = compClass;
        this.buttons = buttons;
    }
}




// Component Class
class NavBar extends Component {

    constructor(props) {
        super(props);
    }


    // Creating Buttons...
    navBtn = (buttons) => {
        let nav_buttons = []

        for (let index = 0; index < buttons.length; index++) {
            let button = buttons[index];
            nav_buttons.push(
                button.link ?
                    <Link to={button.link}>
                        <button className={button.class_name}>
                            <span className="fname">{button.fname}</span>
                            <span className="lname">{button.lname}</span>
                        </button>
                    </Link> :
                    <button className={button.class_name} onClick={toggleNavBar()}>
                        <i className={button.iconClass} aria-hidden="true"></i>
                    </button>
            )
        }

        return nav_buttons;
    }

    navBarComponents = (comps) => {
        let nav_components = []

        for (let index = 0; index < comps.length; index++) {
            let comp = comps[index];
            nav_components.push(
                <span className={comp.compClass}>
                    {comp.buttons}
                </span>
            )
        }

        return nav_components;
    }

    expandNavBarBtns = (buttons) => {
        let buttonBlocks = []

        for (let index = 0; index < buttons.length; index++) {
            let button = buttons[index];
            buttonBlocks.push(
                <div>
                    <Link to={button.link}>
                        <button className={button.class_name}>{button.fname}</button>
                    </Link>
                </div>
            )
        }

        return buttonBlocks;
    }

    render() {
        const { isAuthed } = this.props.auth;

        const leftNavBtns = [
            new NavBtnNames('Artist', ' Colab', '/', 'navTitle')
        ];

        const rightNavBtns = [
            new NavBtnNames('Home', '', '/'),
            new NavBtnNames('Features'),
            new NavBtnNames('Services'),
            new NavBtnNames('About Us'),
            !isAuthed ? new NavBtnNames('Log In', '', '/login')
                : new NavBtnNames('Profile', '', '/'),
        ];
        rightNavBtns.push(new NavBtnNames('', '', '', 'navMenuIcon', 'fa fa-bars'));

        const expandNavBtns = [
            new NavBtnNames('Home', '', '/', 'expNavBtn'),
            new NavBtnNames('Features', '', '', 'expNavBtn'),
            new NavBtnNames('Services', '', '', 'expNavBtn'),
            new NavBtnNames('About Us', '', '', 'expNavBtn'),
            !isAuthed ? new NavBtnNames('LOG IN', '', '/login', 'expNavBtn')
                : new NavBtnNames('Profile', '', '/login', 'expNavBtn'),
        ];

        const components = [
            new NavComponents('leftNav', this.navBtn(leftNavBtns)),
            new NavComponents('rightNav', this.navBtn(rightNavBtns))
        ];


        return (
            <div className="nav-bar" id="nav-bar">
                {this.navBarComponents(components)}
                <div id="expandedNav" className="expandedNav">
                    {this.expandNavBarBtns(expandNavBtns)}
                </div>
            </div>
        );
    }
}


NavBar.propTypes = {
    auth: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    alert: state.alert
})


export default connect(mapStateToProps)(NavBar);
