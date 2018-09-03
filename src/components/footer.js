import { Icon, Menu } from 'semantic-ui-react'
import Link from 'gatsby-link'
import React from 'react'

export default ({ activeItem }) => <Menu tabular fluid widths={3} icon="labeled">
  <Menu.Item as={Link} name="借款历史" active={activeItem === '借款历史'} to="/history">
    <Icon name="history"/>
    借款历史
  </Menu.Item>
  <Menu.Item as={Link} name="发布借款" active={activeItem === '借款历史'} to="/">
    <Icon name="add circle"/>
    发布借款</Menu.Item>
  <Menu.Item as={Link} name="设置" active={activeItem === '借款历史'} to="/settings">
    <Icon name="settings"/>
    设置
  </Menu.Item>
</Menu>