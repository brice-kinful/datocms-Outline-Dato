import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import Layout from "../components/layout";

import "../styles/work.css";

const WorkPage = ({ data }) => {
  const masonryOptions = {
    transitionDuration: "0.3s",
    itemSelector: ".masonry-grid-item",
    columnWidth: ".masonry-grid-sizer",
    percentPosition: true
  };
  const masonry = data.datoCmsWorkPage.workMosaicImages;
  console.log(masonry);
  return (
    <Layout>
      <div id="work">
        <div className="wrapper">
          <h1 className="big centertext">Our Work</h1>
          <Masonry
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          >
            <div className="masonry-grid-sizer"></div>
            {masonry.map(item => {
              return (
                <div className="masonry-grid-item">
                  {/* <img src={item.url} /> */}
                  <Img fluid={item.fluid} />
                </div>
              );
            })}
          </Masonry>
        </div>
      </div>
    </Layout>
  );
};

export default WorkPage;

export const query = graphql`
  query {
    datoCmsWorkPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      workMosaicImages {
        fluid(maxWidth: 400, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid
        }
      }
    }
  }
`;
