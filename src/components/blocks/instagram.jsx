import React, { Component } from "react";
import "../../styles/blocks/instagram.css";
import axios from "axios";

const Instagram = props => {
  // console.log(props)

  //   const { grams } = props;

  return (
    <div id="instagram" className={`standard`}>
      <div className={`wrapper skinny`}>
        <div className="flex space-between">
          <p>Instagram</p>
          <p>@we.are.outline</p>
        </div>

        {/* Feed */}
        <div className="flex grid">
          <a href={`#`} className="col">
            <div className={`inner`}>
              <img src={`https://via.placeholder.com/500x500`} />
            </div>
          </a>
          <a href={`#`} className="col">
            <div className={`inner`}>
              <img src={`https://via.placeholder.com/500x500`} />
            </div>
          </a>
          <a href={`#`} className="col">
            <div className={`inner`}>
              <img src={`https://via.placeholder.com/500x500`} />
            </div>
          </a>
          <a href={`#`} className="col">
            <div className={`inner`}>
              <img src={`https://via.placeholder.com/500x500`} />
            </div>
          </a>
          <a href={`#`} className="col">
            <div className={`inner`}>
              <img src={`https://via.placeholder.com/500x500`} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Instagram;
