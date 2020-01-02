import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { useSpring, animated } from "react-spring"
import range from "lodash-es/range"
import Img from "gatsby-image/withIEPolyfill"

const interp = i => r =>
  `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`

function WorkSection() {
  const data = useStaticQuery(graphql`
    query WorkQuery {
      allContentfulWorkItem {
        edges {
          node {
            title
            slug
            thumbnail {
              fluid(maxWidth: 800) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  `)
  const allPortfolios = data.allContentfulWorkItem.edges
  const items = range(allPortfolios.length)
  const { radians } = useSpring({
    from: { radians: 0 },
    to: async next => {
      while (1) {
        await next({ radians: 2 * Math.PI })
        await next({ radians: 0 })
      }
    },
    config: { duration: 6000 },
    reset: true,
  })

  return (
    <>
      <section className="work">
        <h2 className="heading">Work</h2>

        <div className="grid">
          {items.map(i => (
            <animated.div
              key={i}
              style={{ transform: radians.interpolate(interp(i)) }}
            >
              <div className="grid-item">
                <Link
                  to={allPortfolios[i].node.slug}
                  style={{ display: "block", width: "100%", height: "100%" }}
                >
                  <Img
                    fluid={allPortfolios[i].node.thumbnail.fluid}
                    alt="Portfolio Paintings"
                  />
                </Link>
                <div className="title">{allPortfolios[i].node.title}</div>
              </div>
            </animated.div>
          ))}
        </div>
      </section>

      <style jsx>
        {`
          .work {
            margin: 10rem 0 15rem 0;
          }
          .heading {
            text-align: center;
            font-size: 4rem;
          }

          .grid {
            margin: 5rem 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 5rem;
            grid-row-gap: 5rem;
          }

          .grid-item {
            width: 100%;
            height: 35vmax;
            will-change: transform;
          }

          .title {
            font-weight: 700;
            font-size: 1.5rem;
            margin: 2rem 0;
          }

          @media only screen and (max-width: 600px) {
            .work {
              margin: 8rem 0 10rem 0;
            }
            .grid {
              grid-template-columns: 1fr;
              grid-row-gap: 8rem;
            }

            .grid-item {
              height: 50vh;
            }

            .title {
              margin: 0.5rem 0;
            }
          }
        `}
      </style>
    </>
  )
}

export default WorkSection
