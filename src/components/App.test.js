import React from 'react'
import { shallow } from 'enzyme'

describe('App component', () => {
  document.body.innerHTML =
    '<div>' +
    '  <script />' +
    '</div>'

  const App = require('./App').default

  it('renders', () => {
    shallow(<App />)
  })
})
