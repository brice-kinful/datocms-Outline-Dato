import React, { Component } from "react";
import SEO from "../components/blocks/SEO";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";

import BlurredImage from "../components/blocks/blurred-image";
import HeadlineAccordion from "../components/blocks/headline-accordion";
import SideBySide from "../components/blocks/side-by-side";
import TextBlock from "../components/blocks/text-block";
import UrlBlock from "../components/blocks/url-block";
import ImageSlider from "../components/blocks/image-slider";
import VideoBlock from "../components/blocks/video-block";
import CaseStudiesPagination from "../components/blocks/case-study-pag";

import "../styles/case-study.css";

class CaseStudy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasHeroImageLoaded: false
    };
  }

  componentDidMount() {
    document.body.classList.add("frozen");
  }

  componentWillUnmount() {
    document.body.classList.remove("frozen");
  }

  render() {
    const project = this.props.data.datoCmsCaseStudy;
    const allProjects = this.props.data.allDatoCmsCaseStudy.edges;
    const activeProjectIndex = allProjects.findIndex(
      ({ node }) => node.slug === project.slug
    );
    const nextProject =
      allProjects.length === activeProjectIndex + 1
        ? 0
        : activeProjectIndex + 1;
    const { hasHeroImageLoaded } = this.state;
    return (
      <>
        <div className="container" id="case-study">
          <div
            className={`screen flex align-center justify-center wrapper${
              hasHeroImageLoaded ? " hidden" : ""
            }`}
            style={{ backgroundColor: project.brandColor.hex }}
          >
            <h1
              className={`big${hasHeroImageLoaded ? "" : " visible"}`}
              style={{ color: project.preloaderScreenTitleColor.hex }}
            >
              {project.preloaderScreenTitle
                ? project.preloaderScreenTitle
                : project.title}
            </h1>
          </div>
          <Layout>
            <div className="page">
              <SEO
                title={`${project.title} | Work`}
                pathname={`/work/${project.slug}`}
                description={project.seoMetaTags.description}
              />

              <div className="hero">
                <Img
                  loading={"eager"}
                  fluid={project.heroImage.fluid}
                  // durationFadeIn={1000}
                  onLoad={() =>
                    setTimeout(() => {
                      this.setState({ hasHeroImageLoaded: true });
                      document.body.classList.remove("frozen");
                    }, 4500)
                  }
                />
              </div>

              {/* Blocks */}
              {project.blocks.map(({ __typename }, index, item) => {
                const block = item[index];
                switch (__typename) {
                  case "DatoCmsDropdownBlock":
                    return (
                      <React.Fragment key={block.id}>
                        <HeadlineAccordion content={block} />
                      </React.Fragment>
                    );
                  case "DatoCmsImageBlock":
                    return (
                      <div
                        className={`block${
                          block.doubleTopPadding ? " pad-top" : ""
                        }${block.doubleBottomPadding ? " pad-bottom" : ""}${
                          block.setBottomPaddingToZero ? " no-pad-bottom" : ""
                        }${block.setTopPaddingToZero ? " no-pad-top" : ""}`}
                        key={block.id}
                        style={{ backgroundColor: block.backgroundColor?.hex }}
                      >
                        <div
                          className={`wrapper skinny`}
                          style={
                            block.customWidth && {
                              maxWidth: `${block.customWidth}px`
                            }
                          }
                        >
                          <BlurredImage src={block.image.fluid} />
                        </div>
                      </div>
                    );
                  case "DatoCmsImageSliderBlock":
                    return (
                      <React.Fragment key={block.id}>
                        <ImageSlider content={block} />
                      </React.Fragment>
                    );
                  case "DatoCmsSideBySideBlock":
                    return (
                      <React.Fragment key={block.id}>
                        <SideBySide content={block} />
                      </React.Fragment>
                    );
                  case "DatoCmsFullWidthImageBlock":
                    return (
                      <div
                        className={`block full-width-block${
                          block.doubleTopPadding ? " pad-top" : ""
                        }${block.doubleBottomPadding ? " pad-bottom" : ""}${
                          block.setBottomPaddingToZero ? " no-pad-bottom" : ""
                        }${block.setTopPaddingToZero ? " no-pad-top" : ""}`}
                        key={block.id}
                      >
                        <BlurredImage src={block.image.fluid} />
                      </div>
                    );
                  case "DatoCmsTextBlock":
                    return (
                      <React.Fragment key={block.id}>
                        <TextBlock content={block} />
                      </React.Fragment>
                    );
                  case "DatoCmsUrlBlock":
                    return (
                      <React.Fragment key={block.id}>
                        <UrlBlock content={block} />
                      </React.Fragment>
                    );
                  case "DatoCmsVideoBlock":
                    return (
                      <React.Fragment key={block.id}>
                        <VideoBlock content={block} />
                      </React.Fragment>
                    );
                  default:
                    break;
                }
              })}

              <CaseStudiesPagination
                title={allProjects[nextProject].node.title}
                slug={allProjects[nextProject].node.slug}
                thumbnail={allProjects[nextProject].node.thumbnail?.fluid}
                services={project.services}
                location={project.location}
                photography={project.photography}
                featured={project.projectFeaturedIn}
              />
            </div>
          </Layout>
        </div>
      </>
    );
  }
}

export default CaseStudy;

export const query = graphql`
  query CaseStudyQuery($slug: String!) {
    datoCmsCaseStudy(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      excerpt
      thumbnail {
        fluid(maxWidth: 320, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid
        }
      }
      brandColor {
        hex
      }
      preloaderScreenTitle
      preloaderScreenTitleColor {
        hex
      }
      heroImage {
        fluid(maxWidth: 2400, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid
        }
      }
      services
      location
      photography
      projectFeaturedIn
      blocks {
        ... on DatoCmsDropdownBlock {
          id
          headline
          dropdownText: dropdownButtonText
          extendedText: hiddenText
        }
        ... on DatoCmsFullWidthImageBlock {
          id
          image {
            fluid(
              maxWidth: 2400
              imgixParams: { fm: "jpg", auto: "compress" }
            ) {
              ...GatsbyDatoCmsFluid
            }
          }
          backgroundColor {
            hex
          }
          setTopPaddingToZero
          doubleTopPadding
          setBottomPaddingToZero
          doubleBottomPadding
        }
        ... on DatoCmsImageBlock {
          id
          image {
            fluid(maxWidth: 1600, imgixParams: { auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
          customWidth
          backgroundColor {
            hex
          }
          setTopPaddingToZero
          doubleTopPadding
          setBottomPaddingToZero
          doubleBottomPadding
        }
        ... on DatoCmsImageSliderBlock {
          id
          gallery {
            fluid(maxWidth: 2400, imgixParams: { auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
          caption
          fullWidth
          customWidth
          backgroundColor {
            hex
          }
          setTopPaddingToZero
          doubleTopPadding
          setBottomPaddingToZero
          doubleBottomPadding
        }
        ... on DatoCmsTextBlock {
          id
          copy
          textColor {
            hex
          }
          backgroundColor {
            hex
          }
          customWidth
          setTopPaddingToZero
          doubleTopPadding
          setBottomPaddingToZero
          doubleBottomPadding
        }
        ... on DatoCmsUrlBlock {
          id
          url
          textColor {
            hex
          }
          backgroundColor {
            hex
          }
          setTopPaddingToZero
          doubleTopPadding
          setBottomPaddingToZero
          doubleBottomPadding
        }
        ... on DatoCmsSideBySideBlock {
          id
          fullWidth
          backgroundColor {
            hex
          }
          alignTextTop
          leftSide60Width
          leftSideText
          leftTextColor {
            hex
          }
          leftSideImage {
            fluid(maxWidth: 1200, imgixParams: { auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
          leftSideImageCustomWidth
          leftSideImageStick
          leftPositioning: leftImagePositioning
          rightSide60Width
          rightSideText
          rightTextColor {
            hex
          }
          rightSideImage {
            fluid(maxWidth: 1200, imgixParams: { auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
          rightSideImageCustomWidth
          rightSideImageStick
          rightPositioning: rightImagePositioning
          setTopPaddingToZero
          doubleTopPadding
          setBottomPaddingToZero
          doubleBottomPadding
        }
        ... on DatoCmsVideoBlock {
          fullWidth
          backgroundColor {
            hex
          }
          setTopPaddingToZero
          doubleTopPadding
          setBottomPaddingToZero
          doubleBottomPadding
          vimeoDirectUrl
        }
      }
    }
    allDatoCmsCaseStudy {
      edges {
        node {
          title
          slug
          thumbnail {
            fluid(maxWidth: 320, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  }
`;
