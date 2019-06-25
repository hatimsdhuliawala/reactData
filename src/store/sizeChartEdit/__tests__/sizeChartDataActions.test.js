/* eslint-disable */
// lint disabled here because i had to make magic with imports
import * as dataActions from '../sizeChartDataActions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {initialState} from '../reducer'
import sizeChartReducer from '../reducer'
/* eslint-enable */

/*
 * This test suite tests the sizeChartDataActions as well as the
 * related reducer calls
 */

describe('Data Action Test: ', () => {
  let middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store
  let dispatch

  beforeEach(() => {
    let sizeChart = {
      category: 'test',
      brand: 'test',
      size: 'test',
      categoryTitle: 'test',
      shopAllUrl: '',
      disclaimer: 'All Sizes in Inches unless otherwise stated',
      charts: [
        {
          brandTitle: 'test',
          sizeTitle: 'test',
          header: ['test', 'test', 'test'],
          data: [
            ['test', 'test', 'test'],
            ['test', 'test', 'test'],
            ['test', 'test', 'test'],
          ],
        },
      ],
    }
    let identifiers = [
      { category: 'test', brand: 'test', size: 'test' },
      { category: 'test2', brand: 'test1', size: 'test1' },
      { category: 'test1', brand: 'test1', size: 'test2' },
      { category: 'test1', brand: 'test2', size: 'test2' },
      { category: 'test', brand: 'test1', size: 'test' },
    ]
    store = mockStore({
      ...initialState,
      sizeChart,
      identifiers,
    })
    dispatch = store.dispatch
  })

  describe('setSearchCategories ', () => {
    let output
    beforeEach(() => {
      output = dataActions.setSearchCategories(store.getState().identifiers)
    })

    it('should set all categories', () => {
      expect(output.categories).toEqual(['test', 'test1', 'test2'])
    })

    it('should be ordered alphabetically', () => {
      for (let i = 1; i < output.categories.length; i++) {
        expect(output.categories[i] > output.categories[i - 1]).toBeTruthy()
      }
    })
  })

  describe('editTableInfo', () => {
    it('should update categoryTitle and only categoryTitle', () => {
      dispatch(dataActions.editTableInfo({
        target: 'category',
        sizeChart: store.getState().sizeChart,
        table: 0,
        value: 'Test',
      }))
      applyActions()
      let state = store.getState()
      expect(state.sizeChart.categoryTitle).toBe('Test')
      expect(state.sizeChart.charts[0].brandTitle).toBe('test')
      expect(state.sizeChart.charts[0].sizeTitle).toBe('test')
      expect(state.sizeChart.disclaimer).toBe('All Sizes in Inches unless otherwise stated')
    })

    it('should update brandTitle and only brandTitle', () => {
      dispatch(dataActions.editTableInfo({
        target: 'brand',
        sizeChart: store.getState().sizeChart,
        table: 0,
        value: 'Test',
      }))
      applyActions()
      let state = store.getState()
      expect(state.sizeChart.categoryTitle).toBe('test')
      expect(state.sizeChart.charts[0].brandTitle).toBe('Test')
      expect(state.sizeChart.charts[0].sizeTitle).toBe('test')
      expect(state.sizeChart.disclaimer).toBe('All Sizes in Inches unless otherwise stated')
    })

    it('should update sizeTitle and only sizeTitle', () => {
      dispatch(dataActions.editTableInfo({
        target: 'size',
        sizeChart: store.getState().sizeChart,
        table: 0,
        value: 'Test',
      }))
      applyActions()
      let state = store.getState()
      expect(state.sizeChart.categoryTitle).toBe('test')
      expect(state.sizeChart.charts[0].brandTitle).toBe('test')
      expect(state.sizeChart.charts[0].sizeTitle).toBe('Test')
      expect(state.sizeChart.disclaimer).toBe('All Sizes in Inches unless otherwise stated')
    })

    it('should update the disclaimer and only the disclaimer', () => {
      dispatch(dataActions.editTableInfo({
        target: 'disclaimer',
        sizeChart: store.getState().sizeChart,
        table: 0,
        value: 'Test',
      }))
      applyActions()
      let state = store.getState()
      expect(state.sizeChart.categoryTitle).toBe('test')
      expect(state.sizeChart.charts[0].brandTitle).toBe('test')
      expect(state.sizeChart.charts[0].sizeTitle).toBe('test')
      expect(state.sizeChart.disclaimer).toBe('Test')
    })
  })

  describe('editTableData', () => {
    it('should update every data entry', () => {
      let data = store.getState().sizeChart.charts[0].data
      for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[row].length; col++) {
          store.dispatch(dataActions.editTableData(
            {
              table: 0,
              row: row,
              col: col,
              sizeChart: store.getState().sizeChart,
              value: 'Test',
            }
          ))
          applyActions()
          expect(store.getState().sizeChart.charts[0].data[row][col]).toEqual('Test')
        }
      }
      expect(store.getState().sizeChart.charts[0].data).toEqual([
        ['Test', 'Test', 'Test'],
        ['Test', 'Test', 'Test'],
        ['Test', 'Test', 'Test'],
      ])
    })

    it('should update every header entry', () => {
      let header = store.getState().sizeChart.charts[0].header
      for (let col = 0; col < header.length; col++) {
        store.dispatch(dataActions.editTableData(
          {
            table: 0,
            row: -1,
            col: col,
            sizeChart: store.getState().sizeChart,
            value: 'Test',
          }
        ))
        applyActions()
        expect(store.getState().sizeChart.charts[0].header[col]).toEqual('Test')
      }
      expect(store.getState().sizeChart.charts[0].header).toEqual(
        ['Test', 'Test', 'Test']
      )
    })
  })

  describe('addTable', () => {
    it('should be able to add a table', () => {
      let initialChart = store.getState().sizeChart.charts[0]
      dispatch(dataActions.addTable(
        {
          rows: 3,
          cols: 3,
          sizeChart: store.getState().sizeChart,
        }
      ))
      applyActions()
      expect(store.getState().sizeChart.charts.length).toBe(2)
      expect(store.getState().sizeChart.charts[1].sizeTitle).toBe('')
      expect(store.getState().sizeChart.charts[1].brandTitle).toBe('')
      expect(store.getState().sizeChart.charts[1].data.length).toBe(3)
      expect(store.getState().sizeChart.charts[1].header.length).toBe(3)
      expect(store.getState().sizeChart.charts[1].data[0].length).toBe(3)
      expect(store.getState().sizeChart.charts[0]).toEqual(initialChart)
    })

    it('should set brandTitle and sizeTitle for first table', () => {
      store = mockStore({
        ...initialState,
        identifiers: store.getState().identifiers,
        sizeChart: {
          category: 'test',
          brand: 'test',
          size: 'test',
          categoryTitle: '',
          shopAllUrl: '',
          disclaimer: 'All Sizes in Inches unless otherwise stated',
          charts: [],
        },
      })
      store.dispatch(dataActions.addTable(
        {
          rows: 3,
          cols: 3,
          sizeChart: store.getState().sizeChart,
        }
      ))
      applyActions()
      expect(store.getState().sizeChart.charts.length).toBe(1)
      expect(store.getState().sizeChart.charts[0].sizeTitle).toBe('test')
      expect(store.getState().sizeChart.charts[0].brandTitle).toBe('test')
      expect(store.getState().sizeChart.categoryTitle).toBe('')
      expect(store.getState().sizeChart.charts[0].data.length).toBe(3)
      expect(store.getState().sizeChart.charts[0].header.length).toBe(3)
      expect(store.getState().sizeChart.charts[0].data[0].length).toBe(3)
    })
  })

  describe('importSizeChart', () => {
    it('should import a sizeChart', () => {
      dispatch(dataActions.importSizeChart({
        category: 'test',
        brand: 'test',
        size: 'test',
        header: ['test1', 'test2', 'test3'],
        data: [
          ['test1', 'test2', 'test3'],
          ['test1', 'test2', 'test3'],
          ['test1', 'test2', 'test3'],
        ],
      }))
      applyActions()
      let sizeChart = store.getState().sizeChart
      expect(sizeChart.charts[0].header).toEqual(['test1', 'test2', 'test3'])
      expect(sizeChart.charts[0].data).toEqual([
        ['test1', 'test2', 'test3'],
        ['test1', 'test2', 'test3'],
        ['test1', 'test2', 'test3'],
      ])
    })
  })

  describe('changeSelection', () => {
    it('should change selection', () => {
      dispatch(dataActions.changeSelection({
        selectStart: {
          row: 1,
          col: 1,
          chart: 0,
        },
        selectEnd: {
          row: 2,
          col: 2,
          chart: 0,
        },
      }))
      applyActions()
      expect(store.getState().selectStart).toEqual({ row: 1, col: 1, chart: 0 })
      expect(store.getState().selectEnd).toEqual({ row: 2, col: 2, chart: 0 })
    })
  })

  describe('undo', () => {
    it('should go back one state', () => {
      dispatch(dataActions.editTableData(
        {
          table: 0,
          row: 1,
          col: 1,
          sizeChart: store.getState().sizeChart,
          value: 'Test',
        }
      ))
      applyActions()
      expect(store.getState().sizeChart.charts[0].data[1][1]).toEqual('Test')
      store.dispatch(dataActions.undo())
      applyActions()
      expect(store.getState().sizeChart.charts[0].data[1][1]).toEqual('test')
    })
  })

  // applies the actions in the size chart reducer
  // then updates the state so further testing is still possible
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
})
