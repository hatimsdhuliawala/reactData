import {
  CLOSE_SIDE_NAV,
  OPEN_SIDE_NAV,
  SHOW_AUTH_POPUP,
  SET_HEADER_TITLE,
} from './actionType'

export const initialState = {
  sideNavIsOpen: false,
  openPopup: 0,
  popupType: '',
  headerTitle: '',
}

export default function layoutReducer (state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_SIDE_NAV: {
      const newState = {
        ...state,
        sideNavIsOpen: true,
      }
      return newState
    }
    case CLOSE_SIDE_NAV: {
      const newState = {
        ...state,
        sideNavIsOpen: false,
      }
      return newState
    }
    case SHOW_AUTH_POPUP: {
      const { payload } = action
      const newState = {
        ...state,
        openPopup: state.openPopup + 1,
        popupType: payload,
      }
      return newState
    }
    case SET_HEADER_TITLE: {
      const { payload } = action
      const newState = {
        ...state,
        headerTitle: payload,
      }
      return newState
    }
    default:
      return state
  }
}
