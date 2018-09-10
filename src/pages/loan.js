import React from 'react'
import LoanCard from '../components/LoanCard'
import { processLoan } from '../common/functions'
import Link, { push } from 'gatsby-link'
import { Button, Header, Item } from 'semantic-ui-react'

export default class LoanDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loan: null }
  }

  async componentDidMount() {
    const loanId = new URLSearchParams(window.location.search).get('loan_id')

    let res = await window.fetch(`https://api.netlify.com/api/v1/submissions/${loanId}?access_token=d0fb464bf842b9f97a361a8077893483a4dcf20837cf4cc679f22ef0eebea81d`)

    let detail = processLoan(await res.json())

    this.setState({
      loan: detail, refunds: [{
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
    })
  }

  render() {
    return <div>
      {this.state.loan && <LoanCard loan={this.state.loan}/>}
      <p><Link to="/">查看电子合同</Link></p>
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
                <Button color="red" onClick={() => this.refund(this.state.loan.id)}>去还款</Button>
              }
            </Item.Extra>
          </Item>,
        )}
      </Item.Group>
    </div>
  }

  refund(loanId) {
    push(`/refund?loan_id=${loanId}`)
  }
}