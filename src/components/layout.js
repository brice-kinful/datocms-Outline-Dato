import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
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
      pageHeight: 1000
    };
  }

  // scroll
  checkFooterScroll = () => {
    const { windowTopPos, pageHeight } = this.state;
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos < pageHeight * 0.8) {
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
    this.setState({ windowTopPos: window.pageYOffset });
    window.addEventListener("scroll", this.checkFooterScroll);
  }

  componentWillUnmount() {
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
              <Measure
                bounds
                onResize={contentRect => {
                  this.setState({ pageHeight: contentRect.bounds.height });
                }}
              >
                {({ measureRef }) => {
                  // console.log(this.state.pageHeight);
                  return <div ref={measureRef}>{children}</div>;
                }}
              </Measure>
              <Navigation
                menuItems={data.datoCmsMainMenu.menuItems}
                isFooterInView={this.state.isFooterInView}
              />
              <Footer />
            </>
          );
        }}
      />
    );
  }
}

export default Layout;
