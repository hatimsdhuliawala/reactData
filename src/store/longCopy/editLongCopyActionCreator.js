import {
  UPDATE_EDIT_FEATURE_BULLET_STATE,
  UPDATE_EDIT_FEATURE_BULLET,
  UPDATE_EDIT_LONG_COPY_STATE,
  UPDATE_EDIT_LONG_COPY,
  HISTORY_INDEX_UPDATE,
  TAB_INDEX_UPDATE,
  REQUEST_MODAL_META_DATA,
  RECIEVE_MODAL_META_DATA,
} from './actionType'
import axios from 'axios'
import envConfigs from '../../config/apiConfig'
import { handleErrorCopyEvent } from './actionCreator'
import _ from 'lodash'

export function editFeatureBulletState (value) {
  return {
    type: UPDATE_EDIT_FEATURE_BULLET_STATE,
    payload: {
      isfeatureBulletsEdit: value,
    },
  }
}

export function updateFeatureBullets (value) {
  return {
    type: UPDATE_EDIT_FEATURE_BULLET,
    payload: {
      isEdited: true,
      editedFeatureBullets: value,
    },
  }
}

export function editLongCopyState (value) {
  return {
    type: UPDATE_EDIT_LONG_COPY_STATE,
    payload: {
      isLongCopyEdit: value,
    },
  }
}

export function updatelongCopy (value) {
  return {
    type: UPDATE_EDIT_LONG_COPY,
    payload: {
      longCopy: value,
    },
  }
}

export function changeHistoryIndex (index) {
  return {
    type: HISTORY_INDEX_UPDATE,
    payload: {
      historyIndex: index,
    },
  }
}

export function changeTabEdit (index) {
  return {
    type: TAB_INDEX_UPDATE,
    payload: {
      currentTabIndex: index,
    },
  }
}

export function getModalMetadata (tcin) {
  return dispatch => {
    dispatch(requestModalMetaData())
    return axios.get(
      `${envConfigs.api.metaDataSearchApi}search/${tcin}/metadata?key=${envConfigs.api.gatewayKey}`
    ).then(res => {
      var modalData = res.data.images
        .filter((item) => !_.isEmpty(item.metadata))
      dispatch(recieveModalMetaData(modalData))
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

function requestModalMetaData () {
  return {
    type: REQUEST_MODAL_META_DATA,
    payload: {
      modalMetadataFetching: true,
    },
  }
}

function recieveModalMetaData (data) {
  return {
    type: RECIEVE_MODAL_META_DATA,
    payload: {
      modalMetadataFetching: false,
      modalMetadata: data,
    },
  }
}
