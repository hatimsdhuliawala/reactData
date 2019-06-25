import {
  REQUEST_UPLOAD_DATA,
  RECEIVE_UPLOAD_DATA,
  ERROR_UPLOAD_DATA,
  DISPLAY_ERROR_EVENT,
  HIDE_ERROR_EVENT,
  CLEAR_UPLOAD_DATA,
  DROP_ZONE_ACTIVE,
  SELECT_DATA_EVENT,
  REMOVE_DATA_EVENT,
  RECEIVE_ITEM_DATA,
  UPDATE_LONG_COPY,
  UPDATE_LONG_COPY_EDIT_STATE,
  UPDATE_FEATURE_BULLETS,
  UPDATE_FEATURE_BULLETS_EDIT_STATE,
  REVERT_FEATURE_BULLETS,
  REVERT_LONG_COPY,
  HANDLE_DELETE_CONFIRMATION,
  WRONG_FILE_ADDED,
  PUBLISH_EVENT_SUCCESS,
  UPDATE_SELECTED_LONG_COPY,
  UPDATE_SELECTED_FEATURE_BULLETS,
} from './actionType'
import { DefaultState } from '../../components/LongCopy/BulkUpload/Components/UploadData'

export default function bulkUploadReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case REQUEST_UPLOAD_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case RECEIVE_UPLOAD_DATA: {
      const { payload } = action
      payload.uploadData.data.map(data => {
        if (data.long_copy !== null && data.long_copy !== undefined) {
          data.long_copy = data.long_copy.replace(/(\n)/g, '<br />')
        }
        data.itemData = {}
        data.isLongCopyEditable = false
        data.isLongCopyEdited = false
        data.isFeatureBulletsEditable = false
        data.isFeatureBulletsEdited = false
        data.confirmDelete = false
      })
      const newState = {
        ...state,
        defaultUploadData: payload.uploadData.data.map((item) => {
          var data = {}
          data.tcin = item.tcin
          data.longCopy = item.long_copy
          data.featureBullets = item.feature_bullets
          data.valid = item.valid
          return data
        }),
        uploadData: payload.uploadData.data.map((item) => {
          var data = {}
          data.tcin = item.tcin
          data.longCopy = item.long_copy
          data.featureBullets = item.feature_bullets
          data.valid = item.valid
          data.isLongCopyEditable = item.isLongCopyEditable
          data.isFeatureBulletsEditable = item.isFeatureBulletsEditable
          return data
        }),
        selectedData: payload.uploadData.data.map((item) => {
          var data = {}
          data.tcin = item.tcin
          data.longCopy = item.long_copy
          data.featureBullets = item.feature_bullets
          data.valid = item.valid
          return data
        }),
        isFetching: payload.isFetching,
      }
      return newState
    }
    case DISPLAY_ERROR_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        errorMessage: payload.errorMessage,
        isErrorMessageShown: payload.isErrorMessageShown,
      }
      return newState
    }
    case HIDE_ERROR_EVENT: {
      const newState = {
        ...state,
        isErrorMessageShown: false,
        errorMessage: '',
      }
      return newState
    }
    case ERROR_UPLOAD_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        errorMessage: payload.errorMessage,
        isErrorMessageShown: payload.isErrorMessageShown,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case CLEAR_UPLOAD_DATA: {
      const newState = {
        ...state,
        selectedData: [],
        uploadData: [],
        defaultUploadData: [],
        fileName: '',
        dropZoneErrorMessage: '',
        dropZoneErrorTitle: '',
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
    case SELECT_DATA_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        selectedData: payload.selectedData,
      }
      return newState
    }
    case REMOVE_DATA_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        uploadData: payload.uploadData,
        selectedData: payload.selectedData,
        defaultUploadData: payload.defaultUploadData,
      }
      return newState
    }
    case RECEIVE_ITEM_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        uploadData: state.uploadData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.tcin === payload.tcin) {
            var item = {
              tcin: temp.tcin,
              longCopy: temp.longCopy,
              featureBullets: temp.featureBullets,
              itemData: payload.itemData,
              isLongCopyEditable: temp.isLongCopyEditable,
              isLongCopyEdited: temp.isLongCopyEdited,
              isFeatureBulletsEditable: temp.isFeatureBulletsEditable,
              isFeatureBulletsEdited: temp.isFeatureBulletsEdited,
              confirmDelete: temp.confirmDelete,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case UPDATE_LONG_COPY: {
      const { payload } = action
      const newState = {
        ...state,
        uploadData: state.uploadData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.tcin === payload.tcin) {
            var item = {
              tcin: temp.tcin,
              longCopy: payload.longCopy,
              featureBullets: temp.featureBullets,
              itemData: temp.itemData,
              isLongCopyEditable: payload.isLongCopyEditable,
              isLongCopyEdited: payload.isLongCopyEdited,
              isFeatureBulletsEditable: temp.isFeatureBulletsEditable,
              isFeatureBulletsEdited: temp.isFeatureBulletsEdited,
              confirmDelete: temp.confirmDelete,
              valid: payload.valid,
            }
            return item
          }
          return temp
        }),
        selectedData: state.selectedData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.tcin === payload.tcin) {
            var item = {
              tcin: temp.tcin,
              longCopy: payload.longCopy,
              featureBullets: temp.featureBullets,
              valid: payload.valid,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case UPDATE_LONG_COPY_EDIT_STATE: {
      const { payload } = action
      const newState = {
        ...state,
        uploadData: state.uploadData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.tcin === payload.tcin) {
            var item = {
              tcin: temp.tcin,
              longCopy: temp.longCopy,
              featureBullets: temp.featureBullets,
              itemData: temp.itemData,
              isLongCopyEditable: payload.isLongCopyEditable,
              isLongCopyEdited: temp.isLongCopyEdited,
              isFeatureBulletsEditable: temp.isFeatureBulletsEditable,
              isFeatureBulletsEdited: temp.isFeatureBulletsEdited,
              confirmDelete: temp.confirmDelete,
              valid: temp.valid,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case UPDATE_FEATURE_BULLETS: {
      const { payload } = action
      const newState = {
        ...state,
        uploadData: state.uploadData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.tcin === payload.tcin) {
            var item = {
              tcin: temp.tcin,
              longCopy: temp.longCopy,
              featureBullets: payload.featureBullets,
              itemData: temp.itemData,
              isLongCopyEditable: temp.isLongCopyEditable,
              isLongCopyEdited: temp.isLongCopyEdited,
              isFeatureBulletsEditable: payload.isFeatureBulletsEditable,
              isFeatureBulletsEdited: payload.isFeatureBulletsEdited,
              confirmDelete: temp.confirmDelete,
              valid: payload.valid,
            }
            return item
          }
          return temp
        }),
        selectedData: state.selectedData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.tcin === payload.tcin) {
            var item = {
              tcin: temp.tcin,
              longCopy: temp.longCopy,
              featureBullets: payload.featureBullets,
              valid: payload.valid,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case UPDATE_FEATURE_BULLETS_EDIT_STATE: {
      const { payload } = action
      const newState = {
        ...state,
        uploadData: state.uploadData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.tcin === payload.tcin) {
            var item = {
              tcin: temp.tcin,
              longCopy: temp.longCopy,
              featureBullets: temp.featureBullets,
              itemData: temp.itemData,
              isLongCopyEditable: temp.isLongCopyEditable,
              isLongCopyEdited: temp.isLongCopyEdited,
              isFeatureBulletsEditable: payload.isFeatureBulletsEditable,
              isFeatureBulletsEdited: temp.isFeatureBulletsEdited,
              confirmDelete: temp.confirmDelete,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case REVERT_FEATURE_BULLETS: {
      const { payload } = action
      const newState = {
        ...state,
        uploadData: state.uploadData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.tcin === payload.tcin) {
            var item = {
              tcin: temp.tcin,
              longCopy: temp.longCopy,
              featureBullets: payload.featureBullets,
              itemData: temp.itemData,
              isLongCopyEditable: temp.isLongCopyEditable,
              isLongCopyEdited: temp.isLongCopyEdited,
              isFeatureBulletsEditable: temp.isFeatureBulletsEditable,
              isFeatureBulletsEdited: payload.isFeatureBulletsEdited,
              confirmDelete: temp.confirmDelete,
              valid: payload.valid,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case REVERT_LONG_COPY: {
      const { payload } = action
      const newState = {
        ...state,
        uploadData: state.uploadData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.tcin === payload.tcin) {
            var item = {
              tcin: temp.tcin,
              longCopy: payload.longCopy,
              featureBullets: temp.featureBullets,
              itemData: temp.itemData,
              isLongCopyEditable: temp.isLongCopyEditable,
              isLongCopyEdited: payload.isLongCopyEdited,
              isFeatureBulletsEditable: temp.isFeatureBulletsEditable,
              isFeatureBulletsEdited: temp.isFeatureBulletsEdited,
              confirmDelete: temp.confirmDelete,
              valid: payload.valid,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case HANDLE_DELETE_CONFIRMATION: {
      const { payload } = action
      const newState = {
        ...state,
        uploadData: state.uploadData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.tcin === payload.tcin) {
            var item = {
              tcin: temp.tcin,
              longCopy: temp.longCopy,
              featureBullets: temp.featureBullets,
              itemData: temp.itemData,
              isLongCopyEditable: temp.isLongCopyEditable,
              isLongCopyEdited: temp.isLongCopyEdited,
              isFeatureBulletsEditable: temp.isFeatureBulletsEditable,
              isFeatureBulletsEdited: temp.isFeatureBulletsEdited,
              confirmDelete: payload.confirmDelete,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case WRONG_FILE_ADDED: {
      const { payload } = action
      const newState = {
        ...state,
        fileName: payload.fileName,
        dropZoneErrorTitle: payload.dropZoneErrorTitle,
        dropZoneErrorMessage: payload.dropZoneErrorMessage,
        validFile: payload.validFile,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case PUBLISH_EVENT_SUCCESS: {
      const { payload } = action
      const newState = {
        ...state,
        selectedData: [],
        uploadData: [],
        defaultUploadData: [],
        fileName: '',
        dropZoneErrorMessage: '',
        dropZoneErrorTitle: '',
        isFetching: payload.isFetching,
      }
      return newState
    }
    case UPDATE_SELECTED_LONG_COPY: {
      const { payload } = action
      const newState = {
        ...state,
        selectedData: state.selectedData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.tcin === payload.tcin) {
            var item = {
              tcin: temp.tcin,
              longCopy: payload.longCopy,
              featureBullets: temp.featureBullets,
              valid: payload.valid,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case UPDATE_SELECTED_FEATURE_BULLETS: {
      const { payload } = action
      const newState = {
        ...state,
        selectedData: state.selectedData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.tcin === payload.tcin) {
            var item = {
              tcin: temp.tcin,
              longCopy: temp.longCopy,
              featureBullets: payload.featureBullets,
              valid: payload.valid,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    default:
      return state
  }
}
