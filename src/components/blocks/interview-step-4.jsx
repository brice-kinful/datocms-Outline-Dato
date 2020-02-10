import React, { Component } from "react";
import { Field } from "formik";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

class InterviewStepFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: {
        min: 10000,
        max: 30000
      },
      timeline: {
        min: 6,
        max: 12
      }
    };
  }
  render() {
    const handleBudgetChange = budget => {
      this.setState({ budget });
      this.props.setFieldValue("budget_min", this.state.budget.min);
      this.props.setFieldValue("budget_max", this.state.budget.max);
    };

    const handleTimelineChange = timeline => {
      this.setState({ timeline });
      this.props.setFieldValue("timeline_min", this.state.timeline.min);
      this.props.setFieldValue("timeline_max", this.state.timeline.max);
    };

    const formixBudget = {
      min: this.props.values.budget_min,
      max: this.props.values.budget_max
    };

    const formixTimeline = {
      min: this.props.values.timeline_min,
      max: this.props.values.timeline_max
    };

    return (
      <>
        <fieldset>
          <p className={`large centertext`}>
            Do you have an idea of budget and timeline?
          </p>
          <div className={`field label`}>
            <label>Project Budget*</label>
            <div className={`slider`}>
              <div className={`display`}>
                ${this.props.values.budget_min} - $
                {this.props.values.budget_max}
              </div>
              <InputRange
                maxValue={100000}
                minValue={10000}
                step={1000}
                value={formixBudget}
                onChange={handleBudgetChange}
              />
            </div>
          </div>
          <div className={`field label`}>
            <label>Timeline*</label>
            <div className={`slider`}>
              <div className={`display`}>
                {this.props.values.timeline_min == 0
                  ? "now"
                  : this.props.values.timeline_min == 1
                  ? `1 month`
                  : `${this.props.values.timeline_min} months`}{" "}
                -{" "}
                {this.props.values.timeline_max == 12
                  ? "1 year"
                  : this.props.values.timeline_max == 1
                  ? `1 month`
                  : `${this.props.values.timeline_max} months`}
              </div>
              <InputRange
                maxValue={12}
                minValue={0}
                step={1}
                value={formixTimeline}
                onChange={handleTimelineChange}
              />
            </div>
          </div>
        </fieldset>
        <div className={`nav`}>
          <div className={`wrapper`}>
            <div className={`table styrene_medium uppercase`}>
              <div className={`cell`}>
                <span className="textlink">
                  <a
                    href="#"
                    className={`previous`}
                    onClick={this.props.decrementStep}
                  >
                    Previous
                  </a>
                </span>
              </div>
              <div className={`cell`}>
                {this.props.values.budget != "" ||
                this.props.values.timeline != "" ? (
                  <>
                    <span className="textlink">
                      <a
                        href="#"
                        className={`next`}
                        onClick={this.props.incrementStep}
                      >
                        Next
                      </a>
                    </span>
                  </>
                ) : (
                  <span className="textlink">
                    <a
                      href="#"
                      className={`next disabled`}
                      onClick={this.props.incrementStep}
                    >
                      Next
                    </a>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default InterviewStepFour;
