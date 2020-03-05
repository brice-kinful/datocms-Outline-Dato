import React, { Component } from "react";
import Img from "gatsby-image";

class PreloaderImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      waitTime: 300,
      firstImageReady: false
    };
  }

  componentDidMount() {
    const { wait, currentImage } = this.props;
    this.setState({
      waitTime: 1200 + wait
    });
  }

  loadImage = () => {
    const { waitTime } = this.state;
    const {
      currentImage,
      totalImages,
      imageLoaded,
      allImagesReady
    } = this.props;

    imageLoaded();

    this.setState({ loaded: true });

    if (currentImage === totalImages) {
      document.body.classList.add("loading");
      setTimeout(() => {
        document.body.classList.remove("freeze");
        document.body.classList.add("ready");
      }, 5000);
    }
  };

  render() {
    const { loaded } = this.state;
    const { src } = this.props;
    return (
      <Img
        fluid={src}
        fadeIn={false}
        loading="eager"
        onLoad={this.loadImage}
        className={`${loaded ? "loaded" : ""}`}
      />
      // <img
      //   src={src.src}
      //   alt={""}
      //   className={`${loaded ? "loaded" : ""}`}
      //   onLoad={this.loadImage}
      // />
    );
  }
}

export default PreloaderImage;
