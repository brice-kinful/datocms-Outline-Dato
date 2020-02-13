import React, { Component } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import BlurredImage from "../components/blocks/blurred-image";

import "../styles/grid.css";
import "../styles/case-studies.css";
import AniLink from "gatsby-plugin-transition-link/AniLink";

class CaseStudiesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeadlineVisible: true,
      seconds: 0,
      prevScrollpos: ""
    };
  }

  // scroll
  handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    this.setState({
      prevScrollpos: currentScrollPos,
      isHeadlineVisible: true
    });
    if (currentScrollPos > 60) {
      this.setState({
        isHeadlineVisible: false
      });
      clearInterval(this.interval);
      this.interval = setInterval(() => this.tick(), 1000);
      this.setState(state => ({
        seconds: 0
      }));
    } else {
      this.setState({
        isHeadlineVisible: true
      });
    }
  };

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
    if (this.state.seconds > 15) {
      this.setState({
        isHeadlineVisible: true
      });
    }
  }

  handleMouseMove = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.tick(), 1000);
    this.setState(state => ({
      seconds: 0
    }));
  };

  componentDidMount() {
    this.setState({ prevScrollpos: window.pageYOffset });
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("mousemove", this.handleMouseMove);
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("mousemove", this.handleMouseMove);
    clearInterval(this.interval);
  }

  render() {
    const { data } = this.props;
    const { isHeadlineVisible } = this.state;

    return (
      <Layout>
        <div className="page" id="case-studies">
          <div className={`wrapper skinny`}>
            <h1 className={`big title${isHeadlineVisible ? " visible" : ""}`}>
              Case Studies
            </h1>
          </div>
          <div className="wrapper skinny">
            {data.datoCmsCaseStudiesPage.blocks.map((block, index) => {
              switch (block.__typename) {
                case "DatoCmsSideBySide":
                  return (
                    <div
                      className={`block ${block.leftProjectPositioning} ${block.rightProjectPositioning}`}
                      key={index}
                    >
                      <div className="wrapper flex grid two">
                        <div
                          className={`flex column left grid-item one-half ${block.leftProjectPositioning}`}
                        >
                          <AniLink
                            fade
                            to={`/case-studies/${block.leftProject?.slug}`}
                          >
                            {/* <Img fluid={block.leftProjectImage.fluid} /> */}
                            <BlurredImage src={block.leftProjectImage?.fluid} />
                          </AniLink>

                          <span
                            className={`${
                              block.leftProjectNarrowExcerpt ? "narrow" : ""
                            }`}
                          >
                            <span>{block.leftProject?.excerpt}</span>
                            <span className="textlink">
                              <AniLink
                                fade
                                to={`/case-studies/${block.leftProject?.slug}`}
                              >
                                {block.leftProject?.title}
                              </AniLink>
                            </span>
                          </span>
                        </div>
                        <div
                          className={`flex column right grid-item one-half ${block.rightProjectPositioning}`}
                        >
                          <AniLink
                            fade
                            to={`/case-studies/${block.rightProject?.slug}`}
                          >
                            {/* <Img fluid={block.rightProjectImage.fluid} /> */}
                            <BlurredImage
                              src={block.rightProjectImage?.fluid}
                            />
                          </AniLink>
                          <span
                            className={`${
                              block.rightProjectNarrowExcerpt ? "narrow" : ""
                            }`}
                          >
                            <span>{block.rightProject?.excerpt}</span>
                            <span className="textlink">
                              <AniLink
                                fade
                                to={`/case-studies/${block.rightProject?.slug}`}
                              >
                                {block.rightProject?.title}
                              </AniLink>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                case "DatoCmsSolo":
                  return (
                    <div
                      className={`block solo ${
                        !block.narrowWidth ? " full" : ""
                      }`}
                    >
                      <div
                        className={`wrapper${
                          block.narrowWidth ? " x_skinny" : ""
                        }`}
                      >
                        <div className="flex wrap">
                          <AniLink
                            fade
                            to={`/case-studies/${block.project?.slug}`}
                          >
                            {/* <Img fluid={block.projectImage?.fluid} /> */}
                            <BlurredImage src={block.projectImage?.fluid} />
                          </AniLink>

                          <span
                            className={`${
                              block.projectNarrowExcerpt ? "narrow" : ""
                            }`}
                          >
                            <span>{block.project?.excerpt}</span>
                            <span className="textlink">
                              <AniLink
                                fade
                                to={`/case-studies/${block.project?.slug}`}
                              >
                                {block.project?.title}
                              </AniLink>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                default:
                  break;
              }
            })}
          </div>
        </div>
      </Layout>
    );
  }
}

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
          leftProjectNarrowExcerpt
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
          rightProjectNarrowExcerpt
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
          projectNarrowExcerpt
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
