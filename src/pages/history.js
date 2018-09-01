import React from 'react'
import { Card } from 'semantic-ui-react'

const HistoryPage = () => (
  <Card.Group>
    <Card fluid color='red' header='花旗银行 100 万' href="/" meta="2018年9月1日" description="更多描述"/>
    <Card fluid color='orange' header='工商银行 50 万' href="/" meta="2018年8月5日" description="点击查看详情"/>
    <Card fluid color='yellow' header='中国银行 30 万' href="/" meta="2018年7月7日" description="点击查看更多"/>
  </Card.Group>
)

export default HistoryPage
