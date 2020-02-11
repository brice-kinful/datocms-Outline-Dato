import React, { Component } from "react";
import { Accordion } from "semantic-ui-react";

import "../../styles/blocks/headline-accordion.css";

class HeadlineAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
      btn: this.props.content?.dropdownText
        ? this.props.content.dropdownText
        : "More"
    };
  }

  handleClick = (e, titleProps) => {
    const index = 0;
    const moreText = this.props.content?.dropdownText
      ? this.props.content.dropdownText
      : "More";
    const lessText = this.props.content?.dropdownLessText
      ? this.props.content.dropdownLessText
      : "Less";
    const { activeIndex, btn } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    const updatedBtnText = newIndex === -1 ? moreText : lessText;

    this.setState({
      activeIndex: newIndex,
      btn: updatedBtnText
    });
  };

  render() {
    const { activeIndex } = this.state;
    const { content } = this.props;

    return (
      <div className={`block accordion-block`}>
        <div className={`wrapper`} style={{ maxWidth: "1400px" }}>
          <Accordion>
            <Accordion.Title active={activeIndex === 0} index={0} className="">
              {content.headline}
              <span
                name="dropdown"
                onClick={this.handleClick}
                className="textlink"
              >
                <span>{this.state.btn}</span>
              </span>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <p className="">
                {content.extendedText}
                <span
                  name="dropdown"
                  className="styrene_light textlink"
                  onClick={this.handleClick}
                >
                  <span>{this.state.btn}</span>
                </span>
              </p>
            </Accordion.Content>
          </Accordion>
        </div>
      </div>
    );
  }
}

export default HeadlineAccordion;
