import React, { Component } from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
// import { SizeMe } from "react-sizeme";
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
    const scrollerWidth = this.state.dimensions.width;

    return (
      <div id="scroller">
        <h1 className="centertext">Case Studies</h1>

        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ dimensions: contentRect.bounds });
          }}
        >
          {({ measureRef }) => {
            // console.log(this.state.dimensions);
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
                          className={`title`}
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
                          className={`title`}
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
    );
  }
}

export default HomeScroller;
