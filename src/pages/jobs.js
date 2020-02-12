import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const JobsPage = ({ data }) => (
  <Layout>
    <div className="page">
      <div className="wrapper centertext">
        <h1>Jobs</h1>
      </div>
    </div>
  </Layout>
);

export default JobsPage;

export const query = graphql`
  query {
    datoCmsJobsPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
    }
  }
`;
