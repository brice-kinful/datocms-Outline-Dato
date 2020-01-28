import React from "react";
import { Link, graphql } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import Img from "gatsby-image";
import Layout from "../components/layout";
import parse from "html-react-parser";

import "../styles/studio.css";

const StudioPage = ({ data }) => {
  const hero = data.datoCmsStudioPage.aboutHero[0];
  const capabilities = data.datoCmsStudioPage.aboutCapabilities[0];
  const team = data.datoCmsStudioPage.team;
  console.log(team);
  return (
    <Layout>
      <div id="studio">
        <div className="hero wrapper skinny">
          <h1 className="big centertext">Studio</h1>
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
          <div className="one-half">
            <Img fluid={capabilities.image.fluid} />
          </div>
          <div className="text one-half">
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
          {parse(data.datoCmsStudioPage.aboutCtaHeadline)}
        </div>
      </div>
    </Layout>
  );
};

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
