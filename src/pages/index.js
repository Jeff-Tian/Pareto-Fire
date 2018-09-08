import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import 'regenerator-runtime/runtime'
import LoanStep1 from '../components/new-loan/LoanStep1'
import LoanStep2 from '../components/new-loan/LoanStep2'
import { push } from 'gatsby-link'
import netlifyIdentity from 'netlify-identity-widget'

const encode = (data) => {
  const formData = new FormData()
  Object.keys(data)
    .map(key => {
      if (key === 'files') {
        for (const file of data[key]) {
          formData.append(key, file, file.name)
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

  static checkUser() {
    const user = netlifyIdentity.currentUser()
    if (!user) {
      netlifyIdentity.open()
      netlifyIdentity.on('close', NewLoan.checkUser)
    }
  }

  handleChange(event, { name }) {
    if (name !== 'files') {
      this.setState({
        [name]: event.target.value,
      })
    } else {
      this.setState({
        [name]: [
          ...this.state.files, ...Array.from(event.target.files.filter(f => this.state.files.indexOf(f) < 0)),
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
      await window.fetch('/', {
        method: 'POST',
        body: encode({ 'form-name': 'loan', ...this.state, userId: netlifyIdentity.currentUser().id }),
      })

      alert('发布成功')
      push('/history')
    } catch (ex) {
      console.error(ex)
    } finally {
      this.setState({ loading: false })
    }
  }

  componentDidMount() {
    netlifyIdentity.init({
      container: 'body', // defaults to document.body,
    })

    NewLoan.checkUser()
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
                   files={this.state.files}
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