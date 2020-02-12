import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";

import "../../styles/blocks/headline.css";

const Headline = props => {
  const { content } = props;
  //   console.log(content);
  return (
    <div className={`headline`}>
      <div className={`wrapper skinny`}>
        <p>
          <span>{content.text}</span>
          <span className="textlink">
            <AniLink
              to={`/${content.buttonUrl.slug}`}
              fade
              className={"styrene_light"}
            >
              {content.buttonText}
            </AniLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Headline;
