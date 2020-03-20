import React, { useRef } from "react";
import { Field } from "formik";

const InterviewStepTwo = props => {
  const typeStartingRef = useRef(null);
  const typeStartingFocus = () => {
    typeStartingRef.current.focus();
    props.setFieldValue("type_reconsidering", "");
    props.setFieldValue("type_next_level", "");
  };
  const handleTypeStartingChange = e => {
    props.setFieldValue("type_starting", e.target.value);
  };

  const typeReconsideringRef = useRef(null);
  const typeReconsideringFocus = () => {
    typeReconsideringRef.current.focus();
    props.setFieldValue("type_starting", "");
    props.setFieldValue("type_next_level", "");
  };
  const handleTypeReconsideringChange = e => {
    props.setFieldValue("type_reconsidering", e.target.value);
  };

  const typeNextLevelRef = useRef(null);
  const typeNextLevelFocus = () => {
    typeNextLevelRef.current.focus();
    props.setFieldValue("type_reconsidering", "");
    props.setFieldValue("type_starting", "");
  };
  const handleTypeNextLevelChange = e => {
    props.setFieldValue("type_next_level", e.target.value);
  };

  return (
    <>
      <fieldset>
        <p className={`large centertext saol_standard`}>
          Nice to meet you {props.values.first_name}! Now let’s hear about your
          project:
        </p>
        <div className={`field label`}>
          <label>Choose one*</label>
        </div>
        <div className={`radios`}>
          <span className={`radio`}>
            <Field
              type="radio"
              id="radio_a_1"
              name="project_type"
              className={`required`}
              value="I'm starting something new"
              onClick={typeStartingFocus}
            />
            <label htmlFor="radio_a_1" className={`special`}></label>
            I'm starting something new:
          </span>
          <div className={`field`}>
            <input
              name="type_starting"
              id="type_starting"
              type="text"
              onChange={handleTypeStartingChange}
              value={props.values.type_starting}
              ref={typeStartingRef}
            />
            {/* <Field name="type_starting" type="text" /> */}
          </div>
          <span className={`radio`}>
            <Field
              type="radio"
              id="radio_a_2"
              name="project_type"
              value="I'm reconsidering something"
              className={`required`}
              onClick={typeReconsideringFocus}
            />
            <label htmlFor="radio_a_2" className={`special`}></label>
            I'm reconsidering something:
          </span>
          <div className={`field`}>
            {/* <Field name="type_reconsidering" type="text" /> */}
            <input
              name="type_reconsidering"
              id="type_reconsidering"
              type="text"
              onChange={handleTypeReconsideringChange}
              value={props.values.type_reconsidering}
              ref={typeReconsideringRef}
            />
          </div>
          <span className={`radio`}>
            <Field
              type="radio"
              name="project_type"
              id="radio_a_3"
              value="I'm taking something to the next level"
              className={`required`}
              onClick={typeNextLevelFocus}
            />
            <label htmlFor="radio_a_3" className={`special`}></label>
            I'm taking something to the next level:
          </span>
          <div className={`field`}>
            {/* <Field name="type_next_level" type="text" /> */}
            <input
              name="type_next_level"
              id="type_next_level"
              type="text"
              onChange={handleTypeNextLevelChange}
              value={props.values.type_next_level}
              ref={typeNextLevelRef}
            />
          </div>
          {props.touched.project_type && props.errors.project_type ? (
            <label className={`error`}>{props.errors.project_type}</label>
          ) : null}
        </div>
      </fieldset>
      <div className={`nav`}>
        <div className={`wrapper`}>
          <div className={`table styrene_medium uppercase`}>
            <div className={`cell`}>
              <span className="textlink">
                <button
                  type="button"
                  className={`previous`}
                  onClick={props.decrementStep}
                >
                  Previous
                </button>
              </span>
            </div>
            <div className={`cell`}>
              {props.errors.project_type ||
              (props.values.project_type === "I'm starting something new" &&
                props.values.type_starting === "") ||
              (props.values.project_type === "I'm reconsidering something" &&
                props.values.type_reconsidering === "") ||
              (props.values.project_type ===
                "I'm taking something to the next level" &&
                props.values.type_next_level === "") ? (
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

export default InterviewStepTwo;
