const { slugify } = require('./src/util/utilityFunctions')
const path = require(`path`);
const slash = require(`slash`);
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  // we use the provided allContentfulBlogPost query to fetch the data from Contentful
  return graphql(
    `
      {
        allContentfulBlogPost {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  ).then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data",      result.errors);
      }
      // Resolve the paths to our template
      const blogPostTemplate = path.resolve("./src/templates/single-post.js");
      // Then for each result we create a page.
      result.data.allContentfulBlogPost.edges.forEach(edge => {
        createPage({
          path: `/blogpost/${edge.node.slug}/`,
          component: slash(blogPostTemplate),
          context: {
	    slug: edge.node.slug,
            id: edge.node.id
          }
        });
      });
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error);
    });
};
// const path = require('path')

// exports.onCreateNode = ({node, actions}) => {
//     const { createNodeField } = actions
//     if(node.internal.type === 'MarkdownRemark'){
//         const slugFromTitle = slugify(node.frontmatter.title)
//         createNodeField({
//             node,
//             name: 'slug',
//             value: slugFromTitle,
//         })
//     }
// }

// exports.createPages = ({ actions, graphql }) => {
//     const { createPage } = actions;
//     const singlePostTemplate = path.resolve('src/templates/single-post.js')

//     return graphql(`
//         {
//             allMarkdownRemark{
//                 edges{
//                     node{
//                         frontmatter{
//                             author
//                         }
//                         fields{
//                             slug
//                         }
//                     }
//                 }
//             }
//         }
    
//     `).then(res => {
//         if(res.erros) return Promise.reject(res.errors)

//         const posts = res.data.allMarkdownRemark.edges

//         posts.forEach(({node}) => {
//             createPage({
//                 path: node.fields.slug,
//                 component: singlePostTemplate,
//                 context: {
//                     slug: node.fields.slug
//                 }
//             })
//         })
//     })
// }

