import React from 'react'
import LoanCard from '../components/LoanCard'
import { processLoan } from '../common/processLoan'

export default class LoanDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loan: null }
  }

  async componentDidMount() {
    const loanId = new URLSearchParams(window.location.search).get('loan_id')

    let res = await window.fetch(`https://api.netlify.com/api/v1/submissions/${loanId}?access_token=d0fb464bf842b9f97a361a8077893483a4dcf20837cf4cc679f22ef0eebea81d`)

    let detail = processLoan(await res.json())

    this.setState({ loan: detail })
  }

  render() {
    return <div>
      {this.state.loan && <LoanCard loan={this.state.loan}/>}
    </div>
  }
}