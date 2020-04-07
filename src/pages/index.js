import React, { Component } from "react";
import { graphql } from "gatsby";
import axios from "axios";
import Layout from "../components/layout";
import Preloader from "../components/blocks/preloader";
import Headline from "../components/blocks/headline";
import HomeScroller from "../components/blocks/home-scroller";
import HomeCapabilities from "../components/blocks/home-capabilities";
import Instagram from "../components/blocks/instagram";

import "../styles/home.css";
import "../styles/blocks/home-feature.css";

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grams: [],
    };
  }

  componentDidMount() {
    const insta = this.props.data.allDatoCmsSocialProfile.edges.filter(
      ({ node }) => {
        return node.profileType === "Instagram";
      }
    );
    const handle = insta[0].node.handle;
    const instagramRegExp = new RegExp(
      /<script type="text\/javascript">window\._sharedData = (.*);<\/script>/
    );

    const fetchInstagramPhotos = async (accountUrl) => {
      const response = await axios.get(accountUrl);
      const json = JSON.parse(response.data.match(instagramRegExp)[1]);
      const edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(
        0,
        5
      );
      this.setState((prevState) => ({
        grams: [...prevState.grams, edges],
      }));
    };
    fetchInstagramPhotos(`https://www.instagram.com/${handle}/`);
  }

  render() {
    const { data } = this.props;
    // const email = data.allDatoCmsSocialProfile.edges.filter(({ node }) => {
    //   return node.profileType === "Email";
    // });
    const insta = data.allDatoCmsSocialProfile.edges.filter(({ node }) => {
      return node.profileType === "Instagram";
    });
    const headline = data.datoCmsHome.hero.filter((item) => {
      return item.__typename === "DatoCmsHeadline";
    });
    const heroImages = data.datoCmsHome.hero.filter((item) => {
      return item.__typename === "DatoCmsHeroImage";
    });
    return (
      <Layout>
        <Preloader images={heroImages[0]} />
        <div id="home" className="page">
          <div className="flex align-center" id="feature">
            <Headline content={headline[0]} />
          </div>
          <HomeScroller projects={data.datoCmsHome.scrollerCaseStudies} />
          <HomeCapabilities content={data.datoCmsHome.capabilities} />
          <Instagram
            grams={this.state.grams[0]}
            handle={insta[0].node.handle}
          />
        </div>
      </Layout>
    );
  }
}

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    datoCmsHome {
      hero {
        ... on DatoCmsHeroImage {
          images {
            fluid(
              maxWidth: 2400
              imgixParams: { fm: "jpg", auto: "compress" }
            ) {
              ...GatsbyDatoCmsFluid_noBase64
            }
          }
        }
        ... on DatoCmsHeadline {
          text
          buttonText
          buttonUrl {
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
      scrollerCaseStudies {
        title
        slug
        scrollerThumbnail {
          fluid(maxWidth: 495, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsFluid
          }
          url
        }
      }
      capabilities {
        ... on DatoCmsImage {
          image {
            fluid(
              maxWidth: 1280
              imgixParams: { fm: "jpg", auto: "compress" }
            ) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
        ... on DatoCmsContent {
          title
          list
        }
      }
    }
    allDatoCmsCaseStudy {
      edges {
        node {
          id
          title
          slug
          excerpt
        }
      }
    }
    allDatoCmsSocialProfile {
      edges {
        node {
          profileType
          handle
        }
      }
    }
  }
`;
