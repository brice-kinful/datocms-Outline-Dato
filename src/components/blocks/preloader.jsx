import React, { Component } from "react";
import BackgroundImage from "gatsby-background-image";
import SVG from "react-inlinesvg";

import "../../styles/blocks/preloader.css";

class Preloader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesReady: false
    };
  }

  componentDidMount() {
    document.body.classList.add("freeze");
    setTimeout(() => {
      document.body.classList.remove("freeze");
    }, 3250);
  }

  updateImagesReady = () => {
    this.setState({ imagesReady: true });
  };

  render() {
    const { images } = this.props;
    const { imagesReady } = this.state;
    const imagesLength = images.images.length;

    return (
      <div id="preload" className={`${imagesReady ? "go" : "wait"}`}>
        <SVG src="/logo.svg" className="logo" />
        <div className="images">
          {images.images.map((item, index) => {
            return (
              <>
                <BackgroundImage
                  fadeIn={false}
                  fluid={item.fluid}
                  backgroundColor={`#ffffff`}
                ></BackgroundImage>
                {imagesLength == index + 1 && (
                  <BackgroundImage
                    fadeIn={false}
                    fluid={item.fluid}
                    backgroundColor={`#ffffff`}
                    onLoad={this.updateImagesReady}
                  ></BackgroundImage>
                )}
              </>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Preloader;
