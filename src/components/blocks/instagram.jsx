import React, { Component } from "react";
import "../../styles/blocks/instagram.css";
import axios from "axios";

const Instagram = props => {
  const { grams } = props;
  return (
    <div id="instagram" className={`standard`}>
      <div className={`wrapper skinny`}>
        <div className="flex space-between">
          <p>Instagram</p>
          <p>@we.are.outline</p>
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
              >
                <div className={`inner`}>
                  <img src={node.thumbnail_src} />
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
