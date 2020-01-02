import React, { useRef, useEffect } from "react"
import Swiper from "swiper"
import "../../node_modules/swiper/css/swiper.min.css"
import { TweenMax, Power4 } from "gsap"
import Img from "gatsby-image/withIEPolyfill"

const Gallery = ({ gallery }) => {
  const swiperContainerRef = useRef(null)
  const swiperRef = useRef(null)
  const prevButtonRef = useRef(null)
  const nextButtonRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorIconRef = useRef(null)

  const easing = Power4.easeOut
  const animationDuration = 0.3

  useEffect(() => {
    initCursor(cursorRef.current, cursorIconRef.current)
    initSwiper(cursorRef.current, cursorIconRef.current)
  }, [])

  function initCursor(cursor, cursorIcon) {
    TweenMax.to(cursorIcon, 0, {
      rotation: -135,
      opacity: 0,
      scale: 0.5,
    })

    let clientX, clientY
    swiperContainerRef.current.addEventListener("mousemove", e => {
      clientX = e.clientX
      clientY = e.clientY
    })

    const render = () => {
      TweenMax.set(cursor, {
        x: clientX,
        y: clientY,
      })
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
    let cursorSide = null
    // mouseenter
    const onSwiperMouseEnter = e => {
      let swiperBox = e.target.getBoundingClientRect()
      clientX = e.clientX
      clientY = e.clientY
      let startRotation
      if (clientY < swiperBox.top + swiperBox.height / 2) {
        startRotation = -135
      } else {
        startRotation = clientX > window.innerWidth / 2 ? 135 : -315
      }
      TweenMax.set(cursorIcon, {
        rotation: startRotation,
      })
      cursorSide = clientX > window.innerWidth / 2 ? "right" : "left"
      TweenMax.to(cursorIcon, animationDuration, {
        rotation: cursorSide === "right" ? 0 : -180,
        scale: 1,
        opacity: 1,
        ease: easing,
      })
    }

    // mouseLeave
    const onSwiperMouseLeave = e => {
      let swiperBox = e.target.getBoundingClientRect()
      let outRotation = 0
      if (clientY < swiperBox.top + swiperBox.height / 2) {
        outRotation = cursorSide === "right" ? -135 : -45
      } else {
        outRotation = cursorSide === "right" ? 135 : -315
      }
      TweenMax.to(cursorIcon, animationDuration, {
        rotation: outRotation,
        opacity: 0,
        scale: 0.3,
      })
      cursorSide = null
    }

    const onSwitchSwiperLeft = () => {
      TweenMax.to(cursorIcon, animationDuration, {
        rotation: -180,
        ease: easing,
      })
      cursorSide = "left"
    }

    const onSwitchSwiperRight = () => {
      TweenMax.to(cursorIcon, animationDuration, {
        rotation: 0,
        ease: easing,
      })
      cursorSide = "right"
    }

    const swiperContainer = swiperContainerRef.current
    swiperContainer.addEventListener("mouseenter", onSwiperMouseEnter)
    swiperContainer.addEventListener("mouseleave", onSwiperMouseLeave)
    const swiperButtonPrev = prevButtonRef.current
    const swiperButtonNext = nextButtonRef.current
    swiperButtonPrev.addEventListener("mouseenter", onSwitchSwiperLeft)
    swiperButtonNext.addEventListener("mouseenter", onSwitchSwiperRight)
  }

  function initSwiper(cursor, cursorIcon) {
    const swiper = new Swiper(swiperRef.current, {
      loop: true,
      slidesPerView: 1.25,
      spaceBetween: 20,
      centeredSlides: true,
      keyboard: true,
      breakpoints: {
        650: {
          slidesPerView: 2,
          spaceBetween: 100,
          navigation: {
            nextEl: nextButtonRef.current,
            prevEl: prevButtonRef.current,
          },
        },
      },
    })

    let bumpCursorTween = TweenMax.to(cursor, 0.1, {
      scale: 0.85,
      onComplete: () => {
        TweenMax.to(cursor, 0.2, {
          scale: 1,
          ease: easing,
        })
      },
      paused: true,
    })

    swiper.on("slideChange", () => {
      bumpCursorTween.play()
    })
  }

  return (
    <section className="series-gallery-wrapper" ref={swiperContainerRef}>
      <div className="arrow-cursor" ref={cursorRef}>
        <svg
          className="arrow-cursor__icon"
          ref={cursorIconRef}
          viewBox="0 0 117.25 86.75"
        >
          <path
            className="arrow-cursor__path"
            d="M111.45,42.5,74.65,5.7l-9.9,9.9,20.6,20.6H6.45v14h78.9L64.75,70.8l9.9,9.9,36.8-36.8A1,1,0,0,0,111.45,42.5Z"
          />
        </svg>
      </div>
      <div className="series-gallery">
        <div className="swiper-container" ref={swiperRef}>
          <div className="swiper-wrapper">
            {gallery.map((imgSrc, index) => (
              <div key={index} className="swiper-slide">
                <Img
                  fluid={imgSrc.fluid}
                  alt="Portfolio Paintings"
                  fadeIn={false}
                  loading="eager"
                />
              </div>
            ))}
          </div>
          <div className="swiper-button-prev" ref={prevButtonRef}></div>
          <div className="swiper-button-next" ref={nextButtonRef}></div>
        </div>
      </div>
      <style global jsx>
        {`
          .series-gallery-wrapper {
            position: relative;
            transform: translateY(15vh);
          }

          .swiper-slide {
            height: 70vh;
          }

          .series-gallery {
            height: 100%;
          }

          .swiper-container {
            width: 100%;
            height: 100%;
            cursor: drag;
          }

          .arrow-cursor {
            width: 150px;
            height: 110px;
            position: fixed;
            left: -75px;
            top: -55px;
            z-index: 10000000;
            pointer-events: none;
          }
          .arrow-cursor__icon {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
          .arrow-cursor__path {
            fill: none;
            stroke: #000;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 1.5px;
          }

          .swiper-button-prev,
          .swiper-button-next {
            width: 50%;
            height: 100%;
            margin-top: 0;
            top: 0;
            background-image: none;
            cursor: none;
          }

          .swiper-button-prev:after,
          .swiper-button-next:after {
            content: "";
          }

          .swiper-button-prev {
            left: 0;
          }

          .swiper-button-next {
            right: 0;
          }

          @media only screen and (max-width: 600px) {
            .series-gallery-wrapper {
              transform: translateY(15vh);
            }

            .swiper-slide {
              height: 40vh;
            }

            .arrow-cursor {
              display: none;
            }
          }
        `}
      </style>
    </section>
  )
}

export default Gallery
