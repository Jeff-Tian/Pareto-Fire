import { Button, Form, Input } from 'semantic-ui-react'
import React from 'react'

export default ({ howMuch, howLong, refundMethod, handleChange, gotoNextStep }) => <Form.Group widths='equal'>
  <Form.Field
    id='form-input-control-how-much'
    control={Input}
    label='借多少'
    placeholder='10000 元'
    name="howMuch"
    value={howMuch}
    onChange={handleChange}
  />
  <Form.Field
    id='form-input-control-how-long'
    control={Input}
    name="howLong"
    label='借多久'
    placeholder='24 月'
    value={howLong}
    onChange={handleChange}
  />
  <Form.Field
    id='form-input-control-refund'
    control={Input}
    name="refundMethod"
    label="怎么还"
    placeholder="等额本息"
    value={refundMethod}
    onChange={handleChange}
  />
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
    content='下一步'
    onClick={gotoNextStep}
  />
</Form.Group>