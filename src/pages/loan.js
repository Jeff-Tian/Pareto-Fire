import React from 'react'
import LoanCard from '../components/LoanCard'
import Link, { push } from 'gatsby-link'
import { Button, Header, Item } from 'semantic-ui-react'
import LoanService from '../service/loan'

export default class LoanDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loan: null }
  }

  async componentDidMount() {
    const loanId = new window.URLSearchParams(window.location.search).get('loan_id')

    this.setState({
      loan: await LoanService.getLoan(loanId),
    })
  }

  render() {
    return <div>
      {this.state.loan && <LoanCard loan={this.state.loan}/>}
      <p>
        <Link to="/">查看电子合同</Link>
        {
          this.state.loan &&
          <Button color="red" floated="right" as={Link} to={`/refund?loan_id=${this.state.loan.id}`}>还款</Button>
        }
      </p>

    </div>
  }
}