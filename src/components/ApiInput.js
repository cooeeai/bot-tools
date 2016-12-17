import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Button, Col, FormGroup, InputGroup, InputGroupButton, Input, Label } from 'reactstrap'

export class ApiInput extends Component {
  toggleDisplay = (ev) => {
    ev.preventDefault()
    const { slotId, toggleItemDisplay, id } = this.props
    toggleItemDisplay(slotId, id, 'parseApi')
  }

  handleChange = (ev) => {
    const { slotId, id, updateItem } = this.props
    const value = ev.target.value
    updateItem(slotId, id, 'parseApi', value)
  }

  handleTestInputChange = (ev) => {
    ev.preventDefault()
    this.testInputValue = ev.target.value
  }

  testApi = (ev) => {
    ev.preventDefault()
    const { parseApi, testApi, toggleModal } = this.props
    testApi(parseApi, this.testInputValue, (body) => {
      toggleModal(JSON.parse(body))
    })
  }

  render() {
    const { name, parseApi, settings } = this.props
    return (
      <FormGroup row>
        <Label for={name + '-parseApi'} sm="2">
          Parse API
          <Button color="secondary" size="sm" className="pull-right" onClick={this.toggleDisplay}>
            ...
          </Button>
        </Label>
        {settings.parseApi.collapsed ? (
          parseApi ?
            <Col sm="10">
              <div className="readonly">{parseApi}</div>
            </Col>
            :
            null
          ) :
          <div>
            <Col sm="10">
              <Input type="text" id={name + '-parseApi'} placeholder="Parse API" defaultValue={parseApi}
                onChange={this.handleChange}/>
            </Col>
            <Col sm="10">
              <InputGroup>
                <Input type="text" placeholder="Test input" onBlur={this.handleTestInputChange}/>
                <InputGroupButton>
                  <Button className="btn-outline-info" onClick={this.testApi}>Test</Button>
                </InputGroupButton>
              </InputGroup>
            </Col>
          </div>
        }
      </FormGroup>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state[ownProps.id] || {}
}

const ConnectedApiInput = connect(mapStateToProps, actions)(ApiInput)
export default ConnectedApiInput
