import React, { Component } from "react";
import BackgroundImage from "gatsby-background-image";
import SVG from "react-inlinesvg";

import "../../styles/blocks/preloader.css";

class Preloader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesReady: false,
      images: []
    };
  }

  componentDidMount() {
    this.setState({
      images: this.state.images.concat(this.props.images.images)
    });
    document.body.classList.add("freeze");
    setTimeout(() => {
      document.body.classList.remove("freeze");
    }, 3250);
  }

  updateImagesReady = () => {
    this.setState({ imagesReady: true });
  };

  render() {
    console.log(this.state.images);
    const { imagesReady, images } = this.state;
    const imagesLength = images.length;
    const nums = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight"
    ];

    return (
      <div id="preload" className={`${imagesReady ? "go" : "wait"}`}>
        <div id="cursor"></div>
        {/* <SVG src="/logo.svg" className="logo" /> */}
        <h1 className="centertext">Outline</h1>
        <div className={`images ${nums[images.length - 1]}`}>
          {images.map((item, index) => {
            // setTimeout(() => {
            return (
              <>
                <BackgroundImage
                  fadeIn={false}
                  fluid={item.fluid}
                  backgroundColor={`#ffffff`}
                  onLoad={imagesLength != index + 1 && this.updateImagesReady}
                  className={nums[index]}
                ></BackgroundImage>
              </>
            );
            // }, 500 * index);
          })}
        </div>
      </div>
    );
  }
}

export default Preloader;
