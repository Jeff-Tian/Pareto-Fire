import React from 'react'
import { Card } from 'semantic-ui-react'
import 'regenerator-runtime/runtime'
import moment from 'moment/moment'
import Link from 'gatsby-link'
import CheckUser from '../components/CheckUser'

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

    try {
      let res = await window.fetch(`https://api.netlify.com/api/v1/submissions?access_token=d0fb464bf842b9f97a361a8077893483a4dcf20837cf4cc679f22ef0eebea81d`)

      this.setState({ history: (await res.json()).filter(loan => loan.data.userId === user.id) })
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return <Card.Group>
      {
        this.state.history.map(s => <Card as={Link} fluid color='red' header={`￥ ${s.data.howMuch} 元`}
                                          to={`/?loan_id=${s.id}`}
                                          meta={moment(s.created_at).fromNow()}
                                          description={s.data.scheme} key={s.id}>
        </Card>)
      }
    </Card.Group>
  }
}

export default HistoryPage
