const DefaultState = {
  files: [],
  numberValidFiles: 0,
  errorFiles: [],
  isFetching: false,
  isFetchingHistory: false,
  isFetchingOnDrop: false,
  isErrorMessageShownImage: false,
  errorMessage: '',
  durationSnackBar: 4000,
  dropZoneEnter: false,
  historyData: undefined,
  defaultPageSize: 10,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
}

export { DefaultState }
