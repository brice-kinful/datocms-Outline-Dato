const path = require(`path`);
const {
  createFilePath
} = require(`gatsby-source-filesystem`);

exports.createPages = ({
  graphql,
  actions
}) => {
  const {
    createPage
  } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsPage {
          edges {
            node {
              title
              slug
            }
          }
        }
        allDatoCmsCaseStudy {
          edges {
            node {
              slug
            }
          }
        }
        allDatoCmsJob {
          edges {
            node {
              title
              model {
                draftModeActive
              }
              jobSlug
            }
          }
        }      
      }
    `).then(result => {
      result.data.allDatoCmsCaseStudy.edges.map(({
        node: work
      }) => {
        createPage({
          path: `/work/${work.slug}`,
          component: path.resolve(`./src/templates/case-study.jsx`),
          context: {
            slug: work.slug
          }
        });
      });
      result.data.allDatoCmsJob.edges.map(({
        node: job
      }) => {
        createPage({
          path: `/jobs/${job.jobSlug}`,
          component: path.resolve(`./src/templates/job.jsx`),
          context: {
            slug: job.jobSlug
          }
        });
      });
      resolve();
    });
  });
};