import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Button } from 'reactstrap'

import '../styles/SlotList.css'

export class SlotList extends Component {

  componentWillMount() {
    const { loadSlots, registerSlotListeners } = this.props
    loadSlots()
    setTimeout(registerSlotListeners, 3000)
  }

  handleAddClick = (ev) => {
    ev.preventDefault()
    const { createSlot } = this.props
    createSlot()
  }

  handleClick(slotId) {
    const { link } = this.props
    link(slotId)
  }

  handleRemoveClick(slotId) {
    const { removeSlot } = this.props
    removeSlot(slotId)
  }

  render() {
    const slots = Object.keys(this.props.slots).map((key) => {
      return this.props.slots[key];
    })
    return (
      <div className="list">
        <Button size="sm" className="pull-right" onClick={this.handleAddClick}>
          <b className="icon-plus"/> Add
        </Button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, i) =>
              <tr key={'slot-' + i}>
                <td>
                  <a href="#" onClick={() => this.handleClick(slot.id)}>{slot.name}</a>
                  <div className="node-buttons">
                    <a href="#" onClick={() => this.handleRemoveClick(slot.id)}
                       style={{ color: 'red', textDecoration: 'none' }}>
                      ×
                    </a>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { slots } = state
  return {
    slots
  }
}

const ConnectedSlotList = connect(mapStateToProps, actions)(SlotList)
export default ConnectedSlotList
