import React from "react"

const Hamburger = ({ active }) => (
  <div className={active ? "hamburger is-active" : "hamburger"}>
    <span className="bar" />
    <span className="bar" />
    <style jsx>{`
      .hamburger {
        cursor: pointer;
        position: fixed;
        top: 8.5vh;
        right: 15%;
        transform: translateX(100%);
        z-index: 1000;
      }
      .bar {
        display: block;
        height: 4px;
        width: 30px;
        border-radius: 100px;
        background: var(--green);
        margin: 6px 0;
        transition: all 0.5s ease-out;
      }
      .hamburger.is-active .bar:nth-child(1) {
        background: var(--white);
        transform: translateY(5px) rotate(45deg);
      }
      .hamburger.is-active .bar:nth-child(2) {
        background: var(--white);
        transform: translateY(-5px) rotate(-45deg);
      }
    `}</style>
  </div>
)

export default Hamburger
