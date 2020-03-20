import React from "react";
import AniLink from "../transitions/AniLink";

import "../../styles/blocks/headline.css";

const Headline = props => {
  const { content } = props;
  //   console.log(content);
  return (
    <div className={`headline`}>
      <div className={`wrapper x_skinny`}>
        <p>
          <span className="saol_standard">{content.text}</span>
          <span className="textlink">
            <AniLink
              preventScrollJump
              to={`/${content.buttonUrl.slug}`}
              fade
              className={"styrene_light uppercase"}
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
