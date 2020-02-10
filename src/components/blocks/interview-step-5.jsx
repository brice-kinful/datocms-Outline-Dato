import React from "react";
import { Field } from "formik";

const InterviewStepFive = props => {
  const handleCommentChange = e => {
    props.setFieldValue("comments", e.target.value);
  };

  return (
    <>
      <fieldset>
        <p className={`large centertext`}>Anything else you want to share?</p>
        <div className={`field label`}>
          <label htmlFor="comments">
            Other important tidbits we should know:
          </label>
          {/* <Field name="comments" type="textarea" /> */}
          <textarea
            name="comments"
            id="comments"
            cols="30"
            rows="10"
            onChange={handleCommentChange}
            value={props.values.comments}
          />
        </div>
        <div className={`field`}>
          <label htmlFor="how_hear">How did you hear about us?*</label>
          <Field name="how_hear" type="text" className={`required`} />
          {/* {props.touched.how_hear && props.errors.how_hear ? (
            <label className={`error`}>{props.errors.how_hear}</label>
          ) : null} */}
        </div>
        <div className={`field label`}>
          {props.values.how_hear === "" ? (
            <button className={`btn`} disabled type="submit">
              Submit Inquiry
            </button>
          ) : (
            <button className={`btn`} type="submit">
              Submit Inquiry
            </button>
          )}
        </div>
      </fieldset>
      <div className={`nav`}>
        <div className={`wrapper`}>
          <div className={`table styrene_medium uppercase`}>
            <div className={`cell`}>
              {props.step != 1 && (
                <span className="textlink">
                  <a
                    href="#"
                    className={`previous`}
                    onClick={props.decrementStep}
                  >
                    Previous
                  </a>
                </span>
              )}
            </div>
            <div className={`cell`}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewStepFive;
