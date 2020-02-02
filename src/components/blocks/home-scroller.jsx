import React, { Component } from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import VizSensor from "react-visibility-sensor";
import Measure from "react-measure";
import "../../styles/blocks/scroller.css";

class HomeScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        width: 2000
      }
    };
  }

  handleWindowSizeChange = () => {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { projects } = this.props;
    const { imgViz } = this.state;
    const scrollerWidth = this.state.dimensions.width;
    const scrollerHeight = this.state.dimensions.height;

    return (
      <VizSensor
        onChange={isVisible => {
          this.setState({ imgViz: isVisible });
        }}
        offset={{ bottom: -300 }}
        scrollCheck={true}
      >
        <div id="scroller">
          {/* <div id="cursor"></div> */}
          <div className="wrapper skinny title-container">
            <img
              src="/case-studies.svg"
              alt=""
              className={imgViz && "visible"}
            />
          </div>

          <Measure
            bounds
            onResize={contentRect => {
              this.setState({ dimensions: contentRect.bounds });
            }}
          >
            {({ measureRef }) => {
              console.log(this.state.dimensions);
              return (
                <ul className={`flex`} style={{ width: scrollerWidth }}>
                  <span className={`flex`} ref={measureRef}>
                    {projects.map(project => {
                      return (
                        <li className={`slide`} key={project.slug}>
                          <AniLink to={`/project/${project.slug}`}>
                            <img src={project.thumbnail.url} />
                          </AniLink>
                          <AniLink
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
                          <AniLink to={`/project/${project.slug}`}>
                            <img src={project.thumbnail.url} />
                          </AniLink>
                          <AniLink
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
        </div>
      </VizSensor>
    );
  }
}

export default HomeScroller;
