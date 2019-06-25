import React from 'react'
import { shallow } from 'enzyme'
import { Layout } from '../Layout'

describe('Layout component', () => {
  it('renders', () => {
    const props = {
      headerTitle: 'testName',
      componentName: 'DefaultContent',
    }

    const layout = shallow(
      <Layout {...props} />
    )

    expect(layout).toHaveLength(1)
  })
})
