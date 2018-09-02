import React from 'react'
import { Card } from 'semantic-ui-react'
import 'regenerator-runtime/runtime'
import moment from 'moment/moment'

class HistoryPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      history: [],
    }

    moment.locale('zh-CN')
  }

  async componentWillMount() {
    let res = await fetch(`https://api.netlify.com/api/v1/submissions?access_token=d0fb464bf842b9f97a361a8077893483a4dcf20837cf4cc679f22ef0eebea81d`)

    this.setState({ history: await res.json() })
  }

  render() {
    return <Card.Group>
      {
        this.state.history.map(s => <Card fluid color='red' header={s.summary} href="/"
                                          meta={moment(s.created_at).fromNow()}
                                          description={s.id} key={s.id}>
        </Card>)
      }
    </Card.Group>
  }
}

export default HistoryPage
