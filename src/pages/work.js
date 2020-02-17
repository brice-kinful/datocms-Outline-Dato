import React, { Component } from "react";
import { graphql } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import Masonry from "react-masonry-css";
import BlurredImage from "../components/blocks/blurred-image";
import Lightbox from "react-image-lightbox";
import Layout from "../components/layout";

import "react-image-lightbox/style.css";
import "../styles/work.css";

class WorkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      images: [],
      imageTitles: [],
      imagePadding: 60,
      isOpen: false,
      isHeadlineVisible: true,
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
    if (currentScrollPos > 0) {
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
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("mousemove", this.handleMouseMove);
    this.interval = setInterval(() => this.tick(), 1000);
    const mosaicImages = this.props.data.datoCmsWorkPage.workMosaicImages;
    this.setState({
      images: this.state.images.concat(mosaicImages)
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("mousemove", this.handleMouseMove);
    clearInterval(this.interval);
  }

  render() {
    const {
      photoIndex,
      isOpen,
      images,
      imagePadding,
      isHeadlineVisible
    } = this.state;
    let titles = [];
    const lightboxImages = images;
    const masonryImages = this.props.data.datoCmsWorkPage.workMosaicImages;
    const breakpointColumnsObj = {
      default: 5,
      1024: 4,
      768: 3,
      480: 2
    };
    masonryImages.map((image, index) => {
      titles.push(
        <span
          className="caption"
          style={{ transform: `translateY(${imagePadding / 2 + 60}px)` }}
          key={index}
        >
          <span
            style={{
              color: "#000000"
              // transform: `translateY(${imagePadding}px)`
            }}
          >
            <span>{image.title}</span>
            {image.customData["button-url"] && (
              <span className="textlink">
                <AniLink
                  preventScrollJump
                  to={`/case-studies/${image.customData["button-url"]}`}
                  fade
                  className=""
                  style={{}}
                >
                  {image.customData["button-title"]
                    ? image.customData["button-title"]
                    : "See More"}
                </AniLink>
              </span>
            )}
          </span>
        </span>
      );
    });
    // console.log(imageTitles);

    return (
      <Layout>
        <div className="page" id="work">
          <div className="wrapper" style={{ zIndex: 99 }}>
            <h1
              className={`big centertext ${isHeadlineVisible ? "visible" : ""}`}
            >
              Our Work
            </h1>

            {isOpen && (
              <Lightbox
                mainSrc={lightboxImages[photoIndex].url}
                nextSrc={
                  lightboxImages[(photoIndex + 1) % lightboxImages.length]
                }
                imageTitle={titles[photoIndex]}
                prevSrc={
                  lightboxImages[
                    (photoIndex + lightboxImages.length - 1) %
                      lightboxImages.length
                  ]
                }
                onImageLoad={() => {
                  this.setState({
                    imagePadding:
                      lightboxImages[photoIndex].fluid.height > 600
                        ? 600
                        : lightboxImages[photoIndex].fluid.height
                  });
                  // console.log(lightboxImages[photoIndex].customData);
                }}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex:
                      (photoIndex + lightboxImages.length - 1) %
                      lightboxImages.length
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % lightboxImages.length
                  })
                }
              />
            )}
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {masonryImages.map((item, index) => {
                return (
                  <div
                    className="masonry-grid-item"
                    key={index}
                    onClick={() =>
                      this.setState({ isOpen: true, photoIndex: index })
                    }
                  >
                    <BlurredImage src={item.fluid} key={index} offset={-100} />
                  </div>
                );
              })}
            </Masonry>
          </div>
        </div>
      </Layout>
    );
  }
}

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
        title
        url
        customData
        fluid(imgixParams: { fm: "jpg", auto: "compress" }, maxHeight: 400) {
          height
          ...GatsbyDatoCmsFluid
        }
      }
    }
  }
`;
