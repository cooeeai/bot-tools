import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Node from './Node'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import JSONTree from 'react-json-tree'

import '../styles/SlotDetail.css'

export class SlotDetail extends Component {
  toggle = () => {
    const { toggleModal } = this.props
    toggleModal()
  }

  handleSave = (slotId, nodeId) => {
    //const { slots, toggleModal } = this.props
    //const nodes = slots[slotId].nodes
    //toggleModal(nodeAsJson(nodes, nodeId))
    const { saveSlot } = this.props
    saveSlot(slotId, nodeId)
  }

  render() {
    const { modal: { collapsed, body }, params: { slotId } } = this.props
    const theme = {
      scheme: 'grayscale',
      author: 'alexandre gavioli (https://github.com/alexx2/)',
      base00: '#101010',
      base01: '#252525',
      base02: '#464646',
      base03: '#525252',
      base04: '#ababab',
      base05: '#b9b9b9',
      base06: '#e3e3e3',
      base07: '#f7f7f7',
      base08: '#7c7c7c',
      base09: '#999999',
      base0A: '#a0a0a0',
      base0B: '#8e8e8e',
      base0C: '#868686',
      base0D: '#686868',
      base0E: '#747474',
      base0F: '#5e5e5e'
    }
    return (
      <div>
        <Node slotId={slotId} id={slotId} saveAction={this.handleSave}/>
        <Modal isOpen={!collapsed} toggle={this.toggle}>
          <ModalHeader>
            Test Results
          </ModalHeader>
          <ModalBody id="modalBody">
            <JSONTree data={body || {}} theme={theme}/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

/*
function nodeAsJson(nodes, nodeId) {
  function loop(nd) {
    return {
      name: nd.name,
      question: nd.question,
      parseApi: nd.parseApi,
      parseExpr: nd.parseExpr,
      enumeration: nd.enumeration,
      validateExpr: nd.validateExpr,
      invalidMessage: nd.invalidMessage,
      confirm: nd.confirm,
      children: nd.childIds.map((id) => {
        return loop(nodes[id])
      }),
      settings: nd.settings
    }
  }

  const node = nodes[nodeId]
  return {
    name: node.name,
    children: node.childIds.map((id) => {
      return loop(nodes[id])
    })
  }
}*/

function mapStateToProps(state, ownProps) {
  return state
}

const ConnectedSlotDetail = connect(mapStateToProps, actions)(SlotDetail)
export default ConnectedSlotDetail
