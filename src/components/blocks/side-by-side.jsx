import React from "react";
import BlurredImage from "./blurred-image";
import parse from "html-react-parser";

const SideBySide = props => {
  const { content } = props;
  return (
    <div
      className={`block side-by-side ${
        content.leftPositioning ? content.leftPositioning : ""
      } ${content.rightPositioning ? content.rightPositioning : ""}`}
    >
      <div
        className={`wrapper flex grid two ${content.fullWidth ? "full" : ""}`}
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
            <div className="flex justify-center">
              {/* <BlurredImage src={content.leftSideImage.fluid} /> */}
              <img
                src={content.leftSideImage.fluid.src}
                style={{ maxWidth: `${content.leftSideImageCustomWidth}px` }}
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
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBySide;
