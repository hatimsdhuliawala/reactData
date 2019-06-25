import {
  REQUEST_BADGES,
  RECEIVE_BADGES,
  BADGES_ERROR,
  UPDATE_BADGE_EDIT_STATE,
  CHANGE_BADGE,
  SAVE_BADGE,
} from './actionType'
import axios from 'axios'
import envConfigs from '../../config/apiConfig'
function requestBadges () {
  return {
    type: REQUEST_BADGES,
    payload: {
      isBadgesFetching: true,
    },
  }
}
function receiveBadges (data) {
  return {
    type: RECEIVE_BADGES,
    payload: {
      badgesList: data,
      isBadgesFetching: false,
    },
  }
}

export function getBadgesData () {
  return dispatch => {
    dispatch(requestBadges())
    return axios.get(envConfigs.api.pipelineContentApp + 'badges')
      .then(res => {
        dispatch(receiveBadges(res.data))
      })
      .catch(() => {
        dispatch(handleBadgesErrorEvent('Failed to retrieve badges.'))
      })
  }
}

export function changeBadgeEditState (badge, isBadgeEditable) {
  return {
    type: UPDATE_BADGE_EDIT_STATE,
    payload: {
      badge: badge,
      isBadgeEditable: isBadgeEditable,
    },
  }
}

export function saveBadge (badge) {
  var badgeToSave = Object.assign({}, badge)
  badgeToSave.active = true // attempt to activate, backend will handle whether or not it should be
  if (badgeToSave.id === 'new') {
    badgeToSave.id = null
  }
  return dispatch => {
    return axios.post(envConfigs.api.pipelineContentApp + 'badges', badgeToSave)
      .then(res => {
        dispatch(getBadgesData())
        dispatch(changeBadgeEditState(badge, false))
        dispatch(dispatchSaveBadge(true, res.data.active))
      })
      .catch(() => {
        dispatch(handleBadgesErrorEvent('Failed to save badge.'))
        dispatch(dispatchSaveBadge(false, false))
      })
  }
}

export function dispatchSaveBadge (wasSuccessful, isActive) {
  return {
    type: SAVE_BADGE,
    payload: {
      isBadgeActiveAfterSave: isActive,
      isSaveBadgeSuccess: wasSuccessful,
    },
  }
}

export function changeBadge (fieldName, value, badge) {
  return {
    type: CHANGE_BADGE,
    payload: {
      fieldName: fieldName,
      value: value,
      badge: badge,
    },
  }
}

export function handleBadgesErrorEvent (data) {
  return {
    type: BADGES_ERROR,
    payload: {
      badgesErrorMessage: data,
    },
  }
}
