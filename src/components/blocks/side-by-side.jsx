import React, { Component } from "react";
import parse from "html-react-parser";
import Measure from "react-measure";
import BlurredImage from "./blurred-image";
// import LazyLoad from "react-lazyload";
import handleViewport from "react-in-viewport";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftSideImageHeight: "",
      rightSideImageHeight: ""
    };
  }
  render() {
    const { content, enterCount } = this.props;
    const { leftSideImageHeight, rightSideImageHeight } = this.state;
    // console.log(content);
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
        }${content.rightSideImageStick ? " sticky-right" : ""} ${
          (!content.rightSideText && !content.rightSideImage) ||
          (!content.leftSideText && !content.leftSideImage)
            ? " empty-side"
            : ""
        }`}
        style={{ backgroundColor: content.backgroundColor?.hex }}
      >
        <div
          className={`wrapper flex grid two${
            content.fullWidth ? " full" : " skinny"
          }${content.leftSide60Width ? " left_60" : ""}${
            content.rightSide60Width ? " right_60" : ""
          }${content.alignTextTop ? "" : " align-center"}`}
        >
          <div
            className={`flex column justify-center left grid-item${
              content.leftSide60Width
                ? " three-fifths"
                : content.rightSide60Width
                ? " two-fifths"
                : " one-half"
            } ${content.leftPositioning ? content.leftPositioning : ""} ${
              !content.leftSideText && !content.leftSideImage ? " empty" : ""
            }`}
          >
            {content.leftSideText && (
              <span
                style={{
                  color: content.leftTextColor.hex,
                  maxWidth: `${content.leftSideImageCustomWidth}px`
                }}
              >
                {parse(content.leftSideText)}
              </span>
            )}
            {content.leftSideImage && (
              <div
                className="inner flex"
                style={{ minHeight: leftSideImageHeight }}
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
                        <img
                          ref={measureRef}
                          src={content.leftSideImage.fluid.src}
                          className={`blur ${enterCount > 0 && "loaded"}`}
                          style={{
                            maxWidth: `${content.leftSideImageCustomWidth}px`
                          }}
                          alt=""
                        />
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
            className={`flex column justify-center right grid-item${
              content.righttSide60Width
                ? " three-fifths"
                : content.leftSide60Width
                ? " two-fifths"
                : " one-half"
            } ${content.rightPositioning ? content.rightPositioning : ""} ${
              !content.rightSideText && !content.rightSideImage ? " empty" : ""
            }`}
          >
            {content.rightSideText && (
              <span
                style={{
                  color: content.rightTextColor.hex,
                  maxWidth: `${content.rightSideImageCustomWidth}px`
                }}
              >
                {parse(content.rightSideText)}
              </span>
            )}
            {content.rightSideImage && (
              <div
                className="inner flex"
                style={{ minHeight: rightSideImageHeight }}
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
                        <img
                          ref={measureRef}
                          src={content.rightSideImage.fluid.src}
                          className={`blur ${enterCount > 0 && "loaded"}`}
                          style={{
                            maxWidth: `${content.rightSideImageCustomWidth}px`
                          }}
                          alt=""
                        />
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

const SideBySide = handleViewport(Content, { rootMargin: "-1.0px" });

export default SideBySide;
