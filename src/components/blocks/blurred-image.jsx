import React, { Component } from "react";
import Img from "gatsby-image";

class BlurredImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  loadImage = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { src, customWidth } = this.props;
    return (
      <Img
        fluid={src}
        onLoad={this.loadImage}
        className={`blur ${this.state.loaded ? "loaded" : ""}`}
        style={customWidth && { maxWidth: `${customWidth}px` }}
      />
    );
  }
}

export default BlurredImage;
