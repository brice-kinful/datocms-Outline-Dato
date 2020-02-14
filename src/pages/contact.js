import React from "react";
import { graphql } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import Img from "gatsby-image";
import Layout from "../components/layout";
import parse from "html-react-parser";

import "../styles/contact.css";

const ContactPage = ({ data }) => {
  const contact = data.datoCmsContactPage;
  // console.log(contact);
  return (
    <Layout>
      <div className="page" id="contact">
        <div className="main flex wrapper skinny">
          <div className="three-fourths text">
            <div className="inner flex">
              <p>
                <span>{contact.headline}</span>
                <span className="textlink">
                  <AniLink to={`/${contact.ctaButtonUrl.slug}`} fade>
                    {contact.ctaButtonText}
                  </AniLink>
                </span>
              </p>
            </div>
            <div className="flex bottom inner space-between">
              <div className="one-half">
                <AniLink
                  to={`/${contact.viewJobsButtonUrl.slug}`}
                  fade
                  className="line"
                  style={{ position: "relative" }}
                >
                  {contact.viewJobsButtonText}
                </AniLink>
                {parse(contact.leftBlockText)}
              </div>
              <div className="one-half flex align-end">
                {parse(contact.rightBlockText)}
              </div>
            </div>
          </div>
          <div className="one-fourth">
            <Img fluid={contact.image.fluid} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;

export const query = graphql`
  query {
    datoCmsContactPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      headline
      ctaButtonText
      ctaButtonUrl {
        ... on DatoCmsJobsPage {
          slug
        }
        ... on DatoCmsPreProjectInterview {
          slug
        }
        ... on DatoCmsCaseStudiesPage {
          slug
        }
        ... on DatoCmsWorkPage {
          slug
        }
        ... on DatoCmsStudioPage {
          slug
        }
      }
      image {
        fluid(maxHeight: 750, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid
        }
      }
      leftBlockText
      rightBlockText
      viewJobsButtonText
      viewJobsButtonUrl {
        ... on DatoCmsJobsPage {
          slug
        }
      }
    }
  }
`;
