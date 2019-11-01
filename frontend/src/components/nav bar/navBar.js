import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

import './navBar.css'
import './animations'
import ToggleNavBar from './animations'



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
class NavBar extends React.Component {

    leftNavBtns = [
        new NavBtnNames('Artist', ' Colab', '/', 'navTitle')
    ]
    rightNavBtns = [
        new NavBtnNames('Home', '', '/'),
        new NavBtnNames('Features'),
        new NavBtnNames('Services'),
        new NavBtnNames('About Us'),
        new NavBtnNames('Log In', '', '/login'),
        new NavBtnNames('', '', '', 'navMenuIcon', 'fa fa-bars')
    ]
    expandNavBtns = [
        new NavBtnNames('Home', '', '/', 'expNavBtn'),
        new NavBtnNames('Features', '', '', 'expNavBtn'),
        new NavBtnNames('Services', '', '', 'expNavBtn'),
        new NavBtnNames('About Us', '', '', 'expNavBtn'),
        new NavBtnNames('LOG IN', '', '/login', 'expNavBtn'),
    ]


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
                            <i className={button.iconClass} aria-hidden="true"></i>
                        </button>
                    </Link> :
                    <button className={button.class_name} onClick={ToggleNavBar()}>
                        <i className={button.iconClass} aria-hidden="true"></i>
                    </button>
            )
        }

        return nav_buttons;
    }

    components = [
        new NavComponents('leftNav', this.navBtn(this.leftNavBtns)),
        new NavComponents('rightNav', this.navBtn(this.rightNavBtns))
    ]

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
                    <button className={button.class_name}>{button.fname}</button>
                </div>
            )
        }

        return buttonBlocks;
    }

    render() {
        return (
            <div className="nav-bar" id="nav-bar">
                {this.navBarComponents(this.components)}
                <div id="expandedNav" className="expandedNav">
                    {this.expandNavBarBtns(this.expandNavBtns)}
                </div>
            </div>
        );
    }
}


export default NavBar;
