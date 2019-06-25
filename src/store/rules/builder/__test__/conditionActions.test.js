import * as actions from '../conditionActions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import reducer, { initialState } from '../reducer'
import * as mockData from './mockData'
import * as attributeNames from '../SearchCriteriaStandardNames'

describe('Condition Actions Test: ', () => {
  let middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store

  beforeEach(() => {
    store = mockStore({
      ...initialState,
      ruleAttributes: mockData.ruleAttributes,
    })
  })

  describe('setRelationType tests', () => {
    it('should set relationship type 0', () => {
      store.dispatch(actions.setRelationType(0))
      applyActions()
      const { conditions, relationIndex, needsRefresh } = store.getState()
      expect(relationIndex).toBe(0)
      expect(conditions[0]).toEqual(
        {
          key: attributeNames.RELATIONSHIP_TYPE,
          display: 'Relationship Type',
          values: ['VAP', 'VPC'],
          displayValues: ['VAP', 'VPC'],
          operator: 'IN',
        }
      )
      expect(needsRefresh).toBeTruthy()
    })

    it('should set relationship type 1', () => {
      store.dispatch(actions.setRelationType(1))
      applyActions()
      const { conditions, relationIndex, needsRefresh } = store.getState()
      expect(relationIndex).toBe(1)
      expect(conditions[0]).toEqual(
        {
          key: attributeNames.RELATIONSHIP_TYPE,
          display: 'Relationship Type',
          values: ['VAP', 'VPC', 'SA', 'CC'],
          displayValues: ['VAP', 'VPC', 'SA', 'CC'],
          operator: 'IN',
        }
      )
      expect(needsRefresh).toBeTruthy()
    })

    it('should overwrite the relationship type condition', () => {
      store = mockStore({
        ...store.getState(),
        conditions: [
          {
            key: attributeNames.RELATIONSHIP_TYPE,
            display: 'Relationship Type',
            values: ['VAP', 'VPC', 'SA', 'CC'],
            displayValues: ['VAP', 'VPC', 'SA', 'CC'],
            operator: 'IN',
          },
        ],
      })
      store.dispatch(actions.setRelationType(0))
      applyActions()
      const { conditions, relationIndex, needsRefresh } = store.getState()
      expect(relationIndex).toBe(0)
      expect(conditions[0]).toEqual(
        {
          key: attributeNames.RELATIONSHIP_TYPE,
          display: 'Relationship Type',
          values: ['VAP', 'VPC'],
          displayValues: ['VAP', 'VPC'],
          operator: 'IN',
        }
      )
      expect(needsRefresh).toBeTruthy()
    })
  })

  describe('manuallyAddCondition', () => {
    it('should manually add a condition to the list and not need indexes', () => {
      let condition = {
        key: attributeNames.MANUFACTURER_BRAND,
        display: 'Manufacturer Brand',
        values: ['The-Borg'],
        displayValues: ['The Borg'],
      }
      store.dispatch(actions.manuallyAddCondition(condition))
      applyActions()
      const { conditions } = store.getState()
      expect(conditions[1]).toEqual(condition)
    })
  })

  describe('editCondition tests with the borg', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        ruleAttributes: mockData.ruleAttributes,
        conditions: mockData.borgAssimilationCriteriaParsed,
      })
    })

    it('should do nothing for relationship type', () => {
      store.dispatch(actions.editCondition(0))
      applyActions()
      const {
        additionalConditionKey,
        additionalConditionInput,
        additionalConditionExtra,
        overwriteIndex,
      } = store.getState()
      expect(overwriteIndex).toBe(0)
      expect(additionalConditionKey).toBe(-1)
      expect(additionalConditionInput).toEqual('')
      expect(additionalConditionExtra).toEqual([])
    })

    it('should get the info for product title', () => {
      store.dispatch(actions.editCondition(1))
      applyActions()
      const {
        additionalConditionKey,
        additionalConditionInput,
        additionalConditionExtra,
        overwriteIndex,
      } = store.getState()
      expect(overwriteIndex).toBe(1)
      expect(additionalConditionKey).toBe(0)
      expect(additionalConditionInput).toEqual('')
      expect(additionalConditionExtra).toEqual(mockData.borgAssimilationCriteriaParsed[1].values)
    })

    it('should get the info for taxonomy subgroup', () => {
      store.dispatch(actions.editCondition(2))
      applyActions()
      const {
        additionalConditionKey,
        additionalConditionInput,
        additionalConditionExtra,
        overwriteIndex,
      } = store.getState()
      expect(overwriteIndex).toBe(2)
      expect(additionalConditionKey).toBe(1)
      expect(additionalConditionInput).toEqual(0)
      expect(additionalConditionExtra).toEqual([0, 1])
    })
  })

  describe('editCondition tests with the Jon Item', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        ruleAttributes: mockData.ruleAttributes,
        conditions: mockData.theJonItem,
      })
    })

    it('should get the info for product title', () => {
      store.dispatch(actions.editCondition(1))
      applyActions()
      const {
        additionalConditionKey,
        additionalConditionInput,
        additionalConditionExtra,
        overwriteIndex,
      } = store.getState()
      expect(overwriteIndex).toBe(1)
      expect(additionalConditionKey).toBe(0)
      expect(additionalConditionInput).toEqual('')
      expect(additionalConditionExtra).toEqual(mockData.theJonItem[1].values)
    })

    it('should get the info for manufacturer brand', () => {
      store.dispatch(actions.editCondition(2))
      applyActions()
      const {
        additionalConditionKey,
        additionalConditionInput,
        additionalConditionExtra,
        overwriteIndex,
      } = store.getState()
      expect(overwriteIndex).toBe(2)
      expect(additionalConditionKey).toBe(4)
      expect(additionalConditionInput).toEqual('')
      expect(additionalConditionExtra).toEqual([0, 2])
    })

    it('should get the info for vendor name', () => {
      store.dispatch(actions.editCondition(3))
      applyActions()
      const {
        additionalConditionKey,
        additionalConditionInput,
        additionalConditionExtra,
        overwriteIndex,
      } = store.getState()
      expect(overwriteIndex).toBe(3)
      expect(additionalConditionKey).toBe(2)
      expect(additionalConditionInput).toEqual('')
      expect(additionalConditionExtra).toEqual(['2'])
    })

    it('should get the info for MTA Values', () => {
      store.dispatch(actions.editCondition(4))
      applyActions()
      const {
        additionalConditionKey,
        additionalConditionInput,
        additionalConditionExtra,
        overwriteIndex,
      } = store.getState()
      expect(overwriteIndex).toBe(4)
      expect(additionalConditionKey).toBe(3)
      expect(additionalConditionInput).toEqual(3)
      expect(additionalConditionExtra).toEqual([1])
    })
  })

  describe('removeConditionAttribute (value) tests', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        ruleAttributes: mockData.ruleAttributes,
        conditions: mockData.borgAssimilationCriteriaParsed,
      })
    })

    it('should delete the condition value', () => {
      store.dispatch(actions.removeConditionAttribute({
        conditionIndex: 1,
        attributeIndex: 0,
      }))
      applyActions()
      let condition = store.getState().conditions[1]
      expect(condition.key).toBe(attributeNames.PRODUCT_TITLE)
      expect(condition.values).toEqual(['Nano Probes'])
    })

    it('should delete the condition if all values are deleted', () => {
      store.dispatch(actions.removeConditionAttribute({
        conditionIndex: 1,
        attributeIndex: 0,
      }))
      applyActions()
      store.dispatch(actions.removeConditionAttribute({
        conditionIndex: 1,
        attributeIndex: 0,
      }))
      applyActions()
      expect(store.getState().conditions.length).toBe(3)
      expect(store.getState().conditions[1].key).toBe(attributeNames.TAXONOMY_SUBGROUP)
    })
  })

  describe('removeCondition tests', () => {
    beforeEach(() => {
      store = mockStore({
        ...initialState,
        ruleAttributes: mockData.ruleAttributes,
        conditions: mockData.borgAssimilationCriteriaParsed,
      })
    })

    it('should delete the condition', () => {
      store.dispatch(actions.removeCondition(1))
      applyActions()
      const { conditions, needsRefresh } = store.getState()
      expect(conditions.length).toBe(3)
      expect(conditions[1].key).toBe(attributeNames.TAXONOMY_SUBGROUP)
      expect(needsRefresh).toBeTruthy()
    })
  })

  describe('setAdditionCondition tests', () => {
    it('should set the additional condition key and reset overwrite index', () => {
      store = mockStore({
        ...store.getState(),
        overwriteIndex: 2,
        additionalConditionInput: 'garbage',
        additionalConditionExtra: ['array', 'of', 'trash'],
      })
      store.dispatch(actions.setAdditionCondition(0))
      applyActions()
      const {
        overwriteIndex,
        additionalConditionKey,
        additionalConditionInput,
        additionalConditionExtra,
      } = store.getState()
      expect(overwriteIndex).toBe(-1)
      expect(additionalConditionKey).toBe(0)
      expect(additionalConditionInput).toEqual('')
      expect(additionalConditionExtra).toEqual([])
    })
  })

  describe('updateAdditionalConditionInput', () => {
    it('should change the additional condition input', () => {
      store.dispatch(actions.updateAdditionalConditionInput('text'))
      applyActions()
      expect(store.getState().additionalConditionInput).toEqual('text')
    })
  })

  describe('updateAdditionalConditionExtra', () => {
    it('should change the additional condition extra', () => {
      store.dispatch(actions.updateAdditionalConditionExtra(['text']))
      applyActions()
      expect(store.getState().additionalConditionExtra).toEqual(['text'])
    })
  })

  describe('updateTableFilter', () => {
    it('should change the table filter', () => {
      store.dispatch(actions.updateTableFilter('assimilate'))
      applyActions()
      expect(store.getState().filter).toEqual('assimilate')
    })
  })

  describe('resetAdditionalCondition', () => {
    it('should reset all of the additional condition values', () => {
      store = mockStore({
        ...store.getState(),
        additionalConditionExtra: ['lots', 'of', 'garbage'],
        additionalConditionInput: 'garbage',
        additionalConditionKey: 69,
      })
      store.dispatch(actions.resetAdditionalCondition())
      applyActions()
      const {
        additionalConditionKey,
        additionalConditionInput,
        additionalConditionExtra,
      } = store.getState()
      expect(additionalConditionKey).toBe(-1)
      expect(additionalConditionInput).toEqual('')
      expect(additionalConditionExtra).toEqual([])
    })
  })

  describe('saveAdditionalCondition', () => {
    describe('with overwrite enabled', () => {
      describe('borgItem (taxonomy and product title)', () => {
        beforeEach(() => {
          store = mockStore({
            ...store.getState(),
            conditions: mockData.borgAssimilationCriteriaParsed,
          })
        })

        it('should add a product title', () => {
          store = mockStore({
            ...store.getState(),
            additionalConditionKey: 0,
            additionalConditionInput: '',
            additionalConditionExtra: ['The', 'Lords', 'Year', '2018'],
            overwriteIndex: 1,
          })
          store.dispatch(actions.saveAdditionalCondition())
          applyActions()
          const {
            conditions,
            needsRefresh,
            modified,
            overwriteIndex,
          } = store.getState()
          expect(needsRefresh).toBeTruthy()
          expect(modified).toBeTruthy()
          expect(overwriteIndex).toBe(-1)
          expect(conditions.length).toBe(4)
          expect(conditions[1]).toEqual({
            key: attributeNames.PRODUCT_TITLE,
            display: 'Product Title',
            values: ['The', 'Lords', 'Year', '2018'],
            displayValues: ['The', 'Lords', 'Year', '2018'],
            operator: 'IN',
          })
        })

        it('should add a taxonomy', () => {
          store = mockStore({
            ...store.getState(),
            additionalConditionKey: 1,
            additionalConditionInput: 0,
            additionalConditionExtra: [1],
            overwriteIndex: 2,
          })
          store.dispatch(actions.saveAdditionalCondition())
          applyActions()
          const {
            conditions,
            needsRefresh,
            modified,
            overwriteIndex,
          } = store.getState()
          expect(needsRefresh).toBeTruthy()
          expect(modified).toBeTruthy()
          expect(overwriteIndex).toBe(-1)
          expect(conditions.length).toBe(4)
          expect(conditions[2]).toEqual({
            key: attributeNames.TAXONOMY_SUBGROUP,
            display: 'APPAREL Subgroups',
            values: ['TOPS'],
            operator: 'IN',
            displayValues: ['TOPS'],
          })
        })
      })

      describe('The Jon Item (vendor, manufacturer and mta)', () => {
        beforeEach(() => {
          store = mockStore({
            ...store.getState(),
            conditions: mockData.theJonItem,
          })
        })

        it('should add a vendor id', () => {
          store = mockStore({
            ...store.getState(),
            additionalConditionKey: 2,
            additionalConditionInput: '',
            additionalConditionExtra: ['1 - The Borg'],
            overwriteIndex: 3,
          })
          store.dispatch(actions.saveAdditionalCondition())
          applyActions()
          const {
            conditions,
            needsRefresh,
            modified,
            overwriteIndex,
          } = store.getState()
          expect(needsRefresh).toBeTruthy()
          expect(modified).toBeTruthy()
          expect(overwriteIndex).toBe(-1)
          expect(conditions.length).toBe(5)
          expect(conditions[3]).toEqual({
            key: attributeNames.VENDOR_NAME,
            display: 'Vendor Name',
            values: ['1'],
            displayValues: ['1 - The Borg'],
            operator: 'IN',
          })
        })

        it('should add a MTA', () => {
          store = mockStore({
            ...store.getState(),
            additionalConditionKey: 3,
            additionalConditionInput: 3,
            additionalConditionExtra: [0],
            overwriteIndex: 4,
          })
          store.dispatch(actions.saveAdditionalCondition())
          applyActions()
          const {
            conditions,
            needsRefresh,
            modified,
            overwriteIndex,
          } = store.getState()
          expect(needsRefresh).toBeTruthy()
          expect(modified).toBeTruthy()
          expect(overwriteIndex).toBe(-1)
          expect(conditions.length).toBe(5)
          expect(conditions[4]).toEqual({
            key: attributeNames.MTA_VALUES,
            display: 'Occasion Worn For Values',
            operator: 'IN',
            values: ['5'],
            displayValues: ['Graduation'],
          })
        })

        it('should add a manufacturer brand', () => {
          store = mockStore({
            ...store.getState(),
            additionalConditionKey: 4,
            additionalConditionInput: '',
            additionalConditionExtra: ['Brand 3'],
            overwriteIndex: 2,
          })
          store.dispatch(actions.saveAdditionalCondition())
          applyActions()
          const {
            conditions,
            needsRefresh,
            modified,
            overwriteIndex,
          } = store.getState()
          expect(needsRefresh).toBeTruthy()
          expect(modified).toBeTruthy()
          expect(overwriteIndex).toBe(-1)
          expect(conditions.length).toBe(5)
          expect(conditions[2]).toEqual({
            key: attributeNames.MANUFACTURER_BRAND,
            display: 'Manufacturer Brand',
            operator: 'IN',
            values: ['Brand 3'],
            displayValues: ['Brand 3'],
          })
        })
      })
    })

    describe('without overwrite enabled', () => {
      it('should add a product title', () => {
        store = mockStore({
          ...store.getState(),
          additionalConditionKey: 0,
          additionalConditionInput: '',
          additionalConditionExtra: ['The', 'Lords', 'Year', '2018'],
        })
        store.dispatch(actions.saveAdditionalCondition())
        applyActions()
        const {
          conditions,
          needsRefresh,
          modified,
          overwriteIndex,
        } = store.getState()
        expect(needsRefresh).toBeTruthy()
        expect(modified).toBeTruthy()
        expect(overwriteIndex).toBe(-1)
        expect(conditions.length).toBe(2)
        expect(conditions[1]).toEqual({
          key: attributeNames.PRODUCT_TITLE,
          display: 'Product Title',
          operator: 'IN',
          values: ['The', 'Lords', 'Year', '2018'],
          displayValues: ['The', 'Lords', 'Year', '2018'],
        })
      })

      it('should add a taxonomy', () => {
        store = mockStore({
          ...store.getState(),
          additionalConditionKey: 1,
          additionalConditionInput: 0,
          additionalConditionExtra: [0, 1],
        })
        store.dispatch(actions.saveAdditionalCondition())
        applyActions()
        const {
          conditions,
          needsRefresh,
          modified,
          overwriteIndex,
        } = store.getState()
        expect(needsRefresh).toBeTruthy()
        expect(modified).toBeTruthy()
        expect(overwriteIndex).toBe(-1)
        expect(conditions.length).toBe(2)
        expect(conditions[1]).toEqual({
          key: attributeNames.TAXONOMY_SUBGROUP,
          display: 'APPAREL Subgroups',
          values: ['BOTTOMS', 'TOPS'],
          operator: 'IN',
          displayValues: ['BOTTOMS', 'TOPS'],
        })
      })

      it('should add a vendor id', () => {
        store = mockStore({
          ...store.getState(),
          additionalConditionKey: 2,
          additionalConditionInput: '',
          additionalConditionExtra: ['1 - The Borg'],
        })
        store.dispatch(actions.saveAdditionalCondition())
        applyActions()
        const {
          conditions,
          needsRefresh,
          modified,
          overwriteIndex,
        } = store.getState()
        expect(needsRefresh).toBeTruthy()
        expect(modified).toBeTruthy()
        expect(overwriteIndex).toBe(-1)
        expect(conditions.length).toBe(2)
        expect(conditions[1]).toEqual({
          key: attributeNames.VENDOR_NAME,
          display: 'Vendor Name',
          operator: 'IN',
          values: ['1'],
          displayValues: ['1 - The Borg'],
        })
      })

      it('should add a MTA', () => {
        store = mockStore({
          ...store.getState(),
          additionalConditionKey: 3,
          additionalConditionInput: 3,
          additionalConditionExtra: [1],
        })
        store.dispatch(actions.saveAdditionalCondition())
        applyActions()
        const {
          conditions,
          needsRefresh,
          modified,
          overwriteIndex,
        } = store.getState()
        expect(needsRefresh).toBeTruthy()
        expect(modified).toBeTruthy()
        expect(overwriteIndex).toBe(-1)
        expect(conditions.length).toBe(2)
        expect(conditions[1]).toEqual({
          key: attributeNames.MTA_VALUES,
          display: 'Occasion Worn For Values',
          operator: 'IN',
          values: ['6'],
          displayValues: ['Debugging'],
        })
      })

      it('should add a manufacturer brand', () => {
        store = mockStore({
          ...store.getState(),
          additionalConditionKey: 4,
          additionalConditionInput: '',
          additionalConditionExtra: ['Brand 3'],
        })
        store.dispatch(actions.saveAdditionalCondition())
        applyActions()
        const {
          conditions,
          needsRefresh,
          modified,
          overwriteIndex,
        } = store.getState()
        expect(needsRefresh).toBeTruthy()
        expect(modified).toBeTruthy()
        expect(overwriteIndex).toBe(-1)
        expect(conditions.length).toBe(2)
        expect(conditions[1]).toEqual({
          key: attributeNames.MANUFACTURER_BRAND,
          display: 'Manufacturer Brand',
          operator: 'IN',
          values: ['Brand 3'],
          displayValues: ['Brand 3'],
        })
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
