import React, { Component } from "react";
import SVG from "react-inlinesvg";
import PreloaderImage from "./preloader-image";

import "../../styles/blocks/preloader.css";

class Preloader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesReady: -1,
      images: []
    };
  }

  componentDidMount() {
    this.setState({
      images: this.state.images.concat(this.props.images.images)
    });
    document.body.classList.add("freeze");
  }

  componentWillUnmount() {
    document.body.classList.remove("freeze", "ready", "loading");
  }

  updateImagesReady = () => {
    this.setState({ imagesReady: this.state.imagesReady + 1 });
  };

  render() {
    // console.log(this.state.imagesReady);
    const { images } = this.state;
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
          <div id="loading-white-screen" className="white-bg"></div>
          <SVG src="/logo.svg" className="logo" />
          {/* <h1 className="centertext">Outline</h1> */}
          <div className={`images ${nums[images.length - 1]}`}>
            {images.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <PreloaderImage
                    src={item.fluid}
                    wait={(index + 1) * 150}
                    currentImage={index + 1}
                    totalImages={images.length}
                    imageLoaded={this.updateImagesReady}
                    allImagesReady={this.state.imagesReady}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Preloader;
