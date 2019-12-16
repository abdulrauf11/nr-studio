import React from "react"
import Hamburger from "./hamburger"
import Overlay from "./overlay"

function Menu({ active, scroller, setActive, handleClick }) {
  return (
    <>
      <div onClick={handleClick}>
        <Hamburger active={active} />
      </div>
      <Overlay active={active} setActive={setActive} scroller={scroller} />
    </>
  )
}

export default Menu
