import React from 'react'
import { IndexRedirect, Route } from 'react-router'
import App from '../containers/App'
import SlotList from '../containers/SlotList'
import SlotDetail from '../containers/SlotDetail'

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/slots"/>
    <Route path="/slots" component={SlotList}/>
    <Route path="/slots/:slotId" component={SlotDetail}/>
  </Route>
)
