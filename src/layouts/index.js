import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import 'semantic-ui-css/semantic.min.css'

import ParetoHeader from '../components/header'
import ParetoFooter from '../components/footer'
import './index.css'
import { Container } from 'semantic-ui-react'

const Layout = ({ children, data }) => (
  <div className="flex-box">
    <div className="row header">
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: '开放银行的信用贷款平台' },
          { name: 'keywords', content: '信用贷款, 开放银行' },
        ]}
      />
      <ParetoHeader siteTitle={data.site.siteMetadata.title} subtitle={data.site.siteMetadata.subtitle}/>
    </div>
    <div className="row content">
      <div style={{ width: '100%' }}>
        <Container fluid style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          {children()}
        </Container>
      </div>
    </div>
    <div className="row footer">
      <ParetoFooter/>
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title,
        subtitle
      }
    }
  }
`
