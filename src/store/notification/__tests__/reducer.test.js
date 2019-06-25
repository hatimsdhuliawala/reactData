import notificationReducer, { initialState } from '../reducer'
import { SHOW_NOTIFICATION } from '../actionType'

describe('notification reducer', () => {
  it('returns the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState)
  })

  it('handles SHOW_NOTIFICATION', () => {
    const data = {
      isShown: true,
      message: 'konnichiwa',
    }
    const action = {
      type: SHOW_NOTIFICATION,
      payload: data,
    }
    expect(notificationReducer(initialState, action)).toEqual({
      ...initialState,
      isShown: data.isShown,
      message: data.message,
    })
  })
})
