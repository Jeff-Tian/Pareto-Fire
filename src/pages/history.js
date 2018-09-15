import React from 'react'
import { Card } from 'semantic-ui-react'
import 'regenerator-runtime/runtime'
import moment from 'moment/moment'
import CheckUser from '../components/CheckUser'
import LoanCard from '../components/LoanCard'
import API from '../common/api'

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
        history: await API.getHistory(user),
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
