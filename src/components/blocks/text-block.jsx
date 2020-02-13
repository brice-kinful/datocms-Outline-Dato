import React from "react";
import parse from "html-react-parser";

const TextBlock = props => {
  const { content } = props;
  return (
    <div
      className={`block${content.doubleTopPadding ? " pad-top" : ""}${
        content.doubleBottomPadding ? " pad-bottom" : ""
      }${content.setBottomPaddingToZero ? " no-pad-bottom" : ""}${
        content.setTopPaddingToZero ? " no-pad-top" : ""
      }`}
      style={{
        backgroundColor: content.backgroundColor?.hex
      }}
    >
      <div
        className="wrapper x_skinny"
        style={content.customWidth && { width: `${content.customWidth}px` }}
      >
        <span style={{ color: content.textColor?.hex }}>
          {parse(content.copy)}
        </span>
      </div>
    </div>
  );
};

export default TextBlock;
