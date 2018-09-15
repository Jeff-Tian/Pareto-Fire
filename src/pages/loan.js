import React from 'react'
import LoanCard from '../components/LoanCard'
import Link from 'gatsby-link'
import { Button, Header, Segment } from 'semantic-ui-react'
import LoanService from '../service/loan'
import CheckUser from '../components/CheckUser'

export default class LoanDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loan: null }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    CheckUser.init()
    const loanId = new window.URLSearchParams(window.location.search).get('loan_id')

    try {
      this.setState({
        loan: await LoanService.getLoan(loanId),
        confirmed: new window.URLSearchParams(window.location.search).get('confirmed'),
        isMe: !!CheckUser.getCurrentUser(),
      })
    } catch (ex) {
      alert('发生了错误：' + ex.toString())
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    return this.state.loading
      ? <Segment loading>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </Segment>
      : <div>
        {
          !this.state.isMe &&
          <Header as="h3">
            您的合作伙伴正在向银行申请一笔借款，需要您的确认：
          </Header>
        }
        {this.state.loan && <LoanCard loan={this.state.loan}/>}
        <p>
          <Link to="/">查看电子合同</Link>
          {
            this.state.loan && this.state.confirmed &&
            <Button color="red" floated="right" as={Link} to={`/refund?loan_id=${this.state.loan.id}`}>还款</Button>
          }
        </p>
        {
          this.state.isMe
            ? (this.state.loan && !this.state.confirmed
            ? <p>请将此页分享给供应商/客户确认，确认后您的借款申请将被发送到融资方</p>
            : <p>您的此次借款申请已获批，请按时还款。</p>)
            : ''
        }
        {
          !this.state.isMe &&
          <Button.Group size='huge'>
            <Button>拒绝</Button>
            <Button.Or/>
            <Button color="red">确认</Button>
          </Button.Group>
        }
      </div>
  }
}