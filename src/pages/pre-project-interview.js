import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";

const PreProjectInterview = ({ data }) => (
  <Layout>
    <h1>Pre-Project Interview</h1>
  </Layout>
);

export default PreProjectInterview;

export const query = graphql`
  query {
    datoCmsPreProjectInterview {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
    }
  }
`;
