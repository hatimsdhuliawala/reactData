import {
  ERROR_JOB_COUNT_DATA,
  HIDE_ERROR_MESSAGE,
  REQUEST_UPDATE_LOG_LEVEL,
  SUCCESS_UPDATE_LOG_LEVEL,
  SET_LOG_SERVER_URL,
  SET_LOG_LEVEL,
} from './actionType'
import axios from 'axios'

function setLogLevel (logLevel) {
  return {
    type: SET_LOG_LEVEL,
    payload: {
      selectedLogLevel: logLevel,
    },
  }
}

function setLogServerUrl (logServerUrl) {
  return {
    type: SET_LOG_SERVER_URL,
    payload: {
      selectedLogServerUrl: logServerUrl,
    },
  }
}
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

function requestUpdateLog (url, body) {
  return dispatch => {
    dispatch(dispatchUpdateLogEvent())
    return axios.post(url, body)
      .then(res => {
        dispatch(successReceiveFileStatus())
        dispatch(displayMessageEvent(
          {
            isMessageShown: true,
            displayMessage: 'Log level changed successfully',
            isFetching: false,
          },
        ))
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

function dispatchUpdateLogEvent (event, status) {
  return {
    type: REQUEST_UPDATE_LOG_LEVEL,
    payload: {
      isFetching: true,
    },
  }
}

function successReceiveFileStatus () {
  return {
    type: SUCCESS_UPDATE_LOG_LEVEL,
    payload: {
      isFetching: false,
    },
  }
}

export {
  displayMessageEvent,
  hidedisplayMessageEvent,
  requestUpdateLog,
  setLogLevel,
  setLogServerUrl,
}
