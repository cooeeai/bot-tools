import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Button, InputGroup, InputGroupButton, Input, Label } from 'reactstrap'

import '../styles/NameInput.css'

export class NameInput extends Component {
  handleClick = ev => {
    ev.preventDefault()
    const { slotId, toggleItemDisplay, id, itemKey } = this.props
    toggleItemDisplay(slotId, id, itemKey)
  }

  updateName = ev => {
    ev.preventDefault()
    const { slotId, toggleItemDisplay, updateItem, id, itemKey } = this.props
    // get from local state
    const name = this.value
    updateItem(slotId, id, itemKey, name)
    toggleItemDisplay(slotId, id, itemKey)
  }

  handleChange = ev => {
    ev.preventDefault()
    // store in local state
    this.value = ev.target.value
  }

  render() {
    const { defaultValue, collapsed } = this.props
    if (collapsed) {
      return (
        <label>
          Slot: <a href="#" onClick={this.handleClick}>{defaultValue}</a>
        </label>
      )
    } else {
      return (
        <Label className="name-input expanded">
          Slot: <div>
            <InputGroup>
              <Input type="input" defaultValue={defaultValue} onChange={this.handleChange}/>
              <InputGroupButton>
                <Button className="btn-outline-info" onClick={this.updateName}>
                  <i className="icon-check"/>
                </Button>
                <Button className="btn-outline-info" onClick={this.handleClick}>
                  <i className="icon-close"/>
                </Button>
              </InputGroupButton>
            </InputGroup>
          </div>
        </Label>
      )
    }
  }
}

function mapStateToProps(state, ownProps) {
  return state
}

const ConnectedNameInput = connect(mapStateToProps, actions)(NameInput)
export default ConnectedNameInput
