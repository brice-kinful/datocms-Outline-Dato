import React, { Component } from "react";
import AniLink from "../transitions/AniLink";
import VizSensor from "react-visibility-sensor";
import Measure from "react-measure";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/blocks/scroller.css";

class HomeScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgViz: false,
      dimensions: {
        height: 550,
        width: 2000
      }
    };
  }

  handleWindowSizeChange = () => {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { projects } = this.props;
    const { imgViz, dimensions } = this.state;
    const scrollerWidth = this.state.dimensions.width;

    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      centerMode: true,
      centerPadding: "25%",
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <VizSensor
        onChange={isVisible => {
          this.setState({ imgViz: isVisible });
        }}
        offset={{ bottom: -200 }}
        scrollCheck={true}
      >
        <div
          id="scroller"
          // style={{
          //   height: dimensions.bottom - dimensions.top + dimensions.height
          // }}
        >
          {/* <div id="cursor"></div> */}
          {/* <div className="wrapper skinny title-container"> */}
          <h1 className={`big title${imgViz ? " visible" : ""}`}>
            Case Studies
          </h1>
          {/* </div> */}

          <Measure
            bounds
            onResize={contentRect => {
              this.setState({ dimensions: contentRect.bounds });
              console.log(contentRect.bounds);
            }}
          >
            {({ measureRef }) => {
              // console.log(this.state.dimensions);
              return (
                <ul
                  className={`flex hide_768`}
                  style={{ width: scrollerWidth }}
                >
                  <span className={`flex`} ref={measureRef}>
                    {projects.map(project => {
                      return (
                        <li className={`slide`} key={project.slug}>
                          <AniLink
                            preventScrollJump
                            to={`/case-studies/${project.slug}`}
                          >
                            <img src={project.scrollerThumbnail?.url} alt="" />
                          </AniLink>
                          <AniLink
                            preventScrollJump
                            to={`/case-studies/${project.slug}`}
                            fade
                            className={`title line`}
                          >
                            {project.title}
                          </AniLink>
                        </li>
                      );
                    })}
                  </span>

                  <span className={`flex`}>
                    {projects.map(project => {
                      return (
                        <li className={`slide`} key={`${project.slug}-x2`}>
                          <AniLink
                            preventScrollJump
                            to={`/case-studies/${project.slug}`}
                          >
                            <img src={project.scrollerThumbnail?.url} alt="" />
                          </AniLink>
                          <AniLink
                            preventScrollJump
                            to={`/case-studies/${project.slug}`}
                            fade
                            className={`title line`}
                          >
                            {project.title}
                          </AniLink>
                        </li>
                      );
                    })}
                  </span>
                </ul>
              );
            }}
          </Measure>

          <Slider {...settings} className="show_768">
            {projects.map(project => {
              return (
                <div className={`slide`} key={`${project.slug}-mobile`}>
                  <img src={project.scrollerThumbnail?.url} alt="" />
                  <AniLink
                    preventScrollJump
                    to={`/case-studies/${project.slug}`}
                    fade
                    className={`title line`}
                  >
                    {project.title}
                  </AniLink>
                </div>
              );
            })}
          </Slider>
        </div>
      </VizSensor>
    );
  }
}

export default HomeScroller;
