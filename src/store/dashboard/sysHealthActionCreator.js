import {
  ERROR_JOB_COUNT_DATA,
  HIDE_ERROR_MESSAGE,
  REQUEST_TOTAL_TCINS,
  RECEIVE_TOTAL_TCINS,
  REQUEST_TOTAL_PRIMARY_IMAGES,
  RECEIVE_TOTAL_PRIMARY_IMAGES,
  REQUEST_TOTAL_ALTERNATE_IMAGES,
  RECEIVE_TOTAL_ALTERNATE_IMAGES,
  REQUEST_TOTAL_SWATCH_IMAGES,
  RECEIVE_TOTAL_SWATCH_IMAGES,
  REQUEST_TOTAL_VALIDATED_IMAGES,
  RECEIVE_TOTAL_VALIDATED_IMAGES,
  REQUEST_FILE_STATUS,
  RECEIVE_FILE_STATUS,
  REQUEST_TOTAL_TCIN_BASED_IMAGES,
  RECEIVE_TOTAL_TCIN_BASED_IMAGES,
  TOGGLE_FILE_INFO,
} from './actionType'
import axios from 'axios'
import apiConfig from '../../config/apiConfig'

function displayMessageEvent (data) {
  return {
    type: ERROR_JOB_COUNT_DATA,
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

function toggleFileInfo (toggle, fileNames) {
  return {
    type: TOGGLE_FILE_INFO,
    payload: {
      fileInfoToggle: toggle,
      fileNames: fileNames,
    },
  }
}

function dispatchRequestToalTcins () {
  return {
    type: REQUEST_TOTAL_TCINS,
    payload: {
      isFetching: true,
    },
  }
}

function dispatchReceiveTotalTcins () {
  return dispatch => {
    return axios.get(apiConfig.dashboard.monitorHost + '/monitor/v1/asset_trackings/tcin_count')
      .then(res => {
        dispatch(successReceiveTotalTcins(res.data.count))
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

function successReceiveTotalTcins (json) {
  return {
    type: RECEIVE_TOTAL_TCINS,
    payload: {
      isFetching: false,
      totalTcins: json,
    },
  }
}

function dispatchRequestToalPrimaryImages () {
  return {
    type: REQUEST_TOTAL_PRIMARY_IMAGES,
    payload: {
      isFetching: true,
    },
  }
}

function dispatchReceiveToalPrimaryImages () {
  return dispatch => {
    return axios.get(apiConfig.dashboard.monitorHost + '/monitor/v1/asset_associations/primary_image_count')
      .then(res => {
        dispatch(successReceiveToalPrimaryImages(res.data.count))
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

function successReceiveToalPrimaryImages (json) {
  return {
    type: RECEIVE_TOTAL_PRIMARY_IMAGES,
    payload: {
      isFetching: false,
      totalPrimaryImages: json,
    },
  }
}

function dispatchRequestToalSecondaryImages () {
  return {
    type: REQUEST_TOTAL_ALTERNATE_IMAGES,
    payload: {
      isFetching: true,
    },
  }
}

function dispatchReceiveToalSecondaryImages () {
  return dispatch => {
    return axios.get(apiConfig.dashboard.monitorHost + '/monitor/v1/asset_associations/alternate_image_count')
      .then(res => {
        dispatch(successReceiveToalSecondaryImages(res.data.count))
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

function successReceiveToalSecondaryImages (json) {
  return {
    type: RECEIVE_TOTAL_ALTERNATE_IMAGES,
    payload: {
      isFetching: false,
      totalAlternateImages: json,
    },
  }
}

function dispatchRequestToalSwatchImages () {
  return {
    type: REQUEST_TOTAL_SWATCH_IMAGES,
    payload: {
      isFetching: true,
    },
  }
}

function dispatchReceiveToalSwatchImages () {
  return dispatch => {
    return axios.get(apiConfig.dashboard.monitorHost + '/monitor/v1/asset_associations/swatch_image_count')
      .then(res => {
        dispatch(successReceiveToalSwatchImages(res.data.count))
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

function successReceiveToalSwatchImages (json) {
  return {
    type: RECEIVE_TOTAL_SWATCH_IMAGES,
    payload: {
      isFetching: false,
      totalSwatchImages: json,
    },
  }
}

function dispatchRequestToalValidatedImages () {
  return {
    type: REQUEST_TOTAL_VALIDATED_IMAGES,
    payload: {
      isFetching: true,
    },
  }
}

function dispatchReceiveToalValidatedImages () {
  return dispatch => {
    return axios.get(apiConfig.dashboard.monitorHost + '/monitor/v1/sender_cache/validated_images?is_validated=true')
      .then(res => {
        dispatch(successReceiveToalValidatedImages(res.data.count))
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

function successReceiveToalValidatedImages (json) {
  return {
    type: RECEIVE_TOTAL_VALIDATED_IMAGES,
    payload: {
      isFetching: false,
      totalValidatedImages: json,
    },
  }
}
function requestTcinsSummaryData () {
  return dispatch => {
    dispatch(dispatchRequestToalTcins())
    dispatch(dispatchReceiveTotalTcins())
    dispatch(dispatchRequestToalPrimaryImages())
    dispatch(dispatchReceiveToalPrimaryImages())
    dispatch(dispatchRequestToalSecondaryImages())
    dispatch(dispatchReceiveToalSecondaryImages())
    dispatch(dispatchRequestToalSwatchImages())
    dispatch(dispatchReceiveToalSwatchImages())
    dispatch(dispatchRequestToalValidatedImages())
    dispatch(dispatchReceiveToalValidatedImages())
    dispatch(dispatchRequestToalTcinBasedImages())
    dispatch(dispatchReceiveToalTcinBasedImages())
  }
}

function requestFileStatus () {
  return dispatch => {
    dispatch(dispatchFileStatusEvent())
    return axios.get(apiConfig.dashboard.intakeHost + '/v1/file_status')
      .then(res => {
        dispatch(successReceiveFileStatus(res.data.folders.map((d) => {
          var item = {
            folder_name: d.folder_name,
            pending_files: d.pending_files,
            asset_source: d.asset_source,
            file_names: d.file_names,
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

function dispatchRequestToalTcinBasedImages () {
  return {
    type: REQUEST_TOTAL_TCIN_BASED_IMAGES,
    payload: {
      isFetching: true,
    },
  }
}

function dispatchReceiveToalTcinBasedImages () {
  return dispatch => {
    return axios.get(apiConfig.dashboard.monitorHost + '/monitor/v1/asset_associations/tcin_based_image_present?is_present=true')
      .then(res => {
        dispatch(successReceiveToalTcinBasedImages(res.data.count))
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

function successReceiveToalTcinBasedImages (json) {
  return {
    type: RECEIVE_TOTAL_TCIN_BASED_IMAGES,
    payload: {
      isFetching: false,
      totalTcinBasedImages: json,
    },
  }
}

export {
  displayMessageEvent,
  hidedisplayMessageEvent,
  requestTcinsSummaryData,
  requestFileStatus,
  toggleFileInfo,
}
