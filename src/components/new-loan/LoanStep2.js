import * as React from 'react'
import { Card } from 'semantic-ui-react'

export default ({ scheme, selectScheme }) => <Card.Group style={{ marginBottom: '10px' }}>
  <Card fluid color={scheme === 'citi' ? 'red' : 'grey'} header='花旗银行 100 万' meta="2018年9月1日"
        description="更多描述"
        onClick={(event) => selectScheme(event, 'citi')}/>
  <Card fluid color={scheme === 'icbc' ? 'red' : 'grey'} header='工商银行 50 万' meta="2018年8月5日"
        description="点击查看详情"
        onClick={(event) => selectScheme(event, 'icbc')}/>
  <Card fluid color={scheme === 'china' ? 'red' : 'grey'} header='中国银行 30 万' meta="2018年7月7日" description="点击查看更多"
        onClick={(event) => selectScheme(event, 'china')}/>
</Card.Group>