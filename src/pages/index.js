import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import 'regenerator-runtime/runtime'
import LoanStep1 from '../components/new-loan/LoanStep1'
import LoanStep2 from '../components/new-loan/LoanStep2'
import { push } from 'gatsby-link'
import CheckUser from '../components/CheckUser'
import LoanService from '../service/loan'

const encode = (data) => {
  const formData = new FormData()
  Object.keys(data)
    .map(key => {
      if (key === 'files') {
        let i = 0
        for (const file of data[key]) {
          formData.append(`${key}_${i++}`, file, file.name)
        }
      } else {
        formData.append(key, data[key])
      }
    })
  return formData
}
export default class NewLoan extends React.Component {
  constructor(props) {
    super(props)
    this.publishNewLoan = this.publishNewLoan.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.gotoNextStep = this.gotoNextStep.bind(this)
    this.selectScheme = this.selectScheme.bind(this)
    this.deleteImage = this.deleteImage.bind(this)

    this.state = {
      howMuch: '',
      howLong: '',
      refundMethod: '',
      files: [],
      scheme: '',
      step: 1,
    }
  }

  handleChange(event, { name, value }) {
    if (!name.startsWith('files')) {
      this.setState({
        [name]: value,
      })
    } else {
      this.setState({
        files: [
          ...this.state['files'], ...(Array.from(event.target.files).filter(f => this.state['files'].map(f => f.name).indexOf(f.name) < 0)),
        ],
      })
    }
  }

  deleteImage(img) {
    this.setState({
      'files': this.state.files.filter(f => f !== img),
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
      this.setState({ loading: true })
      const res = await window.fetch('/', {
        method: 'POST',
        body: encode({
          'form-name': 'loan',
          ...this.state,
          userId: CheckUser.getCurrentUser().id,
        }),
      })

      alert('发布成功')
      const history = await LoanService.getHistory(CheckUser.getCurrentUser())
      push('/loan?loan_id=' + history[0].id)
    } catch (ex) {
      console.error(ex)
    } finally {
      this.setState({ loading: false })
    }
  }

  componentDidMount() {
    CheckUser.init()
    CheckUser.checkUser('/settings')
  }

  render() {
    return <Form name="loan" data-netlify="true" data-netlify-honeypot="bot-field" loading={this.state.loading}
                 onSubmit={this.publishNewLoan}>
      <p style={{ display: 'none' }}>
        <label>Don’t fill this out if you're human: <input name="bot-field"/></label>
      </p>
      {
        this.state.step === 1 &&
        <LoanStep1 howMuch={this.state.howMuch} howLong={this.state.howLong} refundMethod={this.state.refundMethod}
                   files={this.state['files']}
                   scheme={this.state.scheme}
                   deleteImage={this.deleteImage}
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