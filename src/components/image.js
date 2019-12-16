import React from "react"
import Img from "gatsby-image/withIEPolyfill"
import { useStaticQuery, graphql } from "gatsby"

export default function Image({ src, style }) {
  const idata = useStaticQuery(graphql`
    query {
      allFile(filter: { extension: { regex: "/jpeg|jpg|png|gif/" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  `)
  const file = idata.allFile.edges.find(
    ({ node }) => `/img/${node.relativePath}` === src
  )
  return (
    <Img
      fluid={file.node.childImageSharp.fluid}
      objectFit="cover"
      objectPosition="50% 50%"
      style={style}
      alt="painting"
      fadeIn={false}
    />
  )
}
