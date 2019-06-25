import {
  REQUEST_JOB_DATA,
  RECEIVE_JOB_DATA,
  ERROR_JOB_DATA,
  REQUEST_JOB_COUNT_DATA,
  ERROR_JOB_COUNT_DATA,
  HIDE_ERROR_MESSAGE,
  CHANGE_TCIN_FILTER,
  CHANGE_TO_DATE,
  CHANGE_FROM_DATE,
  CHANGE_CURRENT_TAB,
  REQUEST_TOTAL_TCINS,
  RECEIVE_TOTAL_TCINS,
  REQUEST_TOTAL_PRIMARY_IMAGES,
  RECEIVE_TOTAL_PRIMARY_IMAGES,
  REQUEST_TOTAL_ALTERNATE_IMAGES,
  RECEIVE_TOTAL_ALTERNATE_IMAGES,
  REQUEST_TOTAL_SWATCH_IMAGES,
  RECEIVE_TOTAL_SWATCH_IMAGES,
  REQUEST_TOTAL_VALIDATED_IMAGES,
  RECEIVE_TOTAL_VALIDATED_IMAGES,
  REQUEST_FILE_STATUS,
  RECEIVE_FILE_STATUS,
  REQUEST_UPDATE_LOG_LEVEL,
  SUCCESS_UPDATE_LOG_LEVEL,
  SET_LOG_SERVER_URL,
  SET_LOG_LEVEL,
  REQUEST_TOTAL_TCIN_BASED_IMAGES,
  RECEIVE_TOTAL_TCIN_BASED_IMAGES,
  TOGGLE_FILE_INFO,
  RECEIVE_JOB_COUNT,
  REQUEST_RETRY_EVENT,
  SUCCESS_RETRY_EVENT,
  TOGGLE_MIGRATION,
  CHANGE_SYNC_TCINS,
  SUCCESS_TCINS_DATA,
  REQUEST_TCINS_DATA,
  REQUEST_SYNC_TCINS_DATA,
  SUCCESS_SYNC_TCINS_DATA,
  ITEM_DEBUGGER_SELECTED_ITEMS,
  ITEM_DEBUGGER_DISPLAY_ERROR,
  ITEM_DEBUGGER_SUCCESS_ITEM_DATA,
  ITEM_DEBUGGER_REQUEST_ITEM_DATA,
  ITEM_DEBUGGER_CLEAR_ITEM_DETAILS,
  ITEM_DEBUGGER_TOGGLE_INCLUDE_VERSION,
} from './actionType'
import { Events } from '../../components/Dashboard/Components/DashboardData'

const initialState = {
  isFetching: false,
  event: undefined,
  status: undefined,
  displayMessage: undefined,
  isMessageShown: false,
  jobData: [],
  jobCount: [],
  eventLoading: Events,
  selectedTcin: '',
  selectedToDate: new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
  }).format(new Date()),
  selectedFromDate: new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
  }).format(new Date()),
  currentTabIndex: 0,
  fileStatus: [],
  tcinSummary: {
    totalTcins: 0,
    totalPrimaryImages: 0,
    totalAlternateImages: 0,
    totalSwatchImages: 0,
    totalValidatedImages: 0,
    totalTcinBasedImages: 0,
  },
  selectedLogServerUrl: '',
  selectedLogLevel: '',
  fileInfoToggle: false,
  fileNames: [],
  retryContext: {},
  includeMigration: false,
  syncTcins: [],
  tcinDeltaResponse: [],
  bulkUploadJobData: [],
  itemDebugger: {
    selectedItems: [],
    itemDetails: [],
    isFetching: false,
    displayMessage: undefined,
    isMessageShown: false,
    includeAllVersion: false,
  },
}
export default function dashboard (state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_JOB_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        jobData: payload.jobData,
        isFetching: payload.isFetching,
        event: payload.event,
        status: payload.status,
      }
      return newState
    }
    case RECEIVE_JOB_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        jobData: payload.jobData,
        isFetching: payload.isFetching,
        event: payload.event,
        status: payload.status,
      }
      return newState
    }
    case ERROR_JOB_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        displayMessage: payload.displayMessage,
        isMessageShown: payload.isMessageShown,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case REQUEST_JOB_COUNT_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        jobCount: payload.jobCount,
        eventLoading: state.eventLoading.map(
          (item, i) => (
            item.event === payload.event && item.status === payload.status
          ) ? { ...item, isFetching: true } : item
        ),
        isFetching: payload.isFetching,
      }
      return newState
    }
    case RECEIVE_JOB_COUNT: {
      const { payload } = action
      const newState = {
        ...state,
        jobCount: [...state.jobCount, payload.jobCount],
        eventLoading: state.eventLoading.map(
          (item, i) => (
            item.event === payload.jobCount.event && item.status === payload.jobCount.status
          ) ? { ...item, isFetching: false } : item
        ),
        isFetching: payload.isFetching,
      }
      return newState
    }
    case ERROR_JOB_COUNT_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        displayMessage: payload.displayMessage,
        isMessageShown: payload.isMessageShown,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case HIDE_ERROR_MESSAGE: {
      const { payload } = action
      const newState = {
        ...state,
        displayMessage: payload.displayMessage,
        isMessageShown: payload.isMessageShown,
      }
      return newState
    }
    case CHANGE_TCIN_FILTER: {
      const { payload } = action
      const newState = {
        ...state,
        selectedTcin: payload.selectedTcin,
      }
      return newState
    }
    case CHANGE_TO_DATE: {
      const { payload } = action
      const newState = {
        ...state,
        selectedToDate: payload.selectedToDate,
      }
      return newState
    }
    case CHANGE_FROM_DATE: {
      const { payload } = action
      const newState = {
        ...state,
        selectedFromDate: payload.selectedFromDate,
      }
      return newState
    }
    case CHANGE_CURRENT_TAB: {
      const { payload } = action
      const newState = {
        ...state,
        currentTabIndex: payload.currentTabIndex,
      }
      return newState
    }
    case REQUEST_TOTAL_TCINS: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinSummary: {
          ...state.tcinSummary,
          totalTcins: 0,
        },
      }
      return newState
    }
    case RECEIVE_TOTAL_TCINS: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinSummary: {
          ...state.tcinSummary,
          totalTcins: payload.totalTcins,
        },
      }
      return newState
    }
    case REQUEST_TOTAL_PRIMARY_IMAGES: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinSummary: {
          ...state.tcinSummary,
          totalPrimaryImages: 0,
        },
      }
      return newState
    }
    case RECEIVE_TOTAL_PRIMARY_IMAGES: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinSummary: {
          ...state.tcinSummary,
          totalPrimaryImages: payload.totalPrimaryImages,
        },
      }
      return newState
    }
    case REQUEST_TOTAL_ALTERNATE_IMAGES: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinSummary: {
          ...state.tcinSummary,
          totalAlternateImages: 0,
        },
      }
      return newState
    }
    case RECEIVE_TOTAL_ALTERNATE_IMAGES: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinSummary: {
          ...state.tcinSummary,
          totalAlternateImages: payload.totalAlternateImages,
        },
      }
      return newState
    }
    case REQUEST_TOTAL_SWATCH_IMAGES: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinSummary: {
          ...state.tcinSummary,
          totalSwatchImages: 0,
        },
      }
      return newState
    }
    case RECEIVE_TOTAL_SWATCH_IMAGES: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinSummary: {
          ...state.tcinSummary,
          totalSwatchImages: payload.totalSwatchImages,
        },
      }
      return newState
    }
    case REQUEST_TOTAL_VALIDATED_IMAGES: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinSummary: {
          ...state.tcinSummary,
          totalValidatedImages: 0,
        },
      }
      return newState
    }
    case RECEIVE_TOTAL_VALIDATED_IMAGES: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinSummary: {
          ...state.tcinSummary,
          totalValidatedImages: payload.totalValidatedImages,
        },
      }
      return newState
    }
    case REQUEST_FILE_STATUS: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        fileStatus: payload.fileStatus,
      }
      return newState
    }
    case RECEIVE_FILE_STATUS: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        fileStatus: payload.fileStatus,
      }
      return newState
    }
    case REQUEST_UPDATE_LOG_LEVEL: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case SUCCESS_UPDATE_LOG_LEVEL: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case SET_LOG_SERVER_URL: {
      const { payload } = action
      const newState = {
        ...state,
        selectedLogServerUrl: payload.selectedLogServerUrl,
      }
      return newState
    }
    case SET_LOG_LEVEL: {
      const { payload } = action
      const newState = {
        ...state,
        selectedLogLevel: payload.selectedLogLevel,
      }
      return newState
    }
    case REQUEST_TOTAL_TCIN_BASED_IMAGES: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinSummary: {
          ...state.tcinSummary,
          totalTcinBasedImages: 0,
        },
      }
      return newState
    }
    case RECEIVE_TOTAL_TCIN_BASED_IMAGES: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinSummary: {
          ...state.tcinSummary,
          totalTcinBasedImages: payload.totalTcinBasedImages,
        },
      }
      return newState
    }
    case TOGGLE_FILE_INFO: {
      const { payload } = action
      const newState = {
        ...state,
        fileInfoToggle: payload.fileInfoToggle,
        fileNames: payload.fileNames,
      }
      return newState
    }
    case REQUEST_RETRY_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        retryContext: payload.retryContext,
      }
      return newState
    }
    case SUCCESS_RETRY_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case TOGGLE_MIGRATION: {
      const { payload } = action
      const newState = {
        ...state,
        includeMigration: payload.includeMigration,
      }
      return newState
    }
    case CHANGE_SYNC_TCINS: {
      const { payload } = action
      const newState = {
        ...state,
        syncTcins: payload.syncTcins,
      }
      return newState
    }
    case ITEM_DEBUGGER_SELECTED_ITEMS: {
      const { payload } = action
      const newState = {
        ...state,
        itemDebugger: {
          ...state.itemDebugger,
          selectedItems: payload.selectedItems,
        },
      }
      return newState
    }
    case ITEM_DEBUGGER_SUCCESS_ITEM_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        itemDebugger: {
          ...state.itemDebugger,
          isFetching: false,
          itemDetails: payload.itemDetails,
        },
      }
      return newState
    }
    case ITEM_DEBUGGER_REQUEST_ITEM_DATA: {
      const newState = {
        ...state,
        itemDebugger: {
          ...state.itemDebugger,
          isFetching: true,
        },
      }
      return newState
    }
    case ITEM_DEBUGGER_CLEAR_ITEM_DETAILS: {
      const { payload } = action
      const newState = {
        ...state,
        itemDebugger: {
          ...state.itemDebugger,
          itemDetails: payload.itemDetails,
        },
      }
      return newState
    }
    case ITEM_DEBUGGER_TOGGLE_INCLUDE_VERSION: {
      const { payload } = action
      const newState = {
        ...state,
        itemDebugger: {
          ...state.itemDebugger,
          includeAllVersion: payload.includeAllVersion,
        },
      }
      return newState
    }
    case ITEM_DEBUGGER_DISPLAY_ERROR: {
      const { payload } = action
      const newState = {
        ...state,
        itemDebugger: {
          ...state.itemDebugger,
          displayMessage: payload.displayMessage,
          isMessageShown: payload.isMessageShown,
          isFetching: payload.isFetching,
        },
      }
      return newState
    }
    case REQUEST_TCINS_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinDeltaResponse: payload.tcinDeltaResponse,
      }
      return newState
    }
    case SUCCESS_TCINS_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        tcinDeltaResponse: payload.tcinDeltaResponse,
      }
      return newState
    }
    case REQUEST_SYNC_TCINS_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case SUCCESS_SYNC_TCINS_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
      }
      return newState
    }
    default:
      return state
  }
}
