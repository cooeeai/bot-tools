import request from 'request'
import { push } from 'redux-router'
import generateID from '../helpers/generateID'

export const INCREMENT = 'INCREMENT'
export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'
export const TOGGLE_NODE_DISPLAY = 'TOGGLE_NODE_DISPLAY'
export const TOGGLE_ITEM_DISPLAY = 'TOGGLE_ITEM_DISPLAY'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const TEST_API = 'TEST_API'
export const SAVE_NODE = 'SAVE_NODE'
export const LOAD_SLOTS = 'LOAD_SLOTS'
export const LOAD_SLOTS_SUCCESS = 'LOAD_SLOTS_SUCCESS'
export const LOAD_SLOTS_FAILURE = 'LOAD_SLOTS_FAILURE'
export const UPDATE_ITEM = 'UPDATE_ITEM'
export const CREATE_SLOT = 'CREATE_SLOT'
export const CREATE_SLOT_SUCCESS = 'CREATE_SLOT_SUCCESS'
export const CREATE_SLOT_FAILURE = 'CREATE_SLOT_FAILURE'
export const REMOVE_SLOT = 'REMOVE_SLOT'
export const REMOVE_SLOT_SUCCESS = 'REMOVE_SLOT_SUCCESS'
export const REMOVE_SLOT_FAILURE = 'REMOVE_SLOT_FAILURE'

//let nextId = 0
export const createNode = (slotId) => ({
  type: CREATE_NODE,
  slotId,
  //nodeId: `new_${nextId++}`
  nodeId: generateID()
})

export const deleteNode = (slotId, nodeId) => ({
  type: DELETE_NODE,
  slotId,
  nodeId
})

export const addChild = (slotId, nodeId, childId) => ({
  type: ADD_CHILD,
  slotId,
  nodeId,
  childId
})

export const removeChild = (slotId, nodeId, childId) => ({
  type: REMOVE_CHILD,
  slotId,
  nodeId,
  childId
})

export const toggleNodeDisplay = (slotId, nodeId) => ({
  type: TOGGLE_NODE_DISPLAY,
  slotId,
  nodeId
})

export const toggleItemDisplay = (slotId, nodeId, itemKey) => ({
  type: TOGGLE_ITEM_DISPLAY,
  slotId,
  nodeId,
  itemKey
})

export const toggleModal = (results) => ({
  type: TOGGLE_MODAL,
  results: results
})

export const testApi = (api, input, cb) => {
  request(api.replace('%s', escape(input)), (err, resp, body) => {
    if (!err && resp.statusCode === 200) {
      cb(body)
    } else {
      cb(err)
    }
  })
  return {
    type: TEST_API
  }
}

export const loadSlots = () => {
  return (dispatch, getState) => {
    const { firebase } = getState()
    const ref = firebase.database().ref('slots')
    dispatch({
      type: LOAD_SLOTS
    })
    ref.limitToLast(50).once('value', (snapshot) => {
      return dispatch({
        type: LOAD_SLOTS_SUCCESS,
        payload: snapshot.val(),
        meta: {
          timestamp: Date.now()
        }
      })
    }, (err) => {
      return dispatch({
        type: LOAD_SLOTS_FAILURE,
        payload: err
      })
    })
  }
}

export const createSlot = () => {
  return (dispatch, getState) => {
    const { firebase } = getState()
    const slotId = generateID()
    dispatch({
      type: CREATE_SLOT
    })
    const newSlot = {
      id: slotId,
      name: 'changeme',
      nodes: {
        [slotId]: {
          id: slotId,
          name: 'changeme',
          childIds: [],
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
      }
    }
    const ref = firebase.database().ref(`slots/${slotId}`)
    ref.set(newSlot).then(() => {
      dispatch({
        type: CREATE_SLOT_SUCCESS,
        payload: newSlot
      })
    }).catch((err) => {
      dispatch({
        type: CREATE_SLOT_FAILURE,
        payload: err
      })
    })
  }
}

export const removeSlot = (slotId) => {
  return (dispatch, getState) => {
    const { firebase } = getState()
    const ref = firebase.database().ref(`slots/${slotId}`)
    dispatch({
      type: REMOVE_SLOT,
      slotId
    })
    ref.remove().then(() => {
      dispatch({
        type: REMOVE_SLOT_SUCCESS,
        slotId
      })
    }).catch((err) => {
      dispatch({
        type: REMOVE_SLOT_FAILURE,
        slotId,
        payload: err
      })
    })
  }
}

export const saveSlot = (slotId, nodeId) => {
  return (dispatch, getState) => {
    const { firebase, slots } = getState()
    const ref = firebase.database().ref(`slots/${slotId}`)
    dispatch({
      type: SAVE_NODE
    })
    ref.set({
      ...slots[slotId],
      name: slots[slotId].nodes[nodeId].name
    })
  }
}

export const registerSlotListeners = () => {
  return (dispatch, getState) => {
    const { firebase } = getState()
    const ref = firebase.database().ref('slots')
    // fires first time anyway
    ref.limitToLast(50).on('child_added', (snapshot) => {
      return dispatch({
        type: CREATE_SLOT_SUCCESS,
        payload: snapshot.val(),
        meta: {
          timestamp: Date.now()
        }
      })
    }, (err) => {
      return dispatch({
        type: CREATE_SLOT_FAILURE,
        payload: err
      })
    })
    ref.limitToLast(50).on('child_removed', (snapshot) => {
      return dispatch({
        type: REMOVE_SLOT_SUCCESS,
        slotId: snapshot.val().id,
        meta: {
          timestamp: Date.now()
        }
      })
    }, (err) => {
      return dispatch({
        type: REMOVE_SLOT_FAILURE,
        payload: err
      })
    })
  }
}

export const link = (slotId) => {
  return (dispatch, getState) => {
    dispatch(push('/slots/' + slotId))
  }
}

export const updateItem = (slotId, nodeId, itemKey, value) => ({
  type: UPDATE_ITEM,
  slotId,
  nodeId,
  itemKey,
  value
})
