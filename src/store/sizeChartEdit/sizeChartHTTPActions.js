import * as types from './sizeChartActionTypes'
import axios from 'axios'
import envConfigs from '../../config/apiConfig'
import { setSearchCategories, setSearchBrands, setSearchSizes } from './sizeChartDataActions'
import harbinger from 'harbinger'

// all of the harbinger events
export const events = {
  sizeChartGetSuccess: 'gbrbsr',
  sizeChartGetFailed: 'ktbkam',
  sizeChartGetStarted: 'czl5md',
  sizeChartSaveStarted: '2mrlio',
  sizeChartSaveError: 'x9flxb',
  sizeChartSaveSuccess: 'a0y8p5',
}

export function saveSizeChart (payload) {
  const charts = payload.charts.slice(0)
  var outCharts = []
  // input checking
  for (var c = 0; c < charts.length; c++) {
    var { sizeTitle, brandTitle } = charts[c]
    var header = charts[c].header.slice(0)
    var data = charts[c].data.slice(0)
    // check columns for a column which has been merged into another
    // and delete the unnessisary data if it exists
    var dups = 0
    var i = 0
    var j = 0
    for (i = 0; i < header.length; i++) {
      dups = 0
      if (header[i] === '') {
        return dispatch => {
          dispatch(setSaveSizechartError({ value: true, message: 'All cells must contain something!' }))
        }
      }
      if (header[i] === 'column_merge') {
        dups += 1
        for (j = 0; j < data.length; j++) {
          if (data[j][i] === 'column_merge') {
            dups += 1
          } else {
            break
          }
        }

        if (dups === (1 + data.length)) {
          // remove col
          header.splice(i, 1)
          for (j = 0; j < data.length; j++) {
            var rowArr = data[j].slice(0)
            rowArr.splice(i, 1)
            data[j] = rowArr
          }
          i--
        }
      }
    }

    // check for rows which have been merged into other rows
    // and remove them from the chart
    for (i = 0; i < data.length; i++) {
      dups = 0
      for (j = 0; j < data[i].length; j++) {
        if (data[i][j] === '') {
          // this is input checking to make sure that all
          // cells in the size chart are full, TODO: make propmt with confirmation
          // that the user wants to submit a chart with blank cells
          return dispatch => {
            dispatch(setSaveSizechartError({ value: true, message: 'All cells must contain something!' }))
          }
        }
        if (data[i][j] === 'row_merge') {
          dups += 1
        }
      }
      if (dups === data[i].length) {
        data.splice(i, 1)
      }
    }

    outCharts.push({
      header: header.slice(0),
      data: data.slice(0),
      size_title: sizeTitle,
      brand_title: brandTitle,
    })
  }
  let currentDate = new Date()
  // convert the input payload to a web format
  payload = {
    ...payload,
    size_chart_tab_name: payload.sizeChartTabName,
    id: payload.sizeChartId,
    charts: outCharts,
    category_title: payload.categoryTitle,
    shop_all_url: payload.shopAllUrl,
    measuring_guides: payload.measuringGuides,
    last_edited_by: payload.user.email,
    last_edited_on: (
      currentDate.getMonth() + 1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear() +
      ':' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds()
    ),
  }

  return dispatch => {
    dispatch(setSaveSizechartPending(true))
    harbinger.trackEvent(events.sizeChartSaveStarted)
    return axios.post(envConfigs.api.sizeChartApi + 'sizecharts/save/', payload)
      .then(
        function success (response, status) {
          harbinger.trackEvent(events.sizeChartSaveSuccess)
          dispatch(setSaveSizechartSuccess(true))
          dispatch(setSaveSizechartPending(false))
        },
        function error (response, status) {
          let errorPayload = {
            value: true,
            message: response.message,
          }
          harbinger.trackEvent(events.sizeChartSaveError)
          dispatch(setSaveSizechartPending(false))
          dispatch(setSaveSizechartError(errorPayload))
        }
      )
  }
}

export function getSizeChartTabNames () {
  return dispatch => {
    dispatch(setGetSizeChartTabNamesPending(true))
    axios.get(envConfigs.api.sizeChartApi + 'sizecharts/tab_names')
      .then(
        function success (response, status) {
          dispatch(setSizeChartTabNames(response.data))
          dispatch(setGetSizeChartTabNamesPending(false))
        },
        function error (e) {
          dispatch(setGetSizeChartTabNamesPending(false))
          dispatch(setGetSizeChartTabNamesError(true))
        }
      )
  }
}

export function getSizeChart (payload) {
  let { category, brand, size } = payload
  if (category === '' && brand === '' && size === '') {
    return dispatch => { }
  }
  // brand = brand.toLowerCase()
  // this other brand trimming stuff should probably be removed too but need to verify
  brand = brand.replace(/[$&!@#^*]/g, '')
  brand = brand.replace(/[ ]+/g, '-')
  return dispatch => {
    dispatch(setSaveSizechartPending(true))
    harbinger.trackEvent(events.sizeChartGetStarted)
    axios.get(envConfigs.api.sizeChartApi + 'sizecharts/get/' + category + '/' + brand + '/' + size)
      .then(
        function success (response, status) {
          dispatch(setGetSizechartPending(false))
          if (response.data === '') {
            harbinger.trackEvent(events.sizeChartGetFailed)
            dispatch(setGetSizechartError(true))
          } else {
            harbinger.trackEvent(events.sizeChartGetSuccess)
            dispatch(setSizechart(response.data))
          }
        },
        function error (e) {
          harbinger.trackEvent(events.sizeChartGetFailed)
          dispatch(setGetSizechartPending(false))
          dispatch(setGetSizechartError(true))
        }
      )
  }
}

export function getAllSizeChartIdentifiers () {
  return dispatch => {
    axios.get(envConfigs.api.sizeChartApi + 'sizecharts/get/all')
      .then(
        function success (response, status) {
          dispatch(setSizeChartIdentifiers(response.data))
          dispatch(setSearchCategories(response.data))
          dispatch(setSearchBrands(response.data))
          dispatch(setSearchSizes(response.data))
        },
        function error (e) {
        }
      )
  }
}

export function getHowToMeasure (category) {
  return dispatch => {
    return axios.get(envConfigs.api.sizeChartApi + 'measurement/' + category)
      .then(
        function success (response) {
          return dispatch({
            type: types.SIZECHART_MEASUREMENT_GET,
            howToMeasure: response.data,
          })
        }
      )
  }
}

function setSizeChartIdentifiers (payload) {
  return {
    type: types.SIZECHART_SET_IDENTIFIERS,
    identifiers: payload,
  }
}

function setSaveSizechartPending (isSaveSizechartPending) {
  return {
    type: types.SAVE_SIZECHART_PENDING,
    isSaveSizechartPending,
  }
}

export function setSaveSizechartError (payload) {
  return {
    type: types.SAVE_SIZECHART_ERROR,
    isSaveSizechartError: payload.value,
    message: payload.message,
  }
}

function setSaveSizechartSuccess (isSaveSizechartSuccess) {
  return {
    type: types.SAVE_SIZECHART_SUCCESS,
    isSaveSizechartSuccess,
  }
}

export function resetSaveSizechartSuccess () {
  return {
    type: types.SET_SIZECHART_SUCCESS,
    value: false,
  }
}

function setGetSizechartPending (isGetSizechartPending) {
  return {
    type: types.GET_SIZECHART_PENDING,
    isGetSizechartPending,
  }
}

export function setGetSizechartError (isGetSizechartError) {
  return {
    type: types.GET_SIZECHART_ERROR,
    isGetSizechartError,
  }
}

function setSizechart (sizeChart) {
  return {
    type: types.GET_SIZECHART_SUCCESS,
    sizeChart: sizeChart,
  }
}

export function setSizeChartCreate (value) {
  return {
    type: types.SET_SIZECHART_CREATE,
    value,
  }
}

function setGetSizeChartTabNamesPending (isGetTabNamesPending) {
  return {
    type: types.SIZECHART_GET_TABNAMES_PENDING,
    isGetTabNamesPending,
  }
}

function setGetSizeChartTabNamesError (isGetTabNamesError) {
  return {
    type: types.SIZECHART_GET_TABNAMES_ERROR,
    isGetTabNamesError,
  }
}

function setSizeChartTabNames (sizeChartTabNames) {
  return {
    type: types.SIZECHART_SET_TABNAMES,
    sizeChartTabNames: sizeChartTabNames,
  }
}
