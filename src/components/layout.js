/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Footer from "./Footer"
import Header from "./header"
import '../styles/index.scss'
import { Helmet } from "react-helmet"
import { Row, Col } from "reactstrap"
// import Sidebar from './Sidebar'

const Layout = ({ children, pageTitle }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
    <Helmet>
    <script src="https://kit.fontawesome.com/8d0afb6326.js" crossOrigin="anonymous"></script>
    </Helmet>
    <Header siteTitle={data.site.siteMetadata.title} />
      <div className='container' id='content'>
        <h1>{pageTitle}</h1>
        <Row>
          <Col md="8">
            {children}
          </Col>
          {/* <Col md="4"><Sidebar/></Col> */}
        </Row>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
