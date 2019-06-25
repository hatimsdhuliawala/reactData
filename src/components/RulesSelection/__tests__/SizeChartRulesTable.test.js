import ShallowRenderer from 'react-test-renderer/shallow'
import RulesTable from '../Components/SizeChartRulesTable'
import React from 'react'

const topLevelRules = [
  {
    category: 'baby-bedding',
    brand: '',
    size: '',
    items: 2395,
    rules: 9,
  },
  {
    category: 'baby-travel',
    brand: '',
    size: '',
    priority: undefined,
    items: 1198,
    rules: 11,
  },
  {
    category: 'boys-toddler-sleepwear',
    brand: '',
    size: '',
    priority: undefined,
    items: 1984,
    rules: 27,
  },
  {
    category: 'electronics wearable tech',
    brand: '',
    size: '',
    priority: undefined,
    items: 98,
    rules: 12,
  },
  {
    category: 'girls-toddler-outerwear',
    brand: '',
    size: '',
    priority: undefined,
    items: 290,
    rules: 5,
  },
  {
    category: 'girls-toddler-uniforms',
    brand: '',
    size: '',
    priority: undefined,
    items: 154,
    rules: 2,
  },
  {
    category: 'home-bedding',
    brand: '',
    size: '',
    priority: undefined,
    items: 456,
    rules: 15,
  },
  {
    category: 'pet-apparel-costumes',
    brand: '',
    size: '',
    priority: undefined,
    items: 102,
    rules: 4,
  },
  {
    category: 'men-blazers-jackets',
    brand: '',
    size: '',
    priority: undefined,
    items: 88,
    rules: 11,
  },
  {
    category: 'men-shirts',
    brand: '',
    size: '',
    priority: undefined,
    items: 158,
    rules: 8,
  },
  {
    category: 'women-activewear',
    brand: '',
    size: '',
    priority: undefined,
    items: 1005,
    rules: 36,
  },
  {
    category: 'women-dresses',
    brand: '',
    size: '',
    priority: undefined,
    items: 3145,
    rules: 95,
  },
  {
    category: 'women-jumpsuits-rompers',
    brand: '',
    size: '',
    priority: undefined,
    items: 302,
    rules: 4,
  },
]

describe('Rules Table', () => {
  let renderer

  beforeEach(() => {
    renderer = new ShallowRenderer()
  })

  it('Should Render the top level table', () => {
    const tree = renderer.render(
      <RulesTable
        rules={topLevelRules}
      />
    )
    expect(tree).toMatchSnapshot('Rules Table Top Level')
  })
})
