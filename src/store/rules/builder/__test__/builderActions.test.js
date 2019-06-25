import * as actions from '../rulesBuilderActions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import reducer, { initialState } from '../reducer'
import * as mockData from './mockData'

describe('Rules Builder Action Test: ', () => {
  let middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store

  beforeEach(() => {
    store = mockStore({
      ...initialState,
    })
  })

  describe('setRuleName', () => {
    it('should set the rule name', () => {
      store.dispatch(actions.setRuleName('test'))
      applyActions()
      const { name } = store.getState()
      expect(name).toEqual('test')
    })
  })

  describe('setRulePriority', () => {
    it('should set the rule priority', () => {
      store.dispatch(actions.setRulePriority(5))
      applyActions()
      const { priority } = store.getState()
      expect(priority).toEqual(5)
    })
  })

  describe('resetState', () => {
    it('should reset the state', () => {
      store = mockStore({
        ...store.getState,
        ruleAttributes: mockData.ruleAttributes,
        conditions: mockData.borgAssimilationCriteriaParsed,
      })
      store.dispatch(actions.resetState())
      applyActions()
      const {
        ruleAttributes,
        conditions,
      } = store.getState()
      expect(ruleAttributes).toEqual([])
      expect(conditions).toEqual([{
        key: 'relationship_type',
        display: 'Relationship Type',
        values: ['VAP', 'VPC'],
        displayValues: ['VAP', 'VPC'],
      }])
    })
  })

  describe('sendWarning', () => {
    it('should set the rules builder warning', () => {
      store.dispatch(actions.sendWarning({
        open: true,
        message: 'this is set',
        ignore: false,
      }))
      applyActions()
      expect(store.getState().warning).toEqual({
        open: true,
        message: 'this is set',
        ignore: false,
      })
    })
  })

  // applies the actions in the reducer
  // then updates the state so further testing is still possible
  function applyActions () {
    let state = store.getState()
    let actions = store.getActions()
    for (let i = 0; i < actions.length; i++) {
      state = reducer(state, actions[i])
    }
    store = mockStore({
      ...state,
    })
  }
})
