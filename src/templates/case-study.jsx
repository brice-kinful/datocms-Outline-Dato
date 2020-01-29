import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";

import "../styles/case-study.css";

export default ({ data }) => (
  <Layout>
    <div id="case-study">
      <div className="wrapper centertext">
        <HelmetDatoCms seo={data.datoCmsCaseStudy.seoMetaTags} />
        <h1>{data.datoCmsCaseStudy.title}</h1>
      </div>
    </div>
  </Layout>
);

export const query = graphql`
  query CaseStudyQuery($slug: String!) {
    datoCmsCaseStudy(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
    }
  }
`;
