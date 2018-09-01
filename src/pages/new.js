import * as React from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

export default class NewLoan extends React.Component {
  state = {
    howMuch: '',
    howLong: '',
  }
  handleChange = (event, { name, value }) => {
    console.log(name, value)
    this.setState({
      [name]: value,
    })
  }

  render() {
    return <Form name="loan" method="POST" data-netlify="true" data-netlify-honeypot="bot-field"
                 onSubmit={this.publishNewLoan}
                 action="">
      <Form.Group widths='equal'>
        <p style={{ display: 'none' }}>
          <label>Don’t fill this out if you're human: <input name="bot-field"/></label>
        </p>
        <Form.Field
          id='form-input-control-how-much'
          control={Input}
          label='借多少'
          placeholder='xxxx 元'
          name="howMuch"
          value={this.state.howMuch}
          onChange={this.handleChange}
        />
        <Form.Field
          id='form-input-control-how-long'
          control={Input}
          name="howLong"
          label='借多久'
          placeholder='24 月'
          value={this.state.howLong}
          onChange={this.handleChange}
        />
      </Form.Group>
      <Form.Field
        id='form-upload'
        name="files"
        control={Input}
        type="file"
        multiple
        label='上传票据'
        placeholder='上传票据'
      />
      <Form.Field
        id='form-button-control-public'
        control={Button}
        content='发布需求'
      />
    </Form>
  }

  async publishNewLoan() {
    alert('thank you')
    // await window.fetch()
  }
}