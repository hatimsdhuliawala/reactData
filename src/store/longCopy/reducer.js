import {
  NEW_FILTER_EVENT,
  BUILD_FILTER_EVENT,
  REQUEST_COPY_DATA,
  RECEIVE_COPY_DATA,
  DISPLAY_ERROR_EVENT,
  HIDE_ERROR_EVENT,
  CHANGE_FILTER_EVENT,
  SELECT_FILTER_VALUE_EVENT,
  CHANGE_DEFAULT_PAGE_SIZE,
  CHANGE_CURRENT_PAGE,
  SELECT_COPY_EVENT,
  REMOVE_FILTER_EVENT,
  ERROR_COPY_DATA,
  CLEAR_COPY_DATA_EVENT,
  VIEW_COPY_DETAIL_EVENT,
  REQUEST_DRAFT_COPY_EVENT,
  REQUEST_FIRST_DRAFT_COPY_EVENT,
  REQUEST_SAVE_COPY_EVENT,
  REQUEST_PUBLISH_COPY_EVENT,
  REQUEST_ITEM_DATA,
  RECEIVE_ITEM_DATA,
  REQUEST_DEPARTMENT,
  RECIEVE_DEPARTMENT,
  TOGGLE_ACTION_DRAWER,
  SET_ROUTE_TEAM,
  ADD_PLANNER_NOTES,
  REQUEST_SET_ROUTE_TEAM,
  SUCCESS_SET_ROUTE_TEAM,
  REQUEST_SAVE_PLANNER_NOTES,
  SUCCESS_SAVE_PLANNER_NOTES,
  SUCCESS_SAVE_PLANNER_NOTES_EDIT_PAGE,
  CLEAR_SUCCESS_MESSAGE,
  REQUEST_SAVED_FILTER_DATA,
  RECEIVE_SAVED_FILTER_DATA,
  TOGGLE_SAVE_FILTER_DIALOGUE,
  REQUEST_SAVE_FILTER_DATA,
  SUCCESS_SAVE_FILTER_DATA,
  TOGGLE_CONFIRMATION,
  UPDATE_COPY_LIST,
  REQUEST_COPY_DETAIL_EVENT,
  RECEIVE_COUNT_DATA,
  UPDATE_SELECTED,
  UPDATE_DATA_CALLED,
  UPDATE_CURRENT_IMAGES,
  UPDATE_CURRENT_IMAGE_SELECTED,
  UPDATE_EDIT_FEATURE_BULLET_STATE,
  UPDATE_EDIT_FEATURE_BULLET,
  UPDATE_EDIT_LONG_COPY_STATE,
  UPDATE_EDIT_LONG_COPY,
  ENTERED_EVENT,
  DOWNLOAD_START,
  DOWNLOAD_FINISH,
  STICKER_DATA_CALLED,
  STICKER_DATA_SUCCESS,
  UPDATE_SELECTED_STICKER,
  CLEAR_SELECTED_STICKER,
  DELETE_COPY_BULLET_CLICKED,
  CANCEL_COPY_BULLET_CLICKED,
  DELETE_OPTION_VALUE,
  CONFIRMATION_DELETE,
  DELETE_BACT_TO_LIST,
  CANCEL_QUICK_PUBLISH,
  HISTORY_INDEX_UPDATE,
  TAB_INDEX_UPDATE,
  BUILD_FILTER_EXPAND,
  REQUEST_MODAL_META_DATA,
  RECIEVE_MODAL_META_DATA,
} from './actionType'
import { DefaultState } from '../../components/LongCopy/SearchAndManage/Components/FilterData'
import _ from 'lodash'

export default function longCopyReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case NEW_FILTER_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        buildFilterContainerShown: payload,
      }
      return newState
    }
    case REMOVE_FILTER_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        newFilterContainerShown: payload.newFilterContainerShown,
        copyDataContainerShown: payload.copyDataContainerShown,
        selectedFilters: payload.selectedFilters,
      }
      return newState
    }
    case BUILD_FILTER_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        newFilterContainerShown: payload.newFilterContainerShown,
        copyDataContainerShown: payload.copyDataContainerShown,
        selectedFilters: payload.selectedFilters,
        // Resetting the value after adding
        filterValues: {
          copyWritingStatus: -1,
          departmentData: -1,
          division: [],
          tcins: [],
          routedTeams: -1,
          departmentClass: -1,
        },
      }
      return newState
    }
    case REQUEST_COPY_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        copyData: payload.copyData,
        isFetching: payload.isFetching,
        selectedCopy: payload.selectedCopy,
      }
      return newState
    }
    case CLEAR_COPY_DATA_EVENT: {
      const newState = {
        ...state,
        copyData: [],
      }
      return newState
    }
    case ERROR_COPY_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        errorMessage: payload.errorMessage,
        isErrorMessageShown: payload.isErrorMessageShown,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case SELECT_COPY_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        selectedCopy: payload.selectedCopy,
      }
      return newState
    }
    case CHANGE_CURRENT_PAGE: {
      const { payload } = action
      const newState = {
        ...state,
        currentPage: payload.currentPage,
      }
      return newState
    }
    case RECEIVE_COPY_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        copyData: payload.copyData,
        isFetching: payload.isFetching,
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
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
    case CHANGE_FILTER_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        selectedFilter: payload.selectedFilter,
      }
      return newState
    }
    case SELECT_FILTER_VALUE_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        filterValues: payload.filterValues,
      }
      return newState
    }
    case CHANGE_DEFAULT_PAGE_SIZE: {
      const { payload } = action
      const newState = {
        ...state,
        defaultPageSize: payload.defaultPageSize,
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
    case VIEW_COPY_DETAIL_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        plannerNotes: payload.plannerNotes ? payload.plannerNotes : '',
        selectedCopyData: payload.selectedCopyData,
        isEditCopyDataAvailable: payload.isEditCopyDataAvailable,
        editCopyData: {
          ...state.editCopyData,
          longCopy: payload.longCopy,
          featureBullets: payload.featureBullets,
          isEdited: payload.isEdited,
          editedFeatureBullets: payload.editedFeatureBullets,
        },
      }
      return newState
    }
    case REQUEST_DRAFT_COPY_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        selectedCopyData: {
          ...state.selectedCopyData,
          draft_copy: {
            long_copy: payload.long_copy,
            feature_bullets: payload.feature_bullets,
            version: payload.version,
            created_by: payload.created_by,
          },
        },
      }
      return newState
    }
    case REQUEST_FIRST_DRAFT_COPY_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        selectedCopyData: {
          ...state.selectedCopyData,
          current_event: {
            event_type: payload.event_type,
          },
          last_updated_by: payload.last_updated_by,
        },
      }
      return newState
    }
    case REQUEST_SAVE_COPY_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case REQUEST_PUBLISH_COPY_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case REQUEST_ITEM_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case RECEIVE_ITEM_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        selectedItemData: payload.selectedItemData,
        currentImagesSelected: payload.currentImagesSelected,
        isItemDataAvailable: payload.isItemDataAvailable,
        currentSwatch: payload.currentSwatch,
        currentImage: payload.currentImage,
      }
      return newState
    }
    case REQUEST_DEPARTMENT: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case RECIEVE_DEPARTMENT: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        selectedDepartmentData: payload.selectedDepartmentData,
      }
      return newState
    }
    case TOGGLE_ACTION_DRAWER: {
      const { payload } = action
      const newState = {
        ...state,
        isActionDrawerOpen: payload.isActionDrawerOpen,
        drawerAction: payload.drawerAction,
      }
      return newState
    }
    case TOGGLE_SAVE_FILTER_DIALOGUE: {
      const { payload } = action
      const newState = {
        ...state,
        isSaveFilterOpen: payload.isSaveFilterOpen,
      }
      return newState
    }
    case SET_ROUTE_TEAM: {
      const { payload } = action
      const newState = {
        ...state,
        currentRouteTeam: payload.currentRouteTeam,
      }
      return newState
    }
    case ADD_PLANNER_NOTES: {
      const { payload } = action
      const newState = {
        ...state,
        plannerNotes: payload.plannerNotes,
      }
      return newState
    }
    case REQUEST_SET_ROUTE_TEAM: {
      const { payload } = action
      const newState = {
        ...state,
        isLoading: payload.isFetching,
      }
      return newState
    }
    case SUCCESS_SET_ROUTE_TEAM: {
      const { payload } = action
      const newState = {
        ...state,
        isLoading: payload.isFetching,
        isNotificationOpen: true,
        successMessage: payload.successMessage,
        selectedCopy: [],
      }
      return newState
    }
    case REQUEST_SAVE_PLANNER_NOTES: {
      const { payload } = action
      const newState = {
        ...state,
        isLoading: payload.isFetching,
      }
      return newState
    }
    case SUCCESS_SAVE_PLANNER_NOTES: {
      const { payload } = action
      const newState = {
        ...state,
        isLoading: payload.isFetching,
        isNotificationOpen: true,
        successMessage: payload.successMessage,
        selectedCopy: [],
      }
      return newState
    }
    case SUCCESS_SAVE_PLANNER_NOTES_EDIT_PAGE: {
      const { payload } = action
      const newState = {
        ...state,
        plannerNotes: payload.PlannerNotes,
        isLoading: payload.isFetching,
        isNotificationOpen: true,
      }
      return newState
    }
    case CLEAR_SUCCESS_MESSAGE: {
      const { payload } = action
      const newState = {
        ...state,
        isNotificationOpen: false,
        successMessage: payload.successMessage,
      }
      return newState
    }
    case REQUEST_SAVED_FILTER_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case RECEIVE_SAVED_FILTER_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        savedFilterData: payload.savedFilterData,
      }
      return newState
    }
    case REQUEST_SAVE_FILTER_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
      }
      return newState
    }
    case SUCCESS_SAVE_FILTER_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: payload.isFetching,
        isSaveFilterOpen: payload.isSaveFilterOpen,
      }
      return newState
    }
    case TOGGLE_CONFIRMATION: {
      const { payload } = action
      const newState = {
        ...state,
        isConfirmationOpen: payload.isConfirmationOpen,
        confirmationPayload: payload.confirmationPayload,
      }
      return newState
    }
    case REQUEST_COPY_DETAIL_EVENT : {
      const { payload } = action
      const newState = {
        ...state,
        isEditCopyDataAvailable: payload.isEditCopyDataAvailable,
        isItemDataAvailable: payload.isItemDataAvailable,
      }
      return newState
    }
    case UPDATE_COPY_LIST: {
      const { payload } = action
      const newState = {
        ...state,
        copyData: state.copyData.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.id === payload.id) {
            var item = {
              id: temp.id,
              tcin: temp.tcin,
              tcin_info: temp.tcin_info,
              copy: temp.copy,
              assigned_to: temp.assigned_to,
              current_event: {
                event_type: payload.eventType,
                status: temp.current_event.status,
                start_time: temp.current_event.start_time,
                end_time: temp.current_event.end_time,
                error_message: temp.current_event.error_message,
                context: temp.current_event.context,
                retry_time: temp.current_event.retry_time,
                execution_count: temp.current_event.execution_count,
              },
              copy_due_date: temp.copy_due_date,
              created_by: temp.created_by,
              planner_note: temp.planner_note,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case RECEIVE_COUNT_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        countFilterValues: state.countFilterValues.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.eventType === payload.eventType) {
            var item = {
              eventType: temp.eventType,
              count: payload.count,
              isSelected: payload.isSelected,
              dataCalled: payload.dataCalled,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case UPDATE_SELECTED: {
      const { payload } = action
      const newState = {
        ...state,
        countFilterValues: state.countFilterValues.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.eventType === payload.eventType) {
            var item = {
              eventType: temp.eventType,
              count: temp.count,
              isSelected: payload.isSelected,
              dataCalled: temp.dataCalled,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case UPDATE_SELECTED_STICKER: {
      const { payload } = action
      const newState = {
        ...state,
        stickerValues: state.stickerValues.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.eventType === payload.eventType) {
            var item = {
              eventType: temp.eventType,
              count: temp.count,
              isSelected: payload.isSelected,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case UPDATE_DATA_CALLED: {
      const { payload } = action
      const newState = {
        ...state,
        countFilterValues: state.countFilterValues.map((data) => {
          var temp = Object.assign({}, data)
          if (temp.eventType === payload.eventType) {
            var item = {
              eventType: temp.eventType,
              count: temp.count,
              isSelected: temp.isSelected,
              dataCalled: payload.dataCalled,
            }
            return item
          }
          return temp
        }),
      }
      return newState
    }
    case UPDATE_CURRENT_IMAGES: {
      const { payload } = action
      const newState = {
        ...state,
        currentImagesSelected: payload.currentImagesSelected,
        currentSwatch: payload.currentSwatch,
        currentImage: payload.currentImage,
      }
      return newState
    }
    case UPDATE_CURRENT_IMAGE_SELECTED: {
      const { payload } = action
      const newState = {
        ...state,
        currentImage: payload.currentImage,
      }
      return newState
    }
    case UPDATE_EDIT_FEATURE_BULLET_STATE: {
      const { payload } = action
      const newState = {
        ...state,
        editCopyData: {
          ...state.editCopyData,
          isfeatureBulletsEdit: payload.isfeatureBulletsEdit,
        },
      }
      return newState
    }
    case UPDATE_EDIT_FEATURE_BULLET: {
      const { payload } = action
      const newState = {
        ...state,
        editCopyData: {
          ...state.editCopyData,
          isEdited: payload.isEdited,
          editedFeatureBullets: payload.editedFeatureBullets,
        },
      }
      return newState
    }
    case UPDATE_EDIT_LONG_COPY_STATE: {
      const { payload } = action
      const newState = {
        ...state,
        editCopyData: {
          ...state.editCopyData,
          isLongCopyEdit: payload.isLongCopyEdit,
        },
      }
      return newState
    }
    case UPDATE_EDIT_LONG_COPY: {
      const { payload } = action
      const newState = {
        ...state,
        editCopyData: {
          ...state.editCopyData,
          longCopy: payload.longCopy,
        },
      }
      return newState
    }
    case ENTERED_EVENT: {
      const { payload } = action
      const newState = {
        ...state,
        enteredEvent: payload.enteredEvent,
      }
      return newState
    }
    case DOWNLOAD_START: {
      const newState = {
        ...state,
        isLoading: true,
      }
      return newState
    }
    case DOWNLOAD_FINISH: {
      const newState = {
        ...state,
        isLoading: false,
      }
      return newState
    }
    case STICKER_DATA_CALLED: {
      const { payload } = action
      const newState = {
        ...state,
        stickerValues: state.stickerValues.map((data) => {
          var temp = Object.assign({}, data)
          var item = {
            eventType: temp.eventType,
            count: payload.count,
            isSelected: temp.isSelected,
          }
          return item
        }),
      }
      return newState
    }
    case STICKER_DATA_SUCCESS: {
      const { payload } = action
      const newState = {
        ...state,
        stickerValues: state.stickerValues.map((data) => {
          var temp = Object.assign({}, data)
          var item = {
            eventType: temp.eventType,
            count: _.find(payload.dataCount, function (item) { return Object.keys(item)[0] === temp.eventType })
              ? _.find(payload.dataCount, function (item) { return Object.keys(item)[0] === temp.eventType })[temp.eventType]
              : 0,
            isSelected: temp.isSelected,
          }
          return item
        }),
      }
      return newState
    }
    case CLEAR_SELECTED_STICKER: {
      const { payload } = action
      const newState = {
        ...state,
        stickerValues: state.stickerValues.map((data) => {
          var temp = Object.assign({}, data)
          var item = {
            eventType: temp.eventType,
            count: temp.count,
            isSelected: payload.isSelected,
          }
          return item
        }),
      }
      return newState
    }
    case DELETE_COPY_BULLET_CLICKED: {
      const { payload } = action
      const newState = {
        ...state,
        deleteData: {
          ...state.deleteData,
          tcinList: payload.tcinList,
          showSelectedDeleteType: payload.showSelectedDeleteType,
          editSection: payload.editSection,
        },
      }
      return newState
    }
    case CANCEL_COPY_BULLET_CLICKED: {
      const { payload } = action
      const newState = {
        ...state,
        deleteData: {
          ...state.deleteData,
          tcinList: payload.tcinList,
          showSelectedDeleteType: payload.showSelectedDeleteType,
          confirmationDelete: payload.confirmationDelete,
          selectDeleteType: payload.selectDeleteType,
          editSection: payload.editSection,
          suceesfullDeleted: payload.suceesfullDeleted,
        },
      }
      return newState
    }
    case DELETE_OPTION_VALUE: {
      const { payload } = action
      const newState = {
        ...state,
        deleteData: {
          ...state.deleteData,
          selectDeleteType: payload.selectDeleteType,
        },
      }
      return newState
    }
    case CONFIRMATION_DELETE: {
      const { payload } = action
      const newState = {
        ...state,
        deleteData: {
          ...state.deleteData,
          confirmationDelete: payload.confirmationDelete,
          selectDeleteType: payload.selectDeleteType,
          showSelectedDeleteType: payload.showSelectedDeleteType,
        },
      }
      return newState
    }
    case DELETE_BACT_TO_LIST: {
      const { payload } = action
      const newState = {
        ...state,
        deleteData: {
          ...state.deleteData,
          suceesfullDeleted: payload.suceesfullDeleted,
        },
      }
      return newState
    }
    case CANCEL_QUICK_PUBLISH: {
      const { payload } = action
      const newState = {
        ...state,
        quickEditConfirm: payload.quickEditConfirm,
      }
      return newState
    }
    case HISTORY_INDEX_UPDATE: {
      const { payload } = action
      const newState = {
        ...state,
        historyIndex: payload.historyIndex,
      }
      return newState
    }
    case TAB_INDEX_UPDATE: {
      const { payload } = action
      const newState = {
        ...state,
        currentTabIndex: payload.currentTabIndex,
      }
      return newState
    }
    case BUILD_FILTER_EXPAND: {
      const { payload } = action
      const newState = {
        ...state,
        buildFilterExpansionPanel: payload.buildFilterExpansionPanel,
      }
      return newState
    }
    case REQUEST_MODAL_META_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        modalMetadataFetching: payload.modalMetadataFetching,
      }
      return newState
    }
    case RECIEVE_MODAL_META_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        modalMetadataFetching: payload.modalMetadataFetching,
        modalMetadata: payload.modalMetadata,
      }
      return newState
    }
    default:
      return state
  }
}
