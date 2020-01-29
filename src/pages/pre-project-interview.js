import React, { useState } from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { navigate } from "@reach/router";
import emailjs from "emailjs-com";

import "../styles/pre-project-interview.css";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  company: Yup.string().required("Required")
});

const PreProjectInterview = ({ data }) => {
  emailjs.init(process.env.GATSBY_EMAILJS_USER_ID);
  const interview = data.datoCmsPreProjectInterview;
  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };
  return (
    <Layout>
      <div
        id="pre-project-interview"
        className="flex align-center justify-center"
      >
        <div className="wrapper xx_skinny">
          <p>{interview.headline}</p>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              phone: "",
              company: "",
              website: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
              fetch("/?no-cache=1", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                body: encode({
                  "form-name": "interview-form",
                  ...values
                })
              })
                .then(() => {
                  setSubmitting(false);
                  //reset values to zero
                  resetForm({});

                  // write final email send function below
                  //   emailjs
                  //     .send('gmail', 'interview_template_step_final', values)
                  //     .then(
                  //       result => {
                  //         console.log(`Final form submitted`)
                  //         setStatus({ success: true })
                  //         navigate(`/thanks`)
                  //       },
                  //       error => {
                  //         console.log(error.text)
                  //       }
                  //     )
                })
                .catch(error => {
                  console.log("Error: Please Try Again!");
                  setSubmitting(false);
                });
            }}
          >
            {({
              errors,
              touched,
              values,
              setFieldValue,
              handleSubmit,
              handleReset
            }) => {
              return (
                <>
                  <Form
                    id="interview-form"
                    name="interview-form"
                    action="/thanks/"
                    method="post"
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    data-netlify="true"
                    data-netlify-honeypot="botfield"
                  >
                    <input
                      type="hidden"
                      name="form-name"
                      value="interview-form"
                    />
                    <p hidden>
                      <label>
                        Don’t fill this out:
                        <Field name="botfield" type="text" />
                      </label>
                    </p>

                    <div className={`field flex align-center`}>
                      {/* <div className={`col`}>
                        <label
                          htmlFor="first_name"
                          className={`${touched.first_name && "slideUp"}`}
                        >
                          First Name*
                        </label>
                      </div> */}
                      <div className={`col `}>
                        <Field
                          name="first_name"
                          type="text"
                          placeholder="First Name"
                        />
                      </div>
                      {touched.first_name && errors.first_name ? (
                        <label className={`error`}>{errors.first_name}</label>
                      ) : null}
                    </div>
                    <div className={`field flex align-center`}>
                      {/* <div className={`col`}>
                        <label
                          htmlFor="last_name"
                          className={`${touched.last_name && "slideUp"}`}
                        >
                          Last Name*
                        </label>
                      </div> */}
                      <div className={`col `}>
                        <Field
                          name="last_name"
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                      {touched.last_name && errors.last_name ? (
                        <label className={`error`}>{errors.last_name}</label>
                      ) : null}
                    </div>
                    <div className={`field flex align-center`}>
                      {/* <div className={`col`}>
                        <label
                          htmlFor="email"
                          className={`${touched.email && "slideUp"}`}
                        >
                          Email*
                        </label>
                      </div> */}
                      <div className={`col `}>
                        <Field name="email" type="email" placeholder="Email" />
                      </div>
                      {touched.email && errors.email ? (
                        <label className={`error`}>{errors.email}</label>
                      ) : null}
                    </div>
                    <div className={`field flex align-center`}>
                      {/* <div className={`col`}>
                        <label
                          htmlFor="phone"
                          className={`${touched.phone && "slideUp"}`}
                        >
                          Phone*
                        </label>
                      </div> */}
                      <div className={`col `}>
                        <Field name="phone" type="tel" placeholder="Phone" />
                      </div>
                      {touched.phone && errors.phone ? (
                        <label className={`error`}>{errors.phone}</label>
                      ) : null}
                    </div>
                    <div className={`field flex align-center`}>
                      {/* <div className={`col`}>
                        <label
                          htmlFor="company"
                          className={`${touched.company && "slideUp"}`}
                        >
                          Company*
                        </label>
                      </div> */}
                      <div className={`col `}>
                        <Field
                          name="company"
                          type="text"
                          placeholder="Company"
                        />
                      </div>
                      {touched.company && errors.company ? (
                        <label className={`error`}>{errors.company}</label>
                      ) : null}
                    </div>
                    <div className={`field flex align-center`}>
                      {/* <div className={`col`}>
                        <label
                          htmlFor="website"
                          className={`${touched.website && "slideUp"}`}
                        >
                          Website
                        </label>
                      </div> */}
                      <div className={`col `}>
                        <Field
                          name="website"
                          type="text"
                          placeholder="Website"
                        />
                      </div>
                      {touched.website && errors.website ? (
                        <label className={`error`}>{errors.website}</label>
                      ) : null}
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
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
      headline
    }
  }
`;
