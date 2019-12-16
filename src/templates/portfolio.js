import React from "react"
import { graphql, Link } from "gatsby"
import Gallery from "../components/gallery"

function Portfolio({ data }) {
  const portfolio = data.markdownRemark.frontmatter
  return (
    <>
      <header className="header">
        <div className="shop-button">
          <Link to="/shop/">shop</Link>
        </div>
        <Link to="/">
          <div className="cross">
            <span className="bar" />
            <span className="bar" />
          </div>
        </Link>
      </header>

      <section className="portfolio">
        <div className="text">
          <h1 className="title">{portfolio.title}</h1>
          <p className="description">{portfolio.description}</p>
        </div>
        <div className="series-wrapper">
          {/* {portfolio.series.map((s, s_index) => (
          <div className="series" key={s_index}>
            <div className="series-text">
              <h2 className="title">{s.title}</h2>
              <p className="description">{s.description}</p>
            </div>
            <Gallery gallery={s.gallery} />
          </div>
        ))} */}
          {portfolio.series && (
            <div className="series">
              <Gallery gallery={portfolio.series[0].gallery} />
            </div>
          )}
        </div>
      </section>
      <style global jsx>
        {`
          .header {
            position: relative;
            width: 85%;
            margin: 0 auto;
            height: 20vh;
            align-items: center;
            display: flex;
            font-size: 0.9rem;
          }

          .header.absolute {
            z-index: 1000;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            position: absolute;
          }

          .shop-button a {
            padding: 0.5rem 2.5rem;
            border: 1px solid var(--green);
          }

          .portfolio {
            position: relative;
          }

          .cross {
            cursor: pointer;
            position: fixed;
            right: 7.5%;
            transform: translateY(-50%);
            transition: all 0.5s ease-out;
          }
          .cross:hover {
            transform: translateY(-50%) rotate(90deg);
          }
          .bar {
            display: block;
            height: 3px;
            width: 30px;
            border-radius: 100px;
            background: var(--green);
            margin: 6px 0;
          }
          .cross .bar:nth-child(1) {
            transform: translateY(4.5px) rotate(45deg);
          }
          .cross .bar:nth-child(2) {
            transform: translateY(-4.5px) rotate(-45deg);
          }

          .text {
            width: 70%;
            margin: 2rem auto 0 auto;
          }
          .title {
            font-size: 3rem;
          }
          .description {
            margin: 1rem 0;
            width: 70%;
          }

          .series-wrapper {
            height: 100vh;
            position: relative;
          }

          @media only screen and (max-width: 600px) {
            .series-wrapper {
              height: 80vh;
            }
            .text {
              margin: 0rem auto 0 auto;
              width: 85%;
            }
            .description {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

export default Portfolio

export const queryPortfolio = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        series {
          title
          description
          gallery
        }
      }
    }
  }
`
