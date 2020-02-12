import React from "react";
import { Field } from "formik";

const InterviewStepThree = props => {
  return (
    <>
      <fieldset>
        <p className={`large centertext`}>
          What types of services are you looking for?
        </p>
        <div className="field label">
          <label>Choose all that apply*</label>
        </div>
        <div className={`checks`}>
          <div className={`cols`}>
            <div className={`col one-half`}>
              <span className={`check`}>
                <Field
                  type="checkbox"
                  name="services_brand_strategy"
                  value="✓"
                />
                <label
                  htmlFor="services_brand_strategy"
                  className={`special`}
                ></label>{" "}
                Brand Strategy
              </span>
              <span className="check">
                <Field
                  type="checkbox"
                  name="services_visual_identity"
                  value="✓"
                />
                <label
                  htmlFor="services_visual_identity"
                  className={`special`}
                ></label>{" "}
                Visual Identity
              </span>
              <span className={`check`}>
                <Field type="checkbox" name="services_web_dev" value="✓" />
                <label
                  htmlFor="services_web_dev"
                  className={`special`}
                ></label>{" "}
                Web Design &amp; Development
              </span>
              <span className={`check`}>
                <Field type="checkbox" name="services_ecommerce" value="✓" />
                <label
                  htmlFor="services_ecommerce"
                  className={`special`}
                ></label>{" "}
                Ecommerce
              </span>
              <span className={`check`}>
                <Field
                  type="checkbox"
                  name="services_print_collateral"
                  value="✓"
                />
                <label
                  htmlFor="services_print_collateral"
                  className={`special`}
                ></label>{" "}
                Print Collateral
              </span>
            </div>
            <div className={`col one-half`}>
              <span className={`check`}>
                <Field
                  type="checkbox"
                  name="services_packaging_design"
                  value="✓"
                />
                <label
                  htmlFor="services_packaging_design"
                  className={`special`}
                ></label>{" "}
                Packaging Design
              </span>
              <span className={`check`}>
                <Field
                  type="checkbox"
                  name="services_content_strategy_dev"
                  value="✓"
                />
                <label
                  htmlFor="services_content_strategy_dev"
                  className={`special`}
                ></label>{" "}
                Content Strategy &amp; Development
              </span>
              <span className={`check`}>
                <Field type="checkbox" name="services_naming" value="✓" />
                <label
                  htmlFor="services_naming"
                  className={`special`}
                ></label>{" "}
                Naming
              </span>
              <span className={`check`}>
                <Field type="checkbox" name="services_art_directon" value="✓" />
                <label
                  htmlFor="services_art_directon"
                  className={`special`}
                ></label>{" "}
                Art Directon
              </span>
              <span className={`check`}>
                <Field type="checkbox" name="services_other" value="✓" />
                <label
                  htmlFor="services_other"
                  className={`special`}
                ></label>{" "}
                Other
              </span>
            </div>
          </div>
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
              {props.values.services_brand_strategy !== "" ||
              props.values.services_visual_identity !== "" ||
              props.values.services_web_dev !== "" ||
              props.values.services_ecommerce !== "" ||
              props.values.services_print_collateral !== "" ||
              props.values.services_packaging_design !== "" ||
              props.values.services_content_strategy_dev !== "" ||
              props.values.services_naming !== "" ||
              props.values.services_art_directon !== "" ||
              props.values.services_other !== "" ? (
                <>
                  <span className="textlink">
                    <button
                      type="button"
                      className={`next`}
                      onClick={props.incrementStep}
                    >
                      Next
                    </button>
                  </span>
                </>
              ) : (
                <span className="textlink">
                  <button
                    className={`next disabled`}
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

export default InterviewStepThree;
