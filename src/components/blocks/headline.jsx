import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import parse from "html-react-parser";

import "../../styles/blocks/headline.css";

const Headline = props => {
  const { content } = props;
  //   console.log(content);
  return (
    <div className={`headline`}>
      <div className={`wrapper skinny`}>
        <p>
          {content.text}
          <AniLink
            to={`/${content.buttonUrl.slug}`}
            fade
            className={"styrene_light textlink"}
          >
            {content.buttonText}
          </AniLink>
        </p>
      </div>
    </div>
  );
};

export default Headline;
