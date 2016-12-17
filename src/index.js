import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'
import configureStore from './store/configureStore'
// import generateTree from './generateTree'
import Root from './containers/Root'
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID
} from './config'

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

/*
const { rootKey, tree } = generateTree()
const initializedTree = Object.keys(tree).reduce((accum, key) => {
  accum[key] = {
    ...tree[key],
    settings: {
      _self: {
        collapsed: false
      },
      name: {
        collapsed: true
      },
      parseApi: {
        collapsed: true
      },
      parseExpr: {
        collapsed: true
      },
      enumeration: {
        collapsed: true
      },
      validateExpr: {
        collapsed: true
      },
      invalidMessage: {
        collapsed: true
      }
    }
  }
  return accum
}, {})*/

const store = configureStore({
  // slots: {
  //   [rootKey]: {
  //     id: rootKey,
  //     name: 'purchase',
  //     nodes: {
  //       ...initializedTree
  //     }
  //   }
  // },
  slots: {},
  modal: {
    collapsed: true,
    body: {}
  },
  firebase
})

render(
  <Root store={store}/>,
  document.getElementById('root')
)
