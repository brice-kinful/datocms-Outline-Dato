import React, { Component } from "react";
import Img from "gatsby-image";
import LazyLoad from "react-lazyload";

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
    const { src, customWidth, offset } = this.props;
    return (
      <LazyLoad
        height={src.height ? src.height : "1000px"}
        offset={offset ? offset : -400}
        // style={{ minHeight: `${src.height ? src.height : "1000px"}` }}
        // resize={true}
      >
        <Img
          fluid={src}
          fadeIn={false}
          loading={"auto"}
          onLoad={this.loadImage}
          className={`blur ${this.state.loaded ? "loaded" : ""}`}
          style={customWidth && { maxWidth: `${customWidth}px` }}
        />
      </LazyLoad>
    );
  }
}

export default BlurredImage;
