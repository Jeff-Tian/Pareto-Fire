import { Icon, Menu } from 'semantic-ui-react'
import Link from 'gatsby-link'
import React from 'react'

export default () => {
  const pathname = typeof window === 'undefined' ? '' : window.location.pathname

  return <Menu compact tabular fluid widths={3} icon="labeled" inverted>
    <Menu.Item as={Link} name="借款历史" active={pathname === '/history'} to="/history" color="red">
      <Icon name="history"/>
      借款历史
    </Menu.Item>
    <Menu.Item as={Link} name="发布借款" active={pathname === '/'} to="/" color="red">
      <Icon name="add circle"/>
      发布借款</Menu.Item>
    <Menu.Item as={Link} name="设置" active={pathname === '/settings'} to="/settings" color="red">
      <Icon name="settings"/>
      设置
    </Menu.Item>
  </Menu>
}