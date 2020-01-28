import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";

import "../styles/grid.css";
import "../styles/case-studies.css";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const CaseStudiesPage = ({ data }) => {
  //   console.log(data);
  return (
    <Layout>
      <div id="case-studies">
        <h1 className="big centertext">Case Studies</h1>
        <div className="wrapper">
          {data.datoCmsCaseStudiesPage.blocks.map(block => {
            switch (block.__typename) {
              case "DatoCmsSideBySide":
                return (
                  <div
                    className={`block ${block.leftProjectPositioning} ${block.rightProjectPositioning}`}
                  >
                    <div className="wrapper flex grid two">
                      <div
                        className={`left grid-item one-half ${block.leftProjectPositioning}`}
                      >
                        <Img fluid={block.leftProjectImage.fluid} />
                        <span>
                          {block.leftProject.excerpt}
                          <AniLink
                            fade
                            to={`/case-studies/${block.leftProject.slug}`}
                            className="textlink"
                          >
                            {block.leftProject.title}
                          </AniLink>
                        </span>
                      </div>
                      <div
                        className={`right grid-item one-half ${block.rightProjectPositioning}`}
                      >
                        <Img fluid={block.rightProjectImage.fluid} />
                        <span>
                          {block.rightProject.excerpt}
                          <AniLink
                            fade
                            to={`/case-studies/${block.rightProject.slug}`}
                            className="textlink"
                          >
                            {block.rightProject.title}
                          </AniLink>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              case "DatoCmsSolo":
                return (
                  <div className="block">
                    <div
                      className={`wrapper${
                        block.narrowWidth ? " x_skinny" : ""
                      }`}
                    >
                      <div className="">
                        <Img fluid={block.projectImage.fluid} />
                        <span>
                          {block.project.excerpt}
                          <AniLink
                            fade
                            to={`/case-studies/${block.project.slug}`}
                            className="textlink"
                          >
                            {block.project.title}
                          </AniLink>
                        </span>
                      </div>
                    </div>
                  </div>
                );
            }
          })}
        </div>
      </div>
    </Layout>
  );
};

export default CaseStudiesPage;

export const query = graphql`
  query {
    datoCmsCaseStudiesPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      blocks {
        ... on DatoCmsSideBySide {
          leftProject {
            title
            slug
            excerpt
          }
          leftProjectImage {
            fluid(maxWidth: 860, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
          leftProjectPositioning
          rightProject {
            title
            slug
            excerpt
          }
          rightProjectImage {
            fluid(maxWidth: 860, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
          rightProjectPositioning
        }
        ... on DatoCmsSolo {
          project {
            title
            slug
            excerpt
          }
          projectImage {
            fluid(
              maxWidth: 1920
              imgixParams: { fm: "jpg", auto: "compress" }
            ) {
              ...GatsbyDatoCmsFluid
            }
          }
          narrowWidth
        }
      }
    }
  }
`;
