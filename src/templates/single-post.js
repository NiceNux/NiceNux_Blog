/* eslint-disable no-unused-vars */
import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import Img from 'gatsby-image'
import { slugify } from '../util/utilityFunctions'
import { Badge, Card, CardBody, CardSubtitle } from 'reactstrap'
// import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

// const Bold = ({ children }) => <span className="bold">{children}</span>
// const Text = ({ children }) => <p className="align-center">{children}</p>

// const options = {
//     renderMark: {
//       [MARKS.BOLD]: text => <Bold>{text}</Bold>,
//     },
//     renderNode: {
//       [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
//     },
//   }



const SinglePost = ({ data }) => {
    const post = data.contentfulBlogPost
    const body = documentToReactComponents(post.body.json)
    return (
        <Layout pageTitle={post.title}>
            <SEO title={post.title}/>
                <Card>
                    <Img className="card-image-top" fluid={post.image.fluid}/>                        
                    <CardBody>
                        <CardSubtitle>
                            <span className="text-info">{post.date}</span> by 
                            <span className="text-info">{post.author}</span>
                        </CardSubtitle>
                        <div>{body}</div>
                        <ul className="post-tags">
                            {post.tags.map(tag => (
                                <li key={tag}>
                                    <Link to={`/tag/${slugify(tag)}`}>
                                        <Badge color="primary">{tag}</Badge>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </CardBody>
                </Card>
        </Layout>
    )
}

export const postQuery = graphql`
    query blogPostBySlug($slug: String!){
        contentfulBlogPost(slug: { eq: $slug }){
            id
            title
            author
            date(formatString: "MMM Do YYYY")
            tags
            slug
            body {
                json
            }
            image {
                fluid(maxWidth: 700) {
                    ...GatsbyContentfulFluid
                }
            }
        }
    }

`

export default SinglePost