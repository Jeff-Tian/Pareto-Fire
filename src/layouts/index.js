import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import 'semantic-ui-css/semantic.min.css'

import Header from '../components/header'
import './index.css'
import { Container, Icon, Menu } from 'semantic-ui-react'

const activeItem = '发布借款'
const handleClick = () => {
  alert(arguments)
  console.log(arguments)
}
const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: '开放银行的信用贷款平台' },
        { name: 'keywords', content: '信用贷款, 开放银行' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title}/>
    <Container>
      {children()}
      <Menu tabular fluid widths={3} icon="labeled" fixed="bottom">
        <Menu.Item name="借款历史" active={activeItem === '借款历史'} onClick={handleClick}>
          <Icon name="history"/>
          借款历史
        </Menu.Item>
        <Menu.Item name="发布借款" active={activeItem === '借款历史'} onClick={handleClick}>
          <Icon name="add circle"/>
          发布借款</Menu.Item>
        <Menu.Item name="设置" active={activeItem === '借款历史'} onClick={handleClick}>
          <Icon name="settings"/>
          设置
        </Menu.Item>
      </Menu>
    </Container>
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
        title
      }
    }
  }
`
