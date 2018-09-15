import React from 'react'
import { Card, Segment } from 'semantic-ui-react'
import 'regenerator-runtime/runtime'
import moment from 'moment/moment'
import CheckUser from '../components/CheckUser'
import LoanCard from '../components/LoanCard'
import LoanService from '../service/loan'

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
      this.setState({
        history: await LoanService.getHistory(user),
      })
    } catch (ex) {
      console.error(ex)
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
      : <Card.Group>
        {
          this.state.history.map(s => <LoanCard loan={s} key={s.id}/>,
          )
        }
      </Card.Group>
  }
}

export default HistoryPage
