import React from "react";
import Measure from "react-measure";
import SVG from "react-inlinesvg";

import "../../styles/blocks/footer.css";

const Footer = props => {
  return (
    <Measure
      bounds
      onResize={contentRect => {
        console.log(contentRect.bounds);
        var x = document.getElementsByClassName("page");
        x[0].style.marginBottom = contentRect.bounds.height + "px";
      }}
    >
      {({ contentRect, measureRef }) => {
        var x = document.getElementsByClassName("page");
        return (
          <div id="footer" className="black-bg" ref={measureRef}>
            <div className="wrapper flex grid four">
              <div className="grid-item one-fourth">
                <p>Follow</p>
                <div>
                  <a
                    href="https://www.instagram.com/we.are.outline"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.pinterest.com/we.are.outline"
                    target="_blank"
                  >
                    Pinterest
                  </a>
                </div>
              </div>
              <div className="grid-item one-fourth">
                <p>Project Inquiries</p>
                <div>
                  <a href="tel:843-425-5312">843.425.5312</a>
                </div>
                <div>
                  <a href="mailto:hello@weareoutline.com">
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
                <p>Development</p>
                <p>Meet our development-focused</p>
                <p>
                  sister company,{" "}
                  <a href="https://bykinful.com" target="_blank">
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
};

export default Footer;
