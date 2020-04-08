import React from "react";
import { Field } from "formik";

const InterviewStepOne = (props) => {
  return (
    <>
      <fieldset>
        <p className={`large centertext saol_standard`}>
          Hi, we’re Outline. Please tell us a bit about yourself:
        </p>
        <div className={`field flex align-center`}>
          <div className={`col`}>
            <Field name="first_name" type="text" />
            <label
              htmlFor="first_name"
              className={`${
                props.values.first_name !== "" && props.touched.first_name
                  ? "slideUp"
                  : ""
              }`}
            >
              First Name*
            </label>
          </div>
          {props.touched.first_name && props.errors.first_name ? (
            <label className={`error`}>{props.errors.first_name}</label>
          ) : null}
        </div>
        <div className={`field flex align-center`}>
          <div className={`col`}>
            <Field name="last_name" type="text" />
            <label
              htmlFor="last_name"
              className={`${
                props.values.last_name !== "" && props.touched.last_name
                  ? "slideUp"
                  : ""
              }`}
            >
              Last Name*
            </label>
          </div>
          {props.touched.last_name && props.errors.last_name ? (
            <label className={`error`}>{props.errors.last_name}</label>
          ) : null}
        </div>
        <div className={`field flex align-center`}>
          <div className={`col`}>
            <Field name="email" type="email" />
            <label
              htmlFor="email"
              className={`${
                props.values.email !== "" && props.touched.email
                  ? "slideUp"
                  : ""
              }`}
            >
              Email*
            </label>
          </div>
          {props.touched.email && props.errors.email ? (
            <label className={`error`}>{props.errors.email}</label>
          ) : null}
        </div>
        <div className={`field flex align-center`}>
          <div className={`col`}>
            <Field name="phone" type="tel" />
            <label
              htmlFor="phone"
              className={`${
                props.values.phone !== "" && props.touched.phone
                  ? "slideUp"
                  : ""
              }`}
            >
              Phone*
            </label>
          </div>
          {props.touched.phone && props.errors.phone ? (
            <label className={`error`}>{props.errors.phone}</label>
          ) : null}
        </div>
        <div className={`field flex align-center`}>
          <div className={`col four`}>
            <Field name="company" type="text" />
            <label
              htmlFor="company"
              className={`${
                props.values.company !== "" && props.touched.company
                  ? "slideUp"
                  : ""
              }`}
            >
              Company*
            </label>
          </div>
          {props.touched.company && props.errors.company ? (
            <label className={`error`}>{props.errors.company}</label>
          ) : null}
        </div>
        <div className={`field flex align-center`}>
          <div className={`col`}>
            <Field name="website" type="text" />
            <label
              htmlFor="website"
              className={`${
                props.values.website !== "" && props.touched.website
                  ? "slideUp"
                  : ""
              }`}
            >
              Website
            </label>
          </div>
          {props.touched.website && props.errors.website ? (
            <label className={`error`}>{props.errors.website}</label>
          ) : null}
        </div>
      </fieldset>
      <div className={`nav`}>
        <div className={`wrapper`}>
          <div className={`table styrene_medium uppercase`}>
            <div className={`cell`}>
              {props.step !== 1 && (
                <button
                  className={`previous`}
                  onClick={props.decrementStep}
                  type="button"
                >
                  Previous
                </button>
              )}
            </div>
            <div className={`cell`}>
              {/* <span className={`next`} onClick={sendFirstStepEmail}>
                            Submit Step
                        </span> */}
              {!props.touched.first_name ||
              !props.touched.last_name ||
              !props.touched.email ||
              !props.touched.phone ||
              props.errors.last_name ||
              props.errors.email ||
              props.errors.phone ||
              props.errors.company ? (
                <>
                  <span className="textlink">
                    <button
                      className={`next`}
                      onClick={props.incrementStep}
                      disabled
                    >
                      Next
                    </button>
                  </span>
                </>
              ) : (
                <span className="textlink">
                  <button
                    type="button"
                    className={`next`}
                    onClick={props.incrementStep}
                  >
                    Next
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewStepOne;
