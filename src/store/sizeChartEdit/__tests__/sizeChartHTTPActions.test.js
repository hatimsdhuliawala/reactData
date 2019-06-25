/* eslint-disable */
// lint disabled here because i had to make magic with imports
import * as httpActions from '../sizeChartHTTPActions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {initialState} from '../reducer'
import sizeChartReducer from '../reducer'
import axios from 'axios'
import envConfigs from '../../../config/apiConfig'
import harbinger from 'harbinger'
/* eslint-enable */

/*
 * This test suite tests the sizeChartDataActions as well as the
 * related reducer calls
 */

jest.mock('harbinger')
jest.mock('axios')

describe('Data Action Test: ', () => {
  let middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store
  let identifiers
  let dispatch
  let sizeChart
  let httpSizeChart
  let sizeChartId = '1eji1o23l1kj21jl1123'

  function applyActions () {
    let state = store.getState()
    let actions = store.getActions()
    for (let i = 0; i < actions.length; i++) {
      state = sizeChartReducer(state, actions[i])
    }
    store = mockStore({
      ...state,
    })
  }

  beforeEach(() => {
    sizeChart = {
      sizeChartId: sizeChartId,
      measuringGuides: undefined,
      category: 'test',
      brand: 'test',
      size: 'test',
      categoryTitle: 'test',
      shopAllUrl: '',
      disclaimer: 'All Sizes in Inches Unless Otherwise Stated',
      charts: [
        {
          brandTitle: 'test',
          sizeTitle: 'test',
          header: ['test1', 'test2', 'test3'],
          data: [
            ['test1', 'test4', 'test7'],
            ['test2', 'test5', 'test8'],
            ['test3', 'test6', 'test9'],
          ],
        },
        {
          brandTitle: 'test1',
          sizeTitle: 'test1',
          header: ['test4', 'column_merge', 'test6'],
          data: [
            ['test1', 'test4', 'test7'],
            ['test2', 'column_merge', 'row_merge'],
            ['row_merge', 'row_merge', 'test9'],
          ],
        },
      ],
    }
    httpSizeChart = {
      id: sizeChartId,
      category: 'test',
      brand: 'test',
      size: 'test',
      category_title: 'test',
      shop_all_url: '',
      disclaimer: 'All Sizes in Inches Unless Otherwise Stated',
      charts: [
        {
          brand_title: 'test',
          size_title: 'test',
          header: ['test1', 'test2', 'test3'],
          data: [
            ['test1', 'test4', 'test7'],
            ['test2', 'test5', 'test8'],
            ['test3', 'test6', 'test9'],
          ],
        },
        {
          brand_title: 'test1',
          size_title: 'test1',
          header: ['test4', 'column_merge', 'test6'],
          data: [
            ['test1', 'test4', 'test7'],
            ['test2', 'column_merge', 'row_merge'],
            ['row_merge', 'row_merge', 'test9'],
          ],
        },
      ],
    }
    identifiers = [
      { category: 'test', brand: 'test', size: 'test' },
      { category: 'test2', brand: 'test1', size: 'test1' },
      { category: 'test1', brand: 'test1', size: 'test2' },
      { category: 'test1', brand: 'test2', size: 'test2' },
      { category: 'test', brand: 'test1', size: 'test' },
    ]
    store = mockStore({
      ...initialState,
      sizeChart: {
        ...initialState.sizeChart,
      },
    })
    dispatch = store.dispatch
    axios.get.mockReset()
    axios.post.mockReset()
    harbinger.trackEvent.mockReset()
  })

  describe('getSizeChart', () => {
    it('should retrieve the test size chart', async () => {
      axios.get.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: '',
            data: { ...httpSizeChart },
          })
        })
      })
      await store.dispatch(httpActions.getSizeChart({ category: 'test', brand: 'test', size: 'test' }))
      expect(axios.get).toBeCalledWith(envConfigs.api.sizeChartApi + 'sizecharts/get/test/test/test')
      applyActions()
      expect(store.getState().sizeChart).toBeDefined()
      expect(harbinger.trackEvent.mock.calls.length).toBe(2)
      expect(harbinger.trackEvent).toBeCalledWith(httpActions.events.sizeChartGetStarted)
      expect(harbinger.trackEvent).toBeCalledWith(httpActions.events.sizeChartGetSuccess)
      expect(store.getState().sizeChart).toEqual(sizeChart)
    })

    it('should fail to retrieve the test size chart', async () => {
      axios.get.mockImplementation(() => {
        /* eslint-disable */
        return new Promise((resolve, reject) => {
          reject({
            status: 404,
            error: 'size chart not found',
          })
        })
        /* eslint-enable */
      })
      await (store.dispatch(httpActions.getSizeChart({ category: 'test', brand: 'test', size: 'test' })))
      expect(axios.get).toBeCalledWith(envConfigs.api.sizeChartApi + 'sizecharts/get/test/test/test')
      applyActions()
      expect(harbinger.trackEvent.mock.calls.length).toBe(2)
      expect(harbinger.trackEvent).toBeCalledWith(httpActions.events.sizeChartGetStarted)
      expect(harbinger.trackEvent).toBeCalledWith(httpActions.events.sizeChartGetFailed)
      /* eslint-disable */
      expect(store.getState().isGetSizeChartError).toBeTruthy
      /* eslint-enable */
    })

    it('should auto fail if category or brand or size are empty strings', async () => {
      axios.get.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject(new Error('THIS SHOULD NOT BE CALLED'))
        })
      })
      await (store.dispatch(httpActions.getSizeChart({ category: 'test', brand: '', size: '' })))
      applyActions()
      expect(store.getState().sizeChart).toEqual(initialState.sizeChart)
      store.dispatch(httpActions.getSizeChart({ category: '', brand: 'test', size: '' }))
      applyActions()
      expect(store.getState().sizeChart).toEqual(initialState.sizeChart)
      store.dispatch(httpActions.getSizeChart({ category: '', brand: '', size: 'test' }))
      applyActions()
      expect(store.getState().sizeChart).toEqual(initialState.sizeChart)
      store.dispatch(httpActions.getSizeChart({ category: '', brand: '', size: '' }))
      applyActions()
      expect(store.getState().sizeChart).toEqual(initialState.sizeChart)
    })

    it('should fail if the backend doesn\'t find the size chart', async () => {
      axios.get.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: '',
            data: '',
          })
        })
      })
      await store.dispatch(httpActions.getSizeChart({ category: 'test', brand: 'test', size: 'test' }))
      expect(axios.get).toBeCalledWith(envConfigs.api.sizeChartApi + 'sizecharts/get/test/test/test')
      applyActions()
      expect(store.getState().sizeChart).toBeDefined()
      expect(harbinger.trackEvent.mock.calls.length).toBe(2)
      expect(harbinger.trackEvent).toBeCalledWith(httpActions.events.sizeChartGetStarted)
      expect(harbinger.trackEvent).toBeCalledWith(httpActions.events.sizeChartGetFailed)
      expect(store.getState().sizeChart).toEqual(initialState.sizeChart)
      expect(store.getState().isGetSizeChartError).toBeTruthy()
    })
  })

  describe('saveSizeChart', () => {
    it('should successfully save the size chart AND reset the state', async () => {
      store = mockStore({ ...store.getState(), sizeChart, identifiers })
      axios.post.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: '',
            data: { ...httpSizeChart },
          })
        })
      })
      await (store.dispatch(httpActions.saveSizeChart({
        ...sizeChart,
        user: {
          email: '',
        },
      })))
      expect(axios.post.mock.calls.length).toBe(1)
      const url = axios.post.mock.calls[0][0]
      const body = axios.post.mock.calls[0][1]
      expect(url).toEqual(envConfigs.api.sizeChartApi + 'sizecharts/save/')
      expect(body.category).toEqual(httpSizeChart.category)
      expect(body.brand).toEqual(httpSizeChart.brand)
      expect(body.size).toEqual(httpSizeChart.size)
      expect(body.charts[0].data).toEqual(httpSizeChart.charts[0].data)
      expect(harbinger.trackEvent.mock.calls.length).toBe(2)
      expect(harbinger.trackEvent).toBeCalledWith(httpActions.events.sizeChartSaveStarted)
      expect(harbinger.trackEvent).toBeCalledWith(httpActions.events.sizeChartSaveSuccess)
      applyActions()
      expect(store.getState().sizeChart).toEqual(initialState.sizeChart)
    })

    it('should fail to save the size chart AND reset the state', async () => {
      store = mockStore({ ...store.getState(), ...sizeChart, ...identifiers })
      axios.post.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject(new Error('User forbidden from saving changes'))
        })
      })
      await (store.dispatch(httpActions.saveSizeChart({
        ...sizeChart,
        user: {
          email: '',
        },
      })))
      expect(axios.post.mock.calls.length).toBe(1)
      const url = axios.post.mock.calls[0][0]
      const body = axios.post.mock.calls[0][1]
      expect(url).toEqual(envConfigs.api.sizeChartApi + 'sizecharts/save/')
      expect(body.category).toEqual(httpSizeChart.category)
      expect(body.brand).toEqual(httpSizeChart.brand)
      expect(body.size).toEqual(httpSizeChart.size)
      expect(body.charts[0].data).toEqual(httpSizeChart.charts[0].data)
      expect(harbinger.trackEvent.mock.calls.length).toBe(2)
      expect(harbinger.trackEvent).toBeCalledWith(httpActions.events.sizeChartSaveStarted)
      expect(harbinger.trackEvent).toBeCalledWith(httpActions.events.sizeChartSaveError)
      applyActions()
      /* eslint-disable */
      expect(store.getState().isSaveSizeChartError).toBeTruthy
      /* eslint-enable */
      expect(store.getState().saveErrorMessage).toEqual('User forbidden from saving changes')
    })

    it('should auto delete entire merged rows and columns', async () => {
      axios.post.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: '',
            data: { ...httpSizeChart },
          })
        })
      })
      let garbageSizeChart = {
        category: 'test',
        brand: 'test',
        size: 'test',
        categoryTitle: 'test',
        shopAllUrl: '',
        disclaimer: 'All Sizes in Inches Unless Otherwise Stated',
        charts: [
          {
            brandTitle: 'test',
            sizeTitle: 'test',
            header: ['test1', 'test2', 'test3'],
            data: [
              ['test1', 'test4', 'test7'],
              ['test2', 'test5', 'test8'],
              ['test3', 'test6', 'test9'],
              ['row_merge', 'row_merge', 'row_merge'],
            ],
          },
          {
            brandTitle: 'test1',
            sizeTitle: 'test1',
            header: ['test4', 'column_merge', 'column_merge', 'test6'],
            data: [
              ['test1', 'test4', 'column_merge', 'test7'],
              ['test2', 'test5', 'column_merge', 'row_merge'],
              ['row_merge', 'row_merge', 'column_merge', 'test9'],
            ],
          },
        ],
      }
      await dispatch(httpActions.saveSizeChart({
        ...garbageSizeChart,
        user: {
          email: '',
        },
      }))
      expect(axios.post.mock.calls.length).toBe(1)
      const url = axios.post.mock.calls[0][0]
      const body = axios.post.mock.calls[0][1]
      expect(url).toEqual(envConfigs.api.sizeChartApi + 'sizecharts/save/')
      expect(body.category).toEqual(httpSizeChart.category)
      expect(body.brand).toEqual(httpSizeChart.brand)
      expect(body.size).toEqual(httpSizeChart.size)
      expect(body.charts[0].data).toEqual(httpSizeChart.charts[0].data)
      expect(harbinger.trackEvent.mock.calls.length).toBe(2)
      expect(harbinger.trackEvent).toBeCalledWith(httpActions.events.sizeChartSaveStarted)
      expect(harbinger.trackEvent).toBeCalledWith(httpActions.events.sizeChartSaveSuccess)
      applyActions()
      expect(body.charts[0].data).toEqual(sizeChart.charts[0].data)
      expect(body.charts[1].data[0].length).toBe(3)
      expect(body.charts[1].header.length).toBe(3)
    })

    it('should auto fail because of blanks in headers', async () => {
      axios.post.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: '',
            data: { ...httpSizeChart },
          })
        })
      })
      let garbageSizeChart = {
        category: 'test',
        brand: 'test',
        size: 'test',
        categoryTitle: 'test',
        shopAllUrl: '',
        disclaimer: 'All Sizes in Inches Unless Otherwise Stated',
        charts: [
          {
            brandTitle: 'test',
            sizeTitle: 'test',
            header: ['test1', '', 'test3'],
            data: [
              ['test1', 'test4', 'test7'],
              ['', 'test5', 'test8'],
              ['test3', 'test6', 'test9'],
              ['row_merge', 'row_merge', 'row_merge'],
            ],
          },
          {
            brandTitle: 'test1',
            sizeTitle: 'test1',
            header: ['test4', 'column_merge', 'column_merge', 'test6'],
            data: [
              ['test1', 'test4', 'column_merge', 'test7'],
              ['test2', 'test5', 'column_merge', 'row_merge'],
              ['row_merge', 'row_merge', 'column_merge', 'test9'],
            ],
          },
        ],
      }
      await dispatch(httpActions.saveSizeChart({
        ...garbageSizeChart,
        user: {
          email: '',
        },
      }))
      expect(axios.post.mock.calls.length).toBe(0)
      expect(harbinger.trackEvent.mock.calls.length).toBe(0)
      applyActions()
      expect(store.getState().isSaveSizeChartError).toBeTruthy()
      expect(store.getState().saveErrorMessage).toEqual('All cells must contain something!')
    })

    it('should auto fail because of blanks in data', async () => {
      axios.post.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: '',
            data: { ...httpSizeChart },
          })
        })
      })
      let garbageSizeChart = {
        category: 'test',
        brand: 'test',
        size: 'test',
        categoryTitle: 'test',
        shopAllUrl: '',
        disclaimer: 'All Sizes in Inches Unless Otherwise Stated',
        charts: [
          {
            brandTitle: 'test',
            sizeTitle: 'test',
            header: ['test1', 'test2', 'test3'],
            data: [
              ['test1', 'test4', 'test7'],
              ['', 'test5', 'test8'],
              ['test3', 'test6', 'test9'],
              ['row_merge', 'row_merge', 'row_merge'],
            ],
          },
          {
            brandTitle: 'test1',
            sizeTitle: 'test1',
            header: ['test4', 'column_merge', 'column_merge', 'test6'],
            data: [
              ['test1', 'test4', 'column_merge', 'test7'],
              ['test2', 'test5', 'column_merge', 'row_merge'],
              ['row_merge', 'row_merge', 'column_merge', 'test9'],
            ],
          },
        ],
      }
      await dispatch(httpActions.saveSizeChart({
        ...garbageSizeChart,
        user: {
          email: '',
        },
      }))
      expect(axios.post.mock.calls.length).toBe(0)
      expect(harbinger.trackEvent.mock.calls.length).toBe(0)
      applyActions()
      expect(store.getState().isSaveSizeChartError).toBeTruthy()
      expect(store.getState().saveErrorMessage).toEqual('All cells must contain something!')
    })
  })

  describe('getAllIdentifiers', () => {
    it('should get identifiers from the api', async () => {
      axios.get.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({
            status: 200,
            statusText: '',
            data: { ...identifiers },
          })
        })
      })
      await store.dispatch(httpActions.getAllSizeChartIdentifiers())
      expect(axios.get).toBeCalledWith(envConfigs.api.sizeChartApi + 'sizecharts/get/all')
      applyActions()
      for (let i = 0; i < identifiers.length; i++) {
        expect(store.getState().identifiers[i]).toEqual(identifiers[i])
      }
    })

    it('error\'s should break anything', async () => {
      axios.get.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject(new Error('its a problem'))
        })
      })
      await store.dispatch(httpActions.getAllSizeChartIdentifiers())
      expect(axios.get).toBeCalledWith(envConfigs.api.sizeChartApi + 'sizecharts/get/all')
      applyActions()
    })
  })

  describe('resetSaveSizechartSuccess', () => {
    it('should reset save sizechart success', () => {
      store = mockStore({
        ...initialState,
        ...sizeChart,
        isSaveSizeChartSuccess: true,
      })
      store.dispatch(httpActions.resetSaveSizechartSuccess())
      applyActions()
      expect(store.getState().isSaveSizeChartSuccess).toBeFalsy()
    })
  })

  describe('setSizeChartCreate', () => {
    it('should set size chart create', () => {
      store.dispatch(httpActions.setSizeChartCreate(true))
      applyActions()
      expect(store.getState().newChart).toBeTruthy()
    })
  })
})
