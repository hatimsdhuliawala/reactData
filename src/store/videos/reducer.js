import {
  ADD_FILES_VIDEO,
  DROP_ZONE_ACTIVE,
  DISPLAY_ERROR_EVENT,
  HIDE_ERROR_EVENT,
  ERROR_HISTORY_DATA,
  REQUEST_VIDEO_HISTORY_DATA,
  RECIEVE_VIDEO_HISTORY_DATA,
  VALID_NUMBER_FILES,
  CHANGE_CURRENT_PAGE,
  CHANGE_DEFAULT_PAGE_SIZE,
  ON_DROP_LOADING,
  SUCCESSFUL_UPLOAD,
  UPDATE_TCIN_LIST,
  VIDEO_FILES_ADDED,
  CC_FILES_ADDED,
  POSTER_FRAME_FILES_ADDED,
  TRANSCRIPT_FILES_ADDED,
  REMOVE_ALL_FILES,
  UPDATE_INVALID_TCIN_LIST,
  UPDATE_NOTOWNED_TCIN_LIST,
  HANDLE_TCIN_PANEL,
  ERROR_CC,
  EDIT_MODE,
  EDIT_MODE_TITLE,
  SET_EXTERNAL_GROUP,
  ADD_DELETE_ASSET,
  VIDEO_GROUP_STATUS,
  UPDATE_SUCCESSFULL_EVENT,
  EDIT_VTT_FILE,
  VTT_EDITOR_ERROR,
  VTT_HELP_DIALOG_BOX,
} from './actionType'
import { DefaultState } from '../../components/Videos/Upload/Components/VideosData'

export default function videoReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case ADD_FILES_VIDEO: {
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
        isErrorMessageShownVideo: payload.isErrorMessageShownVideo,
      }
      return newState
    }
    case HIDE_ERROR_EVENT: {
      const newState = {
        ...state,
        isErrorMessageShownVideo: false,
        errorMessage: '',
      }
      return newState
    }
    case ERROR_HISTORY_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        errorMessage: payload.errorMessage,
        isErrorMessageShownVideo: payload.isErrorMessageShownVideo,
        isFetchingHistory: payload.isFetchingHistory,
      }
      return newState
    }
    case REQUEST_VIDEO_HISTORY_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetchingHistory: payload.isFetchingHistory,
      }
      return newState
    }
    case RECIEVE_VIDEO_HISTORY_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        videoHistoryData: payload.videoHistoryData,
        isFetchingHistory: payload.isFetchingHistory,
        vhTotalPages: payload.vhTotalPages,
        vhTotalElements: payload.vhTotalElements,
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
        vhCurrentPage: payload.vhCurrentPage,
      }
      return newState
    }
    case CHANGE_DEFAULT_PAGE_SIZE: {
      const { payload } = action
      const newState = {
        ...state,
        vhDefaultPageSize: payload.vhDefaultPageSize,
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
        isErrorMessageShownVideo: payload.isErrorMessageShownVideo,
        errorMessage: payload.errorMessage,
      }
      return newState
    }
    case UPDATE_TCIN_LIST: {
      const { payload } = action
      const newState = {
        ...state,
        tcinList: payload.tcinList,
      }
      return newState
    }
    case VIDEO_FILES_ADDED: {
      const { payload } = action
      const newState = {
        ...state,
        videoFileAdded: payload.videoFileAdded,
      }
      return newState
    }
    case CC_FILES_ADDED: {
      const { payload } = action
      const newState = {
        ...state,
        ccFileAdded: payload.ccFileAdded,
      }
      return newState
    }
    case POSTER_FRAME_FILES_ADDED: {
      const { payload } = action
      const newState = {
        ...state,
        posterFrameFileAdded: payload.posterFrameFileAdded,
      }
      return newState
    }
    case TRANSCRIPT_FILES_ADDED: {
      const { payload } = action
      const newState = {
        ...state,
        transcriptFileAdded: payload.transcriptFileAdded,
      }
      return newState
    }
    case REMOVE_ALL_FILES: {
      const { payload } = action
      const newState = {
        ...state,
        videoFileAdded: payload.videoFileAdded,
        ccFileAdded: payload.ccFileAdded,
        posterFrameFileAdded: payload.posterFrameFileAdded,
        transcriptFileAdded: payload.transcriptFileAdded,
      }
      return newState
    }
    case UPDATE_INVALID_TCIN_LIST: {
      const { payload } = action
      const newState = {
        ...state,
        invalidTcinList: payload.invalidTcinList,
      }
      return newState
    }
    case UPDATE_NOTOWNED_TCIN_LIST: {
      const { payload } = action
      const newState = {
        ...state,
        notOwnedTcinList: payload.notOwnedTcinList,
      }
      return newState
    }
    case HANDLE_TCIN_PANEL: {
      const { payload } = action
      const newState = {
        ...state,
        panelTcinError: payload.panelTcinError,
      }
      return newState
    }
    case ERROR_CC: {
      const { payload } = action
      const newState = {
        ...state,
        errorCCDialog: payload.errorCCDialog,
        errorCC: payload.errorCC,
      }
      return newState
    }
    case EDIT_MODE: {
      const { payload } = action
      const newState = {
        ...state,
        editMode: payload.editMode,
      }
      return newState
    }
    case EDIT_MODE_TITLE: {
      const { payload } = action
      const newState = {
        ...state,
        editModeTitle: payload.editModeTitle,
      }
      return newState
    }
    case SET_EXTERNAL_GROUP: {
      const { payload } = action
      const newState = {
        ...state,
        externalGroupJobId: payload.externalGroupJobId,
      }
      return newState
    }
    case ADD_DELETE_ASSET: {
      const { payload } = action
      const newState = {
        ...state,
        deleteAsset: payload.deleteAsset,
      }
      return newState
    }
    case VIDEO_GROUP_STATUS: {
      const { payload } = action
      const newState = {
        ...state,
        videoGroupStatus: payload.videoGroupStatus,
      }
      return newState
    }
    case UPDATE_SUCCESSFULL_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        uploadComplete: payload.uploadComplete,
      }
      return newState
    }
    case EDIT_VTT_FILE: {
      const { payload } = action
      const newState = {
        ...state,
        vttEditBoxOpen: payload.vttEditBoxOpen,
        vttEditData: payload.vttEditData,
        vttEditBoxTitle: payload.vttEditBoxTitle,
      }
      return newState
    }
    case VTT_EDITOR_ERROR: {
      const { payload } = action
      const newState = {
        ...state,
        isErrorMessageShownVideo: payload.isErrorMessageShownVideo,
        errorMessage: payload.errorMessage,
      }
      return newState
    }
    case VTT_HELP_DIALOG_BOX: {
      const { payload } = action
      const newState = {
        ...state,
        vttHelpDialog: payload.vttHelpDialog,
      }
      return newState
    }
    default:
      return state
  }
}
