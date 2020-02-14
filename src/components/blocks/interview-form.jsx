import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { navigate } from "@reach/router";
import emailjs from "emailjs-com";

import InterviewStepOne from "./interview-step-1";
import InterviewStepTwo from "./interview-step-2";
import InterviewStepThree from "./interview-step-3";
import InterviewStepFour from "./interview-step-4";
import InterviewStepFive from "./interview-step-5";

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
  company: Yup.string().required("Required"),
  project_type: Yup.string()
    .oneOf(
      [
        "I'm starting something new",
        "I'm reconsidering something",
        "I'm taking something to the next level"
      ],
      "Invalid Project Type"
    )
    .required("Required"),
  budget_min: Yup.string().required("Required"),
  budget_max: Yup.string().required("Required"),
  timeline_min: Yup.string().required("Required"),
  timeline_max: Yup.string().required("Required")
});

const InterviewForm = () => {
  const [step, setStep] = useState(1);

  const decrementStep = () => {
    setStep(step - 1);
  };

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  return (
    <>
      <div className={`container`}>
        <div className={`wrapper xx_skinny`}>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              phone: "",
              company: "",
              website: "",
              project_type: "",
              type_starting: "",
              type_reconsidering: "",
              type_next_level: "",
              services_brand_strategy: "",
              services_visual_identity: "",
              services_web_dev: "",
              services_ecommerce: "",
              services_print_collateral: "",
              services_packaging_design: "",
              services_content_strategy_dev: "",
              services_naming: "",
              services_art_directon: "",
              services_other: "",
              budget_min: 10000,
              budget_max: 30000,
              timeline_min: 6,
              timeline_max: 12,
              comments: "",
              how_hear: ""
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
                  emailjs
                    .send("gmail", "interview_template_step_final", values)
                    .then(
                      result => {
                        console.log(`Final form submitted`);
                        setStatus({ success: true });
                        navigate(`/thanks`);
                      },
                      error => {
                        console.log(error.text);
                      }
                    );
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
              const incrementStep = () => {
                // console.log("Updated values Below:");
                // console.log(values);

                if (
                  step === 1 &&
                  values.first_name !== "" &&
                  values.last_name !== "" &&
                  values.email !== "" &&
                  values.phone !== "" &&
                  errors.first_name !== "Required" &&
                  errors.last_name !== "Required" &&
                  errors.email !== ("Required" || "Invalid email address") &&
                  errors.phone !==
                    ("Required" || "Phone number is not valid") &&
                  errors.company !== "Required"
                ) {
                  setStep(step + 1);
                  //run the first email js function below
                  emailjs
                    .send("gmail", "interview_template_step_1", values)
                    .then(
                      result => {
                        console.log(`Email submitted for step 1`);
                      },
                      error => {
                        console.log(error.text);
                      }
                    );
                }

                step === 2 &&
                  errors.project_type !== "Required" &&
                  setStep(step + 1);

                step === 3 &&
                  (values.services_brand_strategy !== "" ||
                    values.services_visual_identity !== "" ||
                    values.services_web_dev !== "" ||
                    values.services_ecommerce !== "" ||
                    values.services_print_collateral !== "" ||
                    values.services_packaging_design !== "" ||
                    values.services_content_strategy_dev !== "" ||
                    values.services_naming !== "" ||
                    values.services_art_directon !== "" ||
                    values.services_other !== "") &&
                  setStep(step + 1);

                step === 4 && setStep(step + 1);
              };
              return (
                <>
                  <Form
                    id="interview-form"
                    name="interview-form"
                    autocomplete="off"
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

                    <div className={`step${step === 1 ? " active" : ""}`}>
                      <InterviewStepOne
                        errors={errors}
                        touched={touched}
                        values={values}
                        step={step}
                        incrementStep={incrementStep}
                        decrementStep={decrementStep}
                      />
                    </div>

                    <div className={`step${step === 2 ? " active" : ""}`}>
                      <InterviewStepTwo
                        errors={errors}
                        touched={touched}
                        values={values}
                        step={step}
                        setFieldValue={setFieldValue}
                        incrementStep={incrementStep}
                        decrementStep={decrementStep}
                      />
                    </div>

                    <div className={`step${step === 3 ? " active" : ""}`}>
                      <InterviewStepThree
                        errors={errors}
                        touched={touched}
                        values={values}
                        step={step}
                        incrementStep={incrementStep}
                        decrementStep={decrementStep}
                      />
                    </div>

                    <div className={`step${step === 4 ? " active" : ""}`}>
                      <InterviewStepFour
                        errors={errors}
                        touched={touched}
                        values={values}
                        step={step}
                        setFieldValue={setFieldValue}
                        incrementStep={incrementStep}
                        decrementStep={decrementStep}
                      />
                    </div>

                    <div className={`step${step === 5 ? " active" : ""}`}>
                      <InterviewStepFive
                        errors={errors}
                        touched={touched}
                        values={values}
                        step={step}
                        setFieldValue={setFieldValue}
                        decrementStep={decrementStep}
                      />
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
      </div>
      <div className={`pagetitle`}>
        Pre-Project Interview
        <div className={`pagination uppercase`}>
          <span className={`current`}>{step}</span> / 5
        </div>
      </div>
    </>
  );
};

export default InterviewForm;
