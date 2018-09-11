import React from 'react'
import { Button, Container, Item, Label } from 'semantic-ui-react'
import CheckUser from '../components/CheckUser'
import moment from 'moment'

const gravatar = require('gravatar')

export default class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = { user: null }
    moment.locale('zh-CN')
  }

  async componentDidMount() {
    CheckUser.init()
    const user = CheckUser.checkUser()

    this.setState({ user: user })
    console.log('user = ', user)
  }

  render() {
    return <Item.Group>
      {
        this.state.user &&
        <Item>
          <Item.Image src={gravatar.url(this.state.user.email)}/>

          <Item.Content>
            <Item.Header as='a'>{this.state.user.user_metadata.full_name}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{this.state.user.email}</span>
            </Item.Meta>
            <Item.Description>注册于：{moment(this.state.user.created_at).fromNow()}</Item.Description>
            <Item.Extra>
              <Button color="facebook">绑定花旗账号</Button>
              {/*<Label>IMAX</Label>*/}
              {/*<Label icon='globe' content='Additional Languages'/>*/}
            </Item.Extra>
          </Item.Content>
        </Item>
      }
    </Item.Group>
  }
}