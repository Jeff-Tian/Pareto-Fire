import { Button, Form, Icon, Input, Label, Select } from 'semantic-ui-react'
import React from 'react'

function isBlank(value) {
  return value === '' || value === null
}

export default ({ howMuch, howLong, refundMethod, test, files, handleChange, gotoNextStep }) => <Form.Group
  widths='equal'>

  <Form.Field
    id='form-input-control-how-long'
    control={Input}
    name="test"
    label='fuck'
    placeholder='24 月'
    value={test}
    onChange={handleChange}
  />
  <Form.Field>
    <label>借多少</label>
    <Input labelPosition='right' type='number' placeholder='10000' name="howMuch" value={howMuch}
           onChange={handleChange}>
      <Label basic>￥</Label>
      <input/>
      <Label>.00 元</Label>
    </Input>
  </Form.Field>
  <Form.Field
    id='form-input-control-how-long'
    control={Select}
    name="howLong"
    label='借多久'
    placeholder='24 月'
    value={howLong}
    onChange={handleChange}
    options={[
      { key: 3, text: '三个月', value: 3 },
      { key: 6, text: '六个月', value: 6 },
      { key: 12, text: '一年', value: 12 },
      { key: 24, text: '两年', value: 24 },
      { key: 36, text: '三年', value: 36 },
      { key: 48, text: '四年', value: 48 },
      { key: 60, text: '五年', value: 60 },
    ]}
  />
  <Form.Field
    id='form-input-control-refund'
    control={Select}
    name="refundMethod"
    label="怎么还"
    placeholder="等额本息"
    value={refundMethod}
    onChange={handleChange}
    options={[{
      key: 0, text: '等额本息', value: 0,
    }, {
      key: 1, text: '等额本金', value: 1,
    }, {
      key: 2, text: '先息后本', value: 2,
    }]}
  />
  <Form.Field
    id='form-file-upload'
    name="files"
    control={Input}
    type="file"
    multiple
    label='上传票据'
    placeholder='上传票据'
    onChange={handleChange}
  />
  <Form.Field
    id='form-button-control-public'
    control={Button}
    color="red"
    disabled={isBlank(howMuch) || isBlank(howLong) || isBlank(refundMethod)}
    onClick={gotoNextStep}
    icon labelPosition='right'
  >下一步<Icon name='right arrow'/></Form.Field>
</Form.Group>