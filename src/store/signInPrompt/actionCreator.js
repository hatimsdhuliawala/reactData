import {
  OPEN_STATE,
} from './actionType'

export function openstateHandler (value) {
  return {
    type: OPEN_STATE,
    payload: {
      openState: value,
    },
  }
}
