import React, { Component } from "react";
import BackgroundImage from "gatsby-background-image";

import "../../styles/blocks/preloader.css";

class Preloader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { images } = this.props;

    return (
      <div id="preload" className="go">
        <h1 className="white-color centertext">Outline</h1>
        <div className="images">
          {images.images.map((item, index) => {
            return (
              <>
                <BackgroundImage
                  fadeIn={false}
                  fluid={item.fluid}
                  backgroundColor={`#ffffff`}
                ></BackgroundImage>
              </>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Preloader;
