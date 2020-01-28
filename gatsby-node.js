const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

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
      }
    `).then(result => {
      result.data.allDatoCmsCaseStudy.edges.map(({ node: work }) => {
        createPage({
          path: `/case-studies/${work.slug}`,
          component: path.resolve(`./src/templates/case-study.jsx`),
          context: {
            slug: work.slug
          }
        });
      });
      resolve();
    });
  });
};
