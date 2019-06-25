import {
  SIZECHART_INSERT_SUCCESS,
} from './sizeChartActionTypes'

export function canInsert (payload) {
  const { selectStart, selectEnd, dir, sizeChart } = payload
  const chart = sizeChart.charts[selectStart.chart]
  const endCol = selectStart.col >= selectEnd.col ? selectStart.col : selectEnd.col
  const endRow = selectStart.row >= selectEnd.row ? selectStart.row : selectEnd.row
  if (selectStart.chart !== selectEnd.chart) {
    return false
  }
  var i = 0

  switch (dir) {
    case 'left':
      return chart.header[selectStart.col] !== 'column_merge'
    case 'right':
      for (i = 0; i < chart.data.length; i++) {
        if (chart.data[i][endCol + 1] === 'column_merge') {
          return false
        }
      }
      if (chart.header[endCol + 1] === 'column_merge') {
        return false
      }
      return true
    case 'up':
      return (selectStart.row !== -1 && selectEnd.row !== -1)
    case 'down':
      for (i = 0; i < chart.data.length; i++) {
        if (chart.data[i][endRow + 1] === 'column_merge') {
          return false
        }
      }
      return true
    default:
      return false
  }
}

export function insertColumn (payload) {
  return dispatch => {
    const { selectStart, selectEnd, dir, sizeChart } = payload
    var opp = () => { }

    if (dir === 'left') {
      opp = (startCol, endCol) => {
        return startCol <= endCol ? startCol : endCol
      }
    } else {
      opp = (startCol, endCol) => {
        return startCol > endCol ? startCol + 1 : endCol + 1
      }
    }
    var chartNum = selectStart.chart
    var startCol = selectStart.col
    var endCol = selectEnd.col
    var charts = sizeChart.charts.slice(0)
    var chart = charts[chartNum]
    var header = chart.header.slice(0)
    var data = chart.data.slice(0)
    header.splice(opp(startCol, endCol), 0, '')
    for (var row = 0; row < data.length; row++) {
      var rowArr = data[row].slice(0)
      rowArr.splice(opp(startCol, endCol), 0, '')
      data[row] = rowArr
    }
    chart = {
      ...chart,
      header: header,
      data: data,
    }
    charts[chartNum] = chart
    var newChart = {
      sizeChart: {
        ...sizeChart,
        charts: charts,
      },
      selectStart: {
        row: selectStart.row,
        col: dir === 'left' ? selectStart.col + 1 : selectStart.col,
        chart: selectStart.chart,
      },
      selectEnd: {
        row: selectEnd.row,
        col: dir === 'left' ? selectEnd.col + 1 : selectEnd.col,
        chart: selectEnd.chart,
      },
    }
    dispatch(setInsertSuccess(newChart))
  }
}

export function insertRow (payload) {
  return dispatch => {
    const { selectStart, selectEnd, dir, sizeChart } = payload
    var opp = () => { }
    if (dir === 'up') {
      opp = () => {
        return startRow <= endRow ? startRow : endRow
      }
      if (opp() === -1) { return }
    } else {
      opp = () => {
        return startRow >= endRow ? startRow + 1 : endRow + 1
      }
    }
    var chartNum = selectStart.chart
    var startRow = selectStart.row
    var endRow = selectEnd.row
    var charts = sizeChart.charts.slice(0)
    var chart = charts[chartNum]
    var data = chart.data.slice(0)

    data.splice(opp(), 0, [])
    var rowArr = data[opp()].slice()
    for (var i = 0; i < charts[chartNum].header.length; i++) {
      rowArr.push('')
    }
    data[opp()] = rowArr
    chart = {
      ...chart,
      data: data,
    }
    charts[chartNum] = chart
    var newChart = {
      sizeChart: {
        ...sizeChart,
        charts: charts,
      },
      selectStart: {
        row: dir === 'up' ? selectStart.row + 1 : selectStart.row,
        col: selectStart.col,
        chart: selectStart.chart,
      },
      selectEnd: {
        row: dir === 'up' ? selectEnd.row + 1 : selectEnd.row,
        col: selectEnd.col,
        chart: selectEnd.chart,
      },
    }
    dispatch(setInsertSuccess(newChart))
  }
}

function setInsertSuccess (newChart) {
  return {
    type: SIZECHART_INSERT_SUCCESS,
    sizeChart: newChart.sizeChart,
    selectStart: newChart.selectStart,
    selectEnd: newChart.selectEnd,
  }
}
