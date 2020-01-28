import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import parse from "html-react-parser";

import "../styles/contact.css";

const ContactPage = ({ data }) => {
  const contact = data.datoCmsContactPage;
  console.log(contact);
  return (
    <Layout>
      <div id="contact">
        <div className="main flex wrapper skinny">
          <div className="three-fourths text">
            {parse(contact.headline)}
            <div className="flex bottom inner space-between">
              <div className="one-half">{parse(contact.leftBlockText)}</div>
              <div className="one-half">{parse(contact.rightBlockText)}</div>
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
      image {
        fluid(maxWidth: 550, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid
        }
      }
      leftBlockText
      rightBlockText
    }
  }
`;
