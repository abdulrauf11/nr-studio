import React from "react"
import Img from "gatsby-image/withIEPolyfill"
import { useStaticQuery, graphql } from "gatsby"

export default function Image({ src, style }) {
  const idata = useStaticQuery(graphql`
    query {
      placeholder: file(relativePath: { eq: "placeholder.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      allImages: allFile(
        filter: { extension: { regex: "/jpeg|jpg|png|gif/" } }
      ) {
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

  const file = idata.allImages.edges.find(
    ({ node }) => `/img/${node.relativePath}` === src
  )

  if (!file) {
    return (
      <Img
        fluid={idata.placeholder.childImageSharp.fluid}
        objectFit="cover"
        objectPosition="50% 50%"
        style={style}
        alt="painting"
        fadeIn={false}
        loading="eager"
      />
    )
  }
  return (
    <Img
      fluid={file.node.childImageSharp.fluid}
      objectFit="cover"
      objectPosition="50% 50%"
      style={style}
      alt="painting"
      fadeIn={false}
      loading="eager"
    />
  )
}
