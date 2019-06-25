/* eslint-disable */
// lint disabled here because i had to make magic with imports
import * as tableActions from '../tableActions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {initialState} from '../reducer'
import rulesReducer from '../reducer'
/* eslint-enable */

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
var store

function applyActions () {
  let state = store.getState()
  let actions = store.getActions()
  for (let i = 0; i < actions.length; i++) {
    state = rulesReducer(state, actions[i])
  }
  store = mockStore({
    ...state,
  })
}

describe('rulesTableActions', () => {
  let rules

  beforeEach(() => {
    /*
     * {
          tcin: 52722471,
          title: 'Men\'s Knit Joggers - Goodfellow & Co&#153; Orchid',
          rules: [
            {
              priority: 5,
              sizeChart: {
                category: 'men-bottoms',
                brand: 'good-fellow',
                size: 'regular',
              },
            },
          ],
        }
     */
    rules = {
      'boys-toddler-sleepwear': {
        items: 1984,
        ruleCount: 1,
        brands: {
          'cat-and-jack': {
            items: 1984,
            ruleCount: 1,
            sizes: {
              'toddler': {
                items: 1984,
                ruleCount: 1,
                rules: {
                  'toddler-cat-jack-sleepwear': {
                    items: 1984,
                  },
                },
              },
            },
          },
        },
      },
    }
    store = mockStore({
      ...initialState,
    })
  })

  describe('filterTest', () => {
    it('should filter some more data', () => {
      store.dispatch(tableActions.filterRules('boys-toddler-sleepwear', rules))
      applyActions()
      let filteredRules = store.getState().filteredRules
      expect(filteredRules).toEqual(
        {
          'boys-toddler-sleepwear': {
            items: 1984,
            ruleCount: 1,
            brands: {
              'cat-and-jack': {
                items: 1984,
                ruleCount: 1,
                sizes: {
                  'toddler': {
                    items: 1984,
                    ruleCount: 1,
                    rules: {
                      'toddler-cat-jack-sleepwear': {
                        items: 1984,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      )
    })
  })

  describe('expandRuleIndex', () => {
    it('should expand a level', () => {
      store.dispatch(tableActions.expandRuleIndex(1, [0], 1))
      applyActions()
      let expanded = store.getState().expanded
      expect(expanded.length).toBe(2)
      expect(expanded).toEqual([0, 1])
    })

    it('should contract a level', () => {
      store.dispatch(tableActions.expandRuleIndex(1, [0, 1], 0))
      applyActions()
      let expanded = store.getState().expanded
      expect(expanded.length).toBe(1)
      expect(expanded).toEqual([1])
    })

    it('should expand horrizontally', () => {
      store.dispatch(tableActions.expandRuleIndex(0, [1], 0))
      applyActions()
      let expanded = store.getState().expanded
      expect(expanded.length).toBe(1)
      expect(expanded).toEqual([0])
    })
  })
})
