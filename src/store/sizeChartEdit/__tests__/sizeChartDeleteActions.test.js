/* eslint-disable */
// lint disabled here because i had to make magic with imports
import * as deleteActions from '../sizeChartDeleteActions'
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
          header: ['test1', 'column_merge', 'test3'],
          data: [
            ['test1', 'test4', 'test7'],
            ['test2', 'test5', 'test8'],
            ['test3', 'test6', 'test9'],
          ],
        },
        {
          brandTitle: 'test1',
          sizeTitle: 'test1',
          header: ['test4', 'test5', 'test6'],
          data: [
            ['test1', 'test4', 'test7'],
            ['test2', 'column_merge', 'test8'],
            ['row_merge', 'test6', 'test9'],
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

  describe('deleteRow', () => {
    it('should delete a row', () => {
      dispatch(deleteActions.deleteRow(
        {
          sizeChart: store.getState().sizeChart,
          table: 0,
          row: 2,
        }
      ))
      applyActions()
      let sizeChart = store.getState().sizeChart
      expect(sizeChart.charts[0].data.length).toBe(2)
      expect(sizeChart.charts[0].header.length).toBe(3)
      expect(sizeChart.charts[0].data[1][0]).toBe('test2')
      expect(sizeChart.charts[0].data[1][1]).toBe('test5')
      expect(sizeChart.charts[0].data[1][2]).toBe('test8')
    })

    it('should unmerge cells vertically merged when deleting a row', () => {
      dispatch(deleteActions.deleteRow(
        {
          sizeChart: store.getState().sizeChart,
          table: 1,
          row: 1,
        }
      ))
      applyActions()
      let sizeChart = store.getState().sizeChart
      expect(sizeChart.charts[1].data.length).toBe(2)
      expect(sizeChart.charts[1].header.length).toBe(3)
      expect(sizeChart.charts[1].data[1][0]).toBe('')
      expect(sizeChart.charts[1].data[1][1]).toBe('test6')
      expect(sizeChart.charts[1].data[1][2]).toBe('test9')
    })

    it('should NOT delete a row that is at or beyond the length of the data', () => {
      let sizeChart
      dispatch(deleteActions.deleteRow(
        {
          sizeChart: store.getState().sizeChart,
          table: 0,
          row: 4,
        }
      ))
      applyActions()
      sizeChart = store.getState().sizeChart
      expect(sizeChart.charts[0].data.length).toBe(3)
      expect(sizeChart.charts[0].header.length).toBe(3)
      expect(sizeChart.charts[0].data[2][0]).toBe('test3')
      expect(sizeChart.charts[0].data[2][1]).toBe('test6')
      expect(sizeChart.charts[0].data[2][2]).toBe('test9')

      dispatch(deleteActions.deleteRow(
        {
          sizeChart: store.getState().sizeChart,
          table: 0,
          row: 3,
        }
      ))
      applyActions()
      sizeChart = store.getState().sizeChart
      expect(sizeChart.charts[0].data.length).toBe(3)
      expect(sizeChart.charts[0].header.length).toBe(3)
      expect(sizeChart.charts[0].data[2][0]).toBe('test3')
      expect(sizeChart.charts[0].data[2][1]).toBe('test6')
      expect(sizeChart.charts[0].data[2][2]).toBe('test9')

      dispatch(deleteActions.deleteRow(
        {
          sizeChart: store.getState().sizeChart,
          table: 0,
          row: -1,
        }
      ))
      applyActions()
      sizeChart = store.getState().sizeChart
      expect(sizeChart.charts[0].data.length).toBe(3)
      expect(sizeChart.charts[0].header.length).toBe(3)
      expect(sizeChart.charts[0].data[2][0]).toBe('test3')
      expect(sizeChart.charts[0].data[2][1]).toBe('test6')
      expect(sizeChart.charts[0].data[2][2]).toBe('test9')
    })
  })

  describe('deleteColumn', () => {
    it('should delete a column', () => {
      let sizeChart
      dispatch(deleteActions.deleteColumn(
        {
          sizeChart: store.getState().sizeChart,
          table: 0,
          col: 1,
        }
      ))
      applyActions()
      sizeChart = store.getState().sizeChart
      expect(sizeChart.charts[0].data.length).toBe(3)
      expect(sizeChart.charts[0].header.length).toBe(2)
      expect(sizeChart.charts[0].header[1]).toBe('test3')
      expect(sizeChart.charts[0].data[0][1]).toBe('test7')
      expect(sizeChart.charts[0].data[1][1]).toBe('test8')
      expect(sizeChart.charts[0].data[2][1]).toBe('test9')
    })

    it('should unmerge columns if a deleted cell contains a merge', () => {
      let sizeChart
      store.dispatch(deleteActions.deleteColumn(
        {
          sizeChart: store.getState().sizeChart,
          table: 0,
          col: 0,
        }
      ))
      applyActions()
      sizeChart = store.getState().sizeChart
      expect(sizeChart.charts[0].data.length).toBe(3)
      expect(sizeChart.charts[0].header.length).toBe(2)
      expect(sizeChart.charts[0].header[0]).toBe('')
      expect(sizeChart.charts[0].data[0][0]).toBe('test4')
      expect(sizeChart.charts[0].data[1][0]).toBe('test5')
      expect(sizeChart.charts[0].data[2][0]).toBe('test6')

      store.dispatch(deleteActions.deleteColumn(
        {
          sizeChart: store.getState().sizeChart,
          table: 1,
          col: 0,
        }
      ))
      applyActions()
      sizeChart = store.getState().sizeChart
      expect(sizeChart.charts[1].data.length).toBe(3)
      expect(sizeChart.charts[1].header.length).toBe(2)
      expect(sizeChart.charts[1].header[0]).toBe('test5')
      expect(sizeChart.charts[1].data[0][0]).toBe('test4')
      expect(sizeChart.charts[1].data[1][0]).toBe('')
      expect(sizeChart.charts[1].data[2][0]).toBe('test6')
    })

    it('should NOT delete columns outside of the table', () => {
      let sizeChart
      dispatch(deleteActions.deleteColumn(
        {
          sizeChart: store.getState().sizeChart,
          table: 0,
          col: -1,
        }
      ))
      applyActions()
      sizeChart = store.getState().sizeChart
      expect(sizeChart.charts[0].data.length).toBe(3)
      expect(sizeChart.charts[0].header.length).toBe(3)
      expect(sizeChart.charts[0].header[0]).toBe('test1')
      expect(sizeChart.charts[0].data[0][0]).toBe('test1')
      expect(sizeChart.charts[0].data[1][0]).toBe('test2')
      expect(sizeChart.charts[0].data[2][0]).toBe('test3')

      dispatch(deleteActions.deleteColumn(
        {
          sizeChart: store.getState().sizeChart,
          table: 0,
          col: 3,
        }
      ))
      applyActions()
      sizeChart = store.getState().sizeChart
      expect(sizeChart.charts[0].data.length).toBe(3)
      expect(sizeChart.charts[0].header.length).toBe(3)
      expect(sizeChart.charts[0].header[2]).toBe('test3')
      expect(sizeChart.charts[0].data[0][2]).toBe('test7')
      expect(sizeChart.charts[0].data[1][2]).toBe('test8')
      expect(sizeChart.charts[0].data[2][2]).toBe('test9')
    })
  })

  describe('deleteTable', () => {
    it('should delete a table from the front', () => {
      let sizeChart
      dispatch(deleteActions.deleteTable({
        sizeChart: store.getState().sizeChart,
        table: 0,
      }))
      applyActions()
      sizeChart = store.getState().sizeChart
      expect(sizeChart.charts.length).toBe(1)
      expect(sizeChart.charts[0].header[0]).toBe('test4')
      expect(sizeChart.charts[0].brandTitle).toBe('test1')
    })

    it('should delete a table from the back', () => {
      let sizeChart
      dispatch(deleteActions.deleteTable({
        sizeChart: store.getState().sizeChart,
        table: 1,
      }))
      applyActions()
      sizeChart = store.getState().sizeChart
      expect(sizeChart.charts.length).toBe(1)
      expect(sizeChart.charts[0].header[0]).toBe('test1')
      expect(sizeChart.charts[0].brandTitle).toBe('test')
    })

    it('should NOT delete a table outside of the array of tables', () => {
      let sizeChart
      dispatch(deleteActions.deleteTable({
        sizeChart: store.getState().sizeChart,
        table: -1,
      }))
      applyActions()
      sizeChart = store.getState().sizeChart
      expect(sizeChart.charts.length).toBe(2)
      expect(sizeChart.charts[0].brandTitle).toBe('test')
      expect(sizeChart.charts[1].brandTitle).toBe('test1')
      expect(sizeChart.charts[0].sizeTitle).toBe('test')
      expect(sizeChart.charts[1].sizeTitle).toBe('test1')

      dispatch(deleteActions.deleteTable({
        sizeChart: store.getState().sizeChart,
        table: 2,
      }))
      applyActions()
      sizeChart = store.getState().sizeChart
      expect(sizeChart.charts.length).toBe(2)
      expect(sizeChart.charts[0].brandTitle).toBe('test')
      expect(sizeChart.charts[1].brandTitle).toBe('test1')
      expect(sizeChart.charts[0].sizeTitle).toBe('test')
      expect(sizeChart.charts[1].sizeTitle).toBe('test1')
    })
  })
})
