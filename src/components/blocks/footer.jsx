import React, { Component } from "react";
import Measure from "react-measure";
import SVG from "react-inlinesvg";
import AniLink from "gatsby-plugin-transition-link/AniLink";

import "../../styles/blocks/footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      el: ""
    };
  }

  componentDidMount() {
    this.setState({
      el: document.getElementsByClassName("page")
    });
  }

  render() {
    const { el } = this.state;
    const pageStyle = el[0];
    return (
      <Measure
        bounds
        onResize={contentRect => {
          pageStyle &&
            (pageStyle.style.marginBottom = contentRect.bounds.height + "px");
        }}
      >
        {({ contentRect, measureRef }) => {
          return (
            <div id="footer" className="black-bg" ref={measureRef}>
              <div className="wrapper flex grid four">
                <div className="grid-item one-fourth">
                  <p>Follow</p>
                  <div>
                    <a
                      href="https://www.instagram.com/we.are.outline"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="line"
                    >
                      Instagram
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.pinterest.com/we.are.outline"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="line"
                    >
                      Pinterest
                    </a>
                  </div>
                </div>
                <div className="grid-item one-fourth">
                  <AniLink
                    fade
                    to={`/pre-project-interview`}
                    className="line"
                    style={{ display: "inline-block" }}
                  >
                    Project Inquiries
                  </AniLink>
                  <div>
                    <a href="tel:843-425-5312" className="line">
                      843.425.5312
                    </a>
                  </div>
                  <div>
                    <a href="mailto:hello@weareoutline.com" className="line">
                      hello@weareoutline.com
                    </a>
                  </div>
                </div>
                <div className="grid-item one-fourth">
                  <p>Office</p>
                  <p>4412 Spruill Ave, Suite B</p>
                  <p>North Charleston, SC 29405</p>
                </div>
                <div className="grid-item one-fourth">
                  <p>Web Development</p>
                  <p>
                    Meet our development-focused sister company,{" "}
                    <a
                      href="https://bykinful.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="line"
                    >
                      Kinful
                    </a>
                  </p>
                </div>
              </div>
              <div className="wrapper bottom">
                <SVG src="/logo.svg" className="logo" />
              </div>
            </div>
          );
        }}
      </Measure>
    );
  }
}

export default Footer;
