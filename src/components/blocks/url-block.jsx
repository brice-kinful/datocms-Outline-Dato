import React from "react";

const UrlBlock = props => {
  const { content } = props;
  return (
    <div
      className={`block url-block${content.doubleTopPadding ? " pad-top" : ""}${
        content.doubleBottomPadding ? " pad-bottom" : ""
      }${content.setBottomPaddingToZero ? " no-pad-bottom" : ""}${
        content.setTopPaddingToZero ? " no-pad-top" : ""
      }`}
      style={{ backgroundColor: content.backgroundColor?.hex }}
    >
      <div className="wrapper centertext skinny">
        <span className="textlink">
          <a
            href={`http://${content.url}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: content.textColor?.hex }}
            className=""
          >
            {content.url}
            <span style={{ background: content.textColor?.hex }}></span>
          </a>
        </span>
      </div>
    </div>
  );
};

export default UrlBlock;
