import React, { useRef } from "react"
import Layout from "../components/layout"
import Hero from "../components/hero"
import About from "../components/about"
import WorkSection from "../components/workSection"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop - 100) // General scroll to element function

const IndexPage = ({ data }) => {
  const aboutRef = useRef(null)
  const workRef = useRef(null)

  const executeAboutScroll = () => scrollToRef(aboutRef)
  const executeWorkScroll = () => scrollToRef(workRef)

  return (
    <Layout scroller={{ about: executeAboutScroll, work: executeWorkScroll }}>
      <SEO title="Home" />
      <Hero data={data} />
      <main>
        <div className="about-wrapper" ref={aboutRef}>
          <About />
        </div>
        <div className="work-wrapper" ref={workRef}>
          <WorkSection />
        </div>
      </main>
    </Layout>
  )
}

export default IndexPage

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1920) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
`

export const pageQuery = graphql`
  query {
    imageOne: file(relativePath: { eq: "hero/one.jpg" }) {
      ...fluidImage
    }
    imageTwo: file(relativePath: { eq: "hero/two.jpg" }) {
      ...fluidImage
    }
    imageThree: file(relativePath: { eq: "hero/three.jpg" }) {
      ...fluidImage
    }
  }
`
