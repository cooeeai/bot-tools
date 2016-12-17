import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Col, FormGroup, Input, Label } from 'reactstrap'

export class TextInput extends Component {

  handleChange = ev => {
    const { slotId, id, itemKey, updateItem } = this.props
    const value = ev.target.value
    updateItem(slotId, id, itemKey, value)
  }

  render() {
    const { name, itemKey, defaultValue, placeholder, title } = this.props
    const key = name + '-' + itemKey
    return (
      <FormGroup row>
        <Label for={key} sm="2">{title}</Label>
        <Col sm="10">
          <Input type="text" id={key} placeholder={placeholder} defaultValue={defaultValue}
            onChange={this.handleChange}/>
        </Col>
      </FormGroup>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state
}

const ConnectedTextInput = connect(mapStateToProps, actions)(TextInput)
export default ConnectedTextInput
