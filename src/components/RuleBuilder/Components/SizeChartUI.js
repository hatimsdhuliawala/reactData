import React from 'react'
import PropTypes from 'prop-types'
import Prompt from 'react-router/Prompt'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Snackbar, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper } from '@material-ui/core'
import SizeChartTable from './SubComponents/SizeChartTable'
import SizeChartCreation from './SubComponents/SizeChartCreation'
import Toolbox from '../../Shared/Toolbox/Toolbox'
import Autocomplete from '../../Shared/Autocomplete/Autocomplete'
import * as mergeActions from '../../../store/sizeChartEdit/sizeChartMergeActions'
import * as deleteActions from '../../../store/sizeChartEdit/sizeChartDeleteActions'
import * as insertActions from '../../../store/sizeChartEdit/sizeChartInsertActions'
import * as dataActions from '../../../store/sizeChartEdit/sizeChartDataActions'
import * as sizeChartActions from '../../../store/sizeChartEdit/sizeChartHTTPActions'
import styles from '../../../styles/sizeChartUI'

/*
 */
export class SizeChartUI extends React.Component {
  constructor (props) {
    super(props)
    this.state = { }
  }
  /*
   * Only called after the initial mount
   */
  componentDidMount () {
    if (!this.props.subComponent) {
      let searchUrl = decodeURIComponent(this.props.location.search.slice(1))
      // parse the url
      let sizeChart = this.props.sizeChart === {}
        ? { category: '', brand: '', size: '' }
        : { ...this.props.sizeChart }
      if (searchUrl !== undefined && searchUrl !== '') {
        let parts = searchUrl.split('&')
        for (let i = 0; i < parts.length; i++) {
          let identifierPart = parts[i].split('=')
          identifierPart[1].replace(/"/g, '')
          sizeChart[identifierPart[0]] = identifierPart[1]
        }
      }
      window.onbeforeunload = () => {
        return (this.props.modified ? 'Are you sure you want to leave? You still have unsaved data' : false)
      }
      if (sizeChart.category !== '' && sizeChart.brand !== '' && sizeChart.size !== '') {
        this.props.getSizeChart(
          {
            category: sizeChart.category,
            brand: sizeChart.brand,
            size: sizeChart.size,
            user: this.props.user,
          }
        )
      } else {
        this.props.getIdentifiers()
      }
    }
    this.props.getSizeChartTabNames()
  }

  handleChange (key, value) {
    // this handles the change on the internal components
    // in a separate function to prepare the "payload"
    this.props.editSearchInfo({ sizeChart: this.props.sizeChart, key: key, value: value, identifiers: this.props.identifiers })
  }

  /*
   * Handles change in a table's data or header
   */
  handleTableChange (chart, payload) {
    payload.sizeChart = this.props.sizeChart
    payload.table = chart
    if (payload.target !== 'data') {
      this.props.editTableInfo(payload)
    } else {
      payload.chart = chart
      this.props.editTableData(payload)
    }
  }

  abs (value) {
    /* a simple function to find the absolute value of a numer */
    /* I didn't look long, but i also didn't find a native function to do this */
    return value < 0 ? value * -1 : value
  }

  /*
   *  Handles setting up all the buttons that are supposed to be in
   *  the side toolbar.
   *
   *  Will Create a different tool bar depending on what the props are
   */
  prepToolbar () {
    const {
      selectMode,
      hasSelection,
      selectStart,
      selectEnd,
      sizeChart,
    } = this.props

    var out = []
    if (!selectMode && !hasSelection) {
      out.push(
        { text: 'Select Cells',
          callback: () => {
            this.props.clearSelection()
            this.props.setSelectMode({ value: true })
          },
        }
      )

      out.push(
        {
          text: 'Import Chart from CSV',
          callback: (files) => this.importCSV(files),
          isDisabled: false,
          type: 'FileReader',
        }
      )

      out.push(
        {
          text: 'Add Additional Table',
          callback: () => this.props.addTable(),
        }
      )

      out.push(
        {
          text: 'Undo Change',
          callback: () => this.props.undoSizechartChange(),
        }
      )

      if (!this.props.subComponent) {
        out.push(
          {
            text: 'Save Sizechart',
            callback: () => {
              this.props.saveSizeChart({ ...this.props.sizeChart, user: { ...this.props.user } })
              if (this.props.location.refferer && !this.props.subComponent) {
                this.setState({
                  rederiect: {
                    target: this.props.location.refferer,
                  },
                })
              }
            },
          }
        )
      }
    }

    if (selectMode) {
      out.push(
        { text: 'Select Cells',
          callback: () => this.setState({ selectMode: true,
            hasSelection: false,
            selectStart: { row: -1,
              col: -1,
              chart: -1 },
          }),
          isDisabled: true,
        }
      )
      out.push(
        {
          text: 'Click once to start selection, click again to finish selection',
          callback: () => {},
          isDisabled: true,
        }
      )
    }

    if (hasSelection && !selectMode) {
      /* give options for selection a selection that only includes one table */

      // this check to see if an entire table is selected
      const tableSelected = selectStart.chart === selectEnd.chart &&
        (
          // if selectStart is in the upper left
          (selectStart.row === -1 &&
          selectEnd.row === sizeChart.charts[selectEnd.chart].data.length - 1 &&
          selectStart.col === 0 &&
          selectEnd.col === sizeChart.charts[selectEnd.chart].header.length - 1) ||
          // if selectStart is in the lower right
          (selectEnd.row === -1 &&
          selectStart.row === sizeChart.charts[selectStart.chart].data.length - 1 &&
          selectEnd.col === 0 &&
          selectStart.col === sizeChart.charts[selectStart.chart].header.length - 1) ||
          // if selectStart is in the upper right
          (selectStart.row === -1 &&
          selectEnd.row === sizeChart.charts[selectEnd.chart].data.length - 1 &&
          selectEnd.col === 0 &&
          selectStart.col === sizeChart.charts[selectStart.chart].header.length - 1) ||
          // if selectStart is in the lower left
          (selectEnd.row === -1 &&
          selectStart.row === sizeChart.charts[selectStart.chart].data.length - 1 &&
          selectStart.col === 0 &&
          selectEnd.col === sizeChart.charts[selectEnd.chart].header.length - 1)
        )

      // prep the payloads for all of the actions
      const mergePayload = { selectStart: selectStart, selectEnd: selectEnd, sizeChart: sizeChart }
      const insertPayload = { sizeChart: sizeChart, selectStart: selectStart, selectEnd: selectEnd, dir: '' }
      const deletePayload = { sizeChart: sizeChart, table: selectStart.chart, col: selectStart.col, row: selectStart.row }
      const chartPayload = { sizeChart: sizeChart, table: selectStart.chart }
      out.push(
        {
          text: 'Clear Selection',
          callback: () => this.props.clearSelection(),
        }
      )

      // if an entire table isn't selected, these are the action you can take on the selection
      // POSSIBLE BUG: the use won't be able to take any of these actions with a fully selected table,
      // if it is a problem, either remove this logic or change it so that users can take the actions they
      // want in as many ways as it convinient for them
      if (!tableSelected) {
        // give options to merge cells in the same row

        // MERGE OPTIONS START HERE
        out.push(
          { text: 'Merge Horrizontally',
            callback: () => this.props.mergeHorrizontally(mergePayload),
            isDisabled: (selectStart.row - selectEnd.row !== 0 || selectStart.chart !== selectEnd.chart) ||
                        (selectStart.col === selectEnd.col && selectStart.row === selectEnd.row && selectStart.chart === selectEnd.chart),
          }
        )

        out.push(
          {
            text: 'Merge All Horrizontally',
            callback: () => this.props.mergeAllHorrizontally(mergePayload),
            isDisabled: !(selectStart.chart === selectEnd.chart && selectStart.col !== selectEnd.col) ||
                        (selectStart.col === selectEnd.col && selectStart.row === selectEnd.row && selectStart.chart === selectEnd.chart),
          }
        )

        out.push(
          { text: 'Merge Vertically',
            callback: () => this.props.mergeVertically(mergePayload),
            isDisabled: selectStart.col !== selectEnd.col ||
                        selectStart.row === -1 ||
                        selectEnd.row === -1 ||
                        selectStart.chart !== selectEnd.chart ||
                        (selectStart.col === selectEnd.col && selectStart.row === selectEnd.row && selectStart.chart === selectEnd.chart),
          }
        )

        out.push(
          {
            text: 'Merge All Vertically',
            callback: () => this.props.mergeAllVertically(mergePayload),
            isDisabled: !(selectStart.chart === selectEnd.chart && selectStart.row !== -1 && selectEnd.row !== -1) ||
                        (selectStart.col === selectEnd.col && selectStart.row === selectEnd.row && selectStart.chart === selectEnd.chart),
          }
        )

        out.push(
          {
            text: 'Merge All',
            callback: () => this.props.mergeAll(mergePayload),
            isDisabled: !(selectStart.chart === selectEnd.chart && selectStart.row !== -1 && selectEnd.row !== -1) ||
                        (selectStart.col === selectEnd.col && selectStart.row === selectEnd.row && selectStart.chart === selectEnd.chart),
          }
        )

        out.push(
          {
            text: 'Unmerge',
            callback: () => this.props.unmergeCell(mergePayload),
            isDisabled: !(selectStart.chart === selectEnd.chart && selectStart.row === selectEnd.row && selectStart.col === selectEnd.col),
          }
        )

        // INSERT OPTIONS START HERE
        out.push(
          {
            text: 'Insert Column Left',
            callback: () => this.props.insertCol({ ...insertPayload, dir: 'left' }),
            isDisabled: !this.props.canInsert({ ...insertPayload, dir: 'left' }),
          }
        )

        out.push(
          {
            text: 'Insert Column Right',
            callback: () => this.props.insertCol({ ...insertPayload, dir: 'right' }),
            isDisabled: !this.props.canInsert({ ...insertPayload, dir: 'right' }),
          }
        )

        out.push(
          {
            text: 'Insert Row Up',
            callback: () => this.props.insertRow({ ...insertPayload, dir: 'up' }),
            isDisabled: !this.props.canInsert({ ...insertPayload, dir: 'up' }),
          }
        )

        out.push(
          {
            text: 'Insert Row Down',
            callback: () => this.props.insertRow({ ...insertPayload, dir: 'down' }),
            isDisabled: !this.props.canInsert({ ...insertPayload, dir: 'down' }),
          }
        )

        // DELETE OPTIONS START HERE
        out.push(
          {
            text: 'Delete Row',
            callback: () => this.props.deleteRow(deletePayload),
            isDisabled: selectStart.chart !== selectEnd.chart ||
                        selectStart.row !== selectEnd.row ||
                        this.abs(selectStart.col - selectEnd.col) + 1 !== sizeChart.charts[selectStart.chart].header.length ||
                        selectStart.row === -1,
          }
        )

        out.push(
          {
            text: 'Delete Column',
            callback: () => this.props.deleteColumn(deletePayload),
            isDisabled: selectStart.chart !== selectEnd.chart ||
                        selectStart.col !== selectEnd.col ||
                        this.abs(selectStart.row - selectEnd.row) !== sizeChart.charts[selectStart.chart].data.length,
          }
        )
      } else {
        // an entire table is selected
        out.push(
          {
            text: 'Delete Table',
            callback: () => this.props.deleteTable(chartPayload),
            isDisabled: this.props.sizeChart.charts.length <= 1,
          }
        )
      }
    }

    return out
  }

  onHover (row, col, chart) {
    /* keeps track of what cell the mouse is over in select mode */
    if (this.props.selectMode === true) {
      this.setState({
        currMouseLoc: {
          row: row,
          col: col,
          chart: chart,
        },
      })
    }
  }

  handleClick () {
    /*
     *  Handles a click on the sizeChartPreview portion of the component,
     *  mostly for clearing the current selection
     */
    const { selectStart, selectEnd, selectMode } = this.props
    if (selectMode) {
      // if there isn't a selected cell
      if (selectStart.chart === -1) {
        this.props.changeSelection({ selectStart: this.state.currMouseLoc, selectEnd: selectEnd })
      } else {
        this.props.changeSelection({ selectStart: selectStart, selectEnd: this.state.currMouseLoc })
        this.props.setSelectMode({ value: false })
      }
    } else if (this.state.hasSelection) {
      this.props.clearSelection()
    }
  }

  importCSV = (files) => {
    /* eslint-disable */
    // ignoring this line because this works but for some reason, the linter doesn't
    // know that FileReader is a native import from either react or react-file-reader
    let reader = new FileReader()
    /* eslint-enable */
    reader.onload = event => {
      let header = []
      let data = []
      let lines = reader.result.split('\n')
      header = lines[0].split(',')
      // lines.length-1 to make up for trailing \n at EOF
      for (let lineNum = 1; lineNum < lines.length - 1; lineNum++) {
        data.push(lines[lineNum].split(','))
      }

      var payload = {
        header: [...header],
        data: [...data],
        size: this.props.sizeChart.size,
        category: this.props.sizeChart.category,
        brand: this.props.sizeChart.brand,
      }

      this.props.importSizeChart(payload)
    }
    reader.readAsText(files[0])
  }

  inputIsValid () {
    /**
     * compares the value to each value in the list, if the value
     * is in the list, returns true, otherwise returns false
     */
    const { categories, identifiers, sizeChart } = this.props
    let brands = []
    for (let i = 0; i < identifiers.length; i++) {
      if (brands.indexOf(identifiers[i].brand) === -1) {
        brands.push(identifiers[i].brand)
      }
    }
    const { brand, category, size } = sizeChart
    var validBrand = false
    var validCategory = false
    for (let i in brands) {
      if (brand === brands[i]) {
        validBrand = true
        break
      }
    }

    for (let i in categories) {
      if (category === categories[i]) {
        validCategory = true
        break
      }
    }

    return validBrand && validCategory && size !== ''
  }

  render () {
    const {
      classes,
      sizeChart,
      selectStart,
      selectEnd,
      readOnly,
      sizeChartTabNames,
    } = this.props

    // Size Chart Info, removing the preciding this.props.sizeChart.*
    const {
      category,
      brand,
      size,
      charts,
      disclaimer,
      categoryTitle,
    } = sizeChart
    return (
      <Paper id="SizeChartUI" className={classes.uiMain}>
        {/* Dialog that shows when the UI fails to retrieve a sizechart */}
        <Prompt
          message="Are you sure you want to leave, there is data unsaved"
          when={this.props.moddified && !this.props.subComponent}
        />
        {/* this is the part which renders the text fields prompting for
        category / brand / size which are nessisary fields for a size chart
        Also known as the empty state, TODO: Look into ether removing this or making it
        less burdensome on the user
        ******THIS SHOULD ALWAYS BE DISPLAYED */}
        {
          this.props.subComponent
            ? ''
            : (
              <div className={charts.length === 0 ? classes.topBar : classes.hidden} >
                <div className={classes.input}>
                  <Autocomplete
                    value={category}
                    onChange={(e) => this.handleChange('category', e.target.value)}
                    onSelect={(e) => this.handleChange('category', e)}
                    isDisabled={charts.length !== 0 || this.props.newChart}
                    items={this.props.categories}
                    placeholder={'Size Chart Category'}
                  />
                </div>
                <div className={classes.input}>
                  <Autocomplete
                    value={brand}
                    onChange={(e) => this.handleChange('brand', e.target.value)}
                    onSelect={(e) => this.handleChange('brand', e)}
                    isDisabled={charts.length !== 0 || this.props.newChart}
                    items={this.props.brands}
                    placeholder={'Size Chart Brand'}
                  />
                </div>
                <div className={classes.input}>
                  <Autocomplete
                    value={size}
                    onChange={(e) => this.handleChange('size', e.target.value)}
                    onSelect={(e) => this.handleChange('size', e)}
                    isDisabled={charts.length !== 0 || this.props.newChart}
                    items={this.props.sizes}
                    placeholder={'Size Chart Size'}
                  />
                </div>
                <div className={classes.input} >
                  <Button
                    variant="outlined"
                    disabled={
                      charts.length !== 0 || // there is a size chart loaded
                      !(this.inputIsValid()) || // category / brand / size are all valid values
                      this.props.newChart // there isn't a size chart being created
                    }
                    onClick={() => this.props.getSizeChart({
                      category: category,
                      brand: brand,
                      size: size,
                    })}
                    className={classes.button}
                  > Get Size Chart </Button>
                </div>
              </div>
            )
        }
        <Dialog
          open={this.props.isGetSizeChartError && category !== '' && brand !== '' && size !== '' && !readOnly}
        >
          <DialogTitle id="Sizechart Get Failed Title">Size Chart Not Found</DialogTitle>
          <DialogContent>
            <DialogContentText id="Sizechart Get Failed Text">
                  Size Chart does not exist, would you like to create it?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              this.props.deescalateSizechatGetError()
            }}>
                  No
            </Button>
            <Button onClick={() => {
              this.props.addTable()
              this.props.deescalateSizechatGetError()
            }} color="primary">
                  Yes
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog that shows when the UI fails to save a sizechart */}
        <Dialog
          open={this.props.isSaveSizeChartError}
        >
          <DialogTitle id="Sizechart Save Failed Title">Sizechart Data Error</DialogTitle>
          <DialogContent>
            <DialogContentText id="Sizechart Save Failed Text">
              {this.props.saveErrorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleSaveError()} color="primary">
                  Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.props.newChart && !readOnly}>
          <DialogTitle id="Sizechart Add Table Title" />
          <DialogActions>
            <SizeChartCreation
              onClick={(r, c) => this.props.createSizeChart({ rows: r, cols: c, sizeChart: sizeChart })}
              cancelAction={() => this.props.cancelNewChart()}
            />
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.props.isSaveSizeChartSuccess && !readOnly}
          autoHideDuration={6000}
          onClose={() => this.props.resetSaveSizechartSuccess()}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Size Chart Saved</span>}
        />
        {/*  Contains ALL THE THINGS which can moddify size charts   */}
        {/* eslint-disable */}
        {/* this is disabled because the linter through a "non-interactive elements should not have an onClick event"
          * and i couldn't convince the linter to let it go */}
        <div
          className={readOnly ?
            classes.sizeChartReadOnlyPreview
            : this.props.sizeChart.charts.length === 0
              ? classes.hidden
              : classes.sizeChartPreview
            }
          role={'button'}
          onClick={() => this.handleClick()}
          onKeyPress={() => {}}
        >
          {/* eslint-enable */}

          {
            /* this is the stuff which renders the preview
            ******** THIS SHOULD ONLY BE DISPLAYED    ********
            ******** WHEN VIEWING/EDITING A SIZECHART ********/
          }
          <div
            name="SizeChartPreview"
            className={charts.length !== 0 ? classes.sizeChartPreviewItem : classes.hidden}
          >
            {

              charts.map((chart, chartNum) => {
                return (
                  <div key={'SizeChart-' + chartNum}>
                    <SizeChartTable
                      category={chartNum === 0 ? categoryTitle : ''}
                      chart={chart}
                      onChange={(payload) => this.handleTableChange(chartNum, payload)}
                      showDisclaimer={chartNum + 1 === charts.length}
                      disclaimer={disclaimer}
                      sizeChartTabName={this.props.sizeChart.sizeChartTabName ? this.props.sizeChart.sizeChartTabName : ''}
                      sizeChartTabNames={sizeChartTabNames}
                      selectMode={this.props.selectMode}
                      onHover={(row, col) => this.onHover(row, col, chartNum)}
                      selected={(this.props.selectMode || this.props.hasSelection) && this.props.selectStart.chart === chartNum ? {
                        start: selectStart,
                        curr: this.props.selectMode ? this.state.currMouseLoc : selectEnd,
                      } : false}
                      hideAddRowCol
                      readOnly={readOnly}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
        {
          charts.length !== 0 && !readOnly
            ? <div name="tool_bar" className={classes.sideToolBar}>
              <Toolbox
                buttons={this.prepToolbar()}
                orientation={'vertical'} />
            </div> : ''
        }
      </Paper>
    )
  }
}

export const mapStateToProps = state => {
  const { layout } = state
  const { headerTitle } = layout
  return {
    sizeChartTabNames: state.sizeChartEdit.sizeChartTabNames,
    isGetTabNamesError: state.sizeChartEdit.isGetTabNamesError,
    isGetTabNamesPending: state.sizeChartEdit.isGetTabNamesPending,
    headerTitle: headerTitle,
    isGetSizeChartError: state.sizeChartEdit.isGetSizeChartError,
    isSaveSizeChartError: state.sizeChartEdit.isSaveSizeChartError,
    sizeChart: state.sizeChartEdit.sizeChart,
    selectStart: state.sizeChartEdit.selectStart,
    selectEnd: state.sizeChartEdit.selectEnd,
    selectMode: state.sizeChartEdit.selectMode,
    hasSelection: state.sizeChartEdit.hasSelection,
    newChart: state.sizeChartEdit.newChart,
    categories: state.sizeChartEdit.categories,
    brands: state.sizeChartEdit.brands,
    sizes: state.sizeChartEdit.sizes,
    saveErrorMessage: state.sizeChartEdit.saveErrorMessage,
    isSaveSizeChartSuccess: state.sizeChartEdit.isSaveSizeChartSuccess,
    user: { ...state.user },
    identifiers: state.sizeChartEdit.identifiers,
  }
}

export function mapDispatchToProps (dispatch) {
  // these are all the functions which will change what the page looks like
  // in a stateless component, all of these actions SHOULD be handled in props
  return {
    // http actions
    saveSizeChart: (payload) => dispatch(sizeChartActions.saveSizeChart(payload)),
    addTable: () => dispatch(sizeChartActions.setSizeChartCreate(true)),
    cancelNewChart: () => dispatch(sizeChartActions.setSizeChartCreate(false)),
    deescalateSizechatGetError: () => dispatch(sizeChartActions.setGetSizechartError(false)),
    handleSaveError: () => dispatch(sizeChartActions.setSaveSizechartError({ value: false })),
    resetSaveSizechartSuccess: () => dispatch(sizeChartActions.resetSaveSizechartSuccess()),
    getSizeChart: (payload) => dispatch(sizeChartActions.getSizeChart(payload)),
    getIdentifiers: () => dispatch(sizeChartActions.getAllSizeChartIdentifiers()),
    getSizeChartTabNames: () => dispatch(sizeChartActions.getSizeChartTabNames()),
    // insert actions
    insertRow: (payload) => dispatch(insertActions.insertRow(payload)),
    insertCol: (payload) => dispatch(insertActions.insertColumn(payload)),
    canInsert: (payload) => insertActions.canInsert(payload),
    // delete actions
    deleteColumn: (payload) => dispatch(deleteActions.deleteColumn(payload)),
    deleteRow: (payload) => dispatch(deleteActions.deleteRow(payload)),
    deleteTable: (payload) => dispatch(deleteActions.deleteTable(payload)),
    // merge actions
    mergeHorrizontally: (payload) => dispatch(mergeActions.mergeHorrizontally(payload)),
    mergeAllHorrizontally: (payload) => dispatch(mergeActions.mergeAllHorrizontally(payload)),
    mergeVertically: (payload) => dispatch(mergeActions.mergeVertically(payload)),
    mergeAllVertically: (payload) => dispatch(mergeActions.mergeAllVertically(payload)),
    mergeAll: (payload) => dispatch(mergeActions.mergeAll(payload)),
    unmergeCell: (payload) => dispatch(mergeActions.unmergeCell(payload)),
    // data actions
    editTableData: (payload) => dispatch(dataActions.editTableData(payload)),
    editTableInfo: (payload) => dispatch(dataActions.editTableInfo(payload)),
    editSearchInfo: (payload) => dispatch(dataActions.editSearchInfo(payload)),
    createSizeChart: (payload) => dispatch(dataActions.addTable(payload)),
    setSelectMode: (payload) => dispatch(dataActions.setSelectMode(payload)),
    changeSelection: (payload) => dispatch(dataActions.changeSelection(payload)),
    clearSelection: () => dispatch(dataActions.clearSelection()),
    importSizeChart: (payload) => dispatch(dataActions.importSizeChart(payload)),
    undoSizechartChange: () => dispatch(dataActions.undo()),
    redoSizechartChange: () => dispatch(dataActions.redo()),
  }
}

SizeChartUI.defaultProps = {
  sizeChart: {
    sizeChartTabName: '',
    disclaimer: 'all measurements are in inches, unless otherwise noted.',
    category: '',
    brand: '',
    size: '',
    charts: [],
  },
}

SizeChartUI.propTypes = {
  classes: PropTypes.object,
  layoutActions: PropTypes.shape({
    setHeaderTitle: PropTypes.func,
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SizeChartUI))
