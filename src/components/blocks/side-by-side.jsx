import React, { Component } from "react";
import parse from "html-react-parser";
import Measure from "react-measure";
import BlurredImage from "./blurred-image";
import LazyLoad from "react-lazyload";

class SideBySide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftSideImageHeight: "",
      rightSideImageHeight: ""
    };
  }
  render() {
    const { content } = this.props;
    const { leftSideImageHeight, rightSideImageHeight } = this.state;
    return (
      <div
        className={`block side-by-side ${
          content.leftPositioning ? content.leftPositioning : ""
        } ${content.rightPositioning ? content.rightPositioning : ""}${
          content.doubleTopPadding ? " pad-top" : ""
        }${content.doubleBottomPadding ? " pad-bottom" : ""}${
          content.setBottomPaddingToZero ? " no-pad-bottom" : ""
        }${content.setTopPaddingToZero ? " no-pad-top" : ""}${
          content.leftSideImageStick ? " sticky-left" : ""
        }${content.rightSideImageStick ? " sticky-right" : ""}`}
        style={{ backgroundColor: content.backgroundColor?.hex }}
      >
        <div
          className={`wrapper flex grid two ${
            content.fullWidth ? "full" : "skinny"
          }`}
        >
          <div
            className={`flex column justify-center left grid-item one-half ${
              content.leftPositioning ? content.leftPositioning : ""
            }`}
          >
            {content.leftSideText && (
              <span style={{ color: content.leftTextColor.hex }}>
                {parse(content.leftSideText)}
              </span>
            )}
            {content.leftSideImage && (
              <div
                className="inner flex justify-center"
                style={{ height: leftSideImageHeight }}
              >
                {content.leftSideImageStick || content.rightSideImageStick ? (
                  <Measure
                    bounds
                    onResize={contentRect => {
                      this.setState({
                        leftSideImageHeight: contentRect.bounds.height
                      });
                    }}
                  >
                    {({ measureRef }) => {
                      // console.log(this.state.pageHeight);
                      return (
                        <LazyLoad
                          height={content.leftSideImage.fluid.height}
                          offset={0}
                        >
                          <img
                            ref={measureRef}
                            src={content.leftSideImage.fluid.src}
                            className="blur"
                            style={{
                              maxWidth: `${content.leftSideImageCustomWidth}px`
                            }}
                            alt=""
                          />
                        </LazyLoad>
                      );
                    }}
                  </Measure>
                ) : (
                  <BlurredImage
                    src={content.leftSideImage.fluid}
                    customWidth={content.leftSideImageCustomWidth}
                  />
                )}
              </div>
            )}
          </div>
          <div
            className={`flex column justify-center right grid-item one-half ${
              content.rightPositioning ? content.rightPositioning : ""
            }`}
          >
            {content.rightSideText && (
              <span style={{ color: content.rightTextColor.hex }}>
                {parse(content.rightSideText)}
              </span>
            )}
            {content.rightSideImage && (
              <div
                className="inner flex justify-center"
                style={{ height: rightSideImageHeight }}
              >
                {content.rightSideImageStick || content.leftSideImageStick ? (
                  <Measure
                    bounds
                    onResize={contentRect => {
                      this.setState({
                        rightSideImageHeight: contentRect.bounds.height
                      });
                    }}
                  >
                    {({ measureRef }) => {
                      // console.log(this.state.pageHeight);
                      return (
                        <LazyLoad
                          height={content.rightSideImage.fluid.height}
                          offset={0}
                        >
                          <img
                            ref={measureRef}
                            src={content.rightSideImage.fluid.src}
                            className="blur"
                            style={{
                              maxWidth: `${content.rightSideImageCustomWidth}px`
                            }}
                            alt=""
                          />
                        </LazyLoad>
                      );
                    }}
                  </Measure>
                ) : (
                  <BlurredImage
                    src={content.rightSideImage.fluid}
                    customWidth={content.rightSideImageCustomWidth}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SideBySide;
