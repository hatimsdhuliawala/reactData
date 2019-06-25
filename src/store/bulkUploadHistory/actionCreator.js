import {
  DISPLAY_HTTP_ERROR,
  REQUEST_BULK_UPLOAD_HISTORY_JOB_DATA,
  SUCCESS_BULK_UPLOAD_HISTORY_JOB_DATA,
  RELOAD_BULK_UPLOAD_HISTORY_JOB_DATA,
} from './actionType'
import axios from 'axios'
import apiConfig from '../../config/apiConfig'

function displayMessageEvent (data) {
  return {
    type: DISPLAY_HTTP_ERROR,
    payload: {
      isMessageShown: data.isMessageShown,
      displayMessage: data.displayMessage,
      isFetching: false,
    },
  }
}
function reloadBulkUploadJobs (emailId, pageSize, isAdmin) {
  return dispatch => {
    dispatch(dispatchReloadBulkUploadJobs())
    dispatch(fetchBulkUploadJobs(emailId, 0, pageSize, isAdmin))
  }
}
function dispatchReloadBulkUploadJobs () {
  return {
    type: RELOAD_BULK_UPLOAD_HISTORY_JOB_DATA,
  }
}
function fetchBulkUploadJobs (emailId, pageNumber, pageSize, isAdmin) {
  return dispatch => {
    dispatch(dispatchFetchBulkUploadJobs(pageNumber))
    var urlPostFix = ''
    if (isAdmin === undefined) {
      urlPostFix = `long_copy/bulk_upload_jobs?created_by=${emailId}&page_number=${pageNumber}&page_size=${pageSize}&key=${apiConfig.api.gatewayKey}`
    } else {
      urlPostFix = `long_copy/bulk_upload_jobs?page_number=${pageNumber}&page_size=${pageSize}&key=${apiConfig.api.gatewayKey}`
    }
    return axios.get(apiConfig.api.longCopyApi + urlPostFix)
      .then(res => {
        dispatch(successFetchBulkUploadJobs(res.data))
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

function dispatchFetchBulkUploadJobs (pageNumber) {
  return {
    type: REQUEST_BULK_UPLOAD_HISTORY_JOB_DATA,
    payload: {
      isFetching: true,
      currentPage: pageNumber,
    },
  }
}
function successFetchBulkUploadJobs (data) {
  return {
    type: SUCCESS_BULK_UPLOAD_HISTORY_JOB_DATA,
    payload: {
      isFetching: false,
      jobData: data.content,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    },
  }
}
export {
  fetchBulkUploadJobs,
  reloadBulkUploadJobs,
}
