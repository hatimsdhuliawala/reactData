import {
  ADD_FILES,
  DROP_ZONE_ACTIVE,
  VALID_NUMBER_FILES,
  ON_DROP_LOADING,
  SUCCESSFUL_UPLOAD,
  HIDE_ERROR_EVENT,
} from './actionType'

export function addedFiles (files) {
  return {
    type: ADD_FILES,
    payload: {
      files: files,
    },
  }
}

export function validNumberFiles (numberValidFiles) {
  return {
    type: VALID_NUMBER_FILES,
    payload: {
      numberValidFiles: numberValidFiles,
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

export function onDropLoading (isFetchingOnDrop) {
  return {
    type: ON_DROP_LOADING,
    payload: {
      isFetchingOnDrop: isFetchingOnDrop,
    },
  }
}

export function successfullUploads () {
  return {
    type: SUCCESSFUL_UPLOAD,
    payload: {
      isErrorMessageShownImage: true,
      errorMessage: 'Successfully Uploaded Images',
    },
  }
}

export function hideErrorEvent () {
  return {
    type: HIDE_ERROR_EVENT,
  }
}
