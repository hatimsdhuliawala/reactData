import {
  SIZECHART_DELETE_SUCCESS,
} from './sizeChartActionTypes'

export function deleteRow (payload) {
  return dispatch => {
    const { sizeChart, table, row } = payload
    if (row < 0) {
      return
    }
    var charts = sizeChart.charts.slice(0)
    var chart = charts[table]
    var data = chart.data.slice(0)
    data.splice(row, 1)
    if (data.length > row) {
      // fix merged rows
      for (var i = 0; i < data[row].length; i++) {
        var tmpRow = row
        while (tmpRow < data.length && data[tmpRow][i] === 'row_merge') {
          var rowArr = data[tmpRow].slice(0)
          rowArr[i] = ''
          data[tmpRow++] = rowArr
        }
      }
    }

    chart = {
      ...chart,
      data: data,
    }
    charts[table] = chart

    var newChart = {
      ...sizeChart,
      charts: charts,
    }
    dispatch(setDeleteSuccess(newChart))
  }
}

export function deleteColumn (payload) {
  return dispatch => {
    const { sizeChart, table, col } = payload
    if (col < 0 || col >= sizeChart.charts[table].header.length) {
      return
    }
    var charts = sizeChart.charts.slice(0)
    var chart = charts[table]
    var data = chart.data.slice(0)
    var header = chart.header.slice(0)
    var i = col

    header.splice(col, 1)
    // unmerge merged header cells if they were merged into this cell
    while (i < header.length) {
      if (header[i] === 'column_merge') {
        header[i++] = ''
      } else {
        break
      }
    }

    for (i = 0; i < charts[table].data.length; i++) {
      var rowArr = data[i].slice(0)
      rowArr.splice(col, 1)
      if (rowArr.length === col || rowArr[col] !== 'column_merge') {
        data[i] = rowArr
      } else {
        // unmerge connected columns
        var j = col
        while (j < rowArr.length && rowArr[j] === 'column_merge') {
          rowArr[j++] = ''
        }
        data[i] = rowArr
      }
    }

    chart = {
      ...chart,
      data: data,
      header: header,
    }
    charts[table] = chart
    var newChart = {
      ...sizeChart,
      charts: charts,
    }
    dispatch(setDeleteSuccess(newChart))
  }
}

export function deleteTable (payload) {
  return dispatch => {
    const { sizeChart, table } = payload
    if (table < 0 || table >= sizeChart.charts.length) { return }
    var charts = sizeChart.charts.slice(0)
    charts.splice(table, 1)
    const newChart = {
      ...sizeChart,
      charts: charts,
    }
    dispatch(setDeleteSuccess(newChart))
  }
}

function setDeleteSuccess (newChart) {
  return {
    type: SIZECHART_DELETE_SUCCESS,
    sizeChart: newChart,
  }
}
