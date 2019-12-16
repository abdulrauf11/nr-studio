import React, { useState, useEffect } from "react"
import { useTrail, animated } from "react-spring"
import "./goo.css"

const fast = { tension: 1200, friction: 40 }
const slow = { mass: 10, tension: 200, friction: 50 }
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

export default function Goo() {
  const [trail, set] = useTrail(3, () => ({
    xy: [0, 0],
    config: i => (i === 0 ? fast : slow),
  }))

  const [hovered, setHovered] = useState(false)

  function handleMouseOver() {
    setHovered(true)
  }

  function handleMouseLeave() {
    setHovered(false)
  }

  function handleMouseMove(e) {
    set({ xy: [e.clientX, e.clientY] })
  }

  useEffect(() => {
    document.addEventListener("mousemove", e => handleMouseMove(e))
    const allLinks = document.querySelectorAll("a, .page-links span")
    for (const link of allLinks) {
      link.addEventListener("mouseover", handleMouseOver)
      link.addEventListener("mouseleave", handleMouseLeave)
    }
    return function cleanup() {
      for (const link of allLinks) {
        link.removeEventListener("mouseover", handleMouseOver)
        link.removeEventListener("mouseleave", handleMouseLeave)
      }
      document.removeEventListener("mousemove", e => handleMouseMove(e))
    }
  }, [])

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur result="blur" stdDeviation="5" />
          <feColorMatrix
            in="blur"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 30 -7
            "
          />
        </filter>
      </svg>
      <div
        className="hooks-main"
        onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}
      >
        {trail.map((props, index) => (
          <animated.div
            key={index}
            style={{
              transform: props.xy.interpolate(trans),
              opacity: hovered ? 0 : 0.5,
            }}
          />
        ))}
      </div>
    </>
  )
}
