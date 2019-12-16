import React from "react"
import Header from "./header"
import Footer from "./footer"
import Goo from "./goo"

const Layout = props => (
  <>
    <Header absolute={props.absolute} scroller={props.scroller} />
    {props.children}
    <Footer />
    <Goo />
  </>
)

export default Layout
