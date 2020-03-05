import React, { Component } from "react";
import BlurredImage from "./blurred-image";
import handleViewport from "react-in-viewport";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { content, enterCount } = this.props;
    const settings = {
      dots: true,
      fade: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      appendDots: dots => (
        <div style={{ textAlign: "right" }}>
          <span>
            {dots} / {dots.length}
          </span>
        </div>
      ),
      customPaging: i => <span>{i + 1}</span>
    };

    // console.log(content);

    return (
      <div
        className={`block image-slider${
          content.doubleTopPadding ? " pad-top" : ""
        }${content.doubleBottomPadding ? " pad-bottom" : ""}${
          content.setBottomPaddingToZero ? " no-pad-bottom" : ""
        }${content.setTopPaddingToZero ? " no-pad-top" : ""}`}
        key={content.id}
        style={{ backgroundColor: content.backgroundColor?.hex }}
      >
        <div
          className={`wrapper blur${enterCount > 0 && " loaded"}${
            content.fullWidth ? " full" : " skinny"
          }`}
          style={
            content.customWidth && {
              maxWidth: `${content.customWidth}px`
            }
          }
        >
          <Slider {...settings}>
            {/* {content.gallery}
            <BlurredImage src={content.image.fluid} /> */}
            {content.gallery.map((item, index) => {
              return <BlurredImage src={item.fluid} key={item.fluid.base64} />;
            })}
          </Slider>
          {content.caption && <p className="caption">{content.caption}</p>}
        </div>
      </div>
    );
  }
}

const ImageSlider = handleViewport(Images, { rootMargin: "-1.0px" });

export default ImageSlider;
