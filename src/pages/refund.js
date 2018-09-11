import React from 'react'
import LoanService from '../service/loan'
import Link from 'gatsby-link'
import { Card, Icon, Item } from 'semantic-ui-react'

export default class Refund extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loan: null,
    }
  }

  async componentDidMount() {
    this.setState({
      loan: await LoanService.getLoan(new URLSearchParams(window.location.search).get('loan_id')),
    })
  }

  render() {
    return <div>
      {
        this.state.loan &&
        <Card
          header={`未还金额（元）： ${this.state.loan.data.howMuch}`}
          meta={`还剩5期`}
        />
      }
      <Item.Group divided>
        <Item>
          <Item.Content verticalAlign="middle">
            <Item.Header>4067.98</Item.Header>
            <Item.Description>
              11 月 1 日到期
              <Icon name='right chevron' style={{ float: 'right' }}/>
            </Item.Description>
          </Item.Content>
        </Item>
        <Item as={Link} to={`/refund-detail?loan_id=${this.state.loan.id}`}>
          <Item.Content verticalAlign="middle">
            按期还款计划
            <Icon name='right chevron' style={{ float: 'right' }}/>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content verticalAlign="middle">
            提前还款
            <Icon name='right chevron' style={{ float: 'right' }}/>
          </Item.Content>
        </Item>
      </Item.Group>

    </div>
  }
}