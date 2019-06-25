import {
  REQUEST_HISTORY_DATA,
  RECIEVE_HISTORY_DATA,
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
      isErrorMessageShownImage: data.isErrorMessageShown,
      errorMessage: data.errorMessage,
    },
  }
}
export function handleErrorCopyEvent (data) {
  return {
    type: ERROR_HISTORY_DATA,
    payload: {
      isErrorMessageShownImage: data.isErrorMessageShown,
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

export function getHistoryData (pageNumber, pageSize, emailId) {
  return dispatch => {
    dispatch(dispatchItemDataEvent())
    return axios.post(envConfigs.api.externalContentPipelineApi + envConfigs.api.imageHistory + pageNumber + '&page_size=' + pageSize, emailId)
      .then(res => {
        dispatch(getHistorySuccess(res.data, res.data.totalPages, res.data.totalElements))
      })
      .catch((error, data) => {
        dispatch(handleErrorEvent(
          {
            isErrorMessageShown: true,
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
      isErrorMessageShownImage: data.isErrorMessageShown,
      errorMessage: data.errorMessage,
      isFetchingHistory: false,
    },
  }
}

function dispatchItemDataEvent () {
  return {
    type: REQUEST_HISTORY_DATA,
    payload: {
      isFetchingHistory: true,
    },
  }
}

function getHistorySuccess (data, totalPages, totalElements) {
  return {
    type: RECIEVE_HISTORY_DATA,
    payload: {
      historyData: data.content,
      isFetchingHistory: false,
      totalPages: totalPages,
      totalElements: totalElements,
    },
  }
}

function changePage (data) {
  return {
    type: CHANGE_CURRENT_PAGE,
    payload: {
      currentPage: data.currentPage,
    },
  }
}
export function handleChangePage (data, emailId) {
  return dispatch => {
    dispatch(changePage(data))
    dispatch(getHistoryData(data.currentPage, data.defaultPageSize, emailId))
  }
}

function changePageSize (data) {
  return {
    type: CHANGE_DEFAULT_PAGE_SIZE,
    payload: {
      defaultPageSize: data.defaultPageSize,
    },
  }
}
export function changeDefaultPageSize (data, emailId) {
  return dispatch => {
    dispatch(changePageSize(data))
    dispatch(getHistoryData(data.currentPage, data.defaultPageSize, emailId))
  }
}
