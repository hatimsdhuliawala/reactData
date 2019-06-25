import {
  UPLOAD_START,
  CANCEL_UPLOAD,
  UPLOAD_INPROGRESS_START,
  ADD_FILES_UPLOAD,
  CLEAR_UPLOAD,
  VALUE_PERCENT,
  UPLOAD_FAILURES,
  TOTAL_FILES,
} from './actionType'
import { DefaultState } from '../../components/Upload/Components/UploadData'

export default function uploadReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case UPLOAD_START: {
      const { payload } = action
      const newState = {
        ...state,
        uploadInProgress: payload.uploadInProgress,
      }
      return newState
    }
    case CANCEL_UPLOAD: {
      const { payload } = action
      const newState = {
        ...state,
        fileQueue: payload.fileQueue,
        uploadData: payload.uploadData,
        uploadInProgress: payload.uploadInProgress,
      }
      return newState
    }
    case UPLOAD_INPROGRESS_START: {
      const { payload } = action
      const newState = {
        ...state,
        uploadInProgress: payload.uploadInProgress,
      }
      return newState
    }
    case ADD_FILES_UPLOAD: {
      const { payload } = action
      const newState = {
        ...state,
        uploadData: payload.uploadData,
      }
      return newState
    }
    case CLEAR_UPLOAD: {
      const { payload } = action
      const newState = {
        ...state,
        fileQueue: payload.fileQueue,
        uploadData: payload.uploadData,
        uploadInProgress: payload.uploadInProgress,
      }
      return newState
    }
    case VALUE_PERCENT: {
      const { payload } = action
      const newState = {
        ...state,
        uploadData: state.uploadData.map(item => {
          if (item.fileName === payload.fileName) {
            return { ...item, ...payload }
          }
          return item
        }),
      }
      return newState
    }
    case UPLOAD_FAILURES: {
      const { payload } = action
      const newState = {
        ...state,
        uploadErrorFiles: payload.uploadErrorFiles,
      }
      return newState
    }
    case TOTAL_FILES: {
      const { payload } = action
      const newState = {
        ...state,
        totalFiles: payload.totalFiles,
      }
      return newState
    }
    default:
      return state
  }
}
