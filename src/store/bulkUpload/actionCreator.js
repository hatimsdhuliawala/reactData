import {
  REQUEST_UPLOAD_DATA,
  RECEIVE_UPLOAD_DATA,
  ERROR_UPLOAD_DATA,
  DISPLAY_ERROR_EVENT,
  HIDE_ERROR_EVENT,
  CLEAR_UPLOAD_DATA,
  DROP_ZONE_ACTIVE,
  WRONG_FILE_ADDED,
  PUBLISH_EVENT_SUCCESS,
} from './actionType'
import axios from 'axios'
import envConfigs from '../../config/apiConfig'
import harbinger from 'harbinger'

export function displayErrorEvent (data) {
  return {
    type: DISPLAY_ERROR_EVENT,
    payload: {
      isErrorMessageShown: data.isErrorMessageShown,
      errorMessage: data.errorMessage,
    },
  }
}
export function handleErrorCopyEvent (data) {
  return {
    type: ERROR_UPLOAD_DATA,
    payload: {
      isErrorMessageShown: data.isErrorMessageShown,
      errorMessage: data.errorMessage,
      isFetching: false,
    },
  }
}
export function hideErrorEvent () {
  return {
    type: HIDE_ERROR_EVENT,
  }
}

/**
 * Bulk Data Upload File
 * Data will have following attributes
 * files will contain data of the file
 * proceesed by will contain the user
 * @param {*} data
 */
export function getBulkUploadData (data, fileName) {
  /* eslint-disable */
  let formData = new FormData()
  /* eslint-enable */
  formData.append('files', data.files[0])
  formData.append('processed_by', data.processed_by)
  return dispatch => {
    dispatch(dispatchItemDataEvent())
    return axios.post(
      `${envConfigs.api.longCopyApi}long_copy/bulk_upload?key=${envConfigs.api.gatewayKey}`,
      formData,
      { headers: {
        'Content-Type': 'multipart/form-data',
      },
      }
    ).then(res => {
      dispatch(itemDataEventSuccess(res.data))
    })
      .catch((error, data) => {
        if (error.response.status === 400) {
          harbinger.trackEvent('nbyyhy', [{ key: 'Error', value: 'File data not formatted correctly' }])
          var title = 'is not formtted correctly for bulk copy upload'
          dispatch(wrongFileType(fileName, title, error.response.data.message))
        } else {
          harbinger.trackEvent('nbyyhy', [{ key: 'Error', value: 'Service not available' }])
          dispatch(handleErrorCopyEvent(
            {
              isErrorMessageShown: true,
              errorMessage: 'The application service is not responding. Please try again later. If this issue persists please request support through POL.',
              isFetching: false,
            },
          ))
        }
      })
  }
}

function dispatchItemDataEvent () {
  return {
    type: REQUEST_UPLOAD_DATA,
    payload: {
      isFetching: true,
    },
  }
}
function itemDataEventSuccess (data) {
  return {
    type: RECEIVE_UPLOAD_DATA,
    payload: {
      uploadData: data,
      isFetching: false,
    },
  }
}

export function dropZoneActive (data) {
  return {
    type: DROP_ZONE_ACTIVE,
    payload: {
      dropZoneEnter: data,
    },
  }
}

/**
 * Clear data
 */
export function clearUploadData () {
  harbinger.trackEvent('nbyyhy', [{ key: 'Error', value: 'Discard button clicked' }])
  return {
    type: CLEAR_UPLOAD_DATA,
  }
}

/**
 * Wrong file type
 */
export function wrongFileType (fileName, dropZoneErrorTitle, dropZoneErrorMessage) {
  return {
    type: WRONG_FILE_ADDED,
    payload: {
      fileName: fileName,
      dropZoneErrorTitle: dropZoneErrorTitle,
      dropZoneErrorMessage: dropZoneErrorMessage,
      validFile: true,
      isFetching: false,
    },
  }
}

export function confirmWrongFile () {
  return {
    type: WRONG_FILE_ADDED,
    payload: {
      fileName: '',
      dropZoneErrorTitle: '',
      dropZoneErrorMessage: '',
      validFile: false,
      isFetching: false,
    },
  }
}

/**
* Publish data
*/

export function publishData (data, invalidFiles) {
  return dispatch => {
    if (data.data.length > 0) {
      dispatch(dispatchItemDataEvent())
      return axios.post(
        `${envConfigs.api.longCopyApi}long_copy/bulk_upload/confirm?key=${envConfigs.api.gatewayKey}`,
        data
      ).then(res => {
        if (invalidFiles.length > 0) {
          dispatch(publishEventWithInvalidFiles(invalidFiles))
          dispatch(handleErrorCopyEvent(
            {
              isErrorMessageShown: true,
              errorMessage: `Inappropriate Language Alert: ${invalidFiles.length} items will not be published. ${data.data.length} items are valid and will be published.`,
              isFetching: false,
            },
          ))
        } else {
          dispatch(publishEventSuccess())
          dispatch(handleErrorCopyEvent(
            {
              isErrorMessageShown: true,
              errorMessage: 'Copy & Bullets submitted... publishing may take a few minutes.',
              isFetching: false,
            },
          ))
        }
      })
        .catch((error, data) => {
          harbinger.trackEvent('nbyyhy', [{ key: 'Error', value: 'Service not available' }])
          dispatch(handleErrorCopyEvent(
            {
              isErrorMessageShown: true,
              errorMessage: error.message,
              isFetching: false,
            },
          ))
        })
    } else {
      dispatch(publishEventWithInvalidFiles(invalidFiles))
      dispatch(handleErrorCopyEvent(
        {
          isErrorMessageShown: true,
          errorMessage: `Inappropriate Language Alert: ${invalidFiles.length} items will not be published.`,
          isFetching: false,
        },
      ))
    }
  }
}

function publishEventSuccess () {
  harbinger.trackEvent('4v2r3h')
  return {
    type: PUBLISH_EVENT_SUCCESS,
    payload: {
      validFile: false,
    },
  }
}

function publishEventWithInvalidFiles (invalidFiles) {
  var invalidFilesData = {
    data: [],
  }
  invalidFiles.map(item => {
    var data = {}
    data.long_copy = item.longCopy
    data.feature_bullets = item.featureBullets
    data.tcin = item.tcin
    data.valid = item.valid
    invalidFilesData.data.push(data)
  })
  harbinger.trackEvent('4v2r3h')
  return {
    type: RECEIVE_UPLOAD_DATA,
    payload: {
      uploadData: invalidFilesData,
      isFetching: false,
    },
  }
}
