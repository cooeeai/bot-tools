import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class App extends Component {

  render() {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state
}

const ConnectedApp = connect(mapStateToProps, actions)(App)
export default ConnectedApp
