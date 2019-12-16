import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Menu from "./menu"
import Logo from "./logo"

const Header = props => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden"
      // document.body.style.position = "fixed"
    } else {
      document.body.style.overflow = "auto"
      // document.body.style.position = "static"
    }
  }, [active])

  function handleClick() {
    setActive(!active)
  }

  return (
    <header className={props.absolute ? "header absolute" : "header"}>
      <div className="shop-button">
        <Link to="/shop/">shop</Link>
      </div>

      <Link to="/" className="logo">
        <Logo color={active ? "#fff" : "#000"} />
      </Link>

      <div className="page-links">
        {props.scroller && <span onClick={props.scroller.about}>about me</span>}
        {props.scroller && <span onClick={props.scroller.work}>work</span>}
        <span onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
          contact
        </span>
      </div>

      <div className="mobile-menu">
        {props.scroller && (
          <Menu
            scroller={props.scroller}
            active={active}
            setActive={setActive}
            handleClick={handleClick}
          />
        )}
        {!props.scroller && (
          <span onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
            contact
          </span>
        )}
      </div>

      <style global jsx>{`
        .header {
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

        .header > * {
          flex: 1;
        }
        .logo {
          text-align: center;
        }
        .shop-button a {
          padding: 0.5rem 2.5rem;
          border: 1px solid var(--green);
        }
        .page-links {
          text-align: right;
        }
        .page-links span {
          cursor: pointer;
          margin-right: 4rem;
        }
        .page-links span:last-child {
          margin-right: 0;
        }
        .mobile-menu {
          display: none;
        }
        @media only screen and (max-width: 600px) {
          .header {
            position: relative;
            width: 85%;
          }
          .page-links,
          .shop-button {
            display: none;
          }
          .mobile-menu {
            display: block;
            text-align: right;
          }
          .logo {
            text-align: left;
            z-index: 1000;
          }
        }
      `}</style>
    </header>
  )
}

export default Header
