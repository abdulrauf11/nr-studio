/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      shop: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/shop/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      work: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/work/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    // SHOP
    createPage({
      path: `/shop/`,
      component: require.resolve("./src/templates/shop.js"),
      context: {
        slug: `/shop/`,
      },
    })
    result.data.shop.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/product.js`),
        context: {
          slug: node.fields.slug,
        },
      })
    })

    // PORTFOLIO
    // createPage({
    //   path: `/portfolio/`,
    //   component: require.resolve("./src/templates/shop.js"),
    //   context: {
    //     slug: `/portfolio/`,
    //   },
    // })
    result.data.work.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/portfolio.js`),
        context: {
          slug: node.fields.slug,
        },
      })
    })
  })
}
