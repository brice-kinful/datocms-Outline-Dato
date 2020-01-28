import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
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
      grams: []
    };
  }

  componentDidMount() {
    axios
      .get(`https://www.instagram.com/shareoursuzylowcountry/?__a=1`)
      .then(res => {
        console.log(res);
        // const data = res.data.graphql.user.edge_owner_to_timeline_media.edges;
        // this.setState(prevState => ({
        //   grams: [...prevState.grams, data]
        // }));
      });
    const instagramRegExp = new RegExp(
      /<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
    );
    const fetchInstagramPhotos = async accountUrl => {
      const response = await axios.get(accountUrl);
      const json = JSON.parse(response.data.match(instagramRegExp)[1]);
      const edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(
        0,
        8
      );
      const photos = edges.map(({ node }) => {
        return {
          url: `https://www.instagram.com/p/${node.shortcode}/`,
          thumbnailUrl: node.thumbnail_src,
          displayUrl: node.display_url,
          caption: node.edge_media_to_caption.edges[0].node.text
        };
      });
      return photos;
    };
  }

  render() {
    const { data } = this.props;
    const headline = data.datoCmsHome.hero.filter(item => {
      return item.__typename === "DatoCmsHeadline";
    });
    const heroImages = data.datoCmsHome.hero.filter(item => {
      return item.__typename === "DatoCmsHeroImage";
    });
    return (
      <Layout>
        <div id="home">
          <Preloader images={heroImages[0]} />
          <div className="flex align-center justify-center" id="feature">
            <Headline content={headline[0]} />
          </div>
          <HomeScroller projects={data.datoCmsHome.scrollerCaseStudies} />
          <HomeCapabilities content={data.datoCmsHome.capabilities} />
          <Instagram />
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
              ...GatsbyDatoCmsFluid
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
        thumbnail {
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
    allDatoCmsCaseStudy(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
        }
      }
    }
  }
`;
