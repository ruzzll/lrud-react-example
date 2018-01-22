import { createAction, handleActions } from 'redux-actions'

// Actions
export const FOCUS_UPDATE = 'FOCUS_UPDATE'

// Action creators
export const updateFocus = createAction(FOCUS_UPDATE)

// State
const initialState = {
  focused: {
    title: '',
    subtitle: '',
    description: ''
  }
}

// Reducer
const reducer = handleActions({
  [updateFocus]: (state, action) => Object.assign({}, state, { focused: action.payload })
}, initialState)

export default reducer

// Selectors
export const getFocused = (state) => state.focused
