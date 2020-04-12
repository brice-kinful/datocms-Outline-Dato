import React, { Component } from "react";
import { graphql } from "gatsby";
import AniLink from "../components/transitions/AniLink";
import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from "../components/blocks/SEO";
import parse from "html-react-parser";

import { isSafari } from "react-device-detect";

import "../styles/studio.css";

class StudioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeadlineVisible: false,
      seconds: 0,
      prevScrollpos: ""
    };
  }

  // scroll
  handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    this.setState({
      prevScrollpos: currentScrollPos,
      isHeadlineVisible: true
    });
    if (currentScrollPos > 25) {
      this.setState({
        isHeadlineVisible: false
      });
      clearInterval(this.interval);
      this.interval = setInterval(() => this.tick(), 1000);
      this.setState(state => ({
        seconds: 0
      }));
    } else {
      this.setState({
        isHeadlineVisible: true
      });
    }
  };

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
    if (this.state.seconds > 15) {
      this.setState({
        isHeadlineVisible: true
      });
    }
  }

  handleMouseMove = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.tick(), 1000);
    this.setState(state => ({
      seconds: 0
    }));
  };

  componentDidMount() {
    // console.log(this.props.data);
    setTimeout(() => {
      this.setState({
        isHeadlineVisible: true
      });
    }, 1250);
    this.setState({ prevScrollpos: window.pageYOffset });
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("mousemove", this.handleMouseMove);
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("mousemove", this.handleMouseMove);
    clearInterval(this.interval);
  }

  render() {
    const studio = this.props.data.datoCmsStudioPage;
    const hero = this.props.data.datoCmsStudioPage.aboutHero[0];
    const capabilities = this.props.data.datoCmsStudioPage.aboutCapabilities[0];
    const team = this.props.data.datoCmsStudioPage.team;
    const { isHeadlineVisible } = this.state;

    return (
      <div className="outer">
        <h1
          className={`big centertext saol_standard ${
            isHeadlineVisible ? "visible" : ""
          }`}
        >
          Studio
        </h1>
        <Layout>
          <SEO title={`${studio.title}`} />

          <div className="page" id="studio">
            <div className="hero wrapper skinny" style={{ zIndex: 99 }}>
              <Img fluid={hero.heroImage.fluid} />
              {/* <img src={hero.heroImage.url} alt="" srcset="" /> */}
              <div className="flex">
                <div className="one-fourth title uppercase">{hero.title}</div>
                <div className="three-fourths">
                  <div className="large saol_standard">
                    {parse(hero.headline)}
                  </div>
                  {parse(hero.copy)}
                </div>
              </div>
            </div>
            <div className="capabilities flex wrapper skinny">
              <div className="image">
                <Img fluid={capabilities.image.fluid} />
              </div>
              <div className="text">
                <p className="uppercase">{capabilities.title}</p>
                {parse(capabilities.list)}
              </div>
            </div>
            <div className="team flex grid five wrapper">
              {team.map((member, index) => {
                return (
                  <div className="member grid-item one-fifth" key={index}>
                    <Img fluid={member.headshot.fluid} />
                    <p>{member.name}</p>
                    <p>{member.jobTitle}</p>
                  </div>
                );
              })}
            </div>
            <div className="cta wrapper skinny flex">
              <p>
                <span className="saol_standard">
                  {this.props.data.datoCmsStudioPage.aboutCtaHeadline}
                </span>
                <span className="textlink">
                  <AniLink
                    to={`/${this.props.data.datoCmsStudioPage.aboutCtaButtonUrl.slug}`}
                    fade
                    preventScrollJump
                    className="uppercase"
                  >
                    {this.props.data.datoCmsStudioPage.aboutCtaButtonText}
                  </AniLink>
                </span>
              </p>
            </div>
          </div>
        </Layout>
      </div>
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
          url
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
