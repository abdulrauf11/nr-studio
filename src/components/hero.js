import React from "react"
import Img from "gatsby-image/withIEPolyfill"
import { useSpring, animated as a } from "react-spring"

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]

const interpBg = (x, y) =>
  `perspective(1000px) rotateY(${x / 60}deg) rotateX(${-y /
    60}deg) translate3d(${x / 10}px,${y / 10}px,0)`

const interpFreq = (x, y) => {
  let xVal = Math.abs(x) / 90000 + 0.01
  let yVal = Math.abs(y) / 90000 + 0.01
  return `${xVal}, ${yVal}`
}

function Hero({ data }) {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    freq: "0.01, 0.01",
    config: { mass: 30, tension: 280, friction: 150 },
  }))

  const AnimFeTurbulence = a("feTurbulence")
  const AnimFeDisplacementMap = a("feDisplacementMap")

  return (
    <section
      className="hero"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
    >
      <div className="wrapper">
        <a.div
          className="container"
          style={{
            transform: props.xy.interpolate(interpBg),
            height: "100%",
          }}
        >
          <div className="row">
            <div className="image">
              <Img fluid={data.imageOne.childImageSharp.fluid} />
            </div>
            <div className="image">
              <Img fluid={data.imageTwo.childImageSharp.fluid} />
            </div>
            <div className="image">
              <Img fluid={data.imageThree.childImageSharp.fluid} />
            </div>
          </div>
          <a.svg viewBox="0 0 0 0" width="0" height="0">
            <defs>
              <filter id="water">
                <AnimFeTurbulence
                  type="fractalNoise"
                  baseFrequency={props.xy.interpolate(interpFreq)}
                  numOctaves="2"
                  result="TURB"
                  seed="8"
                />
                <AnimFeDisplacementMap
                  xChannelSelector="R"
                  yChannelSelector="B"
                  in="SourceGraphic"
                  in2="TURB"
                  result="DISP"
                  scale={10}
                />
              </filter>
            </defs>
          </a.svg>
        </a.div>
      </div>
      <style jsx>{`
        .hero {
          width: 100vw;
          height: 80vh;
        }

        .wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .row {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .image {
          margin: 0 0.5rem;
          width: 25vmax;
          height: 35vmax;
          filter: url("#water");
          clip-path: polygon(1% 1%, 99% 1%, 99% 99%, 1% 99%);
        }

        .image:nth-child(2) {
          width: 30vmax;
          height: 40vmax;
        }

        @media only screen and (max-width: 600px) {
          .hero {
            height: 70vh;
          }

          .wrapper {
            margin: 0;
          }

          .row {
            display: block;
          }

          .image:nth-child(1) {
            display: none;
          }

          .image:nth-child(3) {
            display: none;
          }

          .image:nth-child(2) {
            margin: 0;
            width: 100vw;
            height: 100%;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
