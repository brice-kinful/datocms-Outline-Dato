import React, { Component } from "react";
import SVG from "react-inlinesvg";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import AniLink from "gatsby-plugin-transition-link/AniLink";

import "../../styles/blocks/nav.css";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  componentDidMount() {
    document.body.classList.remove("nav-open");
    this.setState(state => ({
      isMenuOpen: false
    }));

    // document.onmousemove = function(e) {
    //   document.body.style.setProperty("--x", e.clientX + "px");
    //   document.body.style.setProperty("--y", e.clientY + "px");
    // };
  }

  openMenu = e => {
    e.preventDefault();
    // console.log('clicked')
    this.setState(state => ({
      isMenuOpen: !state.isMenuOpen
    }));
    if (this.state.isMenuOpen) {
      document.body.classList.remove("nav-open");
    } else {
      document.body.classList.add("nav-open");
    }
  };

  closeMenu = e => {
    if (this.state.isMenuOpen) {
      document.body.classList.remove("nav-open");
    }
  };

  render() {
    const isMenuOpen = this.state.isMenuOpen;
    const { menuItems } = this.props;
    return (
      <div id="nav-container">
        <ReactCSSTransitionGroup
          //transitioned in css with .logo-enter.logo-enter-active
          // and .logo-leave.logo-leave-active
          transitionName="logo"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <div id="logo">
            <AniLink fade to="/">
              <SVG src="/logo-o-dot.svg" />
            </AniLink>
          </div>
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          //transitioned in css with .nav-open-enter.nav-open-enter-active
          // and .nav-open-leave.nav-open-leave-active
          transitionName="nav-open"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {isMenuOpen && (
            <div id="nav">
              <div className={`wrapper`}>
                <div className={``}>
                  <ul className="flex">
                    {menuItems.map(item => {
                      const name = item.menuItemText;
                      const url = item.menuItemPage.slug;

                      return (
                        <li key={name}>
                          <AniLink fade to={`/${url}`}>
                            {name}
                          </AniLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </ReactCSSTransitionGroup>

        <div className={`scheme-black`}>
          <div
            id="toggle_menu"
            className={`toggle_menu`}
            onClick={this.openMenu}
          >
            <div className={"hamburger"}>
              <span></span>
              <span></span>
            </div>
            <div className={`label`}>Menu</div>
          </div>
        </div>
        <div id="cursor"></div>
      </div>
    );
  }
}

export default Navigation;
