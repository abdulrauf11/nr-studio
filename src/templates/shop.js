import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import { graphql, Link } from "gatsby"
import sale from "../images/splash.svg"

const ShopPage = ({ data }) => {
  const shop = data.allMarkdownRemark.nodes.filter(
    p => p.frontmatter.status !== "SOLD"
  )

  return (
    <Layout>
      <SEO title="Shop" />
      <main>
        <h1 className="heading">shop</h1>

        <section className="grid">
          {shop.map((item, index) => (
            <div key={index} className="grid-item">
              {item.frontmatter.sale !== 0 && (
                <div className="sale-tag">
                  <img className="splash" src={sale} alt="Sale Tag" />
                  <span className="amount">{item.frontmatter.sale}%</span>
                </div>
              )}
              <Link to={item.fields.slug} className="link">
                <Image src={item.frontmatter.gallery[0]} alt="shop item" />
              </Link>
            </div>
          ))}
        </section>
      </main>
      <style global jsx>
        {`
          .heading {
            font-size: 3.5rem;
          }

          .grid {
            margin-top: 4rem;
            min-height: 100vh;
            display: grid;
            grid-gap: 5rem 5rem;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-auto-rows: 500px;
          }

          .grid-item {
            position: relative;
          }

          .sale-tag {
            z-index: 1;
            position: absolute;
            top: -5%;
            right: -5%;
            display: grid;
            grid-template-columns: 1;
            grid-template-rows: 1;
            align-items: center;
            justify-items: center;
          }

          .sale-tag .splash {
            grid-column: 1/-1;
            grid-row: 1/-1;
            width: 6rem;
          }

          .sale-tag .amount {
            grid-column: 1/-1;
            grid-row: 1/-1;
            color: var(--green);
          }

          .link {
            display: block;
            width: 100%;
            height: 100%;
          }

          @media only screen and (max-width: 500px) {
            .grid {
              grid-template-columns: 1fr;
              grid-auto-rows: 400px;
            }
            .sale-tag {
              top: -15%;
            }

            .sale-tag .splash {
              width: 5rem;
            }
          }

          @media only screen and (min-width: 2000px) {
            .grid {
              grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
              grid-auto-rows: 600px;
            }
          }
        `}
      </style>
    </Layout>
  )
}

export default ShopPage

export const queryShop = graphql`
  query($slug: String!) {
    allMarkdownRemark(filter: { fields: { slug: { regex: $slug } } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          gallery
          date
          status
          sale
        }
      }
    }
  }
`
