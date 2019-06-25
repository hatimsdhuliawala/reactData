import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  Input,
  Button,
  TextField,
} from '@material-ui/core'
import styles from '../../../../styles/sizeChartUI'
import Autocomplete from '../../../Shared/Autocomplete/Autocomplete'

/*
 */

class SizeChartTable extends React.Component {
  isSelected (row, col) {
    if (!this.props.selected) {
      return false
    }
    if (!this.props.selectMode && !this.props.selected) {
      return false
    }
    // check if the cell is in the selection range, and changes the background if it is
    if ((row <= this.props.selected.start.row && row >= this.props.selected.curr.row) ||
            (row >= this.props.selected.start.row && row <= this.props.selected.curr.row)) {
      // row is in range
      if ((col <= this.props.selected.start.col && col >= this.props.selected.curr.col) ||
                (col >= this.props.selected.start.col && col <= this.props.selected.curr.col)) {
        // col is in range
        return true
      }
    }
    return false
  }

  getAddColHeight () {
    const data = this.props.chart.data.slice(0)
    if (!data) { // if data is undefined (shouldn't ever happen)
      return {
        height: '100px',
      }
    } else {
      return {
        height: '' + ((data.length + 1) * 41) + 'px',
      }
    }
  }

  getInputHeight (name) {
    var parts = name.split('\n')
    var rows = parts.length
    return ((1 + rows) * 14) + 'px'
  }

  /*
   *    Spits out a header for the table
   *    Consumes column_merge's to create spanning headers
   */
  getHeader () {
    const { chart, classes } = this.props
    const header = chart.header.slice(0)
    var colN = 0 // the non-instanced column number
    var rowCells = []

    for (var i = 0; i < header.length;) {
      var colSpan = 1
      // deterimines how to merge columns
      rowCells.push({
        name: header[i],
        cols: colSpan,
      })
      while (header[++i] === 'column_merge') {
        colSpan++
      }
      rowCells[rowCells.length - 1].cols = colSpan
    }

    return (
    /*  This is where the magic happens  */
      <tr className={classes.tableWrapper} >
        {
          rowCells.map((cell, index) => {
            // the instanced column number
            var instancedColNum = colN
            colN += cell.cols
            var mark = this.isSelected(-1, instancedColNum)
            return (
              <th
                className={(mark) ? classes.selectedHead : classes.colHeading}
                colSpan={cell.cols === null ? 1 : cell.cols}
                onMouseEnter={() => this.props.onHover(-1, instancedColNum)}
                key={index}
              >
                <div
                  className={classes.headerInput}
                  style={this.props.selectMode ? { cursor: 'pointer' } : { cursor: 'text' }}
                >
                  <div name="input">
                    <TextField
                      onChange={(e) => this.props.onChange(
                        { target: 'data', row: -1, col: instancedColNum, value: e.target.value }
                      )}
                      value={this.decodeHTML(cell.name)}
                      align="center"
                      inputProps={{ className: classes.headerInput }}
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                      disabled={this.props.selectMode || this.props.readOnly}
                      multiline
                    />
                  </div>
                </div>

              </th>
            )
          })

        }
      </tr>
    )
  }

  getBody () {
    // the non instanced row number
    var rowN = 0
    return (
      this.props.chart.data.map(row => {
        var instancedRowNum = rowN++
        return (
          this.getRow(instancedRowNum)
        )
      })
    )
  }

  getRow (row) {
    /* takes in the row number as a parameter */
    const { chart, classes } = this.props
    const data = chart.data.slice(0)
    var colN = 0
    var rowCells = []
    var rowMerges = 0
    // get cells to print
    for (var i = 0; i < data[row].length;) {
      // should never get a column merge, but will get row merges
      if (data[row][i] === 'row_merge') {
        i++
        rowMerges++
        rowCells.push({
          name: 'row_merge',
          colSpan: 1,
          rowSpan: 0,
        })
        continue
      }
      var cell = {
        name: data[row][i],
        colSpan: 1,
        rowSpan: 1,
      }

      // get row span
      var tRow = row + 1
      while (tRow < data.length && data[tRow++][i] === 'row_merge') {
        cell.rowSpan++
      }

      // get cell span (this is why it should never get a column merge earlier)
      while (data[row][++i] === 'column_merge') {
        cell.colSpan++
      }
      rowCells.push(cell)
    }
    if (rowMerges === data[row].length) {
      return ('')
    }
    return (
    /*  This is where the magic happens  */
      <tr className={classes.tableWrapper} key={row}>
        {
          rowCells.map((cell, index) => {
            // the instanced column number
            var instancedColNum = colN
            colN += cell.colSpan
            if (cell.name === 'row_merge' || cell.name === 'column_merge') {
              return ('')
            }
            return (
              <td
                colSpan={cell.cols === null ? 1 : cell.colSpan}
                rowSpan={cell.rowSpan === null ? 1 : cell.rowSpan}
                onMouseEnter={() => this.props.onHover(row, instancedColNum)}
                key={index}
              >
                <div
                  className={this.isSelected(row, instancedColNum) ? classes.selectedBody : classes.tableCell}
                  style={this.props.selectMode ? { cursor: 'pointer' } : { cursor: 'text' }}
                >
                  <TextField
                    onChange={(e) => this.props.onChange(
                      { target: 'data', row: row, col: instancedColNum, value: e.target.value }
                    )}
                    style={{ height: '100%' }}
                    value={this.decodeHTML(cell.name)}
                    align="center"
                    inputProps={{ className: classes.dataInput }}
                    InputProps={{ disableUnderline: true, style: { height: '100%' } }}
                    fullWidth
                    disabled={this.props.selectMode || this.props.readOnly}
                    multiline
                  />
                </div>
              </td>
            )
          })

        }
      </tr>
    )
  }

  decodeHTML (html) {
    var txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }

  render () {
    const {
      classes,
      chart,
      disclaimer,
      sizeChartTabName,
      sizeChartTabNames,
      showDisclaimer,
      // category,
    } = this.props

    if (this.props.disabled === true) {
      return (
        <div />
      )
    }
    return (
      <div className={classes.tableMain} >
        <h2 className={classes.header}>
          {
            /* category !== ''
              ? <Input
                onChange={(e) => this.props.onChange({ target: 'category', value: e.target.value })}
                disableUnderline
                value={this.decodeHTML(category)}
                align="center"
                className={classes.fullWidth}
                classes={
                  { input: classes.cateogryInput }
                }
                disabled={this.props.selectMode}
                placeholder={'Custom Category Title'}
              />
              : '' */
          }
        </h2>
        <div className={classes.sizeChartTabNameInput}>
          <span className={classes.sizeChartTabNameLabel}>
            Sizechart Tab Name
            <Autocomplete
              placeholder={'Size & Fit'}
              value={sizeChartTabName}
              onChange={(e) => this.props.onChange({ target: 'sizeChartTabName', value: e.target.value })}
              onSelect={(e) => this.props.onChange({ target: 'sizeChartTabName', value: e })}
              items={sizeChartTabNames.map(item => {
                return item.size_chart_tab_name
              })}
              fullWidth
            />
          </span>
        </div>
        <div className={classes.tableDiv} name="tableDiv">
          <table className={classes.tableWrapper}>
            <caption>
              <div className={classes.captionP}>
                <Input
                  onChange={(e) => this.props.onChange({ target: 'brand', value: e.target.value })}
                  disableUnderline
                  value={this.decodeHTML(chart.brandTitle)}
                  align="center"
                  classes={
                    { input: classes.brandInput }
                  }
                  className={classes.fullWidth}
                  disabled={this.props.selectMode || this.props.readOnly}
                  placeholder={'Custom Brand Title'}
                />
              </div>

              <span className={classes.captionSpan}>
                <Input
                  onChange={(e) => this.props.onChange({ target: 'size', value: e.target.value })}
                  disableUnderline
                  value={this.decodeHTML(chart.sizeTitle)}
                  align="center"
                  className={classes.fullWidth}
                  classes={
                    { input: classes.sizeInput }
                  }
                  disabled={this.props.selectMode || this.props.readOnly}
                  placeholder={'Custom Size Title'}
                />
                {this.props.showHead ? chart.sizeTitle : ''}
              </span>
            </caption>
            {
              // determines how many columns are in the table,
              // this is before columns are merged
              chart.header.map(n => {
                return (
                  <colgroup className={classes.tableCell} key={n} />
                )
              })
            }
            <thead className={classes.tableWrapper}>
              {
                this.getHeader()
              }
            </thead>
            <tbody className={classes.tableWrapper}>
              {
                this.getBody()
              }
            </tbody>
          </table>
        </div>
        <div style={this.getAddColHeight()} className={this.props.hideAddRowCol ? classes.hidden : classes.addColumnDiv} name="addColDiv" >
          <div className={classes.addColumnInternalDiv}>
            <Button
              onClick={() => (this.props.addCol ? this.props.addCol() : () => {})}
              disableRipple
              style={{ maxWidth: '50px', minWidth: '50px' }}
              className={classes.addColumnButton}
            > {'+'} </Button>
          </div>
        </div>
        <div className={this.props.hideAddRowCol ? classes.hidden : classes.addRowDiv} name="addRowDiv" >
          <Button
            variant="outlined"
            onClick={() => (this.props.addRow ? this.props.addRow() : () => {})}
            disableRipple
            className={classes.addRowButton}
          > {'add row'} </Button>
        </div>
        <div name="disclaimer" className={showDisclaimer ? classes.disclaimerDiv : classes.hidden}>
          <Input
            onChange={(e) => this.props.onChange({ target: 'disclaimer', value: e.target.value })}
            value={disclaimer}
            align="left"
            className={classes.disclaimerInput}
            fullWidth
            disabled={this.props.selectMode || this.props.readOnly}
            disableUnderline
            placeholder="Size Chart Disclaimer"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { layout } = state
  const { headerTitle } = layout
  return {
    headerTitle: headerTitle,
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

SizeChartTable.defaultProps = {
  category: '',
  chart: {},
  disclaimer: 'all measurements are in inches, unless otherwise noted.',
  sizeChartTabName: '',
  sizeChartTabNames: [],
  onChange: () => {},
  addRow: () => {},
  disabled: false,
  showDisclaimer: true,
  selected: false,
  onHover: () => {},
  hideAddRowCol: false,
  showHead: false,
}

SizeChartTable.propTypes = {
  classes: PropTypes.object,
  layoutActions: PropTypes.shape({
    setHeaderTitle: PropTypes.func,
  }),
  category: PropTypes.string,
  chart: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SizeChartTable))
