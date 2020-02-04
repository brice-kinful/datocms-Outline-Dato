import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import BlurredImage from "../components/blocks/blurred-image";
import Lightbox from "react-image-lightbox";
import Layout from "../components/layout";

import "react-image-lightbox/style.css";
import "../styles/work.css";

// const titles = [
//   <span>
//     <a href="#">Caption 1</a>
//   </span>,
//   <span>
//     <a href="#">Menu design for Le Farfalle</a>
//   </span>,
//   <span>
//     <a href="#">Caption 3</a>
//   </span>,
//   <span>
//     <a href="#">Caption 4</a>
//   </span>
// ];

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
    const { prevScrollpos } = this.state;
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

  updateImagePadding = padding => {
    this.setState({
      imagePadding: padding
    });
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
      imageTitles,
      imagePadding,
      isHeadlineVisible
    } = this.state;
    let titles = [];
    const lightboxImages = images;
    const masonryImages = this.props.data.datoCmsWorkPage.workMosaicImages;
    const masonryOptions = {
      transitionDuration: "0.3s",
      itemSelector: ".masonry-grid-item",
      columnWidth: ".masonry-grid-sizer",
      percentPosition: true
    };
    masonryImages.map(image => {
      titles.push(
        <span
          className="caption"
          style={{ transform: `translateY(${imagePadding / 2 + 60}px)` }}
        >
          <span
            style={{
              color: "#000000"
            }}
          >
            {image.title}
          </span>
          {image.customData["case-studies"] && (
            <AniLink
              to={`/case-studies/${image.customData["case-studies"]}`}
              fade
              className="textlink"
              style={{}}
            >
              Project
            </AniLink>
          )}
        </span>
      );
    });
    // console.log(imageTitles);

    return (
      <Layout>
        <div className="page" id="work">
          <div className="wrapper">
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
                    imagePadding: lightboxImages[photoIndex].fluid.height
                  });
                  console.log(lightboxImages[photoIndex].customData);
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
              options={masonryOptions}
              disableImagesLoaded={false}
              updateOnEachImageLoad={true}
            >
              <div className="masonry-grid-sizer"></div>
              {masonryImages.map((item, index) => {
                return (
                  <div
                    className="masonry-grid-item"
                    onClick={() =>
                      this.setState({ isOpen: true, photoIndex: index })
                    }
                  >
                    <BlurredImage src={item.fluid} key={index} />
                    {/* <Img fluid={item.fluid} /> */}
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
        fluid(imgixParams: { fm: "jpg", auto: "compress" }) {
          height
          ...GatsbyDatoCmsFluid
        }
      }
    }
  }
`;
