import React from "react";
import parse from "html-react-parser";

const TextBlock = props => {
  const { content } = props;
  return (
    <div
      className="block"
      style={{ backgroundColor: content.backgroundColor?.hex }}
    >
      <div className="wrapper x_skinny">
        <span style={{ color: content.textColor?.hex }}>
          {parse(content.copy)}
        </span>
      </div>
    </div>
  );
};

export default TextBlock;
