import {
  ADD_FILES_VIDEO,
  DROP_ZONE_ACTIVE,
  VALID_NUMBER_FILES,
  ON_DROP_LOADING,
  SUCCESSFUL_UPLOAD,
  HIDE_ERROR_EVENT,
  UPDATE_TCIN_LIST,
  UPDATE_INVALID_TCIN_LIST,
  UPDATE_NOTOWNED_TCIN_LIST,
  VIDEO_FILES_ADDED,
  CC_FILES_ADDED,
  POSTER_FRAME_FILES_ADDED,
  TRANSCRIPT_FILES_ADDED,
  REMOVE_ALL_FILES,
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
import { handleErrorEvent } from './historyActionCreator'
export function addedFilesVideo (files) {
  return {
    type: ADD_FILES_VIDEO,
    payload: {
      files: files,
    },
  }
}

export function validNumberFilesVideos (numberValidFiles) {
  return {
    type: VALID_NUMBER_FILES,
    payload: {
      numberValidFiles: numberValidFiles,
    },
  }
}

export function dropZoneActive (data) {
  return {
    type: DROP_ZONE_ACTIVE,
    payload: {
      dropZoneEnter: data,
    },
  }
}

export function onDropLoading (isFetchingOnDrop) {
  return {
    type: ON_DROP_LOADING,
    payload: {
      isFetchingOnDrop: isFetchingOnDrop,
    },
  }
}

export function successfullUploadsVideos (message) {
  return dispatch => {
    dispatch(successfullUploadedVideo(message))
    dispatch(updateTcinList([]))
    dispatch(handleErrorEvent({
      isErrorMessageShownVideo: true,
      errorMessage: message,
      isFetchingHistory: false,
    },
    ))
    dispatch(updateUploadSuccessfull(true))
  }
}

export function updateUploadSuccessfull (value) {
  return {
    type: UPDATE_SUCCESSFULL_EVENT,
    payload: {
      uploadComplete: value,
    },
  }
}

function successfullUploadedVideo (message) {
  return {
    type: SUCCESSFUL_UPLOAD,
    payload: {
      isErrorMessageShownVideo: true,
      errorMessage: message,
    },
  }
}

export function hideErrorEvent () {
  return {
    type: HIDE_ERROR_EVENT,
  }
}

export function updateTcinList (tcinList) {
  return {
    type: UPDATE_TCIN_LIST,
    payload: {
      tcinList: tcinList,
    },
  }
}

export function updateInvalidTcinList (tcinList) {
  return {
    type: UPDATE_INVALID_TCIN_LIST,
    payload: {
      invalidTcinList: tcinList,
    },
  }
}

export function updateNotOwnedTcinList (tcinList) {
  return {
    type: UPDATE_NOTOWNED_TCIN_LIST,
    payload: {
      notOwnedTcinList: tcinList,
    },
  }
}

export function addVideoFiles (data) {
  return {
    type: VIDEO_FILES_ADDED,
    payload: {
      videoFileAdded: data,
    },
  }
}

export function addCCFiles (data) {
  return {
    type: CC_FILES_ADDED,
    payload: {
      ccFileAdded: data,
    },
  }
}
export function addPosterFrameFiles (data) {
  return {
    type: POSTER_FRAME_FILES_ADDED,
    payload: {
      posterFrameFileAdded: data,
    },
  }
}
export function addTranscriptFiles (data) {
  return {
    type: TRANSCRIPT_FILES_ADDED,
    payload: {
      transcriptFileAdded: data,
    },
  }
}
export function removeFiles () {
  return {
    type: REMOVE_ALL_FILES,
    payload: {
      videoFileAdded: false,
      ccFileAdded: false,
      posterFrameFileAdded: false,
      transcriptFileAdded: false,
    },
  }
}

export function handlePanelErrorTcin (expantion) {
  return {
    type: HANDLE_TCIN_PANEL,
    payload: {
      panelTcinError: expantion,
    },
  }
}

export function updateCCError (data, dialogBoxVal) {
  return {
    type: ERROR_CC,
    payload: {
      errorCCDialog: dialogBoxVal,
      errorCC: data,
    },
  }
}

export function editModeEnabled (value) {
  return {
    type: EDIT_MODE,
    payload: {
      editMode: value,
    },
  }
}

export function editModeSetTitle (value) {
  return {
    type: EDIT_MODE_TITLE,
    payload: {
      editModeTitle: value,
    },
  }
}

export function setExternalGroupId (value) {
  return {
    type: SET_EXTERNAL_GROUP,
    payload: {
      externalGroupJobId: value,
    },
  }
}

export function addDeleteAsset (value) {
  return {
    type: ADD_DELETE_ASSET,
    payload: {
      deleteAsset: value,
    },
  }
}

export function addVideoGroupStatus (value) {
  return {
    type: VIDEO_GROUP_STATUS,
    payload: {
      videoGroupStatus: value,
    },
  }
}

export function editVttDialogBox (open, fileContent = '', fileName = '') {
  return {
    type: EDIT_VTT_FILE,
    payload: {
      vttEditBoxOpen: open,
      vttEditData: fileContent,
      vttEditBoxTitle: fileName,
    },
  }
}

export function vttErrorHandler (message) {
  return {
    type: VTT_EDITOR_ERROR,
    payload: {
      isErrorMessageShownVideo: true,
      errorMessage: message,
    },
  }
}

export function helpVttDialogBox (value) {
  return {
    type: VTT_HELP_DIALOG_BOX,
    payload: {
      vttHelpDialog: value,
    },
  }
}
