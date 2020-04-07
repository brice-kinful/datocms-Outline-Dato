import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import parse from "html-react-parser";
import AniLink from "../components/transitions/AniLink";

const JobsPage = ({ data }) => {
  const content = data.datoCmsJobsPage;
  const jobs = data.allDatoCmsJob.edges;
  return (
    <Layout>
      <div className="page" id="default">
        <div className="wrapper x_skinny content">
          <h1>{content.headline}</h1>
          {parse(content.intro)}
          {jobs.map(({ node }) => {
            return (
              <>
                <h2>{node.title}</h2>
                <p style={{ marginBottom: "5px" }}>
                  {node.jobShortDescription}
                </p>
                <span className="textlink">
                  <AniLink preventScrollJump fade to={`/jobs/${node.jobSlug}`}>
                    Read More
                  </AniLink>
                </span>
              </>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;

export const query = graphql`
  query {
    datoCmsJobsPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      headline
      intro
    }
    allDatoCmsJob {
      edges {
        node {
          title
          jobSlug
          jobShortDescription
        }
      }
    }
  }
`;
