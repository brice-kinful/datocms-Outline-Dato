import React, { Component } from "react";
import { graphql } from "gatsby";
import AniLink from "../components/transitions/AniLink";
import Layout from "../components/layout";
import SEO from "../components/blocks/SEO";
import BlurredImage from "../components/blocks/blurred-image";

import { isSafari } from "react-device-detect";

import "../styles/grid.css";
import "../styles/work.css";

class CaseStudiesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeadlineVisible: false,
      seconds: 0,
      prevScrollpos: "",
      display: false
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
    setTimeout(() => {
      this.setState({
        isHeadlineVisible: true
      });
    }, 1250);
    this.setState({
      prevScrollpos: window.pageYOffset,
      display: !this.state.display
    });
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("mousemove", this.handleMouseMove);
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    this.setState({
      display: !this.state.display
    });
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("mousemove", this.handleMouseMove);
    clearInterval(this.interval);
  }

  render() {
    const { data } = this.props;
    const work = data.datoCmsCaseStudiesPage;
    const { isHeadlineVisible, display } = this.state;

    return (
      <div className="outer">
        <h1
          className={`big title saol_standard${
            isHeadlineVisible ? " visible" : ""
          }`}
        >
          Work
        </h1>
        <Layout>
          <SEO
            title={`${work.title}`}
            pathname={`/work`}
            description={work.seoMetaTags.description}
          />
          <div className="page" id="case-studies">
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
                            {block.leftComingSoonProject ? (
                              <>
                                <a
                                  href={block.leftComingSoonUrl}
                                  target="_blank"
                                >
                                  {/* <Img fluid={block.projectImage?.fluid} /> */}
                                  <BlurredImage
                                    src={block.leftProjectImage?.fluid}
                                    // url={block.leftProjectImage?.url}
                                    offset={-5}
                                  />
                                </a>
                                <span
                                  className={`${
                                    block.leftProjectNarrowExcerpt
                                      ? "narrow"
                                      : ""
                                  }`}
                                >
                                  <span className="saol_standard">
                                    {block.leftComingSoonExcerpt}
                                  </span>
                                  <span className="textlink">
                                    <a
                                      href={block.leftComingSoonUrl}
                                      target="_blank"
                                      className="uppercase"
                                    >
                                      {block.leftComingSoonTitle}
                                    </a>
                                  </span>
                                </span>
                              </>
                            ) : (
                              <>
                                <AniLink
                                  fade
                                  to={`/work/${block.leftProject?.slug}`}
                                  preventScrollJump
                                >
                                  {/* <Img fluid={block.leftProjectImage.fluid} /> */}
                                  <BlurredImage
                                    src={block.leftProjectImage?.fluid}
                                    // url={block.leftProjectImage?.url}
                                    offset={-5}
                                  />
                                </AniLink>

                                <span
                                  className={`${
                                    block.leftProjectNarrowExcerpt
                                      ? "narrow"
                                      : ""
                                  }`}
                                >
                                  <span className="saol_standard">
                                    {block.leftProject?.excerpt}
                                  </span>
                                  <span className="textlink">
                                    <AniLink
                                      fade
                                      to={`/work/${block.leftProject?.slug}`}
                                      preventScrollJump
                                      className="uppercase"
                                    >
                                      {block.leftProject?.title}
                                    </AniLink>
                                  </span>
                                </span>
                              </>
                            )}
                          </div>
                          <div
                            className={`flex column right grid-item one-half ${block.rightProjectPositioning}`}
                          >
                            {block.rightComingSoonProject ? (
                              <>
                                <a
                                  href={block.rightComingSoonUrl}
                                  target="_blank"
                                >
                                  {/* <Img fluid={block.projectImage?.fluid} /> */}
                                  <BlurredImage
                                    src={block.rightProjectImage?.fluid}
                                    // url={block.leftProjectImage?.url}
                                    offset={-5}
                                  />
                                </a>
                                <span
                                  className={`${
                                    block.rightProjectNarrowExcerpt
                                      ? "narrow"
                                      : ""
                                  }`}
                                >
                                  <span className="saol_standard">
                                    {block.rightComingSoonExcerpt}
                                  </span>
                                  <span className="textlink">
                                    <a
                                      href={block.rightComingSoonUrl}
                                      target="_blank"
                                      className="uppercase"
                                    >
                                      {block.rightComingSoonTitle}
                                    </a>
                                  </span>
                                </span>
                              </>
                            ) : (
                              <>
                                <AniLink
                                  fade
                                  to={`/work/${block.rightProject?.slug}`}
                                  preventScrollJump
                                >
                                  {/* <Img fluid={block.rightProjectImage.fluid} /> */}
                                  <BlurredImage
                                    src={block.rightProjectImage?.fluid}
                                    // url={block.rightProjectImage?.url}
                                    offset={-5}
                                  />
                                </AniLink>
                                <span
                                  className={`${
                                    block.rightProjectNarrowExcerpt
                                      ? "narrow"
                                      : ""
                                  }`}
                                >
                                  <span className="saol_standard">
                                    {block.rightProject?.excerpt}
                                  </span>
                                  <span className="textlink">
                                    <AniLink
                                      fade
                                      to={`/work/${block.rightProject?.slug}`}
                                      preventScrollJump
                                      className="uppercase"
                                    >
                                      {block.rightProject?.title}
                                    </AniLink>
                                  </span>
                                </span>
                              </>
                            )}
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
                            {block.comingSoonProject ? (
                              <>
                                <a href={block.comingSoonUrl} target="_blank">
                                  {/* <Img fluid={block.projectImage?.fluid} /> */}
                                  <BlurredImage
                                    src={block.projectImage?.fluid}
                                    // url={block.projectImage?.url}
                                    offset={-5}
                                  />
                                </a>

                                <span
                                  className={`${
                                    block.projectNarrowExcerpt ? "narrow" : ""
                                  }`}
                                >
                                  <span className="saol_standard">
                                    {block.comingSoonExcerpt}
                                  </span>
                                  <span className="textlink">
                                    <a
                                      href={block.comingSoonUrl}
                                      target="_blank"
                                      className="uppercase"
                                    >
                                      {block.comingSoonTitle}
                                    </a>
                                  </span>
                                </span>
                              </>
                            ) : (
                              <>
                                <AniLink
                                  fade
                                  to={`/work/${block.project?.slug}`}
                                  preventScrollJump
                                >
                                  {/* <Img fluid={block.projectImage?.fluid} /> */}
                                  <BlurredImage
                                    src={block.projectImage?.fluid}
                                    // url={block.projectImage?.url}
                                    offset={-5}
                                  />
                                </AniLink>

                                <span
                                  className={`${
                                    block.projectNarrowExcerpt ? "narrow" : ""
                                  }`}
                                >
                                  <span className="saol_standard">
                                    {block.project?.excerpt}
                                  </span>
                                  <span className="textlink">
                                    <AniLink
                                      fade
                                      to={`/work/${block.project?.slug}`}
                                      preventScrollJump
                                      className="uppercase"
                                    >
                                      {block.project?.title}
                                    </AniLink>
                                  </span>
                                </span>
                              </>
                            )}
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
      </div>
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
            url
            fluid(maxWidth: 860, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
          leftComingSoonProject
          leftComingSoonTitle
          leftComingSoonUrl
          leftComingSoonExcerpt
          leftProjectPositioning
          rightProject {
            title
            slug
            excerpt
          }
          rightProjectNarrowExcerpt
          rightProjectImage {
            url
            fluid(maxWidth: 860, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
          rightComingSoonProject
          rightComingSoonTitle
          rightComingSoonUrl
          rightComingSoonExcerpt
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
            url
            fluid(
              maxWidth: 1920
              imgixParams: { fm: "jpg", auto: "compress" }
            ) {
              ...GatsbyDatoCmsFluid
            }
          }
          comingSoonProject
          comingSoonTitle
          comingSoonUrl
          comingSoonExcerpt
          narrowWidth
        }
      }
    }
  }
`;
