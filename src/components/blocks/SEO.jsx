import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

const SEO = ({
  homePath,
  title,
  description,
  image,
  pathname,
  article,
  datePosted,
  validThrough
}) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
          defaultImage
        }
      }
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || "/"}`,
        type: pathname.includes("jobs") ? "JobPosting" : "WebSite"
      };

      const schemaOrgJSONLD = [
        pathname.includes("jobs")
          ? {
              "@context": "http://schema.org",
              "@type": "JobPosting",
              url: seo.url,
              title: title,
              description: description,
              datePosted: datePosted,
              validThrough: validThrough,
              employmentType: "Full-time",
              hiringOrganization: {
                "@type": "Organization",
                name: "Outline",
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
          : {
              "@context": "http://schema.org",
              "@type": "WebSite",
              url: seo.url,
              name: "Outline",
              description: seo.description
            }
      ];

      return (
        <>
          <Helmet
            title={seo.title}
            titleTemplate={homePath == "/" ? "" : titleTemplate}
          >
            <meta name="description" content={seo.description} />

            <script type="application/ld+json">
              {JSON.stringify(schemaOrgJSONLD)}
            </script>

            <meta name="image" content={seo.image} />
            {seo.url && <meta property="og:url" content={seo.url} />}
            {(article ? true : null) && (
              <meta property="og:type" content="article" />
            )}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && (
              <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}
            <meta name="twitter:card" content="summary_large_image" />
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
              <meta name="twitter:description" content={seo.description} />
            )}
            {seo.image && <meta name="twitter:image" content={seo.image} />}
          </Helmet>
        </>
      );
    }}
  />
);

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool
};

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false
};

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl
        defaultImage: image
      }
    }
  }
`;
