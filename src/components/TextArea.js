import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Button, Col, FormGroup, Input, Label } from 'reactstrap'

export class TextArea extends Component {
  toggleDisplay = (ev) => {
    ev.preventDefault()
    const { slotId, toggleItemDisplay, id, itemKey } = this.props
    toggleItemDisplay(slotId, id, itemKey)
  }

  handleChange = (ev) => {
    const { slotId, id, itemKey, updateItem, serialize } = this.props
    const rawval = ev.target.value
    let value
    if (typeof serialize === 'function' && rawval) {
      value = serialize(rawval)
    } else {
      value = rawval
    }
    updateItem(slotId, id, itemKey, value)
  }

  render() {
    const { name, itemKey, title, defaultValue, settings, deserialize } = this.props
    const key = name + '-' + itemKey
    let value
    if (typeof deserialize === 'function' && defaultValue) {
      value = deserialize(defaultValue)
    } else {
      value = defaultValue
    }
    return (
      <FormGroup row>
        <Label for={key} sm="2">
          {title}
          <Button color="secondary" size="sm" className="pull-right" onClick={this.toggleDisplay}>
            ...
          </Button>
        </Label>
        {settings[itemKey].collapsed ? (
          defaultValue ?
            <Col sm="10">
              <pre>{value}</pre>
            </Col>
            :
            null
          ) :
          <Col sm="10">
            <Input type="textarea" id={key} defaultValue={value} rows={8}
              onChange={this.handleChange}/>
          </Col>
        }
      </FormGroup>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state
}

const ConnectedTextArea = connect(mapStateToProps, actions)(TextArea)
export default ConnectedTextArea
