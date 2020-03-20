import React, { Component } from "react";
// import { Link } from "gatsby";
import SVG from "react-inlinesvg";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import AniLink from "../transitions/AniLink";

import "../../styles/blocks/nav.css";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isMenuOpen: false
    };
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
    this.setState(state => ({
      isMenuOpen: false
    }));
  };

  componentDidMount() {
    document.body.classList.remove("nav-open");
    this.setState(state => ({
      isMenuOpen: false
    }));
    window.addEventListener("scroll", this.closeMenu);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.closeMenu);
  }

  render() {
    const isMenuOpen = this.state.isMenuOpen;
    const { menuItems, isFooterInView } = this.props;
    return (
      <div id="nav-container" className="flex align-center space-between">
        <ReactCSSTransitionGroup
          //transitioned in css with .logo-enter.logo-enter-active
          // and .logo-leave.logo-leave-active
          transitionName="logo"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <div id="logo">
            <AniLink
              preventScrollJump
              fade
              to="/"
              className={`${isFooterInView ? "footer-in-view" : ""}`}
            >
              <SVG src="/logo-o-dot.svg" />
            </AniLink>
          </div>
        </ReactCSSTransitionGroup>

        <div id="nav" className="hide_768">
          <ul className="flex">
            {menuItems.map(item => {
              const name = item.menuItemText;
              const url = item.menuItemPage.slug;

              return (
                <React.Fragment key={name}>
                  <li className="uppercase">
                    <AniLink preventScrollJump fade to={`/${url}`}>
                      {name}
                    </AniLink>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>

        <ReactCSSTransitionGroup
          //transitioned in css with .nav-open-enter.nav-open-enter-active
          // and .nav-open-leave.nav-open-leave-active
          transitionName="nav-open"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {isMenuOpen && (
            <div id="nav" className="show_768">
              <ul className="flex">
                {menuItems.map(item => {
                  const name = item.menuItemText;
                  const url = item.menuItemPage.slug;

                  return (
                    <React.Fragment key={name}>
                      <li className="uppercase">
                        <AniLink preventScrollJump fade to={`/${url}`}>
                          {name}
                        </AniLink>
                      </li>
                    </React.Fragment>
                  );
                })}
                <li className="textlink email" style={{ marginTop: "25px" }}>
                  <a href="mailto:hello@weareoutline.com" className="">
                    hello@weareoutline.com
                  </a>
                </li>
              </ul>
            </div>
          )}
        </ReactCSSTransitionGroup>
        <div className={`scheme-black show_768`}>
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
      </div>
    );
  }
}

export default Navigation;
