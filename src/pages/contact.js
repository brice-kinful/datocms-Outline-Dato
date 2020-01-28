import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";

import "../styles/contact.css";

const ContactPage = ({ data }) => (
  <Layout>
    <h1>Contact</h1>
  </Layout>
);

export default ContactPage;

export const query = graphql`
  query {
    datoCmsContactPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
    }
  }
`;
