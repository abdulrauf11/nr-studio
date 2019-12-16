import React, { useState } from "react"
import Artist from "../images/artist.jpg"
import { Spring, animated } from "react-spring"

function About() {
  const [flag, setFlag] = useState(false)
  const first =
    "M127.6,-119.7C165.6,-89.6,196.8,-44.8,197.6,0.8C198.4,46.4,168.9,92.9,130.9,136.2C92.9,179.5,46.4,219.8,7,212.8C-32.5,205.9,-65.1,151.7,-100.7,108.4C-136.4,65.1,-175.2,32.5,-190.7,-15.6C-206.3,-63.6,-198.6,-127.3,-162.9,-157.4C-127.3,-187.6,-63.6,-184.3,-9.4,-174.9C44.8,-165.5,89.6,-149.9,127.6,-119.7Z"
  const second =
    "M123.4,-114.2C165.2,-81.6,208.1,-40.8,208.8,0.7C209.5,42.2,168,84.4,126.2,127C84.4,169.7,42.2,212.9,-14,226.9C-70.2,240.9,-140.5,225.8,-178.3,183.1C-216.1,140.5,-221.6,70.2,-217.1,4.5C-212.6,-61.3,-198.2,-122.6,-160.4,-155.2C-122.6,-187.9,-61.3,-191.9,-10.3,-181.7C40.8,-171.4,81.6,-146.9,123.4,-114.2Z"

  function toggleFlag() {
    setFlag(!flag)
  }

  return (
    <>
      <section className="about">
        <div className="text">
          <h2 className="heading">hi!</h2>
          <p>
            My name is Nabiha Rauf, I am 24 years old and I am a self-taught
            painter. I am on a learning journey teaching myself painting
            techniques and ways of expression. I picked up on painting a few
            years back when I was looking for ways to deal with anxiety. I’m an
            introvert and always express myself through my paintings; my art is
            the reflection of my soul. My inspirations are very random. It could
            be anything, an image I might have seen, patterns on a piece of
            cloth, an emotion I felt while watching a movie or reading a line
            from a book. I have a vivid imagination and that has played a vital
            part in what I create. In my creations I try to portray a little
            part of the universe through my eyes. My main focus is to use my
            paintings to directly draw out the emotions and experiences of the
            viewer.
          </p>
        </div>
        <div className="image">
          <svg
            viewBox="0 0 450 450"
            onMouseEnter={toggleFlag}
            onMouseLeave={toggleFlag}
          >
            <defs>
              <pattern
                id="image"
                x="0"
                y="0"
                width="1"
                height="1"
                preserveAspectRatio="xMidYMid slice"
              >
                <image
                  x="-30"
                  y="0"
                  width="480"
                  height="480"
                  xlinkHref={Artist}
                />
              </pattern>
            </defs>

            <g transform="translate(230,200)">
              <Spring native to={{ d: flag ? first : second }}>
                {props => <animated.path {...props} fill="url(#image)" />}
              </Spring>
            </g>
          </svg>
        </div>
      </section>
      <style jsx>{`
        .about {
          margin: 10rem 0;
          display: flex;
        }

        .text {
          width: 60%;
          align-self: flex-end;
        }
        .heading {
          font-size: 4rem;
        }
        .text p {
          line-height: 1.9;
        }

        .image {
          width: 40%;
          margin-bottom: 15rem;
        }

        .image img {
          display: block;
        }

        @media only screen and (max-width: 600px) {
          .about {
            margin: 8rem 0;
            flex-direction: column;
          }

          .text {
            width: 100%;
            align-self: flex-start;
            order: 1;
          }

          .image {
            width: 100%;
            margin: 0;
          }
        }

        @media only screen and (min-width: 2500px) {
          .image {
            margin-bottom: 10rem;
          }
        }
      `}</style>
    </>
  )
}

export default About
