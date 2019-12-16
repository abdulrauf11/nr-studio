import React, { useRef } from "react"
import { useChain, useTransition, useTrail, animated } from "react-spring"
import { navigate } from "gatsby"

const links = ["about", "work", "contact", "shop"]
const config = { mass: 5, tension: 2000, friction: 200 }

function Overlay({ active, setActive, scroller }) {
  const transRef = useRef()
  const transitions = useTransition(active, null, {
    ref: transRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const trailRef = useRef()
  const trail = useTrail(links.length, {
    ref: trailRef,
    config,
    opacity: active ? 1 : 0,
    x: active ? 0 : 20,
    height: active ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  useChain(active ? [transRef, trailRef] : [trailRef, transRef], [0, 0.6])

  function handleClick(link) {
    if (link === "about") {
      setActive(!active)
      scroller.about()
    } else if (link === "work") {
      scroller.work()
      setActive(!active)
    } else if (link === "contact") {
      window.scrollTo(0, document.body.scrollHeight)
      setActive(!active)
    } else {
      navigate("/shop/")
    }
  }

  return (
    <section>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={{
                ...props,
                position: "fixed",
                overflow: "hidden",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "var(--green)",
                zIndex: 500,
                willChange: "transform, opacity",
              }}
            >
              {trail.map(({ x, height, ...rest }, index) => (
                <animated.div
                  key={links[index]}
                  style={{
                    ...rest,
                    transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
                  }}
                  className="overlay-link"
                >
                  <animated.div
                    style={{ height }}
                    onClick={() => handleClick(links[index])}
                  >
                    {links[index]}
                  </animated.div>
                </animated.div>
              ))}
            </animated.div>
          )
      )}
      <style global jsx>{`
        .overlay {
          position: fixed;
          overflow: hidden;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: var(--green);
          z-index: 500;
          will-change: transform, opacity;
        }

        .overlay-link {
          text-align: center;
          width: 100%;
          height: 80px;
          line-height: 80px;
          color: var(--white);
          font-size: 2.5rem;
          font-weight: 700;
          will-change: transform, opacity;
          overflow: hidden;
        }
        .overlay-link > div {
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default Overlay
