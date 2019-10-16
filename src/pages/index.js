/* eslint-disable no-unused-vars */
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from '../components/Post'


const IndexPage = () => (
  <Layout pageTitle="Nice Nux Blog">
    <SEO title="Home" />
    
      <StaticQuery query={indexQuery} render={data => {
      return (
        <div>
          {data.allContentfulBlogPost.edges.map(({ node }) =>(
            <Post
              key={node.id} 
              title={node.title}
              author={node.author}
              slug={node.slug}
              date={node.date}
              body={node.desc.desc}
              fluid={node.image.fluid}
              tags={node.tags}
            />
          ))}
        </div>
      )
    }}/>
  </Layout>
)

const indexQuery = graphql`
query BlogPostsPageQuery {
  allContentfulBlogPost(limit: 1000) {
    edges{
      node{
        id
        title
        date(formatString: "MMM Do YYYY" )
        author
        tags
        desc {
          desc
        }
        slug
        image {
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
}
`

// fields{
//   slug
// }
// excerpt

export default IndexPage
