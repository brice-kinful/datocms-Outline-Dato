import React, { Component } from "react";
import Img from "gatsby-image";
import handleViewport from "react-in-viewport";

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  render() {
    const { url, src, customWidth, enterCount } = this.props;
    return (
      <>
        {url ? (
          <img src={url} />
        ) : (
          <Img
            fluid={src}
            fadeIn={false}
            loading={"eager"}
            critical
            // className={`blur ${enterCount > 0 && "loaded"}`}
            style={customWidth && { maxWidth: `${customWidth}px` }}
          />
        )}
      </>
    );
  }
}

const BlurredImage = handleViewport(Image, { rootMargin: "-1.0px" });

export default Image;
