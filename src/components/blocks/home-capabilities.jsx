import React from "react";
import parse from "html-react-parser";
import Img from "gatsby-image";

import "../../styles/blocks/home-capabilities.css";

const HomeCapabilities = props => {
  const { content } = props;
  const featuredImage = content.filter(block => {
    return block.__typename === "DatoCmsImage";
  });
  const words = content.filter(block => {
    return block.__typename === "DatoCmsContent";
  });
  const wordsList = parse(words[0].list).props.children;
  const wordsLength = wordsList.length;
  const wordsLengthMidpoint = wordsLength / 2;
  const wordsLeft = wordsList.slice(0, wordsLengthMidpoint);
  const wordsRight = wordsList.slice(wordsLengthMidpoint, wordsLength);
  //   console.log(wordsLeft);
  return (
    <div id={`home-capabilities`}>
      <div className={`wrapper skinny`}>
        <Img fluid={featuredImage[0].image.fluid} />
        <div className="content flex">
          <div className="one-third title">{words[0].title}</div>
          <div className="one-third">
            <ul>
              {wordsLeft.map(word => {
                return <li>{word.props.children}</li>;
              })}
            </ul>
          </div>
          <div className="one-third">
            <ul>
              {wordsRight.map(word => {
                return <li>{word.props.children}</li>;
              })}
            </ul>
          </div>
          {/* {parse(words[0].list)} */}
        </div>
      </div>
    </div>
  );
};

export default HomeCapabilities;
