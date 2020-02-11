import React, { Component } from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";

import BlurredImage from "../components/blocks/blurred-image";
import HeadlineAccordion from "../components/blocks/headline-accordion";
import SideBySide from "../components/blocks/side-by-side";
import TextBlock from "../components/blocks/text-block";
import UrlBlock from "../components/blocks/url-block";
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

  render() {
    const project = this.props.data.datoCmsCaseStudy;
    const allProjects = this.props.data.allDatoCmsCaseStudy.edges;
    const activeProjectIndex = allProjects.findIndex(
      ({ node }) => node.slug == project.slug
    );
    const nextProject =
      allProjects.length === activeProjectIndex + 1
        ? 0
        : activeProjectIndex + 1;
    const { hasHeroImageLoaded } = this.state;
    console.log(project);
    return (
      <Layout>
        <div className="page" id="case-study">
          <HelmetDatoCms seo={project.seoMetaTags} />
          <div
            className={`screen flex align-center justify-center wrapper${
              hasHeroImageLoaded ? "" : " visible"
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
          <div className="hero">
            <Img
              fluid={project.heroImage.fluid}
              onLoad={() =>
                setTimeout(() => {
                  this.setState({ hasHeroImageLoaded: true });
                  document.body.classList.remove("frozen");
                }, 1500)
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
                    className="block"
                    key={block.id}
                    style={{ backgroundColor: block.backgroundColor?.hex }}
                  >
                    <div
                      className={`wrapper${block.narrowWidth ? " narrow" : ""}`}
                    >
                      <BlurredImage src={block.image.fluid} />
                    </div>
                  </div>
                );
              case "DatoCmsSideBySideBlock":
                return (
                  <React.Fragment key={block.id}>
                    <SideBySide content={block} />
                  </React.Fragment>
                );
              case "DatoCmsFullWidthImageBlock":
                return (
                  <React.Fragment key={block.id}>
                    <BlurredImage src={block.image.fluid} />
                  </React.Fragment>
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
          setBottomPaddingToZero
        }
        ... on DatoCmsImageBlock {
          id
          image {
            fluid(maxWidth: 1600, imgixParams: { auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
          narrowWidth
          backgroundColor {
            hex
          }
          setTopPaddingToZero
          setBottomPaddingToZero
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
          setTopPaddingToZero
          setBottomPaddingToZero
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
          setBottomPaddingToZero
        }
        ... on DatoCmsSideBySideBlock {
          id
          fullWidth
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
          leftPositioning: leftImagePositioning
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
          rightPositioning: rightImagePositioning
          setTopPaddingToZero
          setBottomPaddingToZero
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
