import React, { useState } from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { navigate } from "@reach/router";
import emailjs from "emailjs-com";

import InterviewForm from "../components/blocks/interview-form";
import "../styles/pre-project-interview.css";

const PreProjectInterview = ({ data }) => {
  emailjs.init(process.env.GATSBY_EMAILJS_USER_ID);
  const interview = data.datoCmsPreProjectInterview;
  return (
    <Layout>
      <div id="interview" className="page lex align-center justify-center">
        <InterviewForm />
      </div>
    </Layout>
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
