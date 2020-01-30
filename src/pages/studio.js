import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import Img from "gatsby-image";
import Layout from "../components/layout";
import parse from "html-react-parser";

import "../styles/studio.css";

class StudioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeadlineVisible: true,
      isMouseIdle: false,
      prevScrollpos: ""
    };
  }

  // scroll
  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    let mouseScrollTimeout;
    this.setState({
      prevScrollpos: currentScrollPos,
      isHeadlineVisible: true
    });

    if (currentScrollPos > 25) {
      this.setState({
        isHeadlineVisible: false
      });
    } else {
      this.setState({
        isHeadlineVisible: true
      });
    }
  };

  mouseStopped = () => {
    console.log("mouse has stopped moving");
    this.setState({ isMouseIdle: true });
  };

  handleMouseMove = () => {
    const { prevScrollpos, isMouseIdle } = this.state;
    const currentScrollPos = window.pageYOffset;
    let mouseMoveTimeout;
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(this.mouseStopped, 1000);

    console.log("mouse is moving");
    this.setState({ isMouseIdle: false });

    //screensaver
    if (currentScrollPos > 60) {
      //   clearTimeout(mouseMoveTimeout2);

      if (!isMouseIdle) {
        this.setState({ isHeadlineVisible: false });
        // mouseMoveTimeout2 = setTimeout(() => {
        //   this.setState({ isHeadlineVisible: true });
        // }, 15000);
      } else {
        this.setState({ isHeadlineVisible: true });
      }
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    // window.addEventListener("mousemove", this.handleMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    // window.removeEventListener("mousemove", this.handleMouseMove);
  }
  render() {
    const hero = this.props.data.datoCmsStudioPage.aboutHero[0];
    const capabilities = this.props.data.datoCmsStudioPage.aboutCapabilities[0];
    const team = this.props.data.datoCmsStudioPage.team;
    const { isHeadlineVisible } = this.state;

    return (
      <Layout>
        <div className="page" id="studio">
          <div className="hero wrapper skinny">
            <h1
              className={`big centertext ${isHeadlineVisible ? "visible" : ""}`}
            >
              Studio
            </h1>
            <Img fluid={hero.heroImage.fluid} />
            <div className="flex">
              <div className="one-fourth title">{hero.title}</div>
              <div className="three-fourths">
                <div className="large">{parse(hero.headline)}</div>
                {parse(hero.copy)}
              </div>
            </div>
          </div>
          <div className="capabilities flex wrapper skinny">
            <div className="image">
              <Img fluid={capabilities.image.fluid} />
            </div>
            <div className="text">
              <p>{capabilities.title}</p>
              {parse(capabilities.list)}
            </div>
          </div>
          <div className="team flex grid five wrapper">
            {team.map(member => {
              return (
                <div className="member grid-item one-fifth">
                  <Img fluid={member.headshot.fluid} />
                  <p>{member.name}</p>
                  <p>{member.jobTitle}</p>
                </div>
              );
            })}
          </div>
          <div className="cta wrapper skinny">
            {parse(this.props.data.datoCmsStudioPage.aboutCtaHeadline)}
          </div>
        </div>
      </Layout>
    );
  }
}

export default StudioPage;

export const query = graphql`
  query {
    datoCmsStudioPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      aboutHero {
        heroImage {
          fluid(maxWidth: 1920, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsFluid
          }
        }
        title
        headline
        copy
      }
      aboutCapabilities {
        image {
          fluid(maxWidth: 750, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsFluid
          }
        }
        title
        list
      }
      team {
        name
        headshot {
          fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsFluid
          }
        }
        jobTitle
      }
      teamMembersPerRow
      aboutCtaHeadline
      aboutCtaButtonText
      aboutCtaButtonUrl {
        ... on DatoCmsJobsPage {
          slug
        }
        ... on DatoCmsPreProjectInterview {
          slug
        }
        ... on DatoCmsCaseStudiesPage {
          slug
        }
        ... on DatoCmsContactPage {
          slug
        }
        ... on DatoCmsWorkPage {
          slug
        }
        ... on DatoCmsStudioPage {
          slug
        }
      }
    }
  }
`;
