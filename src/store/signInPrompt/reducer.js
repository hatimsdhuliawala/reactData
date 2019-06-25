import {
  OPEN_STATE,
} from './actionType'
import { DefaultState } from '../../components/SignInPrompt/SignInPromptData'

export default function uploadReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case OPEN_STATE: {
      const { payload } = action
      const newState = {
        ...state,
        openState: payload.openState,
      }
      return newState
    }
    default:
      return state
  }
}
