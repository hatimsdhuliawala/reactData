import {
  ITEM_DEBUGGER_SELECTED_ITEMS,
  ITEM_DEBUGGER_DISPLAY_ERROR,
  ITEM_DEBUGGER_SUCCESS_ITEM_DATA,
  ITEM_DEBUGGER_REQUEST_ITEM_DATA,
  ITEM_DEBUGGER_CLEAR_ITEM_DETAILS,
  ITEM_DEBUGGER_TOGGLE_INCLUDE_VERSION,
} from './actionType'
import axios from 'axios'
import apiConfig from '../../config/apiConfig'

export function handleSelectedItems (selectedItems) {
  return {
    type: ITEM_DEBUGGER_SELECTED_ITEMS,
    payload: {
      selectedItems: selectedItems,
    },
  }
}

export function clearItemDetails () {
  return {
    type: ITEM_DEBUGGER_CLEAR_ITEM_DETAILS,
    payload: {
      itemDetails: [],
    },
  }
}

export function toggleIncludeVersion (requestBody, includeAllVersion) {
  return dispatch => {
    dispatch(dispatchToggleIncludeVersion(includeAllVersion))
    dispatch(fetchItemData(requestBody, includeAllVersion))
  }
}

export function fetchItemData (requestBody, includeAllVersion) {
  return dispatch => {
    dispatch(dispatchRequestTcinDataEvent())
    return axios.post(`${apiConfig.dashboard.monitorHost}/monitor/v1/asset_trackings/fetch_by_tcins?include_all_version=${includeAllVersion}`, requestBody)
      .then(res => {
        dispatch(succesItemData(res.data))
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

function handleErrorJobCountEvent (data) {
  return {
    type: ITEM_DEBUGGER_DISPLAY_ERROR,
    payload: {
      isMessageShown: data.isMessageShown,
      displayMessage: data.displayMessage,
      isFetching: false,
    },
  }
}

export function succesItemData (itemDetails) {
  return {
    type: ITEM_DEBUGGER_SUCCESS_ITEM_DATA,
    payload: {
      isFetching: false,
      itemDetails: itemDetails,
    },
  }
}

function dispatchRequestTcinDataEvent (event, status) {
  return {
    type: ITEM_DEBUGGER_REQUEST_ITEM_DATA,
    payload: {
      isFetching: true,
    },
  }
}

function dispatchToggleIncludeVersion (includeAllVersion) {
  return {
    type: ITEM_DEBUGGER_TOGGLE_INCLUDE_VERSION,
    payload: {
      includeAllVersion: includeAllVersion,
    },
  }
}
