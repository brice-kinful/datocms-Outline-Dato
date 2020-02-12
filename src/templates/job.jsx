import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import parse from "html-react-parser";

const Job = ({ data }) => {
  const job = data.datoCmsJob;
  const { siteName } = data.datoCmsSite.globalSeo;
  const { siteUrl } = data.site.siteMetadata;

  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "JobPosting",
      url: siteUrl,
      title: job.title,
      description: job.jobShortDescription,
      datePosted: job.jobDatePosted,
      validThrough: job.jobValidThrough,
      employmentType: "Full-time",
      hiringOrganization: {
        "@type": "Organization",
        name: siteName,
        sameAs: siteUrl,
        logo: `${siteUrl}/hiringOrganizationlogo.jpg`
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: "4412 Spruill Ave",
          addressLocality: ", North Charleston",
          addressRegion: "SC",
          postalCode: "29405",
          addressCountry: "US"
        }
      }
    }
  ];

  return (
    <Layout>
      <HelmetDatoCms seo={job.seoMetaTags}>
        <title>{`Jobs | ${job.title} | Charleston, SC`}</title>
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      </HelmetDatoCms>
      <div className="page" id="default">
        <div className="wrapper x_skinny content">
          <h1>{job.title}</h1>
          {parse(job.content)}
        </div>
      </div>
    </Layout>
  );
};

export default Job;

export const query = graphql`
  query JobQuery($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    datoCmsSite {
      globalSeo {
        siteName
      }
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    datoCmsJob(jobSlug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      jobSlug
      jobShortDescription
      address {
        latitude
        longitude
      }
      jobDatePosted
      jobValidThrough
      content
    }
  }
`;
