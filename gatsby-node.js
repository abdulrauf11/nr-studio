const path = require(`path`)
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      shop: allContentfulShopItem {
        edges {
          node {
            slug
          }
        }
      }
      work: allContentfulWorkItem {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    createPage({
      path: `/shop/`,
      component: require.resolve("./src/templates/shop.js"),
      context: {
        slug: `/shop/`,
      },
    })
    result.data.shop.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/product.js`),
        context: {
          slug: node.slug,
        },
      })
    })
    result.data.work.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/portfolio.js`),
        context: {
          slug: node.slug,
        },
      })
    })
  })
}
