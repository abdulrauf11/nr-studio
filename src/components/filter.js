import React from "react"
import { useSpring, animated } from "react-spring"
import Painting1 from "../images/gallery/p1.jpg"

const AnimFeTurbulence = animated("feTurbulence")
const AnimFeDisplacementMap = animated("feDisplacementMap")

const Filter = () => {
  const { freq, scale } = useSpring({
    from: { scale: 10, freq: "0.010, 0.010" },
    to: async next => {
      while (1) {
        await next({ scale: 15, freq: "0.015, 0.015" })
        await next({ scale: 10, freq: "0.010, 0.010" })
      }
    },
    config: { duration: 6000 },
  })

  return (
    <section className="carousel">
      <div className="filter-overlay">
        <animated.svg
          viewBox="0 0 1278 446"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="paint">
              <AnimFeTurbulence
                type="turbulence"
                baseFrequency={freq}
                numOctaves={2}
                result="TURB"
                seed="8"
              />
              <AnimFeDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                in="SourceGraphic"
                in2="TURB"
                result="DISP"
                scale={scale}
              />
            </filter>
          </defs>
          <g>
            <image
              filter="url(#paint)"
              x="0"
              y="0"
              width="100%"
              height="100%"
              xlinkHref={Painting1}
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </animated.svg>
      </div>

      <style global jsx>
        {`
          .carousel {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          svg {
            width: 105%;
            height: 105%;
            transform: translate(-2.5%, -2.5%);
          }
          .filter-overlay {
            overflow: hidden;
            height: 80%;
            width: 70%;
          }
        `}
      </style>
    </section>
  )
}

export default Filter
