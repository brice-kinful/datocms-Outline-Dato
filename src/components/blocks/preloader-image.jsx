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
    const { wait, currentImage, loadAllImages, totalImages } = this.props;
    if (currentImage === totalImages) {
      loadAllImages();
    }
    this.setState({
      waitTime: 1200 + wait
    });
    if (currentImage === 1) {
      document.body.classList.add("loading");
    }
  }

  componentWillUnmount() {
    document.body.classList.remove("loading");
    document.body.classList.remove("ready");
  }

  loadImage = () => {
    const { waitTime } = this.state;
    const { currentImage, totalImages, allImagesReady } = this.props;

    if (currentImage === 1) {
      this.setState({ loaded: true });
      // setTimeout(() => {
      //   this.setState({ loaded: true });
      // }, waitTime * 1.15);
    } else {
      if (allImagesReady) {
        setTimeout(() => {
          this.setState({ loaded: true });
        }, waitTime * 1.65);
      }
    }
    if (currentImage === totalImages) {
      if (allImagesReady) {
        setTimeout(() => {
          document.body.classList.remove("loading", "freeze");
          document.body.classList.add("ready");
        }, waitTime * 1.79);
      }
    }
  };

  render() {
    const { loaded } = this.state;
    const { src } = this.props;
    return (
      <Img
        fluid={src}
        onLoad={this.loadImage}
        className={`${loaded ? "loaded" : ""}`}
      />
    );
  }
}

export default PreloaderImage;
