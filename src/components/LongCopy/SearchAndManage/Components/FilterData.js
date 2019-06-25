const FilterData = [
  /* {
    display: 'Division',
    value: 'division',
  },
  {
    display: 'Dept-Class',
    value: 'dept-class',
  },
  {
    display: 'TCIN',
    value: 'tcin',
  },
  {
    display: 'Brand Type',
    value: 'brand_type',
  },
  {
    display: 'Brand',
    value: 'brand',
  }, */
  {
    display: 'Division',
    value: 'division',
  },
  {
    display: 'TCINs',
    value: 'tcin',
  },
  {
    display: 'Copy Writing Status',
    value: 'eventType',
  },
  {
    display: 'Department',
    value: 'department',
  },
  {
    display: 'Routed Team',
    value: 'routedTeams',
  },
  /* {
    display: 'Routed Team',
    value: 'routedTeam',
  },
  {
    display: 'Launch Date',
    value: 'launch_date',
  }, */
]

const CopyWritingStatus = [
  {
    display: 'Ready For Copy',
    value: 'ReadyForCopy',
    color: 'rgba(195, 224, 246, 1)',
    isVisible: true,
  },
  {
    // Need to get colour
    display: 'Routed To Team',
    value: 'RoutedToGroup',
    color: 'rgba(195, 224, 246, 1)',
    isVisible: true,
  },
  {
    display: 'New Write Request',
    value: 'NewWriteRequest',
    color: 'rgba(254, 222, 196, 1)',
    isVisible: true,
  },
  {
    display: 'Writing Started',
    value: 'WritingStarted',
    color: 'rgba(255, 239, 197, 1)',
    isVisible: true,
  },
  {
    display: 'Ready For QA',
    value: 'ReadyForQA',
    color: 'rgba(239, 250, 218, 1)',
    isVisible: true,
  },
  {
    // Need to get colour
    display: 'Done',
    value: 'Done',
    color: 'rgba(254, 222, 196, 1)',
    isVisible: true,
  },
  {
    // Need to get colour
    display: 'Write To Association',
    value: 'WriteToAssociation',
    color: 'rgba(254, 222, 196, 1)',
    isVisible: false,
  },
  {
    // Need to get colour
    display: 'Send To ItemService',
    value: 'SendToItemService',
    color: 'rgba(254, 222, 196, 1)',
    isVisible: false,
  },
  {
    // Need to get colour
    display: 'Not Ready for Copy',
    value: 'NotReadyForCopy',
    color: 'rgba(192, 192, 192, 1)',
    isVisible: false,
  },
]

const RoutedTeams = [
  {
    display: 'Periscope',
    value: 'Periscope',
  },
  {
    display: 'India',
    value: 'India',
  },
  {
    display: 'None(vendor will provide)',
    value: 'None',
  },

]

const DefaultState = {
  myFilterContainerShown: true,
  buildFilterContainerShown: false,
  newFilterContainerShown: false,
  copyDataContainerShown: false,
  selectedFilters: [],
  copyData: [],
  selectedCopyData: undefined,
  isFetching: false,
  isErrorMessageShown: false,
  errorMessage: '',
  selectedFilter: -1,
  filterValues: {
    copyWritingStatus: -1,
    departmentData: -1,
    division: [],
    tcins: [],
    routedTeams: -1,
    departmentClass: -1,
  },
  defaultPageSize: 10,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  selectedCopy: [],
  selectedItemData: [],
  selectedDepartmentData: [],
  isActionDrawerOpen: false,
  drawerAction: undefined,
  selectedNotesData: undefined,
  currentRouteTeam: undefined,
  plannerNotes: '',
  isLoading: false,
  successMessage: '',
  isNotificationOpen: false,
  savedFilterData: [],
  isSaveFilterOpen: false,
  savedFilterName: '',
  isConfirmationOpen: false,
  confirmationPayload: undefined,
  durationSnackBar: 4000,
  isEditCopyDataAvailable: false,
  isItemDataAvailable: false,
  countFilterValues: [
    {
      eventType: 'ReadyForCopy',
      count: undefined,
      isSelected: false,
      dataCalled: false,
    },
    {
      eventType: 'RoutedToGroup',
      count: undefined,
      isSelected: false,
      dataCalled: false,
    },
    {
      eventType: 'NewWriteRequest',
      count: undefined,
      isSelected: false,
      dataCalled: false,
    },
    {
      eventType: 'WritingStarted',
      count: undefined,
      isSelected: false,
      dataCalled: false,
    },
    {
      eventType: 'ReadyForQA',
      count: undefined,
      isSelected: false,
      dataCalled: false,
    },
    {
      eventType: 'Done',
      count: undefined,
      isSelected: false,
      dataCalled: false,
    },
    {
      eventType: 'WriteToAssociation',
      count: undefined,
      isSelected: false,
      dataCalled: false,
    },
    {
      eventType: 'SendToItemService',
      count: undefined,
      isSelected: false,
      dataCalled: false,
    },
  ],
  stickerValues: [
    {
      eventType: 'ReadyForCopy',
      count: undefined,
      isSelected: false,
    },
    {
      eventType: 'RoutedToGroup',
      count: undefined,
      isSelected: false,
    },
    {
      eventType: 'NewWriteRequest',
      count: undefined,
      isSelected: false,
    },
    {
      eventType: 'WritingStarted',
      count: undefined,
      isSelected: false,
    },
    {
      eventType: 'ReadyForQA',
      count: undefined,
      isSelected: false,
    },
    {
      eventType: 'Done',
      count: undefined,
      isSelected: false,
    },
    {
      eventType: 'WriteToAssociation',
      count: undefined,
      isSelected: false,
    },
    {
      eventType: 'SendToItemService',
      count: undefined,
      isSelected: false,
    },
  ],
  currentImagesSelected: undefined,
  currentSwatch: null,
  currentImage: null,
  editCopyData: {
    longCopy: '',
    isLongCopyEdit: false,
    featureBullets: [],
    isEdited: false,
    editedFeatureBullets: [],
    isfeatureBulletsEdit: false,
  },
  enteredEvent: undefined,
  deleteData: {
    tcinList: [],
    confirmationDelete: false,
    selectDeleteType: 'COPY_AND_FEATURE_BULLETS',
    showSelectedDeleteType: false,
    editSection: false,
    suceesfullDeleted: false,
  },
  quickEditConfirm: false,
  historyIndex: 0,
  currentTabIndex: 0,
  buildFilterExpansionPanel: false,
  modalMetadata: [],
  modalMetadataFetching: false,
}

export { FilterData, CopyWritingStatus, RoutedTeams, DefaultState }
