import React, { useState, useEffect, useRef } from "react";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";

import Navigation from "./blocks/nav";
import Footer from "./blocks/footer";

import "../styles/reset.css";
import "../styles/base.css";

const TemplateWrapper = ({ children }) => {
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
                url
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
            {children}
            <Navigation menuItems={data.datoCmsMainMenu.menuItems} />
            <Footer />
          </>
        );
      }}
    />
  );
};

export default TemplateWrapper;
