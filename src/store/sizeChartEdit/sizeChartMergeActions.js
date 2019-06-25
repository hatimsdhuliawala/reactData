import { SIZECHART_MERGE_SUCCESS } from './sizeChartActionTypes'

export function mergeAll (payload) {
  return dispatch => {
    const { selectStart, selectEnd, sizeChart } = payload
    if ((selectStart.row === -1 && selectEnd.row !== -1) || (selectStart.row !== -1 && selectEnd.row === -1)) {
      return
    } else if (selectStart.row === -1 && selectEnd.row === -1) {
      return dispatch(mergeHorrizontally(payload))
    }

    // the upper left value should be the one that maintains the dominance
    var startRow = selectStart.row <= selectEnd.row ? selectStart.row : selectEnd.row
    var endRow = selectStart.row > selectEnd.row ? selectStart.row : selectEnd.row
    var startCol = selectStart.col <= selectEnd.col ? selectStart.col : selectEnd.col
    var endCol = selectStart.col > selectEnd.col ? selectStart.col : selectEnd.col
    var charts = sizeChart.charts.slice(0)
    var table = charts[selectStart.chart]
    var data = table.data.slice(0)

    for (var row = startRow; row <= endRow; row++) {
      var rowArr = data[row].slice(0)
      for (var col = startCol; col <= endCol; col++) {
        if (row === startRow && col === startCol) { continue }
        rowArr[col] = row === startRow ? 'column_merge' : 'row_merge'
      }
      data[row] = rowArr
    }

    table = {
      ...table,
      data: data,
    }
    charts[selectStart.chart] = table
    var newChart = {
      sizeChart: {
        ...sizeChart,
        charts: charts,
      },
      selectStart: { row: startRow, col: startCol, chart: selectStart.chart },
      selectEnd: { row: startRow, col: startCol, chart: selectStart.chart },
    }
    dispatch(setMergeSuccess(newChart))
  }
}

export function mergeAllVertically (payload) {
  return dispatch => {
    const { selectStart, selectEnd, sizeChart } = payload
    var chart = selectStart.chart
    var startRow = selectStart.row <= selectEnd.row ? selectStart.row : selectEnd.row
    var endRow = selectStart.row <= selectEnd.row ? selectEnd.row : selectStart.row
    var startCol = selectStart.col <= selectEnd.col ? selectStart.col : selectEnd.col
    var endCol = selectStart.col <= selectEnd.col ? selectEnd.col : selectStart.col
    if (startRow === -1) { return }
    var charts = sizeChart.charts.slice(0)
    var table = charts[chart]

    for (var col = startCol; col <= endCol; col++) {
      var data = table.data.slice(0)
      var i = 0

      for (i = startRow + 1; i <= endRow; i++) {
        var row = data[i].slice(0)
        row[col] = 'row_merge'
        data[i] = row
      }

      table = {
        ...table,
        data: data,
      }
    }

    charts[chart] = table

    var newChart = {
      sizeChart: {
        ...sizeChart,
        charts: charts,
      },
      selectStart: { row: startRow, col: startCol, chart: selectStart.chart },
      selectEnd: { row: startRow, col: endCol, chart: selectStart.chart },
    }
    dispatch(setMergeSuccess(newChart))
  }
}

export function mergeAllHorrizontally (payload) {
  return dispatch => {
    const { selectStart, selectEnd, sizeChart } = payload
    var chart = selectStart.chart
    var startRow = selectStart.row <= selectEnd.row ? selectStart.row : selectEnd.row
    var endRow = selectStart.row <= selectEnd.row ? selectEnd.row : selectStart.row
    var startCol = selectStart.col <= selectEnd.col ? selectStart.col : selectEnd.col
    var endCol = selectStart.col <= selectEnd.col ? selectEnd.col : selectStart.col
    var charts = sizeChart.charts.slice(0)
    var table = charts[chart]

    for (var row = startRow; row <= endRow; row++) {
      // row array
      var rowArr = row === -1 ? charts[chart].header.slice(0) : charts[chart].data[row].slice(0)
      var i = 0
      for (i = startCol + 1; i <= endCol; i++) {
        rowArr[i] = 'column_merge'
      }
      if (row === -1) {
        table = {
          ...table,
          header: rowArr,
        }
      } else {
        var data = table.data.slice(0)
        data[row] = rowArr
        table = {
          ...charts[chart],
          data: data,
        }
      }
    }

    charts[chart] = table

    var newChart = {
      sizeChart: {
        ...sizeChart,
        charts: charts,
      },
      selectStart: { row: startRow, col: startCol, chart: selectStart.chart },
      selectEnd: { row: endRow, col: startCol, chart: selectStart.chart },
    }
    dispatch(setMergeSuccess(newChart))
  }
}

export function mergeHorrizontally (payload) {
  return dispatch => {
    const { selectStart, selectEnd, sizeChart } = payload
    var startCol = selectStart.col <= selectEnd.col ? selectStart.col : selectEnd.col
    var endCol = selectStart.col <= selectEnd.col ? selectEnd.col : selectStart.col
    var charts = sizeChart.charts.slice(0)
    var chart = selectStart.chart
    var row = selectStart.row
    var table = charts[chart]

    var rowArr = row === -1 ? table.header.slice(0) : table.data[row].slice(0)
    for (let i = startCol + 1; i <= endCol; i++) {
      rowArr[i] = 'column_merge'
    }

    if (row === -1) {
      table = {
        ...table,
        header: rowArr,
      }
    } else {
      var data = table.data
      data[row] = rowArr
      table = {
        ...table,
        data: data,
      }
    }

    charts[chart] = table

    var newChart = {
      sizeChart: {
        ...sizeChart,
        charts: charts,
      },
      selectStart: selectStart.col < selectEnd.col ? selectStart : selectEnd,
      selectEnd: selectStart.col < selectEnd.col ? selectStart : selectEnd,
    }
    dispatch(setMergeSuccess(newChart))
  }
}

export function mergeVertically (payload) {
  return dispatch => {
    const { selectStart, selectEnd, sizeChart } = payload
    var chart = selectStart.chart
    var startRow = selectStart.row <= selectEnd.row ? selectStart.row : selectEnd.row
    var endRow = selectStart.row <= selectEnd.row ? selectEnd.row : selectStart.row
    var col = selectStart.col
    var charts = sizeChart.charts.slice(0)
    var table = charts[chart]

    if (startRow === endRow || chart === -1 || startRow === -1 || endRow === -1) {
      return
    }
    var data = table.data.slice(0)
    var i = 0
    for (i = startRow + 1; i <= endRow; i++) {
      let row = data[i].slice(0)
      row[col] = 'row_merge'
      data[i] = row
    }
    table = {
      ...table,
      data: data,
    }

    charts[chart] = table

    var newChart = {
      sizeChart: {
        ...sizeChart,
        charts: charts,
      },
      selectStart: selectStart.row < selectEnd.row ? selectStart : selectEnd,
      selectEnd: selectStart.row < selectEnd.row ? selectStart : selectEnd,
    }
    dispatch(setMergeSuccess(newChart))
  }
}

export function unmergeCell (payload) {
  return dispatch => {
    const { selectStart, sizeChart } = payload
    const startRow = selectStart.row
    const startCol = selectStart.col
    const chart = selectStart.chart

    var charts = sizeChart.charts.slice(0)
    var c = charts[chart]
    // get num cols
    var endRow = 0
    var endCol = 0

    if (startRow === -1) {
      var i = startCol + 1
      var header = c.header
      while (c.header[i] === 'column_merge') {
        header[i++] = ''
      }
      endRow = -1
      endCol = i - 1
      c = {
        ...c,
        header: header,
      }
    } else {
      var row = startRow
      var data = c.data.slice(0)
      do {
        var rowArr = data[row].slice(0)
        var col = row === startRow ? startCol + 1 : startCol
        while (col < c.data[row].length && (c.data[row][col] === 'row_merge' || c.data[row][col] === 'column_merge')) {
          rowArr[col++] = ''
        }
        endCol = col - 1
        data[row] = rowArr
      } while (++row < c.data.length && c.data[row][startCol] === 'row_merge')
      endRow = row - 1
      c = {
        ...c,
        data: data,
      }
    }

    charts[chart] = c
    var newChart = {
      sizeChart: {
        ...sizeChart,
        charts: charts,
      },
      selectStart: { chart: chart, row: startRow, col: startCol },
      selectEnd: { chart: chart, row: endRow, col: endCol },
    }
    dispatch(setMergeSuccess(newChart))
  }
}

function setMergeSuccess (newChart) {
  return {
    type: SIZECHART_MERGE_SUCCESS,
    sizeChart: newChart.sizeChart,
    selectStart: newChart.selectStart,
    selectEnd: newChart.selectEnd,
  }
}
