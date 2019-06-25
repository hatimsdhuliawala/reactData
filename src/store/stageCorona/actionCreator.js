import {
  REQUEST_CORONA_DATA,
  PUBLISH_CORONA_DATA,
  HELP_ACTION_DRAWER,
  PREVIEW_DATA,
  REMOVE_ITEM_DATA,
  HIDE_ERROR_EVENT_CORONA,
  DISPLAY_ERROR_EVENT_CORONA,
} from './actionType'
import axios from 'axios'
import envConfigs from '../../config/apiConfig'
import { reset } from 'redux-form'

export function fetchingData (value) {
  return {
    type: REQUEST_CORONA_DATA,
    payload: {
      isFetchingCorona: value,
    },
  }
}

export function helpActionDrawer (value) {
  return {
    type: HELP_ACTION_DRAWER,
    payload: {
      helpTextContainerOpen: value,
    },
  }
}

export function resetForm () {
  return dispatch => {
    dispatch(recievePreviewData([]))
    dispatch(reset('stageCoronaForm'))
  }
}

export function publishData (tcinData) {
  return dispatch => {
    return axios.post(`${envConfigs.api.pipelineAssetApp}assets/v1/stage/publish`, tcinData)
      .then(res => {
        dispatch(publishToCorona([]))
        dispatch(displayErrorEventCorona('We have successfully sent data to corona stage', true))
      }).catch(err => {
        dispatch(displayErrorEventCorona(err, true))
      })
  }
}

export function previewData (tcinList) {
  return dispatch => {
    dispatch(fetchingData(true))
    return axios.post(`${envConfigs.api.pipelineAssetApp}assets/v1/stage/tcin_list`, tcinList)
      .then(res => {
        dispatch(recievePreviewData(res.data))
        dispatch(reset('stageCoronaForm'))
      }).catch(err => {
        dispatch(displayErrorEventCorona(err, true))
      })
  }
}

function recievePreviewData (value) {
  return {
    type: PREVIEW_DATA,
    payload: {
      imageDataCorona: value,
      isFetchingCorona: false,
    },
  }
}

export function publishToCorona (value) {
  return {
    type: PUBLISH_CORONA_DATA,
    payload: {
      imageDataCorona: value,
    },
  }
}

export function removeItem (data) {
  return {
    type: REMOVE_ITEM_DATA,
    payload: {
      imageDataCorona: data,
    },
  }
}

export function hideErrorEventCorona () {
  return {
    type: HIDE_ERROR_EVENT_CORONA,
  }
}

export function displayErrorEventCorona (errorMessage, isErrorMessageShown) {
  return {
    type: DISPLAY_ERROR_EVENT_CORONA,
    payload: {
      isErrorMessageShownCorona: isErrorMessageShown,
      coronaImageErrorMessage: errorMessage,
    },
  }
}
