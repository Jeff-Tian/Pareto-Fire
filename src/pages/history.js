import React from 'react'
import { Card } from 'semantic-ui-react'
import 'regenerator-runtime/runtime'
import moment from 'moment/moment'
import CheckUser from '../components/CheckUser'
import LoanCard from '../components/LoanCard'
import { processLoan } from '../common/processLoan'

class HistoryPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      history: [],
    }

    moment.locale('zh-CN')
  }

  async componentDidMount() {
    CheckUser.init()
    let user = CheckUser.checkUser()

    this.setState({ loading: true })
    try {
      let res = await window.fetch(`https://api.netlify.com/api/v1/submissions?access_token=d0fb464bf842b9f97a361a8077893483a4dcf20837cf4cc679f22ef0eebea81d`)

      this.setState({
        history: (await res.json()).filter(loan => loan.data.userId === user.id).map(processLoan),
      })
    } catch (ex) {
      console.error(ex)
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    return <Card.Group>
      {
        this.state.history.map(s => <LoanCard loan={s} key={s.id}/>,
        )
      }
    </Card.Group>
  }
}

export default HistoryPage
