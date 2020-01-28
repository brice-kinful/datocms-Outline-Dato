import React, { Component } from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { SizeMe } from "react-sizeme";
import Draggable from "react-draggable";
import sample from "lodash/sample";
import Img from "gatsby-image";

import "../../styles/blocks/scroller.css";

class HomeScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "",
      projectWidth: "",
      hovers: ["sink", "float", "rotate"]
    };
    this.elementRef = React.createRef();
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    const bcr = this.elementRef.current.getBoundingClientRect();
    this.setState({
      projectWidth: bcr.width * 0.75,
      width: window.innerWidth
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  render() {
    const { projects } = this.props;

    const { width } = this.state;
    const isMobile = width <= 768;

    return (
      <div id="scroller">
        <h1 className="centertext">Case Studies</h1>
        <div className={`styrene_regular`}>
          <ul className={`flex`}>
            {isMobile ? (
              <span className={`flex`} ref={this.elementRef}>
                {projects.map(project => {
                  return (
                    <li
                      className={`slide ${sample(this.state.hovers)}`}
                      key={project.slug}
                    >
                      <img src={project.thumbnail.url} />
                      {/* <Img fluid={project.thumbnail.fluid} /> */}
                      <AniLink
                        fade
                        to={`/case-studies/${project.slug}`}
                        className={`title`}
                      >
                        <span>{project.title}</span>
                      </AniLink>
                    </li>
                  );
                })}
              </span>
            ) : (
              <Draggable
                axis="x"
                bounds={{ left: -(this.state.projectWidth - 455), right: 100 }}
                scale={0.55}
              >
                <span className={`flex`} ref={this.elementRef}>
                  {projects.map(project => {
                    // console.log(project);
                    return (
                      <li
                        className={`slide ${sample(this.state.hovers)}`}
                        key={project.slug}
                      >
                        <img src={project.thumbnail.url} />
                        {/* <Img fluid={project.thumbnail.fluid} /> */}
                        <AniLink
                          fade
                          to={`/case-studies/${project.slug}`}
                          className={`title`}
                        >
                          <span>{project.title}</span>
                        </AniLink>
                      </li>
                    );
                  })}
                </span>
              </Draggable>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default HomeScroller;
