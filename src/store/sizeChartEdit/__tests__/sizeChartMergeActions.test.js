/* eslint-disable */
// lint disabled here because i had to make magic with imports
import * as mergeActions from '../sizeChartMergeActions'
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
  let selectLocations
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
    let identifiers = [
      { category: 'test', brand: 'test', size: 'test' },
      { category: 'test2', brand: 'test1', size: 'test1' },
      { category: 'test1', brand: 'test1', size: 'test2' },
      { category: 'test1', brand: 'test2', size: 'test2' },
      { category: 'test', brand: 'test1', size: 'test' },
    ]
    selectLocations = {
      middleLoc: {
        row: 1,
        col: 1,
        chart: 0,
      },
      topRightDataLoc: {
        row: 0,
        col: 2,
        chart: 0,
      },
      topLeftDataLoc: {
        row: 0,
        col: 0,
        chart: 0,
      },
      topMiddleDataLoc: {
        row: 0,
        col: 1,
        chart: 0,
      },
      bottomRightDataLoc: {
        row: 2,
        col: 2,
        chart: 0,
      },
      leftHeaderLoc: {
        row: -1,
        col: 0,
        chart: 0,
      },
      midHeaderLoc: {
        row: -1,
        col: 1,
        chart: 0,
      },
      unmergeHeaderLoc: {
        row: -1,
        col: 0,
        chart: 1,
      },
      unmergeRowLoc: {
        row: 0,
        col: 2,
        chart: 1,
      },
      unmergeAllLoc: {
        row: 1,
        col: 0,
        chart: 1,
      },
    }
    store = mockStore({
      ...initialState,
      sizeChart,
      identifiers,
      selectLocations,
    })
    dispatch = store.dispatch
  })

  describe('mergeHorrizontally', () => {
    it('should merge two adjacent data cells horrizontally', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeHorrizontally({
        sizeChart,
        selectStart: selectLocations.topLeftDataLoc,
        selectEnd: selectLocations.topMiddleDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')

      dispatch(mergeActions.mergeHorrizontally({
        sizeChart,
        selectEnd: selectLocations.topLeftDataLoc,
        selectStart: selectLocations.topMiddleDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
    })

    it('should merge all data cells horrizontally', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeHorrizontally({
        sizeChart,
        selectStart: selectLocations.topLeftDataLoc,
        selectEnd: selectLocations.topRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][2]).toBe('column_merge')

      dispatch(mergeActions.mergeHorrizontally({
        sizeChart,
        selectEnd: selectLocations.topLeftDataLoc,
        selectStart: selectLocations.topRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][2]).toBe('column_merge')
    })

    it('should merge two adjacent header cells horrizontally', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeHorrizontally({
        sizeChart,
        selectStart: selectLocations.leftHeaderLoc,
        selectEnd: selectLocations.midHeaderLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data.length).toBe(3)
      expect(newSizeChart.charts[0].header[1]).toBe('column_merge')
      expect(newSizeChart.charts[0].header[0]).toBe('test1')

      dispatch(mergeActions.mergeHorrizontally({
        sizeChart,
        selectEnd: selectLocations.leftHeaderLoc,
        selectStart: selectLocations.midHeaderLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data.length).toBe(3)
      expect(newSizeChart.charts[0].header[1]).toBe('column_merge')
      expect(newSizeChart.charts[0].header[0]).toBe('test1')
    })
  })

  describe('mergeAllHorrizontally', () => {
    it('should merge two adjacent rows of data cells horrizontally', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAllHorrizontally({
        sizeChart,
        selectStart: selectLocations.topLeftDataLoc,
        selectEnd: selectLocations.middleLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[1][0]).toBe('test2')
      expect(newSizeChart.charts[0].data[1][1]).toBe('column_merge')

      dispatch(mergeActions.mergeAllHorrizontally({
        sizeChart,
        selectEnd: selectLocations.topLeftDataLoc,
        selectStart: selectLocations.middleLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[1][0]).toBe('test2')
      expect(newSizeChart.charts[0].data[1][1]).toBe('column_merge')
    })

    it('should merge all data cells horrizontally', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAllHorrizontally({
        sizeChart,
        selectStart: selectLocations.topLeftDataLoc,
        selectEnd: selectLocations.bottomRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][2]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[1][0]).toBe('test2')
      expect(newSizeChart.charts[0].data[1][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[1][2]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[2][0]).toBe('test3')
      expect(newSizeChart.charts[0].data[2][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[2][2]).toBe('column_merge')

      dispatch(mergeActions.mergeAllHorrizontally({
        sizeChart,
        selectEnd: selectLocations.topLeftDataLoc,
        selectStart: selectLocations.bottomRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][2]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[1][0]).toBe('test2')
      expect(newSizeChart.charts[0].data[1][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[1][2]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[2][0]).toBe('test3')
      expect(newSizeChart.charts[0].data[2][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[2][2]).toBe('column_merge')
    })

    it('should merge two adjacent header cells horrizontally', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAllHorrizontally({
        sizeChart,
        selectStart: selectLocations.leftHeaderLoc,
        selectEnd: selectLocations.midHeaderLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data.length).toBe(3)
      expect(newSizeChart.charts[0].header[1]).toBe('column_merge')
      expect(newSizeChart.charts[0].header[0]).toBe('test1')

      dispatch(mergeActions.mergeAllHorrizontally({
        sizeChart,
        selectEnd: selectLocations.leftHeaderLoc,
        selectStart: selectLocations.midHeaderLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data.length).toBe(3)
      expect(newSizeChart.charts[0].header[1]).toBe('column_merge')
      expect(newSizeChart.charts[0].header[0]).toBe('test1')
    })
  })

  describe('mergeVertically', () => {
    it('should merge two adjacent data cells vertically', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeVertically({
        sizeChart,
        selectStart: selectLocations.topMiddleDataLoc,
        selectEnd: selectLocations.middleLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][1]).toBe('test4')
      expect(newSizeChart.charts[0].data[1][1]).toBe('row_merge')

      dispatch(mergeActions.mergeVertically({
        sizeChart,
        selectEnd: selectLocations.topMiddleDataLoc,
        selectStart: selectLocations.middleLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][1]).toBe('test4')
      expect(newSizeChart.charts[0].data[1][1]).toBe('row_merge')
    })

    it('should not vertically merge header cells', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeVertically({
        sizeChart,
        selectStart: selectLocations.leftHeaderLoc,
        selectEnd: selectLocations.topLeftDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].header[0]).toBe('test1')

      dispatch(mergeActions.mergeVertically({
        sizeChart,
        selectEnd: selectLocations.leftHeaderLoc,
        selectStart: selectLocations.topLeftDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].header[0]).toBe('test1')
    })

    it('should merge ALL cells in a data column', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeVertically({
        sizeChart,
        selectStart: selectLocations.topRightDataLoc,
        selectEnd: selectLocations.bottomRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][2]).toBe('test7')
      expect(newSizeChart.charts[0].data[1][2]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][2]).toBe('row_merge')

      dispatch(mergeActions.mergeVertically({
        sizeChart,
        selectEnd: selectLocations.topRightDataLoc,
        selectStart: selectLocations.bottomRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][2]).toBe('test7')
      expect(newSizeChart.charts[0].data[1][2]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][2]).toBe('row_merge')
    })
  })

  describe('mergeAllVertically', () => {
    it('should merge cells in selection vertically', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAllVertically({
        sizeChart,
        selectStart: selectLocations.topLeftDataLoc,
        selectEnd: selectLocations.middleLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[1][0]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[0][1]).toBe('test4')
      expect(newSizeChart.charts[0].data[1][1]).toBe('row_merge')

      dispatch(mergeActions.mergeAllVertically({
        sizeChart,
        selectEnd: selectLocations.topLeftDataLoc,
        selectStart: selectLocations.middleLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[1][0]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[0][1]).toBe('test4')
      expect(newSizeChart.charts[0].data[1][1]).toBe('row_merge')
    })

    it('should not vertically merge header cells', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAllVertically({
        sizeChart,
        selectStart: selectLocations.leftHeaderLoc,
        selectEnd: selectLocations.topLeftDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].header[0]).toBe('test1')

      dispatch(mergeActions.mergeAllVertically({
        sizeChart,
        selectEnd: selectLocations.leftHeaderLoc,
        selectStart: selectLocations.topLeftDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].header[0]).toBe('test1')
    })

    it('should merge ALL cells in the table vertically', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAllVertically({
        sizeChart,
        selectStart: selectLocations.topLeftDataLoc,
        selectEnd: selectLocations.bottomRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][1]).toBe('test4')
      expect(newSizeChart.charts[0].data[0][2]).toBe('test7')
      expect(newSizeChart.charts[0].data[1][0]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[1][1]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[1][2]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][0]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][1]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][2]).toBe('row_merge')

      dispatch(mergeActions.mergeAllVertically({
        sizeChart,
        selectEnd: selectLocations.topLeftDataLoc,
        selectStart: selectLocations.bottomRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][1]).toBe('test4')
      expect(newSizeChart.charts[0].data[0][2]).toBe('test7')
      expect(newSizeChart.charts[0].data[1][0]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[1][1]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[1][2]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][0]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][1]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][2]).toBe('row_merge')
    })
  })

  describe('unmerge', () => {
    it('should unmerge a header cell', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.unmergeCell({
        sizeChart,
        selectStart: selectLocations.unmergeHeaderLoc,
        selectEnd: selectLocations.unmergeHeaderLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[1].header.length).toBe(3)
      expect(newSizeChart.charts[1].data[0].length).toBe(3)
      expect(newSizeChart.charts[1].header[0]).toBe('test4')
      expect(newSizeChart.charts[1].header[1]).toBe('')
    })

    it('should unmerge a vertically merged data cell', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.unmergeCell({
        sizeChart,
        selectStart: selectLocations.unmergeRowLoc,
        selectEnd: selectLocations.unmergeRowLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[1].header.length).toBe(3)
      expect(newSizeChart.charts[1].data[0].length).toBe(3)
      expect(newSizeChart.charts[1].data[0][2]).toBe('test7')
      expect(newSizeChart.charts[1].data[1][2]).toBe('')
    })

    it('should unmerge ALL cells in a block', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.unmergeCell({
        sizeChart,
        selectStart: selectLocations.unmergeAllLoc,
        selectEnd: selectLocations.unmergeAllLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[1].header.length).toBe(3)
      expect(newSizeChart.charts[1].data[0].length).toBe(3)
      expect(newSizeChart.charts[1].data[1][0]).toBe('test2')
      expect(newSizeChart.charts[1].data[1][1]).toBe('')
      expect(newSizeChart.charts[1].data[2][0]).toBe('')
      expect(newSizeChart.charts[1].data[2][1]).toBe('')
    })
  })

  describe('mergeAll', () => {
    it('should merge two adjacent data cells horrizontally', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectStart: selectLocations.topLeftDataLoc,
        selectEnd: selectLocations.topMiddleDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')

      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectEnd: selectLocations.topLeftDataLoc,
        selectStart: selectLocations.topMiddleDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
    })

    it('should merge all data cells horrizontally', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectStart: selectLocations.topLeftDataLoc,
        selectEnd: selectLocations.topRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][2]).toBe('column_merge')

      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectEnd: selectLocations.topLeftDataLoc,
        selectStart: selectLocations.topRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][2]).toBe('column_merge')
    })

    it('should merge two adjacent header cells horrizontally', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectStart: selectLocations.leftHeaderLoc,
        selectEnd: selectLocations.midHeaderLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data.length).toBe(3)
      expect(newSizeChart.charts[0].header[1]).toBe('column_merge')
      expect(newSizeChart.charts[0].header[0]).toBe('test1')

      dispatch(mergeActions.mergeHorrizontally({
        sizeChart,
        selectEnd: selectLocations.leftHeaderLoc,
        selectStart: selectLocations.midHeaderLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data.length).toBe(3)
      expect(newSizeChart.charts[0].header[1]).toBe('column_merge')
      expect(newSizeChart.charts[0].header[0]).toBe('test1')
    })

    it('should merge two adjacent data cells vertically', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectStart: selectLocations.topMiddleDataLoc,
        selectEnd: selectLocations.middleLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][1]).toBe('test4')
      expect(newSizeChart.charts[0].data[1][1]).toBe('row_merge')

      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectEnd: selectLocations.topMiddleDataLoc,
        selectStart: selectLocations.middleLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][1]).toBe('test4')
      expect(newSizeChart.charts[0].data[1][1]).toBe('row_merge')
    })

    it('should not vertically merge header cells', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectStart: selectLocations.leftHeaderLoc,
        selectEnd: selectLocations.topLeftDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].header[0]).toBe('test1')

      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectEnd: selectLocations.leftHeaderLoc,
        selectStart: selectLocations.topLeftDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].header[0]).toBe('test1')
    })

    it('should merge ALL cells in a data column', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectStart: selectLocations.topRightDataLoc,
        selectEnd: selectLocations.bottomRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][2]).toBe('test7')
      expect(newSizeChart.charts[0].data[1][2]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][2]).toBe('row_merge')

      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectEnd: selectLocations.topRightDataLoc,
        selectStart: selectLocations.bottomRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][2]).toBe('test7')
      expect(newSizeChart.charts[0].data[1][2]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][2]).toBe('row_merge')
    })

    it('should merge all data cells into one big one', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectStart: selectLocations.topLeftDataLoc,
        selectEnd: selectLocations.bottomRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][2]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[1][0]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[1][1]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[1][2]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][0]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][1]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][2]).toBe('row_merge')

      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectEnd: selectLocations.topLeftDataLoc,
        selectStart: selectLocations.bottomRightDataLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][2]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[1][0]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[1][1]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[1][2]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][0]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][1]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[2][2]).toBe('row_merge')
    })

    it('should merge some data cells into one big one', () => {
      let sizeChart = store.getState().sizeChart
      let newSizeChart
      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectStart: selectLocations.topLeftDataLoc,
        selectEnd: selectLocations.middleLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][2]).toBe('test7')
      expect(newSizeChart.charts[0].data[1][0]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[1][1]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[1][2]).toBe('test8')
      expect(newSizeChart.charts[0].data[2][0]).toBe('test3')
      expect(newSizeChart.charts[0].data[2][1]).toBe('test6')
      expect(newSizeChart.charts[0].data[2][2]).toBe('test9')

      dispatch(mergeActions.mergeAll({
        sizeChart,
        selectEnd: selectLocations.topLeftDataLoc,
        selectStart: selectLocations.middleLoc,
      }))
      applyActions()
      newSizeChart = store.getState().sizeChart
      expect(newSizeChart.charts[0].header.length).toBe(3)
      expect(newSizeChart.charts[0].data[0].length).toBe(3)
      expect(newSizeChart.charts[0].data[0][0]).toBe('test1')
      expect(newSizeChart.charts[0].data[0][1]).toBe('column_merge')
      expect(newSizeChart.charts[0].data[0][2]).toBe('test7')
      expect(newSizeChart.charts[0].data[1][0]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[1][1]).toBe('row_merge')
      expect(newSizeChart.charts[0].data[1][2]).toBe('test8')
      expect(newSizeChart.charts[0].data[2][0]).toBe('test3')
      expect(newSizeChart.charts[0].data[2][1]).toBe('test6')
      expect(newSizeChart.charts[0].data[2][2]).toBe('test9')
    })
  })
})
