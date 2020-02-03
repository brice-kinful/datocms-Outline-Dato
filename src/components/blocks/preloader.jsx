import React, { Component } from "react";
import BackgroundImage from "gatsby-background-image";
import SVG from "react-inlinesvg";

import PreloaderImage from "./preloader-image";

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

  componentWillUnmount() {
    document.body.classList.remove("freeze");
  }

  updateImagesReady = () => {
    this.setState({ imagesReady: true });
  };

  render() {
    // console.log(this.state.images);
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
      "eight",
      "nine",
      "ten"
    ];

    return (
      <>
        <div id="preload">
          <div id="loading-white-screen"></div>
          {/* <SVG src="/logo.svg" className="logo" /> */}
          <h1 className="centertext">Outline</h1>
          <div className={`images ${nums[images.length - 1]}`}>
            {images.map((item, index) => {
              return (
                <>
                  <PreloaderImage
                    src={item.fluid}
                    wait={(index + 1) * 250}
                    currentImage={index + 1}
                    totalImages={images.length}
                  />
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Preloader;
