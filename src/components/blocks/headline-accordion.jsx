import React, { Component } from "react";
import { Accordion } from "semantic-ui-react";
import Measure from "react-measure";

import "../../styles/blocks/headline-accordion.css";

class HeadlineAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleHeight: 250,
      accordionHeight: 1500,
      activeIndex: -1,
      btn: this.props.content?.dropdownText
        ? this.props.content.dropdownText
        : "More"
    };
  }

  refGetHeight = el => {
    if (el) {
      console.log(el.getBoundingClientRect().height);
      this.setState({
        titleHeight: el.getBoundingClientRect().height
      });
    }
  };

  handleClick = (e, titleProps) => {
    const index = 0;
    const moreText = this.props.content?.dropdownText
      ? this.props.content.dropdownText
      : "More";
    const lessText = this.props.content?.dropdownLessText
      ? this.props.content.dropdownLessText
      : "Less";
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    const updatedBtnText = newIndex === -1 ? moreText : lessText;

    this.setState({
      activeIndex: newIndex,
      btn: updatedBtnText
    });
  };

  render() {
    const { activeIndex, titleHeight, accordionHeight } = this.state;
    const { content } = this.props;

    return (
      <div className={`block accordion-block`}>
        <Measure
          bounds
          onResize={contentRect => {
            this.setState({
              accordionHeight: contentRect.bounds.height
            });
          }}
        >
          {({ measureRef }) => {
            return (
              <div
                className={`wrapper skinny`}
                style={{
                  height: activeIndex === -1 ? titleHeight : accordionHeight
                }}
              >
                <Accordion>
                  <div ref={measureRef}>
                    <Accordion.Title
                      active={activeIndex === 0}
                      index={0}
                      className=""
                    >
                      <span
                        className="saol_standard"
                        ref={this.refGetHeight}
                        style={{ marginRight: "15px" }}
                      >
                        {content.headline}
                      </span>
                      <span
                        name="dropdown"
                        onClick={this.handleClick}
                        className="textlink"
                      >
                        <span className="uppercase">{this.state.btn}</span>
                      </span>
                      <Accordion.Content active={activeIndex === 0}>
                        <span className="">
                          <span className="saol_standard">
                            {content.extendedText}
                          </span>
                          <span
                            name="dropdown"
                            className="styrene_light textlink"
                            onClick={this.handleClick}
                          >
                            <span className="uppercase">{this.state.btn}</span>
                          </span>
                        </span>
                      </Accordion.Content>
                    </Accordion.Title>
                  </div>
                </Accordion>
              </div>
            );
          }}
        </Measure>
      </div>
    );
  }
}

export default HeadlineAccordion;
