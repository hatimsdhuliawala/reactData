import * as actions from '../apiActions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import reducer, { initialState } from '../reducer'
import axios from 'axios'
import * as attributeNames from '../SearchCriteriaStandardNames'
import { FREE_FORM, AUTOCOMPLETE, DOUBLE_COMBO_BOX } from '../../../../components/RuleBuilder/Components/InputTypes'
import envConfigs from '../../../../config/apiConfig'
import * as mockData from './mockData'

jest.mock('axios')

describe('Rule Builder API Action Test: ', () => {
  let middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store
  /* eslint-disable */
  beforeAll(() => {
  /* eslint-enable */
    store = mockStore({
      ...initialState,
    })
  })

  describe('Get Rule Attributes', async () => {
    /*
     *  Ensures api's are called in the right order, the right amount of times
     *  and the data returned from them is parsed correctly
     */
    /* eslint-disable */
    beforeAll(done => {
    /* eslint-enable */
      axios.get.mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: 'Taxonomy API',
            data: {
              ProductTypeListType: {
                ProductType: [
                  {
                    Name: 'APPAREL',
                    Status: 'ACTV',
                    ProductSubType: [
                      {
                        Name: 'BOTTOMS',
                        Status: 'ACTV',
                      },
                      {
                        Name: 'TOPS',
                        Status: 'ACTV',
                      },
                      {
                        Name: 'WOMEN',
                        Status: 'ACTV',
                      },
                    ],
                  },
                  {
                    Name: 'GROCERY',
                    Status: 'ACTV',
                    ProductSubType: [
                      {
                        Name: 'BEVERAGE',
                        Status: 'ACTV',
                      },
                      {
                        Name: 'SODA',
                        Status: 'INACTV',
                      },
                    ],
                  },
                  {
                    Name: 'HOME',
                    Status: 'INACTV',
                    ProductSubType: [
                      {
                        Name: 'CHAIRS',
                        Status: 'INACTV',
                      },
                      {
                        Name: 'DESKS',
                        Status: 'ACTV',
                      },
                      {
                        Name: 'RUGS',
                        Status: 'INACTV',
                      },
                    ],
                  },
                ],
              },
            },
          })
        })
      })
      axios.get.mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: 'Vendor API',
            data: [
              {
                gmsVendorNumber: Number('004200'),
                vendorName: 'Blaze it',
                vendorActive: true,
              },
              {
                gmsVendorNumber: Number('006900'),
                vendorName: 'SIXTY NINE',
                vendorActive: true,
              },
              {
                gmsVendorNumber: Number('111111'),
                vendorName: 'Wont Fix',
                vendorActive: false,
              },
            ],
          })
        })
      })
      axios.get.mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: 'Manufacturer Brand API',
            data: {
              recordCount: 3,
              brand: [
                {
                  brandId: 1,
                  brandName: 'Brand 1',
                },
                {
                  brandId: 2,
                  brandName: 'Brand 2',
                },
                {
                  brandId: 3,
                  brandName: 'Brand 3',
                },
              ],
            },
          })
        })
      })
      axios.post.mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: 'MTA API',
            data: [
              {
                id: 142750,
                name: 'Age specific gender',
                item_attribute_values: [
                  {
                    value_id: '3',
                    display_name: 'Women',
                  },
                  {
                    value_id: '4',
                    display_name: 'Men',
                  },
                ],
              },
              {
                id: 133350,
                name: 'Apparel item type',
                item_attribute_values: [
                  {
                    value_id: '1',
                    display_name: 'Poet Shirts',
                  },
                  {
                    value_id: '2',
                    display_name: 'T-Shirts',
                  },
                ],
              },
              {
                id: 110298,
                name: 'Garment Fit',
                item_attribute_values: [
                  {
                    value_id: '7',
                    display_name: 'Normal',
                  },
                  {
                    value_id: '8',
                    display_name: 'Whack Yo',
                  },
                ],
              },
              {
                id: 110447,
                name: 'Occasion Worn For',
                item_attribute_values: [
                  {
                    value_id: '5',
                    display_name: 'Graduation',
                  },
                  {
                    value_id: '6',
                    display_name: 'Debugging',
                  },
                ],
              },
              {
                id: 110407,
                name: 'Size Grouping',
                item_attribute_values: [
                  {
                    value_id: '9',
                    display_name: 'regular',
                  },
                  {
                    value_id: '10',
                    display_name: 'plus',
                  },
                ],
              },
            ],
          })
        })
      })
      store.dispatch(actions.getRuleAttributes())
        .then(
          () => {
            // makes sure that the brands are set for size chart ui, this is almost
            // overkill but it makes me feel better
            // expect(setsBrands).toBeTruthy()
            applyActions()
            let state = store.getState()
            expect(state.ruleAttributes.length).toBe(5)
            expect(axios.get.mock.calls.length).toBe(3)
            expect(axios.post.mock.calls.length).toBe(1)
            done()
          }
        )
    })

    it('should set up Product Title correctly', () => {
      let ruleAttribute = store.getState().ruleAttributes[0]
      expect(ruleAttribute.data.length).toBe(0)
      expect(ruleAttribute.display).toEqual('Product Title')
      expect(ruleAttribute.attribute).toBe(attributeNames.PRODUCT_TITLE)
      expect(ruleAttribute.inputType).toEqual(FREE_FORM)
    })

    it('should set up Taxonomy correctly', () => {
      let ruleAttribute = store.getState().ruleAttributes[1]
      const url = axios.get.mock.calls[0][0]
      expect(url).toEqual(envConfigs.api.itemApi + 'digital_items/v1/hierarchy/productTypes')
      expect(ruleAttribute.data.length).toBe(2)
      expect(ruleAttribute.data[0]).toEqual([
        {
          display: 'APPAREL',
          value: 'APPAREL',
        },
        {
          display: 'GROCERY',
          value: 'GROCERY',
        },
      ])
      expect(ruleAttribute.data[1][1]).toEqual([
        {
          display: 'BEVERAGE',
          value: 'BEVERAGE',
        },
      ])
      expect(ruleAttribute.display).toEqual('Taxonomy')
      expect(ruleAttribute.attribute).toBe(attributeNames.TAXONOMY)
      expect(ruleAttribute.inputType).toBe(DOUBLE_COMBO_BOX)
      expect(ruleAttribute.labels[0]).toEqual('Taxonomy Group')
      expect(ruleAttribute.labels[1]).toEqual('Taxonomy Subgroup')
    })

    it('should set up vendor name correctly', () => {
      let ruleAttribute = store.getState().ruleAttributes[2]
      const url = axios.get.mock.calls[1][0]
      expect(url).toEqual(envConfigs.api.itemApi + 'vendors/v1/gms')
      expect(ruleAttribute.data.length).toBe(2)
      expect(ruleAttribute.attribute).toBe(attributeNames.VENDOR_NAME)
      expect(ruleAttribute.inputType).toBe(AUTOCOMPLETE)
      expect(ruleAttribute.display).toEqual('Vendor Name')
      expect(ruleAttribute.data[1]).toEqual({
        key: '6900',
        value: 'SIXTY NINE',
      })
    })

    it('should set up MTA\'s correctly', () => {
      const ruleAttribute = store.getState().ruleAttributes[3]
      // MTA is the only attribute that uses a post call
      const url = axios.post.mock.calls[0][0]
      const body = axios.post.mock.calls[0][1]
      expect(url).toEqual(envConfigs.api.itemApi + 'digital_items/v1/hierarchy/merchAttributes')
      expect(body).toBe(actions.merchTypeAttributes)
      expect(ruleAttribute.attribute).toBe(attributeNames.MTA)
      expect(ruleAttribute.inputType).toBe(DOUBLE_COMBO_BOX)
      expect(ruleAttribute.labels).toEqual([
        'MTA Types',
        'MTA Values',
      ])
      expect(ruleAttribute.display).toEqual(attributeNames.MTA)
      expect(ruleAttribute.data.length).toBe(2)
      expect(ruleAttribute.data[0]).toEqual([
        {
          value: 142750,
          display: 'Age specific gender',
        },
        {
          value: 133350,
          display: 'Apparel item type',
        },
        {
          value: 110298,
          display: 'Garment Fit',
        },
        {
          value: 110447,
          display: 'Occasion Worn For',
        },
        {
          value: 110407,
          display: 'Size Grouping',
        },
      ])
      expect(ruleAttribute.data[1].length).toBe(5)
      expect(ruleAttribute.data[1][1]).toEqual([
        {
          value: '1',
          display: 'Poet Shirts',
        },
        {
          value: '2',
          display: 'T-Shirts',
        },
      ])
    })

    it('should set up Manufacturer Brands Correctly', () => {
      const ruleAttribute = store.getState().ruleAttributes[4]
      const url = axios.get.mock.calls[2][0]
      expect(url).toEqual(envConfigs.api.itemApi + 'digital_items/v1/brands')
      expect(ruleAttribute.attribute).toBe(attributeNames.MANUFACTURER_BRAND)
      expect(ruleAttribute.display).toEqual('Manufacturer Brand')
      expect(ruleAttribute.inputType).toBe(AUTOCOMPLETE)
      expect(ruleAttribute.data).toEqual([
        {
          value: 'Brand 1',
          key: 'Brand 1',
        },
        {
          value: 'Brand 2',
          key: 'Brand 2',
        },
        {
          value: 'Brand 3',
          key: 'Brand 3',
        },
      ])
    })
  })

  describe('getRuleItems', async () => {
  // fix test after changing synchronous to asynchronous search calls (rules criteria results should return immediately instead of waiting for filter choices to load)
  //   it('should call the search api with an expected format', done => {
  //     axios.post.mockImplementationOnce(() => {
  //       return new Promise((resolve, reject) => {
  //         resolve(mockData.borgAssimilationRuleElasticSearchResponse)
  //       })
  //     })
  //     store = mockStore({
  //       rulesBuilder: {
  //         ...initialState,
  //         conditions: mockData.borgAssimilationItemsRule.criteria,
  //       },
  //     })
  //     actions.getRuleItems(mockData.borgAssimilationItemsRule.criteria)(store.dispatch, store.getState)
  //       .then(
  //         () => {
  //           applyActions()
  //           const url = axios.post.mock.calls[1][0]
  //           const body = axios.post.mock.calls[1][1]
  //           expect(url).toEqual(envConfigs.api.searchApi + 'es/advanced?page=0&size=100')
  //           expect(body).toEqual(mockData.borgAssimilationRuleElasticSearchQuery)
  //           expect(store.getState().parentCount).toBe(2)
  //           expect(store.getState().foundItems).toEqual([
  //             {
  //               tcin: '40100000',
  //               launchDate: 'last month',
  //               children: ['1', '2'],
  //               title: 'A Test Item',
  //               image: '',
  //             },
  //             {
  //               tcin: '40100001',
  //               launchDate: 'last year',
  //               children: ['3', '4', '5'],
  //               title: 'A Second Test Item',
  //               image: '',
  //             },
  //           ])
  //           done()
  //         }
  //       )
  //   })

    it('should call corona when it fails to get results from elastic search', done => {
      axios.post.mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          /* eslint-disable */
          reject({
            status: 500,
            error: 'service unavailable',
          })
          /* eslint-enable */
        })
      })
      axios.post.mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          resolve(mockData.borgAssimilationRuleElasticSearchResponse)
        })
      })
      store = mockStore({
        rulesBuilder: {
          ...initialState,
          conditions: mockData.borgAssimilationItemsRule.criteria,
        },
      })
      actions.getRuleItems()(store.dispatch, store.getState)
        .then(
          () => {
            applyActions()
            // const failUrl = axios.post.mock.calls[2][0]
            // const coronaUrl = axios.post.mock.calls[3][0]
            // expect(failUrl).toEqual(envConfigs.api.searchApi + 'es/advanced?page=0&size=100')
            // expect(coronaUrl).toEqual(envConfigs.api.searchApi + 'es/advanced?coronaCall=true&page=0&size=100')
            expect(store.getState().totalResults).toBe(2)
            expect(store.getState().foundItems).toEqual([
              {
                tcin: '40100000',
                launchDate: 'last month',
                children: ['1', '2'],
                title: 'A Test Item',
                image: '',
              },
              {
                tcin: '40100001',
                launchDate: 'last year',
                children: ['3', '4', '5'],
                title: 'A Second Test Item',
                image: '',
              },
            ])
            done()
          }
        )
    })

    it('should handle corona fails', done => {
      axios.post.mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          /* eslint-disable */
          reject({
            status: 500,
            error: 'service unavailable',
          })
          /* eslint-enable */
        })
      })
      axios.post.mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          /* eslint-disable */
          reject({
            status: 500,
            error: 'service unavailable',
          })
          /* eslint-enable */
        })
      })
      store = mockStore({
        rulesBuilder: {
          ...initialState,
          conditions: mockData.borgAssimilationItemsRule.criteria,
        },
      })
      actions.getRuleItems()(store.dispatch, store.getState)
        .then(
          () => {
            applyActions()
            // const failUrl = axios.post.mock.calls[4][0]
            // const coronaUrl = axios.post.mock.calls[5][0]
            // expect(failUrl).toEqual(envConfigs.api.searchApi + 'es/advanced?page=0&size=100')
            // expect(coronaUrl).toEqual(envConfigs.api.searchApi + 'es/advanced?coronaCall=true&page=0&size=100')
            expect(store.getState().needsRefresh).toBeFalsy()
            done()
          }
        )
    })
  })

  describe('getRule', () => {
    beforeEach(() => {
      axios.get.mockReset()
      axios.post.mockReset()
      store = mockStore({
        ...initialState,
        ruleAttributes: mockData.ruleAttributes,
      })
    })

    it('should handle a successful request of a rule', done => {
      let item = mockData.borgAssimilationItemsRule
      axios.post.mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: 'Good call man',
            data: item,
          })
        })
      })
      store.dispatch(actions.getRule({ sizeChart: item.sizeChartInfo, name: item.name }))
        .then(
          () => {
            applyActions()
            const { conditions } = store.getState()
            const url = axios.post.mock.calls[0][0]
            const body = axios.post.mock.calls[0][1]
            expect(url).toEqual(envConfigs.api.sizeChartApi + 'rules/get')
            expect(body).toEqual({ sizeChart: item.sizeChartInfo, name: item.name })
            expect(conditions[0]).toEqual(
              {
                key: attributeNames.RELATIONSHIP_TYPE,
                display: 'Relationship Type',
                values: item.criteria[0].values,
                displayValues: item.criteria[0].values,
              }
            )
            expect(conditions[1]).toEqual(
              {
                key: attributeNames.PRODUCT_TITLE,
                display: 'Product Title',
                values: item.criteria[1].values,
                displayValues: item.criteria[1].values,
              }
            )
            expect(conditions[2]).toEqual(
              {
                key: attributeNames.TAXONOMY_SUBGROUP,
                display: 'APPAREL Subgroups',
                values: item.criteria[3].values,
                displayValues: item.criteria[3].values,
              }
            )
            done()
          }
        )
    })

    it('should handle api errors gracefully', done => {
      axios.post.mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          /* eslint-disable */
          reject({
            status: 500,
            errorMessage: 'YOU SUCK!!!!!',
          })
          /* eslint-enable */
        })
      })
      store.dispatch(actions.getRule(
        {
          sizeChart: mockData.borgAssimilationItemsRule.sizeChartInfo,
          name: mockData.borgAssimilationItemsRule.name,
        }
      ))
        .then(
          () => {
            applyActions()
            const { isGetRuleError, getRuleErrorMessage } = store.getState()
            expect(isGetRuleError).toBeTruthy()
            expect(getRuleErrorMessage).toEqual('RULE NOT FOUND')
            done()
          }
        )
    })
  })

  describe('saveRule', () => {
    it('should save a rule', done => {
      axios.post.mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: 'You will be assimilated',
            data: 0,
          })
        })
      })
      store.dispatch(actions.saveRule(mockData.borgAssimilationItemsRule))
        .then(
          () => {
            applyActions()
            expect(store.getState()).toEqual(initialState)
            done()
          }
        )
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
