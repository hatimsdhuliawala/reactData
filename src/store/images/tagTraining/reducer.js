import {
  SET_IMAGE_URLS,
  SET_TAGS_LIST,
  SET_IMAGE_FETCHING,
  SET_TRAINING_IN_PROGRESS,
  DISPLAY_NOTIFICATION_TRAINING,
  HIDE_NOTIFICATION_TRAINING,
} from './actionType'
import { DefaultState } from '../../../components/Images/TagTraining/Components/TagTrainingData'

export default function tagTrainingReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case SET_IMAGE_URLS: {
      const { payload } = action
      const newState = {
        ...state,
        imageUrlInfo: {
          urls: payload.urls,
          group: payload.group,
          label: payload.label,
        },
      }
      return newState
    }

    case SET_TAGS_LIST: {
      const { payload } = action
      const newState = {
        ...state,
        tags: payload.tags,
      }
      return newState
    }

    case SET_IMAGE_FETCHING: {
      const { payload } = action
      const newState = {
        ...state,
        imageUrlsFetching: payload.imageUrlsFetching,
      }
      return newState
    }

    case SET_TRAINING_IN_PROGRESS: {
      const { payload } = action
      const newState = {
        ...state,
        imageUrlInfo: {
          urls: [],
        },
        tags: state.tags.map((tag) => {
          var tempTag = Object.assign({}, tag)
          var updatedTag = {
            ...tempTag,
            isTrainingInProgress: payload.isTrainingInProgress,
          }
          tempTag = updatedTag
          return tempTag
        }),
      }
      return newState
    }

    case DISPLAY_NOTIFICATION_TRAINING: {
      const { payload } = action
      const newState = {
        ...state,
        isNotificationMessageShownTraining: payload.isNotificationMessageShownTraining,
        notificationMessageTraining: payload.notificationMessageTraining,
      }
      return newState
    }

    case HIDE_NOTIFICATION_TRAINING: {
      const newState = {
        ...state,
        isNotificationMessageShownTraining: false,
        notificationMessageTraining: '',
      }
      return newState
    }

    default:
      return state
  }
}
