import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import 'regenerator-runtime/runtime'
import LoanStep1 from '../components/new-loan/LoanStep1'
import LoanStep2 from '../components/new-loan/LoanStep2'
import { push } from 'gatsby-link'

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}
export default class NewLoan extends React.Component {
  constructor(props) {
    super(props)
    this.publishNewLoan = this.publishNewLoan.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.gotoNextStep = this.gotoNextStep.bind(this)
    this.selectScheme = this.selectScheme.bind(this)

    this.state = {
      howMuch: '',
      howLong: '',
      refundMethod: '',
      scheme: '',
      step: 1,
    }
  }

  handleChange(event, { name, value }) {
    this.setState({
      [name]: value,
    })
  }

  gotoNextStep(event) {
    event.preventDefault()
    this.setState({
      step: this.state.step + 1,
    })
  }

  selectScheme(event, scheme) {
    event.preventDefault()
    event.stopPropagation()

    this.setState({
      scheme: scheme,
      allowSubmit: true,
    })
  }

  async publishNewLoan(event) {
    if (typeof window === 'undefined') {
      return
    }
    event.preventDefault()
    try {
      await window.fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'loan', ...this.state }),
      })

      alert('发布成功')
      push('/history')
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    return <Form name="loan" data-netlify="true" data-netlify-honeypot="bot-field"
                 onSubmit={this.publishNewLoan}>
      <p style={{ display: 'none' }}>
        <label>Don’t fill this out if you're human: <input name="bot-field"/></label>
      </p>
      {
        this.state.step === 1 &&
        <LoanStep1 howMuch={this.state.howMuch} howLong={this.state.howLong} refundMethod={this.state.refundMethod}
                   handleChange={this.handleChange} gotoNextStep={this.gotoNextStep}/>
      }
      {
        this.state.step === 2 &&
        <LoanStep2 scheme={this.state.scheme} selectScheme={this.selectScheme}/>
      }
      {
        this.state.step === 2 &&
        <Form.Field
          color="red"
          id='form-button-control-submit'
          control={Button}
          content='提交'
          disabled={!this.state.allowSubmit}
        />
      }
    </Form>
  }
}