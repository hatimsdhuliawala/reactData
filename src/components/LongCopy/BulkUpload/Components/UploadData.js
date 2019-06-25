const DefaultState = {
  selectedData: [],
  uploadData: [],
  defaultUploadData: [],
  isFetching: false,
  isErrorMessageShown: false,
  errorMessage: '',
  defaultPageSize: 10,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  confirmationPayload: undefined,
  durationSnackBar: 4000,
  dropZoneEnter: false,
  validFile: false,
  fileName: '',
  dropZoneErrorMessage: '',
  dropZoneErrorTitle: '',
}

export { DefaultState }
