import {
  REQUEST_VIDEO_HISTORY_DATA,
  RECIEVE_VIDEO_HISTORY_DATA,
  DISPLAY_ERROR_EVENT,
  HIDE_ERROR_EVENT,
  ERROR_HISTORY_DATA,
  CHANGE_CURRENT_PAGE,
  CHANGE_DEFAULT_PAGE_SIZE,
} from './actionType'
import axios from 'axios'
import envConfigs from '../../config/apiConfig'

export function displayErrorEvent (data) {
  return {
    type: DISPLAY_ERROR_EVENT,
    payload: {
      isErrorMessageShownVideo: data.isErrorMessageShown,
      errorMessage: data.errorMessage,
    },
  }
}
export function handleErrorCopyEvent (data) {
  return {
    type: ERROR_HISTORY_DATA,
    payload: {
      isErrorMessageShownVideo: data.isErrorMessageShown,
      errorMessage: data.errorMessage,
      isFetchingHistory: false,
    },
  }
}
export function hideErrorEvent () {
  return {
    type: HIDE_ERROR_EVENT,
  }
}

export function getVideoHistoryData (pageNumber, pageSize, emailId, requestBody) {
  return dispatch => {
    dispatch(dispatchItemDataEvent())
    return axios.post(envConfigs.api.externalContentPipelineApi + envConfigs.api.videoHistory + emailId + '&page_number=' + pageNumber + '&page_size=' + pageSize, requestBody)
      .then(res => {
        dispatch(getHistorySuccess(res.data, res.data.totalPages, res.data.totalElements))
      })
      .catch((error, data) => {
        dispatch(handleErrorEvent(
          {
            isErrorMessageShownVideo: true,
            errorMessage: error.message,
            isFetchingHistory: false,
          },
        ))
      })
  }
}
export function handleErrorEvent (data) {
  return {
    type: ERROR_HISTORY_DATA,
    payload: {
      isErrorMessageShownVideo: data.isErrorMessageShownVideo,
      errorMessage: data.errorMessage,
      isFetchingHistory: false,
    },
  }
}

function dispatchItemDataEvent () {
  return {
    type: REQUEST_VIDEO_HISTORY_DATA,
    payload: {
      isFetchingHistory: true,
    },
  }
}

function getHistorySuccess (data, totalPages, totalElements) {
  return {
    type: RECIEVE_VIDEO_HISTORY_DATA,
    payload: {
      videoHistoryData: data.content,
      isFetchingHistory: false,
      vhTotalPages: totalPages,
      vhTotalElements: totalElements,
    },
  }
}

function changePage (data) {
  return {
    type: CHANGE_CURRENT_PAGE,
    payload: {
      vhCurrentPage: data.currentPage,
    },
  }
}
export function handleChangePage (data, emailId, requestBody) {
  return dispatch => {
    dispatch(changePage(data))
    dispatch(getVideoHistoryData(data.currentPage, data.defaultPageSize, emailId, requestBody))
  }
}

function changePageSize (data) {
  return {
    type: CHANGE_DEFAULT_PAGE_SIZE,
    payload: {
      vhDefaultPageSize: data.defaultPageSize,
    },
  }
}
export function changeDefaultPageSize (data, emailId, requestBody) {
  return dispatch => {
    dispatch(changePageSize(data))
    dispatch(getVideoHistoryData(data.currentPage, data.defaultPageSize, emailId, requestBody))
  }
}
