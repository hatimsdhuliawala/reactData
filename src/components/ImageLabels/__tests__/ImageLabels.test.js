import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from '../../../store/configureStore'
import ImageLabels from '../ImageLabels'

describe('Image Labels component', () => {
  const store = configureStore()

  it('renders', () => {
    const div = document.createElement('div')
    shallow(
      <Provider store={store}>
        <ImageLabels />
      </Provider>, div)
  })
})
