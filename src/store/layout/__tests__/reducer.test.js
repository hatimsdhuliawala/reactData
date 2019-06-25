import layoutReducer, { initialState } from '../reducer'
import {
  OPEN_SIDE_NAV,
  CLOSE_SIDE_NAV,
  SET_HEADER_TITLE,
} from '../actionType'

describe('layoutReducer', () => {
  it('should return the initial state', () => {
    expect(layoutReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle OPEN_SIDE_NAV', () => {
    const data = {
      sideNavIsOpen: true,
    }
    const action = {
      type: OPEN_SIDE_NAV,
      payload: data,
    }

    expect(layoutReducer(initialState, action)).toEqual({
      ...initialState,
      ...data,
    })
  })

  it('should handle CLOSE_SIDE_NAV', () => {
    const data = {
      sideNavIsOpen: false,
    }
    const action = {
      type: CLOSE_SIDE_NAV,
      payload: data,
    }

    expect(layoutReducer(initialState, action)).toEqual({
      ...initialState,
      ...data,
    })
  })

  it('should handle SET_HEADER_TITLE', () => {
    const data = {
      headerTitle: 'ohayo gozaimasu',
    }
    const action = {
      type: SET_HEADER_TITLE,
      payload: data,
    }

    expect(layoutReducer(initialState, action))
  })
})
