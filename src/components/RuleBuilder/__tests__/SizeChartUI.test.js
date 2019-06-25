import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
/* eslint-disable */
//import SizeChartUI from '../SizeChartUI'
import { SizeChartUI, mapStateToProps, mapDispatchToProps } from '../Components/SizeChartUI'
import { initialState } from '../../../store/sizeChartEdit/reducer'
import sizeChartReducer from '../../../store/sizeChartEdit/reducer'
/* eslint-enable */
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import styles from '../../../styles/sizeChartUI'

describe('SizeChartUI Container', () => {
  let middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store
  let renderer
  let sizeChart
  let identifiers

  beforeEach(() => {
    renderer = new ShallowRenderer()
    sizeChart = {
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

    identifiers = [
      { category: 'test', brand: 'test', size: 'test' },
      { category: 'test2', brand: 'test1', size: 'test1' },
      { category: 'test1', brand: 'test1', size: 'test2' },
      { category: 'test1', brand: 'test2', size: 'test2' },
      { category: 'test', brand: 'test1', size: 'test' },
    ]

    store = mockStore({
      sizeChartEdit: { ...initialState },
      user: {
        email: '',
      },
      layout: {
        headerTitle: 'test_render',
      },
    })
  })
  describe('the display element', () => {
    it('should render the empty state', () => {
      const tree = renderer.render(
        <SizeChartUI
          sizeChartEdit={initialState.sizeChart}
          identifiers={[]}
          classes={styles}
        />
      )
      expect(tree).toMatchSnapshot('empty_state')
    })

    it('should render a sizechart and the toolbox', () => {
      const tree = renderer.render(
        <SizeChartUI
          sizeChartEdit={
            {
              ...sizeChart,
            }
          }
          identifiers={identifiers}
          classes={styles}
        />
      )
      expect(tree).toMatchSnapshot('sizechart_loaded')
    })
    describe('dialoges and snackbars', () => {
      it('should show the dialoge to add a new table', () => {
        const tree = renderer.render(
          <SizeChartUI
            sizeChartEdit={
              {
                ...sizeChart,
              }
            }
            identifiers={identifiers}
            classes={styles}
            newChart
          />
        )
        expect(tree).toMatchSnapshot('sizechart_add_table')
      })
      it('should show the dialoge for sizeChart not found', () => {
        const tree = renderer.render(
          <SizeChartUI
            sizeChartEdit={
              {
                ...initialState.sizeChart,
                category: 'test',
                brand: 'test',
                size: 'test',
              }
            }
            identifiers={identifiers}
            classes={styles}
            isGetSizeChartError
          />
        )
        expect(tree).toMatchSnapshot('sizechart_get_failed')
      })

      it('should show the dialoge for sizeChart save failed', () => {
        const tree = renderer.render(
          <SizeChartUI
            sizeChartEdit={
              {
                ...sizeChart,
              }
            }
            identifiers={identifiers}
            classes={styles}
            isSaveSizeChartError
            saveErrorMessage={'This is a test, so this should show'}
          />
        )
        expect(tree).toMatchSnapshot('sizechart_save_failed')
      })

      it('should show the snackbar when a sizechart is saved', () => {
        const tree = renderer.render(
          <SizeChartUI
            sizeChartEdit={
              {
                ...initialState.sizeChart,
              }
            }
            identifiers={identifiers}
            classes={styles}
            isSaveSizeChartSuccess
          />
        )
        expect(tree).toMatchSnapshot('sizechart_save_failed')
      })
    })

    describe('props tests', () => {
      it('should map state to props correctly', () => {
        let state = store.getState()
        let props = mapStateToProps(state)
        expect(props.sizeChart).toEqual(initialState.sizeChart)
        expect(props.headerTitle).toEqual('test_render')
        expect(props.user).toEqual({ email: '' })
        expect(props.selectStart).toEqual({ row: -1, col: -1, chart: -1 })
        expect(props.selectEnd).toEqual({ row: -1, col: -1, chart: -1 })
        expect(props.selectMode).toBeFalsy()
        expect(props.hasSelection).toBeFalsy()
        expect(props.categories).toEqual([])
        expect(props.saveErrorMessage).toEqual('')
        expect(props.identifiers).toEqual([])
      })

      it('should map dispatch to props correctly', async () => {
        let dispatch = store.dispatch
        let props = mapDispatchToProps(dispatch)

        // makes sure the right things are in props
        expect(props.saveSizeChart).toBeDefined()
        expect(props.addTable).toBeDefined()
        expect(props.cancelNewChart).toBeDefined()
        expect(props.deescalateSizechatGetError).toBeDefined()
        expect(props.handleSaveError).toBeDefined()
        expect(props.resetSaveSizechartSuccess).toBeDefined()
        expect(props.insertRow).toBeDefined()
        expect(props.insertCol).toBeDefined()
        expect(props.canInsert).toBeDefined()
        expect(props.deleteColumn).toBeDefined()
        expect(props.deleteRow).toBeDefined()
        expect(props.deleteTable).toBeDefined()
        expect(props.mergeHorrizontally).toBeDefined()
        expect(props.mergeVertically).toBeDefined()
        expect(props.mergeAllHorrizontally).toBeDefined()
        expect(props.mergeAllVertically).toBeDefined()
        expect(props.mergeAll).toBeDefined()
        expect(props.unmergeCell).toBeDefined()
        expect(props.editTableData).toBeDefined()
        expect(props.editTableInfo).toBeDefined()
        expect(props.editSearchInfo).toBeDefined()
        expect(props.createSizeChart).toBeDefined()
        expect(props.setSelectMode).toBeDefined()
        expect(props.changeSelection).toBeDefined()
        expect(props.clearSelection).toBeDefined()
        expect(props.importSizeChart).toBeDefined()
        expect(props.undoSizechartChange).toBeDefined()
        expect(props.redoSizechartChange).toBeDefined()
      })
    })

    describe('toolbar', () => {
      let props
      beforeEach(() => {
        props = {
          ...mapDispatchToProps(store.dispatch),
          ...mapStateToProps(store.getState()),
        }
      })
      it('should show merge and insert options when has selection', () => {
        let component = new SizeChartUI({
          ...props,
          sizeChart: sizeChart,
          selectStart: { row: 0, col: 0, chart: 0 },
          selectEnd: { row: 2, col: 2, chart: 0 },
          hasSelection: true,
          selectMode: false,
        })
        let recievedOutput = component.prepToolbar()
        let expectedOrder = [
          { text: 'Clear Selection' },
          { text: 'Merge Horrizontally', isDisabled: true },
          { text: 'Merge All Horrizontally', isDisabled: false },
          { text: 'Merge Vertically', isDisabled: true },
          { text: 'Merge All Vertically', isDisabled: false },
          { text: 'Merge All', isDisabled: false },
          { text: 'Unmerge', isDisabled: true },
          { text: 'Insert Column Left', isDisabled: false },
          { text: 'Insert Column Right', isDisabled: false },
          { text: 'Insert Row Up', isDisabled: false },
          { text: 'Insert Row Down', isDisabled: false },
          { text: 'Delete Row', isDisabled: true },
          { text: 'Delete Column', isDisabled: true },
        ]
        expect(recievedOutput[0].text).toEqual(expectedOrder[0].text)
        for (let i = 1; i < expectedOrder.length; i++) {
          expect(recievedOutput[i].text).toEqual(expectedOrder[i].text)
          expect(recievedOutput[i].isDisabled).toEqual(expectedOrder[i].isDisabled)
        }
      })

      it('should show few options in select mode', () => {
        let component = new SizeChartUI({
          ...props,
          sizeChart: sizeChart,
          selectStart: { row: 0, col: 0, chart: 0 },
          hasSelection: false,
          selectMode: true,
        })
        let recievedOutput = component.prepToolbar()
        let expectedOrder = [
          { text: 'Select Cells', isDisabled: true },
          { text: 'Click once to start selection, click again to finish selection', isDisabled: true },
        ]
        for (let i = 0; i < expectedOrder.length; i++) {
          expect(recievedOutput[i].text).toEqual(expectedOrder[i].text)
          expect(recievedOutput[i].isDisabled).toEqual(expectedOrder[i].isDisabled)
        }
      })

      it('should show the right empty state buttons', () => {
        let component = new SizeChartUI({
          ...props,
          sizeChart: sizeChart,
          hasSelection: false,
          selectMode: false,
        })
        let recievedOutput = component.prepToolbar()
        let expectedOrder = [
          { text: 'Select Cells' },
          { text: 'Import Chart from CSV', isDisabled: false },
          { text: 'Add Additional Table', isDisabled: undefined },
          { text: 'Undo Change' },
          { text: 'Save Sizechart' },
        ]
        for (let i = 0; i < expectedOrder.length; i++) {
          expect(recievedOutput[i].text).toEqual(expectedOrder[i].text)
        }
      })

      it('should give different options if an entire table is selected', () => {
        let component = new SizeChartUI({
          ...props,
          sizeChart: sizeChart,
          hasSelection: true,
          selectMode: false,
          selectStart: { row: -1, col: 0, chart: 0 },
          selectEnd: { row: 2, col: 2, chart: 0 },
        })
        let recievedOutput = component.prepToolbar()
        let expectedOrder = [
          { text: 'Clear Selection' },
          { text: 'Delete Table' },
        ]
        for (let i = 0; i < expectedOrder.length; i++) {
          expect(recievedOutput[i].text).toEqual(expectedOrder[i].text)
        }
      })
    })
  })
})
