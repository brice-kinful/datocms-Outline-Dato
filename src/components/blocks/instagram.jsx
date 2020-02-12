import React from "react";
import "../../styles/blocks/instagram.css";

const Instagram = props => {
  const { grams, handle } = props;
  //   console.log(grams);
  return (
    <div id="instagram" className={`standard`}>
      <div id="cursor"></div>
      <div className={`wrapper`}>
        <div className="flex space-between">
          <p>Instagram</p>
          <a
            href={`https://www.instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="line"
          >
            {handle}
          </a>
        </div>
        <div className="flex grid">
          {/* Feed */}
          {grams?.map(({ node }) => {
            return (
              <a
                href={`https://www.instagram.com/p/${node.shortcode}`}
                className="col"
                key={node.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`inner`}>
                  <img src={node.thumbnail_src} alt="" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Instagram;
