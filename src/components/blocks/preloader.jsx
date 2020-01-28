import React from "react";
import BackgroundImage from "gatsby-background-image";

import "../../styles/blocks/preloader.css";

const Preloader = props => {
  const { images } = props;
  console.log(images);
  return (
    <div id="preload" className="shift">
      {images.images.map(item => {
        return (
          <>
            <BackgroundImage fluid={item.fluid} backgroundColor={`#ffffff`}>
              <h1 className="white-color centertext">Outline</h1>
            </BackgroundImage>
          </>
        );
      })}
    </div>
  );
};

export default Preloader;
