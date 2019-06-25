import {
  SIZECHART_DATA_SUCCESS,
  SIZECHART_CREATE_SUCCESS,
  SIZECHART_SET_SELECTMODE,
  SIZECHART_SELECTION_CLEAR,
  SIZECHART_SELECTION_CHANGE,
  SIZECHART_UNDO,
  SIZECHART_REDO,
  SIZECHART_SET_CATEGORIES,
  SIZECHART_SET_BRANDS,
  SIZECHART_SET_SIZES,
  SIZECHART_RULE_SET,
  SIZECHART_RESET,
  SIZECHART_MEASUREMENT_TOGGLE,
} from './sizeChartActionTypes'
import _ from 'lodash'

/*
 *
 * Houses all actions for data modification and manipulation or the size chart tables
 *
 */
export function editTableData (payload) {
  return dispatch => {
    const { table, row, col, sizeChart, value } = payload
    var charts = sizeChart['charts'].slice(0)
    var chart = charts[table]
    if (row === -1) {
      var tmpHeader = chart.header.slice(0)
      tmpHeader[col] = value
      chart = {
        ...chart,
        header: tmpHeader,
      }
    } else {
      var tmpData = chart.data.slice(0)
      var tmpDataRow = chart.data[row].slice(0)
      tmpDataRow[col] = value
      tmpData[row] = tmpDataRow
      chart = {
        ...chart,
        data: tmpData,
      }
    }
    charts[table] = chart
    var newChart = {
      ...sizeChart,
      charts,
    }
    return dispatch(setDataSuccess({ sizeChart: newChart }))
  }
}

export function editTableInfo (payload) {
  // changes the non-data table info
  return dispatch => {
    var { target, sizeChart, table, value } = payload
    var charts = sizeChart.charts.slice(0)
    var chart = charts[table]
    var { disclaimer, categoryTitle, sizeChartTabName } = sizeChart
    var { sizeTitle, brandTitle } = chart

    if (target === 'category') {
      categoryTitle = value
    } else if (target === 'brand') {
      brandTitle = value
    } else if (target === 'size') {
      sizeTitle = value
    } else if (target === 'disclaimer') {
      disclaimer = value
    } else if (target === 'sizeChartTabName') {
      sizeChartTabName = value
    } else {
      return false
    }

    var newChart = {
      ...chart,
      sizeTitle,
      brandTitle,
    }
    charts[table] = newChart
    var newSizeChart = {
      ...sizeChart,
      charts,
      categoryTitle,
      disclaimer,
      sizeChartTabName,
    }

    return dispatch(setDataSuccess({ sizeChart: newSizeChart }))
  }
}

export function editSearchInfo (payload) {
  return dispatch => {
    const { key, value, sizeChart } = payload
    var newChart = {
      ...sizeChart,
    }
    // replace uppercase with lowercase and spaces with dashes
    let tempVal = value.replace(/\s+/g, '-').toLowerCase()
    if (key === 'category') {
      newChart.category = tempVal
      newChart.categoryTitle = tempVal
      newChart.measurementCategory = tempVal
    } else if (key === 'brand') {
      newChart.brand = tempVal // handling spaces/uppercase elsewhere
      // because of brand dropdown of actual brands (that have spaces and uppercase)
    } else if (key === 'size') {
      newChart.size = tempVal
    } else {
      return false
    }
    return dispatch(setDataSuccess({ sizeChart: newChart }))
  }
}

export function toggleHowToMeasure () {
  return dispatch => {
    dispatch({
      type: SIZECHART_MEASUREMENT_TOGGLE,
    })
  }
}

export function addTable (payload) {
  return dispatch => {
    const { rows, cols, sizeChart } = payload
    var charts = sizeChart.charts.slice(0)
    var headers = []
    var data = []
    var i = 0

    for (i = 0; i < rows; i++) {
      data.push([])
      for (var j = 0; j < cols; j++) {
        data[i].push('')
      }
    }

    for (i = 0; i < cols; i++) {
      headers.push('')
    }

    // sets sizeTitle and brandTitle to the size and brand for the first
    // chart that is created
    charts.push({
      sizeTitle: sizeChart.charts.length === 0 ? sizeChart.size : '',
      brandTitle: sizeChart.charts.length === 0 ? sizeChart.brand : '',
      header: headers,
      data: data,
    })
    var newChart = {
      ...sizeChart,
      charts: charts,
    }
    return dispatch(setSizeChartCreateSuccess({ sizeChart: newChart }))
  }
}

export function importSizeChart (payload) {
  return dispatch => {
    const { header, data, category, brand, size } = payload
    var newChart = {
      category: category,
      categoryTitle: category,
      brand: brand,
      size: size,
      charts: [],
      disclaimer: 'All Sizes in Inches Unless Otherwise Stated',
      shopAllUrl: '',
      measuringGuides: [],
    }

    newChart.charts.push({
      sizeTitle: size,
      brandTitle: brand,
      header: [...header],
      data: [...data],
    })

    return dispatch(setSizeChartCreateSuccess({ sizeChart: newChart }))
  }
}

export function changeSelection (payload) {
  return {
    type: SIZECHART_SELECTION_CHANGE,
    selectStart: payload.selectStart,
    selectEnd: payload.selectEnd,
    hasSelection: true,
  }
}

export function clearSelection () {
  return {
    type: SIZECHART_SELECTION_CLEAR,
    selectStart: { row: -1, col: -1, chart: -1 },
    selectEnd: { row: -1, col: -1, chart: -1 },
    hasSelection: false,
    selectMode: false,
  }
}

export function setRule (rule) {
  return dispatch => {
    return dispatch({
      type: SIZECHART_RULE_SET,
      rule,
    })
  }
}

export function setSelectMode (payload) {
  return {
    type: SIZECHART_SET_SELECTMODE,
    value: payload.value,
  }
}

export function undo () {
  return {
    type: SIZECHART_UNDO,
  }
}

export function redo () {
  return {
    type: SIZECHART_REDO,
  }
}

export function setSearchBrands (identifiers) {
  let brands = []
  _.each(identifiers, function (identifier) {
    if (brands.indexOf(identifier.brand) === -1) {
      brands.push(identifier.brand)
    }
  })
  brands.sort((a, b) => {
    if (a <= b) {
      return -1
    } else {
      return 1
    }
  })
  return {
    type: SIZECHART_SET_BRANDS,
    brands,
  }
}

export function setSearchCategories (identifiers) {
  let categories = []
  for (let i = 0; i < identifiers.length; i++) {
    if (categories.indexOf(identifiers[i].category) === -1) {
      categories.push(identifiers[i].category)
    }
  }
  categories.sort((a, b) => {
    if (a <= b) {
      return -1
    } else {
      return 1
    }
  })
  return {
    type: SIZECHART_SET_CATEGORIES,
    categories,
  }
}

export function setSearchSizes (identifiers) {
  let sizes = []
  _.forEach(identifiers, (identifier) => {
    if (sizes.indexOf(identifier.size) === -1) {
      sizes.push(identifier.size)
    }
  })
  return {
    type: SIZECHART_SET_SIZES,
    sizes,
  }
}

function setDataSuccess (payload) {
  return {
    type: SIZECHART_DATA_SUCCESS,
    sizeChart: payload.sizeChart,
  }
}

function setSizeChartCreateSuccess (payload) {
  return {
    type: SIZECHART_CREATE_SUCCESS,
    sizeChart: payload.sizeChart,
  }
}

export function resetSizeChart () {
  return dispatch => {
    dispatch({
      type: SIZECHART_RESET,
    })
  }
}
