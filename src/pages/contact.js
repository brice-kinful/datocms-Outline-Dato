import React, { Component } from "react";
import SEO from "../components/blocks/SEO";
import { graphql } from "gatsby";
import AniLink from "../components/transitions/AniLink";
import Img from "gatsby-image";
import Layout from "../components/layout";
import parse from "html-react-parser";

import "../styles/contact.css";

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeadlineVisible: true,
      seconds: 0,
      prevScrollpos: "",
    };
  }

  // scroll
  handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    this.setState({
      prevScrollpos: currentScrollPos,
      isHeadlineVisible: true,
    });
    if (currentScrollPos > 25) {
      this.setState({
        isHeadlineVisible: false,
      });
      clearInterval(this.interval);
      this.interval = setInterval(() => this.tick(), 1000);
      this.setState((state) => ({
        seconds: 0,
      }));
    } else {
      this.setState({
        isHeadlineVisible: true,
      });
    }
  };

  tick() {
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }));
    if (this.state.seconds > 15) {
      this.setState({
        isHeadlineVisible: true,
      });
    }
  }

  handleMouseMove = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.tick(), 1000);
    this.setState((state) => ({
      seconds: 0,
    }));
  };

  componentDidMount() {
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
    const contact = this.props.data.datoCmsContactPage;
    const { isHeadlineVisible } = this.state;
    return (
      <Layout>
        <SEO title={`${contact.title}`} />
        <div className="page" id="contact">
          <div className="main flex wrapper skinny">
            <div className="three-fourths text">
              <div className="inner flex">
                <p>
                  <span className="saol_standard">{contact.headline}</span>
                  <span className="textlink">
                    <AniLink
                      preventScrollJump
                      to={`/${contact.ctaButtonUrl.slug}`}
                      fade
                      className="uppercase"
                    >
                      {contact.ctaButtonText}
                    </AniLink>
                  </span>
                </p>
              </div>
              <div className="flex bottom inner space-between">
                <div className="one-half">
                  {contact.viewJobsButtonUrl && contact.viewJobsButtonText && (
                    <AniLink
                      preventScrollJump
                      to={`/${contact.viewJobsButtonUrl.slug}`}
                      fade
                      className="line hide_768"
                      style={{ position: "relative" }}
                    >
                      {contact.viewJobsButtonText}
                    </AniLink>
                  )}
                  {parse(contact.leftBlockText)}
                </div>
                <div className="one-half flex align-end">
                  {parse(contact.rightBlockText)}
                </div>
                {contact.viewJobsButtonUrl && contact.viewJobsButtonText && (
                  <div className="textlink show_768">
                    <AniLink
                      preventScrollJump
                      to={`/${contact.viewJobsButtonUrl.slug}`}
                      fade
                      className=" "
                      style={{ position: "relative" }}
                    >
                      {contact.viewJobsButtonText}
                    </AniLink>
                  </div>
                )}
              </div>
            </div>
            <div className="one-fourth">
              <Img fluid={contact.image.fluid} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ContactPage;

export const query = graphql`
  query {
    datoCmsContactPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      headline
      ctaButtonText
      ctaButtonUrl {
        ... on DatoCmsJobsPage {
          slug
        }
        ... on DatoCmsPreProjectInterview {
          slug
        }
        ... on DatoCmsCaseStudiesPage {
          slug
        }
        ... on DatoCmsWorkPage {
          slug
        }
        ... on DatoCmsStudioPage {
          slug
        }
      }
      image {
        fluid(maxHeight: 750, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsFluid
        }
      }
      leftBlockText
      rightBlockText
      viewJobsButtonText
      viewJobsButtonUrl {
        ... on DatoCmsJobsPage {
          slug
        }
      }
    }
  }
`;
