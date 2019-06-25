import {
  REQUEST_JOB_DATA,
  RECEIVE_JOB_DATA,
  ERROR_JOB_DATA,
  REQUEST_JOB_COUNT_DATA,
  ERROR_JOB_COUNT_DATA,
  HIDE_ERROR_MESSAGE,
  CHANGE_TCIN_FILTER,
  CHANGE_TO_DATE,
  CHANGE_FROM_DATE,
  CHANGE_CURRENT_TAB,
  REQUEST_FILE_STATUS,
  RECEIVE_FILE_STATUS,
  RECEIVE_JOB_COUNT,
  REQUEST_RETRY_EVENT,
  SUCCESS_RETRY_EVENT,
  TOGGLE_MIGRATION,
  CHANGE_SYNC_TCINS,
  SUCCESS_TCINS_DATA,
  REQUEST_TCINS_DATA,
  REQUEST_SYNC_TCINS_DATA,
  SUCCESS_SYNC_TCINS_DATA,
} from './actionType'
import axios from 'axios'
import apiConfig from '../../config/apiConfig'
import { Events } from '../../components/Dashboard/Components/DashboardData'

function requestJobData (event, status, includeMigration) {
  return dispatch => {
    dispatch(dispatchRequestJobDataEvent(event, status))
    let url = '/monitor/v1/asset_trackings/search?event=' + event + '&status=' + status + '&include_migration=' + includeMigration
    return axios.get(apiConfig.dashboard.monitorHost + url)
      .then(res => {
        dispatch(successRequestDataEvent(event, status, res.data.data.map(d => {
          var item = {
            id: d.id,
            tcin: d.tcin,
            suffix: d.suffix,
            file_name: d.file_name,
            view_type: d.view_type,
            host_name: d.host_name,
            source: d.source,
            create_time: d.create_time,
            events: d.events,
            file_path: d.file_path,
          }
          return item
        })))
      })
      .catch((error, data) => {
        dispatch(displayMessageEvent(
          {
            isMessageShown: true,
            displayMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

function dispatchRequestJobDataEvent (event, status) {
  return {
    type: REQUEST_JOB_DATA,
    payload: {
      isFetching: true,
      event: event,
      status: status,
      jobData: [],
    },
  }
}

function handleChangeSyncTcin (syncTcins) {
  return {
    type: CHANGE_SYNC_TCINS,
    payload: {
      syncTcins: syncTcins,
    },
  }
}
function changeCurrentIndex (currentTabIndex) {
  return {
    type: CHANGE_CURRENT_TAB,
    payload: {
      currentTabIndex: currentTabIndex,
    },
  }
}

function changeTcinFilter (tcin) {
  return dispatch => {
    dispatch(setTcinFilter(tcin))
  }
}

function changeToDateFilter (selectedToDate) {
  return dispatch => {
    dispatch(setToDateFilter(selectedToDate))
  }
}

function changeFromDateFilter (selectedFromDate) {
  return dispatch => {
    dispatch(setFromDateFilter(selectedFromDate))
  }
}

function setTcinFilter (tcin) {
  return {
    type: CHANGE_TCIN_FILTER,
    payload: {
      selectedTcin: tcin,
    },
  }
}

function setToDateFilter (selectedToDate) {
  return {
    type: CHANGE_TO_DATE,
    payload: {
      selectedToDate: selectedToDate,
    },
  }
}

function setFromDateFilter (selectedFromDate) {
  return {
    type: CHANGE_FROM_DATE,
    payload: {
      selectedFromDate: selectedFromDate,
    },
  }
}
function successRequestDataEvent (event, status, json) {
  return {
    type: RECEIVE_JOB_DATA,
    payload: {
      isFetching: false,
      event: event,
      status: status,
      jobData: json,
    },
  }
}

function displayMessageEvent (data) {
  return {
    type: ERROR_JOB_DATA,
    payload: {
      isMessageShown: data.isMessageShown,
      displayMessage: data.displayMessage,
      isFetching: false,
    },
  }
}

function hidedisplayMessageEvent () {
  return {
    type: HIDE_ERROR_MESSAGE,
    payload: {
      isMessageShown: false,
      displayMessage: undefined,
    },
  }
}

function requestJobCountData (includeMigration) {
  return dispatch => {
    Events.map(item => dispatch(fetchAssetTrackingCount(item.event, item.status, includeMigration)))
  }
}

function fetchAssetTrackingCount (event, status, includeMigration) {
  return dispatch => {
    dispatch(dispatchRequestJobCountDataEvent(event, status))
    return axios.get(apiConfig.dashboard.monitorHost + '/monitor/v1/asset_trackings/count?event=' + event + '&status=' + status + '&include_migration=' + includeMigration)
      .then(res => {
        let response = {
          count: res.data.count,
          event: event,
          status: status,
        }
        dispatch(successRequestDataCount(response))
      })
      .catch((error, data) => {
        dispatch(handleErrorJobCountEvent(
          {
            isMessageShown: true,
            displayMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}
function dispatchRequestJobCountDataEvent (event, status) {
  return {
    type: REQUEST_JOB_COUNT_DATA,
    payload: {
      isFetching: true,
      event: event,
      status: status,
      jobCount: [],
    },
  }
}

function successRequestDataCount (json) {
  return {
    type: RECEIVE_JOB_COUNT,
    payload: {
      isFetching: false,
      jobCount: json,
    },
  }
}

function handleErrorJobCountEvent (data) {
  return {
    type: ERROR_JOB_COUNT_DATA,
    payload: {
      isMessageShown: data.isMessageShown,
      displayMessage: data.displayMessage,
      isFetching: false,
    },
  }
}
function requestFileStatus () {
  return dispatch => {
    dispatch(dispatchFileStatusEvent())
    return axios.get(apiConfig.dashboard.intakeHost + '/v1/file_status')
      .then(res => {
        dispatch(successReceiveFileStatus(res.data.folders.map(d => {
          var item = {
            folder_name: d.folder_name,
            pending_files: d.pending_files,
            asset_source: d.asset_source,
          }
          return item
        })))
      })
      .catch((error, data) => {
        dispatch(displayMessageEvent(
          {
            isMessageShown: true,
            displayMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

function dispatchFileStatusEvent (event, status) {
  return {
    type: REQUEST_FILE_STATUS,
    payload: {
      isFetching: true,
      fileStatus: [],
    },
  }
}

function successReceiveFileStatus (json) {
  return {
    type: RECEIVE_FILE_STATUS,
    payload: {
      isFetching: false,
      fileStatus: json,
    },
  }
}

function handleRetryEvent (retryContext) {
  return dispatch => {
    dispatch(dispatchHandleRetryEvent(retryContext))
    if (retryContext.method === 'POST') {
      return axios.post(retryContext.url, retryContext.body)
        .then(res => {
          dispatch(handleRetrySuccess())
        })
        .catch((error, data) => {
          dispatch(displayMessageEvent(
            {
              isMessageShown: true,
              displayMessage: error.message,
              isFetching: false,
            },
          ))
        })
    } else {
      return axios.put(retryContext.url, retryContext.body)
        .then(res => {
          dispatch(handleRetrySuccess())
        })
        .catch((error, data) => {
          dispatch(displayMessageEvent(
            {
              isMessageShown: true,
              displayMessage: error.message,
              isFetching: false,
            },
          ))
        })
    }
  }
}

function dispatchHandleRetryEvent (retryContext) {
  return {
    type: REQUEST_RETRY_EVENT,
    payload: {
      isFetching: true,
      retryContext: retryContext,
    },
  }
}

function handleRetrySuccess (json) {
  return {
    type: SUCCESS_RETRY_EVENT,
    payload: {
      isFetching: false,
    },
  }
}

function toggleMigration (includeMigration) {
  return {
    type: TOGGLE_MIGRATION,
    payload: {
      includeMigration: includeMigration,
    },
  }
}

function fetchTcinData (queryParam) {
  return dispatch => {
    dispatch(dispatchRequestTcinDataEvent())
    return axios.get(apiConfig.dashboard.monitorHost + '/monitor/v1/item_data/sync?' + queryParam)
      .then(res => {
        var tcinDeltaResponse = res.data.data.map((item, index) => {
          return {
            id: index,
            itemDetails: item.itemDetails,
            pipelineItemDetails: item.pipelineItemDetails,
          }
        })
        dispatch(succesTcinData(tcinDeltaResponse))
      })
      .catch((error, data) => {
        dispatch(handleErrorJobCountEvent(
          {
            isMessageShown: true,
            displayMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

function dispatchRequestTcinDataEvent (event, status) {
  return {
    type: REQUEST_TCINS_DATA,
    payload: {
      isFetching: true,
      tcinDeltaResponse: [],
    },
  }
}

function succesTcinData (json) {
  return {
    type: SUCCESS_TCINS_DATA,
    payload: {
      isFetching: false,
      tcinDeltaResponse: json,
    },
  }
}

function syncTcinData (queryParam) {
  return dispatch => {
    dispatch(dispatchSyncTcinDataEvent())
    return axios.post(apiConfig.dashboard.monitorHost + '/monitor/v1/item_data/sync?' + queryParam)
      .then(res => {
        dispatch(succesSyncTcinData())
        dispatch(fetchTcinData(queryParam))
      })
      .catch((error, data) => {
        dispatch(handleErrorJobCountEvent(
          {
            isMessageShown: true,
            displayMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

function dispatchSyncTcinDataEvent (event, status) {
  return {
    type: REQUEST_SYNC_TCINS_DATA,
    payload: {
      isFetching: true,
    },
  }
}

function succesSyncTcinData () {
  return {
    type: SUCCESS_SYNC_TCINS_DATA,
    payload: {
      isFetching: false,
    },
  }
}

export {
  requestJobData,
  displayMessageEvent,
  requestJobCountData,
  hidedisplayMessageEvent,
  changeTcinFilter,
  changeToDateFilter,
  changeFromDateFilter,
  changeCurrentIndex,
  requestFileStatus,
  handleRetryEvent,
  toggleMigration,
  handleChangeSyncTcin,
  fetchTcinData,
  succesTcinData,
  syncTcinData,
}
