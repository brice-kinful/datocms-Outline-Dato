import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import Lightbox from "react-image-lightbox";
import Layout from "../components/layout";

import "react-image-lightbox/style.css";
import "../styles/work.css";

const captions = [
  "Cat in the snow",
  "",
  <p>
    .. not in the&nbsp;
    <em>mood</em>
    &nbsp;for games right now
    <br />
    ...
    <br />
    ...
    <br />
    ...
    <br />
    ...
    <br />
    ...
    <br />
    ...
    <br />
    C&#39;mon. Seriously.
  </p>,
  ""
];

class WorkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      images: [],
      isOpen: false,
      isHeadlineVisible: true,
      prevScrollpos: window.pageYOffset
    };
  }

  // scroll
  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    let mouseScrollTimeout;
    this.setState({
      prevScrollpos: currentScrollPos
    });

    if (currentScrollPos > 0) {
      this.setState({
        isHeadlineVisible: false
      });
    } else {
      this.setState({
        isHeadlineVisible: true
      });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    const mosaicImages = this.props.data.datoCmsWorkPage.workMosaicImages;
    this.setState(prevState => ({
      images: [...prevState.images, mosaicImages]
    }));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    // window.removeEventListener("mousemove", this.handleMouseMove);
  }

  render() {
    const { photoIndex, isOpen, images } = this.state;
    const lightboxImages = images[0];
    const masonryImages = this.props.data.datoCmsWorkPage.workMosaicImages;
    const masonryOptions = {
      transitionDuration: "0.3s",
      itemSelector: ".masonry-grid-item",
      columnWidth: ".masonry-grid-sizer",
      percentPosition: true
    };
    const { isHeadlineVisible } = this.state;
    console.log(lightboxImages);

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
                imageCaption={lightboxImages[photoIndex]?.imageCaption}
                prevSrc={
                  lightboxImages[
                    (photoIndex + lightboxImages.length - 1) %
                      lightboxImages.length
                  ]
                }
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
                    <Img fluid={item.fluid} key={index} />
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
        imageCaption: title
        url
        fluid(maxWidth: 400, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid
        }
      }
    }
  }
`;
