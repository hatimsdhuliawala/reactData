import {
  OPEN_SIDE_NAV,
  CLOSE_SIDE_NAV,
  SHOW_AUTH_POPUP,
  SET_HEADER_TITLE,
} from './actionType'

export function openSideNav () {
  return {
    type: OPEN_SIDE_NAV,
  }
}

export function closeSideNav () {
  return {
    type: CLOSE_SIDE_NAV,
  }
}

export function showAuthPopup (popupType) {
  return {
    type: SHOW_AUTH_POPUP,
    payload: popupType,
  }
}

export function setHeaderTitle (headerTitle) {
  return {
    type: SET_HEADER_TITLE,
    payload: headerTitle,
  }
}
