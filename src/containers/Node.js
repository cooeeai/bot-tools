import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Button, Form } from 'reactstrap'
import ApiInput from '../components/ApiInput'
import NameInput from '../components/NameInput'
import TextArea from '../components/TextArea'
import TextInput from '../components/TextInput'

import '../styles/Node.css'

export class Node extends Component {
  handleAddSiblingClick = (ev) => {
    ev.preventDefault()
    const { addChild, createNode, slotId, parentId } = this.props
    const childId = createNode(slotId).nodeId
    addChild(slotId, parentId, childId)
  }

  handleAddChildClick = (ev) => {
    ev.preventDefault()
    const { addChild, createNode, slotId, id } = this.props
    const childId = createNode(slotId).nodeId
    addChild(slotId, id, childId)
  }

  handleRemoveClick = (ev) => {
    ev.preventDefault()
    const { removeChild, deleteNode, slotId, parentId, id } = this.props
    removeChild(slotId, parentId, id)
    deleteNode(slotId, id)
  }

  handleSaveClick = (ev) => {
    ev.preventDefault()
    const { slotId, id, saveAction } = this.props
    saveAction(slotId, id)
  }

  handleDeployClick = (ev) => {
    ev.preventDefault()
  }

  toggleDisplay = (ev) => {
    ev.preventDefault()
    const { slotId, toggleNodeDisplay, id } = this.props
    toggleNodeDisplay(slotId, id)
  }

  renderChild = childId => {
    const { slotId, id } = this.props
    return (
      <li key={childId}>
        <ConnectedNode slotId={slotId} id={childId} parentId={id} />
      </li>
    )
  }

  render() {
    const {
      name,
      question,
      parseExpr,
      enumeration,
      validateExpr,
      invalidMessage,
      confirm,
      parentId,
      childIds,
      settings
    } = this.props
    const collapsed = settings._self.collapsed
    const detail = (
      <div>
        {typeof parentId !== 'undefined' &&
          <Form>
            <TextInput {...this.props} itemKey="question"
              title="Question"
              placeholder="Question"
              defaultValue={question}/>
            <ApiInput {...this.props}/>
            <TextArea {...this.props} itemKey="parseExpr"
              title="Parse Expr"
              defaultValue={parseExpr}/>
            <TextArea {...this.props} itemKey="enumeration"
              title="Enumeration"
              defaultValue={enumeration}
              deserialize={val => val.join('\n')}
              serialize={val => val.trim().split('\n')}/>
            <TextArea {...this.props} itemKey="validateExpr"
              title="Validate Expr"
              defaultValue={validateExpr}/>
            <TextInput {...this.props} itemKey="invalidMessage"
              title="Invalid Msg"
              placeholder="Invalid message"
              defaultValue={invalidMessage}/>
            <TextInput {...this.props} itemKey="invalidMessage"
              title="Confirm"
              placeholder="Confirmation message"
              defaultValue={confirm}/>
          </Form>
        }
        <ul>
          {childIds && childIds.map(this.renderChild)}
          <li key="add">
            <a href="#" onClick={this.handleAddChildClick}>
              Add child
            </a>
          </li>
        </ul>
      </div>
    )
    const plusMinus = collapsed ? 'fa fa-plus-square-o' : 'fa fa-minus-square-o'
    return (
      <div className="container">
        <div className="node-heading">
          <a href="#" onClick={this.toggleDisplay}>
            <i className={plusMinus} aria-hidden="true"></i>
          </a>
          <NameInput {...this.props} itemKey="name" defaultValue={name} collapsed={settings.name.collapsed}/>
          {typeof parentId === 'undefined' ?
            <div className="action-buttons pull-right">
              <Button color="secondary" size="sm" onClick={this.handleSaveClick}>
                Save
              </Button>
              <Button color="secondary" size="sm" onClick={this.handleDeployClick}>
                Deploy
              </Button>
            </div>
            :
            <div className="node-buttons">
              <Button color="secondary" size="sm" onClick={this.handleAddSiblingClick}>
                +
              </Button>
              <a href="#" onClick={this.handleRemoveClick}
                 style={{ color: 'red', textDecoration: 'none' }}>
                ×
              </a>
            </div>
          }
        </div>
        {!collapsed && detail}
      </div>
    )
  }
}

// function textToHTML(text) {
//   if (text) {
//     return text.split('\n').map(line => '<div>' + line + '</div>').join('');
//   } else {
//     return '';
//   }
// }

function mapStateToProps(state, ownProps) {
  return state.slots[ownProps.slotId].nodes[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
