import {
  REQUEST_BULK_UPLOAD_HISTORY_JOB_DATA,
  SUCCESS_BULK_UPLOAD_HISTORY_JOB_DATA,
  RELOAD_BULK_UPLOAD_HISTORY_JOB_DATA,
  DISPLAY_HTTP_ERROR,
} from './actionType'

const defaultState = {
  jobData: [],
  errorMessage: undefined,
  isErrorMessageShown: false,
  isFetching: false,
  pageSize: 5,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
}

export default function bulkUploadHistoryReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case REQUEST_BULK_UPLOAD_HISTORY_JOB_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        currentPage: payload.currentPage,
      }
      return newState
    }
    case RELOAD_BULK_UPLOAD_HISTORY_JOB_DATA: {
      const newState = {
        ...state,
        jobData: defaultState.jobData,
      }
      return newState
    }
    case SUCCESS_BULK_UPLOAD_HISTORY_JOB_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        jobData: state.jobData.concat(payload.jobData),
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
      }
      return newState
    }
    case DISPLAY_HTTP_ERROR: {
      const { payload } = action
      const newState = {
        ...state,
        errorMessage: payload.errorMessage,
        isFetching: payload.isFetching,
        isErrorMessageShown: true,
      }
      return newState
    }
    default:
      return state
  }
}
