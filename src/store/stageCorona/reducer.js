import {
  REQUEST_CORONA_DATA,
  RECIEVE_CORONA_DATA,
  PUBLISH_CORONA_DATA,
  HELP_ACTION_DRAWER,
  PREVIEW_DATA,
  REMOVE_ITEM_DATA,
  HIDE_ERROR_EVENT_CORONA,
  DISPLAY_ERROR_EVENT_CORONA,
} from './actionType'
import { DefaultState } from '../../components/StageCorona/Components/StageCoronaData'

export default function stageCoronaReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case REQUEST_CORONA_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetchingCorona: payload.isFetchingCorona,
      }
      return newState
    }
    case RECIEVE_CORONA_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        imageDataCorona: payload.imageDataCorona,
        isFetchingCorona: payload.isFetchingCorona,
      }
      return newState
    }
    case PUBLISH_CORONA_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        imageDataCorona: payload.imageDataCorona,
      }
      return newState
    }
    case HELP_ACTION_DRAWER: {
      const { payload } = action
      const newState = {
        ...state,
        helpTextContainerOpen: payload.helpTextContainerOpen,
      }
      return newState
    }
    case PREVIEW_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        imageDataCorona: payload.imageDataCorona,
        isFetchingCorona: payload.isFetchingCorona,
      }
      return newState
    }
    case REMOVE_ITEM_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        imageDataCorona: payload.imageDataCorona,
      }
      return newState
    }
    case HIDE_ERROR_EVENT_CORONA: {
      const newState = {
        ...state,
        isErrorMessageShownCorona: false,
        coronaImageErrorMessage: '',
      }
      return newState
    }
    case DISPLAY_ERROR_EVENT_CORONA: {
      const { payload } = action
      const newState = {
        ...state,
        coronaImageErrorMessage: payload.coronaImageErrorMessage,
        isErrorMessageShownCorona: payload.isErrorMessageShownCorona,
      }
      return newState
    }
    default:
      return state
  }
}
