import { showNotification } from '../actionCreator'
import { SHOW_NOTIFICATION } from '../actionType'

describe('notification actions', () => {
  it('should create an action to show a notification', () => {
    const isShown = true
    const message = 'konnichia'

    const expectedAction = {
      type: SHOW_NOTIFICATION,
      payload: {
        message,
        isShown,
      },
    }
    expect(showNotification(isShown, message)).toEqual(expectedAction)
  })
})
