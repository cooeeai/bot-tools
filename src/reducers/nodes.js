import {
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE,
  TOGGLE_NODE_DISPLAY,
  TOGGLE_ITEM_DISPLAY,
  UPDATE_ITEM,
  LOAD_SLOTS_SUCCESS,
  LOAD_SLOTS_FAILURE,
  CREATE_SLOT_SUCCESS,
  CREATE_SLOT_FAILURE,
  REMOVE_SLOT_SUCCESS,
  REMOVE_SLOT_FAILURE
} from '../actions'

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [ ...state, action.childId ]
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

const item = (state, action) => {
  switch (action.type) {
    case TOGGLE_ITEM_DISPLAY:
      return {
        ...state,
        collapsed: !state.collapsed
      }
    default:
      return state
  }
}

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
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
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds || [], action)
      }
    case TOGGLE_NODE_DISPLAY:
      return {
        ...state,
        settings: {
          ...state.settings,
          _self: {
            ...state.settings._self,
            collapsed: !state.settings._self.collapsed
          }
        }
      }
    case TOGGLE_ITEM_DISPLAY:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.itemKey]: item(state.settings[action.itemKey], action)
        }
      }
    case UPDATE_ITEM:
      return {
        ...state,
        [action.itemKey]: action.value
      }
    default:
      return state
  }
}

const getAllDescendantIds = (state, nodeId) => {
  // firebase doesn't persist empty arrays or objects
  if (state[nodeId].childIds) {
    return state[nodeId].childIds.reduce((acc, childId) => (
      [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
    ), [])
  } else {
    return []
  }
}

const deleteMany = (state, ids) => {
  state = { ...state }
  ids.forEach(id => delete state[id])
  return state
}

const nodes = (state = {}, action) => {
  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId)
    return deleteMany(state, [ nodeId, ...descendantIds ])
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  }
}

export default (state = {}, action) => {
  const { slotId } = action
  switch (action.type) {
    case LOAD_SLOTS_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case CREATE_SLOT_SUCCESS:
      const newSlot = action.payload
      if (state.hasOwnProperty(newSlot.id)) {
        return state
      } else {
        return {
          ...state,
          [newSlot.id]: newSlot
        }
      }
    case REMOVE_SLOT_SUCCESS:
      if (state.hasOwnProperty(slotId)) {
        const slots = { ...state }
        delete slots[slotId]
        return slots
      } else {
        return state
      }
    case LOAD_SLOTS_FAILURE:
    case CREATE_SLOT_FAILURE:
    case REMOVE_SLOT_FAILURE:
    default:
      if (typeof slotId === 'undefined') {
        return state
      }
      return {
        ...state,
        [slotId]: {
          ...state[slotId],
          nodes: nodes(state[slotId].nodes, action)
        }
      }
    }
}
