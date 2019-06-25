import {
  SELECT_DATA_EVENT,
  REMOVE_DATA_EVENT,
  RECEIVE_ITEM_DATA,
  DISPLAY_ERROR_EVENT,
  ERROR_UPLOAD_DATA,
  HIDE_ERROR_EVENT,
  UPDATE_LONG_COPY,
  UPDATE_LONG_COPY_EDIT_STATE,
  UPDATE_FEATURE_BULLETS,
  UPDATE_FEATURE_BULLETS_EDIT_STATE,
  REVERT_FEATURE_BULLETS,
  REVERT_LONG_COPY,
  HANDLE_DELETE_CONFIRMATION,
  UPDATE_SELECTED_LONG_COPY,
  UPDATE_SELECTED_FEATURE_BULLETS,
} from './actionType'
import axios from 'axios'
import envConfigs from '../../config/apiConfig'

export function handleSelectData (data) {
  return {
    type: SELECT_DATA_EVENT,
    payload: {
      selectedData: data.selectedData,
    },
  }
}

export function deleteDataEvent (data) {
  return dispatch => {
    dispatch(deleteDataEventSucess(data))
    dispatch(handleErrorCopyEvent(
      {
        isErrorMessageShown: true,
        errorMessage: 'Successfully Removed',
        isFetching: false,
      },
    ))
  }
}

function deleteDataEventSucess (data) {
  return {
    type: REMOVE_DATA_EVENT,
    payload: {
      uploadData: data.uploadData,
      selectedData: data.selectedData,
      defaultUploadData: data.defaultUploadData,
    },
  }
}

export function getItemData (tcin) {
  return dispatch => {
    return axios.get(`${envConfigs.api.itemLiteApi}${tcin}?key=${envConfigs.api.gatewayKey}`)
      .then(res => {
        dispatch(itemDataEventSuccess(tcin, res.data))
      })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

function itemDataEventSuccess (tcin, data) {
  return {
    type: RECEIVE_ITEM_DATA,
    payload: {
      itemData: data,
      tcin: tcin,
      isFetching: false,
    },
  }
}

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

export function checkProfanity (tcin, longCopy, featureBullet, feature) {
  var requestBody = {
    long_copy: longCopy,
    feature_bullets: featureBullet,
  }
  return dispatch => {
    return axios.post(
      `${envConfigs.api.longCopyApi}long_copy/profanity_check?key=${envConfigs.api.gatewayKey}`,
      requestBody
    ).then(res => {
      if (feature === 'longCopy') {
        dispatch(updateLongCopy(tcin, res.data))
      }
      if (feature === 'featureBullet') {
        dispatch(updateFeatureBullets(tcin, res.data))
      }
      if (feature === 'revertLongCopy') {
        dispatch(revertBackLongCopy(tcin, res.data.long_copy, res.data.valid))
        dispatch(updateSelectedLongCopy(tcin, res.data.long_copy, res.data.valid))
      }
      if (feature === 'revertFeatureBullet') {
        dispatch(revertBackFeatureBullets(tcin, res.data.feature_bullets, res.data.valid))
        dispatch(updateSelectedFeatureBullets(tcin, res.data.feature_bullets, res.data.valid))
      }
    })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

export function updateLongCopy (tcin, data) {
  return {
    type: UPDATE_LONG_COPY,
    payload: {
      tcin: tcin,
      longCopy: data.long_copy,
      isLongCopyEditable: false,
      isLongCopyEdited: true,
      valid: data.valid,
    },
  }
}

export function updateSelectedLongCopy (tcin, data, valid) {
  return {
    type: UPDATE_SELECTED_LONG_COPY,
    payload: {
      tcin: tcin,
      longCopy: data,
      valid: valid,
    },
  }
}

export function updateSelectedFeatureBullets (tcin, data, valid) {
  return {
    type: UPDATE_SELECTED_FEATURE_BULLETS,
    payload: {
      tcin: tcin,
      featureBullets: data,
      valid: valid,
    },
  }
}

export function changeToEditStateLongCopy (tcin, isLongCopyEditable) {
  return {
    type: UPDATE_LONG_COPY_EDIT_STATE,
    payload: {
      tcin: tcin,
      isLongCopyEditable: isLongCopyEditable,
    },
  }
}

export function updateFeatureBullets (tcin, data) {
  return {
    type: UPDATE_FEATURE_BULLETS,
    payload: {
      tcin: tcin,
      featureBullets: data.feature_bullets,
      isFeatureBulletsEditable: false,
      isFeatureBulletsEdited: true,
      valid: data.valid,
    },
  }
}

export function changeToEditStateFeatureBullets (tcin, isFeatureBulletsEditable) {
  return {
    type: UPDATE_FEATURE_BULLETS_EDIT_STATE,
    payload: {
      tcin: tcin,
      isFeatureBulletsEditable: isFeatureBulletsEditable,
    },
  }
}

export function revertBackFeatureBullets (tcin, data, valid) {
  return {
    type: REVERT_FEATURE_BULLETS,
    payload: {
      tcin: tcin,
      featureBullets: data,
      isFeatureBulletsEdited: false,
      valid: valid,
    },
  }
}

export function revertBackLongCopy (tcin, data, valid) {
  return {
    type: REVERT_LONG_COPY,
    payload: {
      tcin: tcin,
      longCopy: data,
      isLongCopyEdited: false,
      valid: valid,
    },
  }
}
export function handleDeleteConfirmation (tcin) {
  return {
    type: HANDLE_DELETE_CONFIRMATION,
    payload: {
      tcin: tcin,
      confirmDelete: true,
    },
  }
}

export function cancelDeleteEvent (tcin) {
  return {
    type: HANDLE_DELETE_CONFIRMATION,
    payload: {
      tcin: tcin,
      confirmDelete: false,
    },
  }
}
