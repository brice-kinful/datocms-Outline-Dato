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
    if (this.props.currentImage === 1) {
      this.setState({ loaded: true });
    } else {
      setTimeout(() => {
        this.setState({ loaded: true });
      }, waitTime * 1.15);
    }
    if (this.props.currentImage === this.props.totalImages) {
      setTimeout(() => {
        document.body.classList.remove("loading");
        document.body.classList.add("ready");
      }, waitTime * 1.25);
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
