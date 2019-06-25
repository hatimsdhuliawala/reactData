import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from '../../../store/configureStore'
import { Notifications } from '../Notifications'

describe('Notifications component', () => {
  const store = configureStore()
  it('renders', () => {
    shallow(
      <Provider store={store}>
        <Notifications />
      </Provider>
    )
  })
})
