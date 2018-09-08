import { Form, Input } from 'semantic-ui-react'
import React from 'react'

export default ({ indices, handleChange, files }) => <div>
  {
    indices.map(i => <Form.Group key={i} style={{ display: files.length === i ? 'block' : 'none' }} widths="equal">
      <Form.Field
        name={`files_${i}`}
        control={Input}
        type="file"
        label='上传票据'
        placeholder='上传票据'
        onChange={handleChange}
      /></Form.Group>)
  }
</div>