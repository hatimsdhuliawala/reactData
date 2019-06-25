import {
  ADD_FILES,
  DROP_ZONE_ACTIVE,
  DISPLAY_ERROR_EVENT,
  HIDE_ERROR_EVENT,
  ERROR_HISTORY_DATA,
  REQUEST_HISTORY_DATA,
  RECIEVE_HISTORY_DATA,
  VALID_NUMBER_FILES,
  CHANGE_CURRENT_PAGE,
  CHANGE_DEFAULT_PAGE_SIZE,
  ON_DROP_LOADING,
  SUCCESSFUL_UPLOAD,
} from './actionType'
import { DefaultState } from '../../components/Images/Upload/Components/ImagesData'

export default function imageReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case ADD_FILES: {
      const { payload } = action
      const newState = {
        ...state,
        files: payload.files,
      }
      return newState
    }
    case DROP_ZONE_ACTIVE: {
      const { payload } = action
      const newState = {
        ...state,
        dropZoneEnter: payload.dropZoneEnter,
      }
      return newState
    }
    case DISPLAY_ERROR_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        errorMessage: payload.errorMessage,
        isErrorMessageShownImage: payload.isErrorMessageShown,
      }
      return newState
    }
    case HIDE_ERROR_EVENT: {
      const newState = {
        ...state,
        isErrorMessageShownImage: false,
        errorMessage: '',
      }
      return newState
    }
    case ERROR_HISTORY_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        errorMessage: payload.errorMessage,
        isErrorMessageShownImage: payload.isErrorMessageShownImage,
        isFetchingHistory: payload.isFetchingHistory,
      }
      return newState
    }
    case REQUEST_HISTORY_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetchingHistory: payload.isFetchingHistory,
      }
      return newState
    }
    case RECIEVE_HISTORY_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        historyData: payload.historyData,
        isFetchingHistory: payload.isFetchingHistory,
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
      }
      return newState
    }
    case VALID_NUMBER_FILES: {
      const { payload } = action
      const newState = {
        ...state,
        numberValidFiles: payload.numberValidFiles,
      }
      return newState
    }
    case CHANGE_CURRENT_PAGE: {
      const { payload } = action
      const newState = {
        ...state,
        currentPage: payload.currentPage,
      }
      return newState
    }
    case CHANGE_DEFAULT_PAGE_SIZE: {
      const { payload } = action
      const newState = {
        ...state,
        defaultPageSize: payload.defaultPageSize,
      }
      return newState
    }
    case ON_DROP_LOADING: {
      const { payload } = action
      const newState = {
        ...state,
        isFetchingOnDrop: payload.isFetchingOnDrop,
      }
      return newState
    }
    case SUCCESSFUL_UPLOAD: {
      const { payload } = action
      const newState = {
        ...state,
        isErrorMessageShownImage: payload.isErrorMessageShownImage,
        errorMessage: payload.errorMessage,
      }
      return newState
    }
    default:
      return state
  }
}
