/* eslint-disable */
// lint disabled here because i had to make magic with imports
import * as insertActions from '../sizeChartInsertActions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {initialState} from '../reducer'
import sizeChartReducer from '../reducer'
/* eslint-enable */

/*
 * This test suite tests the sizeChartInsertActions as well as the
 * related reducer calls
 */

describe('Insert Action Tests: ', () => {
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
  /*
   * tests the insert input checking function, so naturally,
   * this is a lot of code that all looks similar
   */
  describe('testing canInsert', () => {
    describe('left', () => {
      it('should be able to insert when a column is selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 0,
            chart: 0,
          },
          dir: 'left',
          sizeChart: store.getState().sizeChart,
        })).toBeTruthy()
      })
      it('should be able to insert when a row is selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 0,
            col: 2,
            chart: 0,
          },
          dir: 'left',
          sizeChart: store.getState().sizeChart,
        })).toBeTruthy()
      })
      it('should not be able to insert when a multiple charts are selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 0,
            chart: 1,
          },
          dir: 'left',
          sizeChart: store.getState().sizeChart,
        })).toBeFalsy()
      })
    })
    describe('up', () => {
      it('should be able to insert when a data column is selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 0,
            chart: 0,
          },
          dir: 'up',
          sizeChart: store.getState().sizeChart,
        })).toBeTruthy()
      })
      it('should be able to insert when a data row is selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 0,
            col: 2,
            chart: 0,
          },
          dir: 'up',
          sizeChart: store.getState().sizeChart,
        })).toBeTruthy()
      })
      it('should not be able to insert when a multiple charts are selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 0,
            chart: 1,
          },
          dir: 'up',
          sizeChart: store.getState().sizeChart,
        })).toBeFalsy()
      })
      it('should NOT be able to insert when any header is selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: -1,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 0,
            chart: 0,
          },
          dir: 'up',
          sizeChart: store.getState().sizeChart,
        })).toBeFalsy()
        expect(insertActions.canInsert({
          selectStart: {
            row: -1,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: -1,
            col: 2,
            chart: 0,
          },
          dir: 'up',
          sizeChart: store.getState().sizeChart,
        })).toBeFalsy()
        expect(insertActions.canInsert({
          selectStart: {
            row: -1,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 2,
            chart: 0,
          },
          dir: 'up',
          sizeChart: store.getState().sizeChart,
        })).toBeFalsy()
      })
    })
    describe('down', () => {
      it('should be able to insert when a data column is selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 0,
            chart: 0,
          },
          dir: 'down',
          sizeChart: store.getState().sizeChart,
        })).toBeTruthy()
      })
      it('should be able to insert when a data row is selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 0,
            col: 2,
            chart: 0,
          },
          dir: 'down',
          sizeChart: store.getState().sizeChart,
        })).toBeTruthy()
      })
      it('should NOT be able to insert when a multiple charts are selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 0,
            chart: 1,
          },
          dir: 'down',
          sizeChart: store.getState().sizeChart,
        })).toBeFalsy()
      })
      it('should be able to insert when any header is selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: -1,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 0,
            chart: 0,
          },
          dir: 'down',
          sizeChart: store.getState().sizeChart,
        })).toBeTruthy()
        expect(insertActions.canInsert({
          selectStart: {
            row: -1,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: -1,
            col: 2,
            chart: 0,
          },
          dir: 'down',
          sizeChart: store.getState().sizeChart,
        })).toBeTruthy()
        expect(insertActions.canInsert({
          selectStart: {
            row: -1,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 2,
            chart: 0,
          },
          dir: 'down',
          sizeChart: store.getState().sizeChart,
        })).toBeTruthy()
      })
    })
    describe('right', () => {
      it('should be able to insert when a column is selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 0,
            chart: 0,
          },
          dir: 'right',
          sizeChart: store.getState().sizeChart,
        })).toBeTruthy()
      })
      it('should be able to insert when a row is selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 0,
            col: 2,
            chart: 0,
          },
          dir: 'right',
          sizeChart: store.getState().sizeChart,
        })).toBeTruthy()
      })
      it('should not be able to insert when a multiple charts are selected', () => {
        expect(insertActions.canInsert({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 0,
            chart: 1,
          },
          dir: 'right',
          sizeChart: store.getState().sizeChart,
        })).toBeFalsy()
      })
    })
  })

  describe('insert column', () => {
    describe('left', () => {
      it('should be able to insert left of the chart', () => {
        dispatch(insertActions.insertColumn({
          selectStart: {
            row: -1,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 0,
            chart: 0,
          },
          dir: 'left',
          sizeChart: store.getState().sizeChart,
        }))
        applyActions()
        let chart = store.getState().sizeChart.charts[0]
        expect(chart.header.length).toBe(4)
        expect(chart.header[0]).toEqual('')
        expect(chart.data.length).toBe(3)
        for (let i = 0; i < chart.data.length; i++) {
          expect(chart.data[i].length).toBe(4)
          expect(chart.data[i][0]).toEqual('')
        }
      })
      it('should be able to insert to the left of a column', () => {
        dispatch(insertActions.insertColumn({
          selectStart: {
            row: -1,
            col: 1,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 1,
            chart: 0,
          },
          dir: 'left',
          sizeChart: store.getState().sizeChart,
        }))
        applyActions()
        let chart = store.getState().sizeChart.charts[0]
        expect(chart.header.length).toBe(4)
        expect(chart.header[1]).toEqual('')
        expect(chart.data.length).toBe(3)
        for (let i = 0; i < chart.data.length; i++) {
          expect(chart.data[i].length).toBe(4)
          expect(chart.data[i][1]).toEqual('')
        }
      })
    })
    describe('right', () => {
      it('should be able to insert right of the chart', () => {
        dispatch(insertActions.insertColumn({
          selectStart: {
            row: -1,
            col: 2,
            chart: 0,
          },
          selectEnd: {
            row: -1,
            col: 2,
            chart: 0,
          },
          dir: 'right',
          sizeChart: store.getState().sizeChart,
        }))
        applyActions()
        let chart = store.getState().sizeChart.charts[0]
        expect(chart.header.length).toBe(4)
        expect(chart.header[3]).toEqual('')
        expect(chart.data.length).toBe(3)
        for (let i = 0; i < chart.data.length; i++) {
          expect(chart.data[i].length).toBe(4)
          expect(chart.data[i][3]).toEqual('')
        }
      })
      it('should be able to insert to the right of a column', () => {
        dispatch(insertActions.insertColumn({
          selectStart: {
            row: -1,
            col: 1,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 1,
            chart: 0,
          },
          dir: 'right',
          sizeChart: store.getState().sizeChart,
        }))
        applyActions()
        let chart = store.getState().sizeChart.charts[0]
        expect(chart.header.length).toBe(4)
        expect(chart.header[2]).toEqual('')
        expect(chart.data.length).toBe(3)
        for (let i = 0; i < chart.data.length; i++) {
          expect(chart.data[i].length).toBe(4)
          expect(chart.data[i][2]).toEqual('')
        }
      })
    })
  })

  describe('insert row', () => {
    describe('up', () => {
      it('should be able to insert top of the chart', () => {
        dispatch(insertActions.insertRow({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 0,
            col: 2,
            chart: 0,
          },
          dir: 'up',
          sizeChart: store.getState().sizeChart,
        }))
        applyActions()
        let chart = store.getState().sizeChart.charts[0]
        expect(chart.header.length).toBe(3)
        expect(chart.data.length).toBe(4)
        for (let i = 0; i < chart.data[0].length; i++) {
          expect(chart.data[0].length).toBe(3)
          expect(chart.data[0][i]).toEqual('')
        }
      })
      it('should be able to insert to the on top of a selection', () => {
        dispatch(insertActions.insertRow({
          selectStart: {
            row: 2,
            col: 2,
            chart: 0,
          },
          selectEnd: {
            row: 1,
            col: 1,
            chart: 0,
          },
          dir: 'up',
          sizeChart: store.getState().sizeChart,
        }))
        applyActions()
        let chart = store.getState().sizeChart.charts[0]
        expect(chart.header.length).toBe(3)
        expect(chart.data.length).toBe(4)
        for (let i = 0; i < chart.data[1].length; i++) {
          expect(chart.data[1].length).toBe(3)
          expect(chart.data[1][i]).toEqual('')
        }
      })
    })
    describe('down', () => {
      it('should be able to insert bellow of the chart', () => {
        dispatch(insertActions.insertRow({
          selectStart: {
            row: 0,
            col: 0,
            chart: 0,
          },
          selectEnd: {
            row: 2,
            col: 2,
            chart: 0,
          },
          dir: 'down',
          sizeChart: store.getState().sizeChart,
        }))
        applyActions()
        let chart = store.getState().sizeChart.charts[0]
        expect(chart.header.length).toBe(3)
        expect(chart.data.length).toBe(4)
        for (let i = 0; i < chart.data[0].length; i++) {
          expect(chart.data[3].length).toBe(3)
          expect(chart.data[3][i]).toEqual('')
        }
      })
      it('should be able to insert to the on bellow of a selection', () => {
        dispatch(insertActions.insertRow({
          selectStart: {
            row: 1,
            col: 1,
            chart: 0,
          },
          selectEnd: {
            row: 0,
            col: 0,
            chart: 0,
          },
          dir: 'down',
          sizeChart: store.getState().sizeChart,
        }))
        applyActions()
        let chart = store.getState().sizeChart.charts[0]
        expect(chart.header.length).toBe(3)
        expect(chart.data.length).toBe(4)
        for (let i = 0; i < chart.data[1].length; i++) {
          expect(chart.data[2].length).toBe(3)
          expect(chart.data[2][i]).toEqual('')
        }
      })
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
