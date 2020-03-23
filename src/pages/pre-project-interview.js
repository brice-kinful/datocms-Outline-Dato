import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import emailjs from "emailjs-com";

import InterviewForm from "../components/blocks/interview-form";
import "../styles/pre-project-interview.css";

const PreProjectInterview = ({ data }) => {
  emailjs.init(process.env.GATSBY_EMAILJS_USER_ID);
  return (
    <div className="container">
      <Layout>
        <div id="interview" className="page flex align-center justify-center">
          <InterviewForm />
        </div>
      </Layout>
    </div>
  );
};

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
