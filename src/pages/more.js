import React, { Component } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import AniLink from "../components/transitions/AniLink";
import Masonry from "react-masonry-css";
import BlurredImage from "../components/blocks/blurred-image";
import Lightbox from "react-image-lightbox";
import { genericHashLink } from "react-router-hash-link";
import GatsbyLink from "gatsby-link";

import { isSafari } from "react-device-detect";

import "react-image-lightbox/style.css";
import "../styles/more.css";

const HashLink = props => genericHashLink(props, GatsbyLink);

class WorkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      updatePhotoIndex: 0,
      images: [],
      imageTitles: [],
      imagePadding: 60,
      isOpen: false,
      lightboxBgColor: "",
      lightboxTextColor: "",
      isHeadlineVisible: true,
      prevScrollpos: ""
    };
  }

  //update colors
  updateColors = (bgColor, textColor) => {
    // console.log("updating colors");
    this.setState({
      lightboxBgColor: bgColor,
      lightboxTextColor: textColor
    });
  };

  //update mobile modal image

  // scroll
  handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    this.setState({
      prevScrollpos: currentScrollPos,
      isHeadlineVisible: true
    });
    if (currentScrollPos > 25) {
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
      isHeadlineVisible,
      lightboxBgColor,
      lightboxTextColor
    } = this.state;
    let titles = [];
    const lightboxImages = images;
    const masonryImages = this.props.data.datoCmsWorkPage.workMosaicImages;
    const breakpointColumnsObj = {
      default: 5,
      1024: 4
    };

    masonryImages.map((image, index) => {
      titles.push(
        <span className="caption" key={index}>
          <span style={{ transform: `translateY(${imagePadding / 2 + 40}px)` }}>
            <span className="bg"></span>
            <span className="title">{image.title}</span>
            {image.customData["button-url"] && (
              <span className="textlink">
                <AniLink
                  preventScrollJump
                  to={`/case-studies/${image.customData["button-url"]}`}
                  fade
                  className="uppercase"
                  style={{}}
                >
                  {image.customData["button-title"]
                    ? image.customData["button-title"]
                    : "See More"}
                </AniLink>
                <span style={{ background: lightboxTextColor }}></span>
              </span>
            )}
          </span>
        </span>
      );
    });

    return (
      <Layout>
        <div className="page" id="work">
          <div className="wrapper" style={{ zIndex: 99 }}>
            <div className="title-container wrapper">
              <h1
                className={`big saol_standard centertext ${
                  isHeadlineVisible ? "visible" : ""
                }`}
              >
                More
              </h1>
            </div>

            {isOpen && (
              <>
                <Lightbox
                  wrapperClassName={`${
                    lightboxImages[photoIndex].customData["text-color"] === ""
                      ? "black"
                      : lightboxImages[photoIndex].customData["text-color"]
                  }`}
                  mainSrc={lightboxImages[photoIndex].url}
                  nextSrc={
                    lightboxImages[(photoIndex + 1) % lightboxImages.length]
                  }
                  imageCaption={titles[photoIndex]}
                  prevSrc={
                    lightboxImages[
                      (photoIndex + lightboxImages.length - 1) %
                        lightboxImages.length
                    ]
                  }
                  imagePadding={100}
                  onImageLoad={() => {
                    const bgColor =
                      lightboxImages[photoIndex].customData["background-color"];
                    const textColor =
                      lightboxImages[photoIndex].customData["text-color"] === ""
                        ? "black"
                        : lightboxImages[photoIndex].customData["text-color"];
                    this.updateColors(bgColor, textColor);
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
                  reactModalStyle={{
                    overlay: {
                      backgroundColor: `${
                        lightboxBgColor ? lightboxBgColor : "#F5F5F1"
                      }`
                    },
                    content: {
                      color: `${
                        lightboxTextColor ? lightboxTextColor : "#000000"
                      }`
                    }
                  }}
                />

                <div className="mobile-modal">
                  <div className="wrapper white-bg">
                    <div className="close-container white-bg">
                      <div
                        className="close"
                        onClick={() => {
                          this.setState({ isOpen: false });
                          console.log("clicked");
                        }}
                      ></div>
                    </div>
                    {masonryImages.map((item, index) => {
                      // console.log(item);
                      return (
                        <div
                          id={`photo-${index}`}
                          key={index}
                          className="photo"
                        >
                          <span className="spacer"></span>

                          <BlurredImage
                            src={item.fluid}
                            key={index}
                            offset={-100}
                          />
                          {item.title && <p>{item.title}</p>}
                          {item.customData["button-url"] && (
                            <div className="centertext">
                              <span
                                className="textlink"
                                style={{
                                  fontSize: "12px",
                                  display: "inline-block !important",
                                  marginTop: "-15px",
                                  padding: 0
                                }}
                              >
                                <AniLink
                                  preventScrollJump
                                  to={`/case-studies/${item.customData["button-url"]}`}
                                  fade
                                >
                                  {item.customData["button-title"]
                                    ? item.customData["button-title"]
                                    : "See More"}
                                </AniLink>
                                <span style={{ background: "#000000" }}></span>
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {masonryImages.map((item, index) => {
                const slider = this.slider;
                return (
                  <div
                    className="masonry-grid-item"
                    key={index}
                    onClick={() => {
                      this.setState({ isOpen: true, photoIndex: index });
                      // console.log(index);
                    }}
                  >
                    <HashLink to={`/more#photo-${index}`}>
                      <BlurredImage
                        src={item.fluid}
                        key={index}
                        offset={-100}
                      />
                    </HashLink>
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
