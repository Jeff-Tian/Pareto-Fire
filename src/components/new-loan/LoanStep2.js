import * as React from 'react'
import { Card } from 'semantic-ui-react'

export default ({ selectScheme }) => <Card.Group>
  <Card fluid color='red' header='花旗银行 100 万' href="/" meta="2018年9月1日" description="更多描述"
        onClick={() => selectScheme('citi')}/>
  <Card fluid color='orange' header='工商银行 50 万' href="/" meta="2018年8月5日" description="点击查看详情"
        onClick={() => selectScheme('icbc')}/>
  <Card fluid color='yellow' header='中国银行 30 万' href="/" meta="2018年7月7日" description="点击查看更多"
        onClick={() => selectScheme('china')}/>

  <Card fluid color='yellow' header='中国银行 30 万' href="/" meta="2018年7月7日" description="点击查看更多"
        onClick={() => selectScheme('china')}/>


  <Card fluid color='yellow' header='中国银行 30 万' href="/" meta="2018年7月7日" description="点击查看更多"
        onClick={() => selectScheme('china')}/>
</Card.Group>