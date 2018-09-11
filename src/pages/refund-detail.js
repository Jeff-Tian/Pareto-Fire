import { Button, Header, Item, Modal } from 'semantic-ui-react'
import React from 'react'
import { push } from 'gatsby-link'

export default class RefundDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      refunds: [{
        date: '2018-07-01',
        amount: '4067.98',
        paid: true,
      }, {
        date: '2018-08-01',
        amount: '4067.98',
        paid: true,
      }, {
        date: '2018-09-01',
        amount: '4067.98',
        paid: true,
      }, {
        date: '2018-10-01',
        amount: '4067.98',
        paid: false,
      }, {
        date: '2018-11-01',
        amount: '4067.98',
        paid: false,
      }, {
        date: '2018-12-01',
        amount: '4067.98',
        paid: false,
      }, {
        date: '2019-01-01',
        amount: '4067.98',
        paid: false,
      }, {
        date: '2019-02-01',
        amount: '4067.98',
        paid: false,
      }, {
        date: '2019-03-01',
        amount: '4067.98',
        paid: false,
      }],
    }
  }

  render() {
    return <div>
      <Header>还款详情：</Header>
      <Item.Group divided>
        {this.state.refunds && this.state.refunds.map(r =>
          <Item key={Math.random()}>
            <Item.Content>
              <Item.Header>{r.date}</Item.Header>
              <Item.Meta>
                {r.paid ? '已还款' : '待还款'}
              </Item.Meta>
              <Item.Description>￥ {r.amount}</Item.Description>
            </Item.Content>
            <Item.Extra>
              {
                !r.paid && r.date < '2018-11-01' &&
                <Button color="red" onClick={() => this.refund(r)}>去还款</Button>
              }
            </Item.Extra>
          </Item>,
        )}
      </Item.Group>

    </div>
  }


  refund(refundInfo) {
    push(`/pay?amount=${refundInfo.amount}`)
  }
}