import {
  REQUEST_BADGES,
  RECEIVE_BADGES,
  BADGES_ERROR,
  UPDATE_BADGE_EDIT_STATE,
  CHANGE_BADGE,
  SAVE_BADGE,
} from './actionType'
import { DefaultState } from '../../components/Badges/Components/BadgesData'
import _ from 'lodash'

export default function badgesReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case REQUEST_BADGES: {
      const { payload } = action
      const newState = {
        ...state,
        isBadgesFetching: payload.isBadgesFetching,
      }
      return newState
    }
    case RECEIVE_BADGES: {
      const { payload } = action
      const newState = {
        ...state,
        isBadgesFetching: payload.isBadgesFetching,
        badgesList: [{ 'id': 'new' }, ...payload.badgesList],
      }
      return newState
    }
    case BADGES_ERROR: {
      const { payload } = action
      const newState = {
        ...state,
        isBadgesFetching: payload.isBadgesFetching,
      }
      return newState
    }
    case UPDATE_BADGE_EDIT_STATE: {
      const { payload } = action
      var newChangedBadgesList = [...state.changedBadgesList]
      const newState = {
        ...state,
        badgesList: state.badgesList.map((badge) => {
          var temp = Object.assign({}, badge)
          if (temp.id === payload.badge.id) {
            var editableBadge = {
              ...temp,
              isBadgeEditable: payload.isBadgeEditable,
            }
            if (payload.isBadgeEditable) {
              newChangedBadgesList.push(editableBadge)
            } else {
              _.remove(newChangedBadgesList, function (changedBadge) {
                return _.isEqual(changedBadge.id, editableBadge.id)
              })
            }
            return editableBadge
          }
          return temp
        }),
        changedBadgesList: newChangedBadgesList,
      }
      return newState
    }
    case CHANGE_BADGE: {
      const { payload } = action
      var name = payload.fieldName
      var value = payload.value
      var badge = payload.badge
      newChangedBadgesList = state.changedBadgesList
      var newlyChangedBadge = true
      var newState = newChangedBadgesList.length > 0 ? {
        ...state,
        changedBadgesList: newChangedBadgesList.map(changedBadge => {
          var tempBadge = Object.assign({}, changedBadge)
          if (tempBadge.id === badge.id) {
            tempBadge[name] = value
            newlyChangedBadge = false
          }
          return tempBadge
        }),
      } : {
        ...state,
        changedBadgesList: [],
      }
      if (newlyChangedBadge) {
        var temp = Object.assign({}, badge)
        temp[name] = value
        newState.changedBadgesList.push(temp)
      }
      return newState
    }
    case SAVE_BADGE: {
      const { payload } = action
      const newState = {
        ...state,
        isBadgeActiveAfterSave: payload.isBadgeActiveAfterSave,
        isSaveBadgeSuccess: payload.isSaveBadgeSuccess,
      }
      return newState
    }
    default:
      return state
  }
}
