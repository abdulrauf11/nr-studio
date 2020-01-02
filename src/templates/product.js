import React, { useState } from "react"
import SEO from "../components/seo"
import Img from "gatsby-image/withIEPolyfill"
import FormOrder from "../components/formOrder"
import { graphql, Link } from "gatsby"
import { useTransition, animated, config } from "react-spring"

const ProductPage = ({ data }) => {
  const product = data.contentfulShopItem

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [index, setIndex] = useState(0)
  const transitions = useTransition(index, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  })

  const transitionsForm = useTransition(isFormOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function toggleFormOpen() {
    setIsFormOpen(!isFormOpen)
  }

  return (
    <>
      <SEO title="Shop" />
      <main className="main-shop">
        <Link to="/shop">
          <div className="cross">
            <span className="bar" />
            <span className="bar" />
          </div>
        </Link>
        <div className="wrapper">
          <div
            className="variants"
            onClick={() =>
              setIndex(state => (state + 1) % product.gallery.length)
            }
          >
            {transitions.map(({ item, key, props }) =>
              item === 0 ? (
                <animated.div
                  key={key}
                  className="image-container"
                  style={props}
                >
                  <Img fluid={product.gallery[0].fluid} alt="Painting" />
                </animated.div>
              ) : (
                <animated.div
                  key={key}
                  className="image-container"
                  style={props}
                >
                  <Img fluid={product.gallery[1].fluid} alt="Painting" />
                </animated.div>
              )
            )}
          </div>
          <div className="description">
            <div className="card">
              <div className="title">
                <h3>{product.name}</h3>
              </div>
              <div className="text">
                <p>{product.description.description}</p>
              </div>

              <div className="info">
                <h4>About the painting</h4>
                <div className="attr-box">
                  <div className="ques">
                    <div>Width</div>
                    <div>Height</div>
                    <div>Price</div>
                  </div>
                  <div className="ans">
                    <div>{product.width} cm</div>
                    <div>{product.height} cm</div>
                    <div>
                      <span
                        className="original-price"
                        style={{
                          textDecoration: product.sale
                            ? "line-through"
                            : "none",
                        }}
                      >
                        Rs. {product.price}
                      </span>
                      {product.sale !== null && (
                        <span className="sale-price">
                          Rs.{" "}
                          {product.price - product.price * (product.sale / 100)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button className="buy-button" onClick={toggleFormOpen}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </main>

      {transitionsForm.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              <FormOrder
                order={{
                  title: product.name,
                  price: product.sale
                    ? product.price - product.price * (product.sale / 100)
                    : product.price,
                  thumbnail: product.gallery[0],
                }}
                toggleFormOpen={toggleFormOpen}
              />
            </animated.div>
          )
      )}
      <style global jsx>
        {`
          .main-shop {
            margin: 0;
            width: 100%;
            position: relative;
          }

          .cross {
            cursor: pointer;
            position: fixed;
            top: 10vh;
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

          .wrapper {
            display: flex;
          }

          .variants {
            position: relative;
            flex: 1;
            height: 100vh;
            cursor: ${!index ? "zoom-in" : "zoom-out"};
          }

          .image-container {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }

          .filter-overlay {
            width: 100%;
            height: 100%;
          }

          .description {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .card {
            width: 50%;
            font-size: 0.9rem;
          }

          .title {
            margin: 1rem 0;
            font-size: 1.2rem;
          }

          .info {
            margin: 2rem 0 3rem 0;
          }

          .info h4 {
            font-size: 0.9rem;
            margin: 0.5rem 0;
          }

          .attr-box {
            display: flex;
          }
          .ques {
            color: var(--grey);
          }
          .ans {
            margin-left: 1rem;
          }

          .sale-price {
            margin-left: 1rem;
            color: var(--green);
            font-weight: 700;
          }

          .buy-button {
            width: 100%;
            background-color: #434654;
            color: var(--white);
            padding: 1rem 0;
            border: 0;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.6s ease;
          }

          .buy-button:hover {
            background-color: var(--black);
          }

          @media only screen and (max-width: 600px) {
            .wrapper {
              display: block;
            }

            .cross {
              top: 4vh;
              right: 4vw;
            }

            .variants {
              height: 55vh;
            }

            .card {
              margin: 2rem 0 8rem 0;
              width: 85%;
            }
          }
        `}
      </style>
    </>
  )
}

export default ProductPage

export const queryProduct = graphql`
  query($slug: String!) {
    contentfulShopItem(slug: { eq: $slug }) {
      name
      description {
        description
      }
      price
      width
      height
      sale
      gallery {
        fluid(maxWidth: 1920) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
