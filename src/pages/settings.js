import React from 'react'
import { Button, Item } from 'semantic-ui-react'
import CheckUser from '../components/CheckUser'
import moment from 'moment'
import 'regenerator-runtime/runtime'

const gravatar = require('gravatar')

export default class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = { user: null }
    moment.locale('zh-CN')

    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {
    CheckUser.init()
    const user = CheckUser.checkUser('/')

    this.setState({ user: user })
  }

  logout() {
    CheckUser.logout()
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
              <a className="ui facebook button"
                 href={`https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/authorize?response_type=code&client_id=61e8bab0-a650-4dd6-818d-245e220798b7&scope=customers_profiles&countryCode=US&businessCode=GCB&locale=en_US&state=opaqueStateValue&redirect_uri=https://fire.pa-pa.me/.netlify/functions/bind-citi-account`}>绑定花旗账号</a>
              <Button color="red" onClick={this.logout}>退出登录</Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      }
    </Item.Group>
  }
}