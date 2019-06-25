import {
  openSideNav,
  closeSideNav,
  showAuthPopup,
  setHeaderTitle,
} from '../actionCreator'

import {
  OPEN_SIDE_NAV,
  CLOSE_SIDE_NAV,
  SHOW_AUTH_POPUP,
  SET_HEADER_TITLE,
} from '../actionType'

describe('layout actions', () => {
  it('should create an action to open the sidenav', () => {
    const expectedAction = {
      type: OPEN_SIDE_NAV,
    }
    expect(openSideNav()).toEqual(expectedAction)
  })

  it('should create an action to close the sidenav', () => {
    const expectedAction = {
      type: CLOSE_SIDE_NAV,
    }
    expect(closeSideNav()).toEqual(expectedAction)
  })

  it('should create an action to show the auth popup', () => {
    const data = 'testPopup'
    const expectedAction = {
      type: SHOW_AUTH_POPUP,
      payload: data,
    }
    expect(showAuthPopup(data)).toEqual(expectedAction)
  })

  it('should create an action to set the header title', () => {
    const data = 'ohayo gozaimasu'
    const expectedAction = {
      type: SET_HEADER_TITLE,
      payload: data,
    }
    expect(setHeaderTitle(data)).toEqual(expectedAction)
  })
})
