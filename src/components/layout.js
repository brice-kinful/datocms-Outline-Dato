import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import "intersection-observer";
import Measure from "react-measure";
import Navigation from "./blocks/nav";
import Footer from "./blocks/footer";

import "../styles/reset.css";
import "../styles/base.css";

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      isFooterInView: false,
      windowTopPos: 0,
      pageHeight: 1000,
      location: "",
      loaded: false
    };
  }

  // scroll
  checkFooterScroll = () => {
    const { pageHeight } = this.state;
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > pageHeight - 1400) {
      //load footer
      this.setState({
        loaded: true
      });
    }
    if (currentScrollPos < pageHeight - 650) {
      this.setState({
        isFooterInView: false
      });
    } else {
      this.setState({
        isFooterInView: true
      });
    }
    // console.log(currentScrollPos);
    // console.log(pageHeight);
  };

  componentDidMount() {
    //safari check
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari") !== -1) {
      if (ua.indexOf("chrome") > -1) {
        document.body.classList.remove("safari");
      } else {
        document.body.classList.add("safari");
      }
    }

    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 600);
    this.setState({
      windowTopPos: window.pageYOffset,
      location: this.props.location,
      loaded: false
    });
    window.addEventListener("scroll", this.checkFooterScroll);
  }

  componentWillUnmount() {
    this.setState({
      loaded: false
    });
    // document.getElementsByClassName("page").classList.add("transitioning");
    window.removeEventListener("scroll", this.checkFooterScroll);
  }

  render() {
    const children = this.props.children;
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            datoCmsSite {
              globalSeo {
                siteName
              }
              faviconMetaTags {
                ...GatsbyDatoCmsFaviconMetaTags
              }
            }
            datoCmsHome {
              seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
              }
            }
            datoCmsMainMenu {
              menuItems {
                menuItemText
                menuItemPage {
                  ... on DatoCmsStudioPage {
                    slug
                  }
                  ... on DatoCmsCaseStudiesPage {
                    slug
                  }
                  ... on DatoCmsWorkPage {
                    slug
                  }
                  ... on DatoCmsContactPage {
                    slug
                  }
                }
              }
            }
            allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
              edges {
                node {
                  profileType
                  handle
                }
              }
            }
          }
        `}
        render={data => {
          return (
            <>
              <HelmetDatoCms
                favicon={data.datoCmsSite.faviconMetaTags}
                seo={data.datoCmsHome.seoMetaTags}
              />
              {/* <div className="safari-loader"></div> */}
              <Measure
                bounds
                onResize={contentRect => {
                  this.setState({ pageHeight: contentRect.bounds.height });
                }}
              >
                {({ measureRef }) => {
                  // console.log(this.state.pageHeight);
                  return (
                    <>
                      <Navigation
                        menuItems={data.datoCmsMainMenu.menuItems}
                        isFooterInView={this.state.isFooterInView}
                      />
                      <div ref={measureRef} className="container">
                        {children}
                        <div className="footer-container">
                          <Footer loaded={this.state.loaded} />
                        </div>
                      </div>
                    </>
                  );
                }}
              </Measure>
            </>
          );
        }}
      />
    );
  }
}

export default Layout;
