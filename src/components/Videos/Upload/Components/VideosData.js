const DefaultState = {
  files: [],
  numberValidFiles: 0,
  errorFiles: [],
  isFetching: false,
  isFetchingHistory: false,
  isFetchingOnDrop: false,
  isErrorMessageShownVideo: false,
  errorMessage: '',
  durationSnackBar: 4000,
  dropZoneEnter: {
    video: false,
    closedCaption: false,
    posterFrame: false,
    transcript: false,
  },
  videoHistoryData: undefined,
  vhDefaultPageSize: 10,
  vhCurrentPage: 0,
  vhTotalPages: 0,
  vhTotalElements: 0,
  tcinList: [],
  invalidTcinList: [],
  notOwnedTcinList: [],
  videoFileAdded: false,
  ccFileAdded: false,
  posterFrameFileAdded: false,
  transcriptFileAdded: false,
  panelTcinError: null,
  errorCCDialog: false,
  errorCC: null,
  rejectVideo: false,
  rejectPosterFrame: false,
  rejectCC: false,
  rejectTranscript: false,
  editMode: false,
  editModeTitle: '',
  externalGroupJobId: null,
  deleteAsset: [],
  videoGroupStatus: null,
  uploadComplete: false,
  vttEditBoxOpen: false,
  vttEditData: '',
  vttEditBoxTitle: '',
  vttHelpDialog: false,
  vttHelpUrl: 'https://www.w3.org/TR/webvtt1/#introduction-caption',
}

export { DefaultState }
