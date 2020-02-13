import React from "react";
import parse from "html-react-parser";

const SideBySide = props => {
  const { content } = props;
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
            <div className="inner flex justify-center">
              {/* <BlurredImage src={content.leftSideImage.fluid} /> */}
              <img
                src={content.leftSideImage.fluid.src}
                style={{ maxWidth: `${content.leftSideImageCustomWidth}px` }}
                alt=""
              />
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
            <div className="inner flex justify-center">
              {/* <BlurredImage src={content.rightSideImage.fluid} /> */}
              <img
                src={content.rightSideImage.fluid.src}
                style={{ maxWidth: `${content.rightSideImageCustomWidth}px` }}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBySide;
