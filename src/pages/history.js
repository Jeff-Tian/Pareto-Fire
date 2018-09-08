import React from 'react'
import { Card } from 'semantic-ui-react'
import 'regenerator-runtime/runtime'
import moment from 'moment/moment'
import Link from 'gatsby-link'
import CheckUser from '../components/CheckUser'
import ImagePreview from '../components/ImagePreview'

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
        history: (await res.json()).filter(loan => loan.data.userId === user.id).map(loan => {
          loan.files = []
          const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8]
          indices.map(i => {
            let f = loan.data[`files_${i}`]
            if (f) {
              loan.files.push(f)
            }
          })
          return loan
        }),
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
        this.state.history.map(s => <Card as={Link} fluid color='red'
                                          to={`/?loan_id=${s.id}`}
                                          key={s.id}>
            <Card.Content>
              <Card.Header>{`￥ ${s.data.howMuch} 元`}</Card.Header>
              <Card.Meta>{moment(s.created_at).fromNow()}</Card.Meta>
              <Card.Description>{s.data.scheme}</Card.Description>
            </Card.Content>
            <Card.Content>
              <ImagePreview images={s.files}/>
            </Card.Content>
          </Card>,
        )
      }
    </Card.Group>
  }
}

export default HistoryPage
