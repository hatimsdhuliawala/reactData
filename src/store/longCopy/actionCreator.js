/* global _ */
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
  REQUEST_FIRST_DRAFT_COPY_EVENT,
  REQUEST_SAVED_FILTER_DATA,
  RECEIVE_SAVED_FILTER_DATA,
  TOGGLE_SAVE_FILTER_DIALOGUE,
  REQUEST_SAVE_FILTER_DATA,
  SUCCESS_SAVE_FILTER_DATA,
  TOGGLE_CONFIRMATION,
  REQUEST_COPY_DETAIL_EVENT,
  UPDATE_COPY_LIST,
  RECEIVE_COUNT_DATA,
  UPDATE_SELECTED,
  UPDATE_DATA_CALLED,
  UPDATE_CURRENT_IMAGES,
  UPDATE_CURRENT_IMAGE_SELECTED,
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
  BUILD_FILTER_EXPAND,
} from './actionType'
import axios from 'axios'
import envConfigs from '../../config/apiConfig'
import harbinger from 'harbinger'
const fileDownload = require('js-file-download')
function dispatchDraftDataEvent (draftData) {
  return {
    type: REQUEST_DRAFT_COPY_EVENT,
    payload: {
      long_copy: draftData.long_copy,
      feature_bullets: draftData.feature_bullets,
      version: draftData.version,
      created_by: draftData.created_by,
      isFetching: true,
    },
  }
}

function dispatchFirstDraftDataEvent (createdBy) {
  return {
    type: REQUEST_FIRST_DRAFT_COPY_EVENT,
    payload: {
      event_type: 'WritingStarted',
      last_updated_by: createdBy,
      isFetching: true,
    },
  }
}

function dispatchSaveDataEvent () {
  return {
    type: REQUEST_SAVE_COPY_EVENT,
    payload: {
      isFetching: true,
    },
  }
}

function dispatchPublishDataEvent () {
  return {
    type: REQUEST_PUBLISH_COPY_EVENT,
    payload: {
      isFetching: true,
    },
  }
}

export function draftDataEvent (trackingId, data) {
  return dispatch => {
    return axios.post(
      `${envConfigs.api.longCopyApi}long_copy/${trackingId}/draft_copy?key=${envConfigs.api.gatewayKey}`,
      data
    ).then(res => {
      dispatch(handleErrorCopyEvent(
        {
          isErrorMessageShown: true,
          errorMessage: 'Draft save successfully',
          isFetching: false,
        },
      ))
      dispatch(updateCopyEvent(trackingId, 'WritingStarted'))
      dispatch(dispatchDraftDataEvent(data))
    })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

export function draftDataEventNoSnacbar (trackingId, data) {
  return dispatch => {
    return axios.post(
      `${envConfigs.api.longCopyApi}long_copy/${trackingId}/draft_copy?key=${envConfigs.api.gatewayKey}`,
      data
    ).then(res => {
      dispatch(dispatchDraftDataEvent(data))
    })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

export function firstDraftDataEvent (trackingId, data) {
  return dispatch => {
    return axios.post(
      `${envConfigs.api.longCopyApi}long_copy/${trackingId}/draft_copy?key=${envConfigs.api.gatewayKey}`,
      data
    ).then(res => {
      dispatch(dispatchFirstDraftDataEvent(data.created_by))
    })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

export function saveDataEvent (trackingId, data) {
  return dispatch => {
    dispatch(dispatchSaveDataEvent())
    return axios.post(
      `${envConfigs.api.longCopyApi}long_copy/${trackingId}/save_copy?key=${envConfigs.api.gatewayKey}`,
      data
    ).then(res => {
      dispatch(handleErrorCopyEvent(
        {
          isErrorMessageShown: true,
          errorMessage: 'Copy submitted successfully for QA',
          isFetching: false,
        },
      ))
      dispatch(updateCopyEvent(trackingId, 'ReadyForQA'))
    })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}
export function publishDataEvent (trackingId, data) {
  return dispatch => {
    dispatch(dispatchPublishDataEvent())
    return axios.post(
      `${envConfigs.api.longCopyApi}long_copy/${trackingId}/publish_copy?key=${envConfigs.api.gatewayKey}`,
      data
    ).then(res => {
      dispatch(handleErrorCopyEvent(
        {
          isErrorMessageShown: true,
          errorMessage: 'Published Successfully',
          isFetching: false,
        },
      ))
      dispatch(updateCopyEvent(trackingId, 'Done'))
    })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}
export function quickEditPublishDataEvent (trackingId, data) {
  return dispatch => {
    dispatch(dispatchPublishDataEvent())
    dispatch(cancelQuickPublish())
    return axios.post(
      `${envConfigs.api.longCopyApi}long_copy/${trackingId}/quick_edit?key=${envConfigs.api.gatewayKey}`,
      data
    ).then(res => {
      dispatch(handleErrorCopyEvent(
        {
          isErrorMessageShown: true,
          errorMessage: 'Published Successfully',
          isFetching: false,
        },
      ))
    })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}
export function newFilterAction (isShown) {
  return {
    type: NEW_FILTER_EVENT,
    payload: isShown,
  }
}

function viewCopyDetailEventSuccess (data, planerNotesData) {
  return {
    type: VIEW_COPY_DETAIL_EVENT,
    payload: {
      selectedCopyData: data,
      plannerNotes: planerNotesData,
      isEditCopyDataAvailable: true,
      longCopy: (data.current_event.event_type !== 'Done' && data.current_event.event_type !== 'ReadyForQA') ? data.draft_copy ? data.draft_copy.long_copy : data.current_copy ? data.current_copy.long_copy : '' : data.current_copy ? data.current_copy.long_copy : '',
      featureBullets: (data.current_event.event_type !== 'Done' && data.current_event.event_type !== 'ReadyForQA') ? data.draft_copy ? data.draft_copy.feature_bullets : data.current_copy ? data.current_copy.feature_bullets : '' : data.current_copy ? data.current_copy.feature_bullets : '',
      isEdited: false,
      editedFeatureBullets: [],
    },
  }
}

function updateCopyEvent (trackingId, eventType) {
  return {
    type: UPDATE_COPY_LIST,
    payload: {
      id: trackingId,
      eventType: eventType,
    },
  }
}

function requestCopyDetailEvent (isEditCopyDataAvailable) {
  return {
    type: REQUEST_COPY_DETAIL_EVENT,
    payload: {
      isEditCopyDataAvailable: false,
      isItemDataAvailable: false,
    },
  }
}
function requestItemDataEvent (tcin) {
  return dispatch => {
    dispatch(dispatchItemDataEvent())
    axios.get(`${envConfigs.api.itemLiteApi}${tcin}?key=${envConfigs.api.gatewayKey}`)
      .then(response => {
        let itemData = response.data
        dispatch(itemDataEventSuccess({
          dpci: itemData.dpci,
          tcin: itemData.tcin,
          relationship_type_code: itemData.relationship_type,
          enrichment: itemData.enrichment,
          attributes: itemData.attributes,
          parent_items: itemData.parent_items,
          child_items: itemData.child_items,
          product_description: itemData.product_description,
          variation: itemData.variation,
          merchandise_classification: itemData.merchandise_classification,
          merchandise_type_attributes: itemData.merchandise_type_attributes,
          product_classification: itemData.product_classification,
          product_brand: itemData.product_brand,
          product_vendors: itemData.product_vendors,
          wellness_merchandise_attributes: itemData.wellness_merchandise_attributes,
          variationPrimaryImage: itemData.variationPrimaryImage,
          intended_launch_date_time: itemData.intended_launch_date_time,
          launch_date_time: itemData.launch_date_time,
        }))
      })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}
function dispatchItemDataEvent () {
  return {
    type: REQUEST_ITEM_DATA,
    payload: {
      isFetching: true,
    },
  }
}
function itemDataEventSuccess (data) {
  let currentImgae = getCurrentImage(data.enrichment.images)
  return {
    type: RECEIVE_ITEM_DATA,
    payload: {
      selectedItemData: data,
      currentImagesSelected: data.enrichment,
      isFetching: false,
      isItemDataAvailable: true,
      currentSwatch: null,
      currentImage: currentImgae,
    },
  }
}
export function toggleActionDrawer (isActionDrawerOpen, drawerAction) {
  return {
    type: TOGGLE_ACTION_DRAWER,
    payload: {
      isActionDrawerOpen: isActionDrawerOpen,
      drawerAction: drawerAction,
    },
  }
}
export function toggleConfirmation (isConfirmationOpen, confirmationPayload) {
  return {
    type: TOGGLE_CONFIRMATION,
    payload: {
      isConfirmationOpen: isConfirmationOpen,
      confirmationPayload: confirmationPayload,
    },
  }
}

export function toggleSaveFilterDialogue (isSaveFilterOpen) {
  return {
    type: TOGGLE_SAVE_FILTER_DIALOGUE,
    payload: {
      isSaveFilterOpen: isSaveFilterOpen,
    },
  }
}
export function selectRoutingTeam (currentRouteTeam) {
  return {
    type: SET_ROUTE_TEAM,
    payload: {
      currentRouteTeam: currentRouteTeam,
    },
  }
}

export function addPlannerNotes (plannerNotes) {
  return {
    type: ADD_PLANNER_NOTES,
    payload: {
      plannerNotes: plannerNotes,
    },
  }
}

export function requestDepartmentFilter () {
  return dispatch => {
    dispatch(dispatchDepartmentDataEvent())
    axios.get(`${envConfigs.api.pipelineDataApi}rule_attributes/department_class?key=${envConfigs.api.gatewayKey}`)
      .then(res => {
        const returnData = []
        _.each(res.data.relationship.values, function (department) {
          returnData.push({
            display: department.type + ' - ' + department.display,
            value: department.display,
            classes: department.relationship.values,
          })
        })
        dispatch(itemDepartmentEventSuccess({
          returnData,
        }))
      })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}
function dispatchDepartmentDataEvent () {
  return {
    type: REQUEST_DEPARTMENT,
    payload: {
      isFetching: true,
    },
  }
}
function itemDepartmentEventSuccess (data) {
  return {
    type: RECIEVE_DEPARTMENT,
    payload: {
      selectedDepartmentData: data,
      isFetching: false,
    },
  }
}

export function viewCopyDetailEvent (copyId) {
  return dispatch => {
    dispatch(requestCopyDetailEvent(false))
    return axios.get(`${envConfigs.api.longCopyApi}long_copy/${copyId}?key=${envConfigs.api.gatewayKey}`)
      .then(res => {
        dispatch(requestItemDataEvent(res.data.tcin))
        dispatch(viewCopyDetailEventSuccess({
          id: res.data.id,
          tcin: res.data.tcin,
          tcin_info: res.data.tcin_info,
          current_copy: res.data.current_copy,
          copy_history: res.data.copy_history,
          draft_copy: res.data.draft_copy,
          current_event: res.data.current_event,
          created_by: res.data.created_by,
          last_updated_by: res.data.last_updated_by,
          item_description: res.data.item_details,
        }, res.data.planner_note))
      })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}
export function displayErrorEvent (data) {
  return {
    type: DISPLAY_ERROR_EVENT,
    payload: {
      isErrorMessageShown: data.isErrorMessageShown,
      errorMessage: data.errorMessage,
    },
  }
}
export function handleErrorCopyEvent (data) {
  return {
    type: ERROR_COPY_DATA,
    payload: {
      isErrorMessageShown: data.isErrorMessageShown,
      errorMessage: data.errorMessage,
      isFetching: false,
    },
  }
}

export function changeFilterEvent (data) {
  return {
    type: CHANGE_FILTER_EVENT,
    payload: {
      selectedFilter: data.selectedFilter,
    },
  }
}
export function handleSelectCopy (data) {
  return {
    type: SELECT_COPY_EVENT,
    payload: {
      selectedCopy: data.selectedCopy,
    },
  }
}

export function selectFilterValueEvent (data) {
  return {
    type: SELECT_FILTER_VALUE_EVENT,
    payload: {
      filterValues: data.filterValues,
    },
  }
}

export function hideErrorEvent () {
  return {
    type: HIDE_ERROR_EVENT,
  }
}
export function removeFilterHandler (data, currentPage, defaultPageSize, emailId) {
  return dispatch => {
    var filter = dispatch(removeFilterEvent(data))
    dispatch(requestCopyData(filter.payload.selectedFilters, currentPage, defaultPageSize, emailId))
  }
}
export function removeFilterEvent (data) {
  var newFilterContainerShown = true
  var copyDataContainerShown = true
  var deepCopy = _.cloneDeep(data.selectedFilters)
  var currentFilter = deepCopy.filter((v) => v.filterValue === data.mainFilterValue)[0]
  currentFilter.selectedValues = currentFilter.selectedValues.filter((item) => item.value !== data.filterValue)
  deepCopy = deepCopy.filter((v) => v.selectedValues.length >= 1)
  if (currentFilter.selectedValues.length === 0 && deepCopy.length <= 0) {
    deepCopy = deepCopy.filter((v) => v.filterValue !== data.mainFilterValue)
    newFilterContainerShown = false
    copyDataContainerShown = false
  }
  return {
    type: REMOVE_FILTER_EVENT,
    payload: {
      newFilterContainerShown: newFilterContainerShown,
      copyDataContainerShown: copyDataContainerShown,
      selectedFilters: deepCopy,
    },
  }
}

function changePage (data) {
  return {
    type: CHANGE_CURRENT_PAGE,
    payload: {
      currentPage: data.currentPage,
    },
  }
}
export function handleChangePage (data, emailId) {
  return dispatch => {
    dispatch(changePage(data))
    dispatch(requestCopyData(data.selectedFilters, data.currentPage, data.defaultPageSize, emailId))
  }
}

function changePageSize (data) {
  return {
    type: CHANGE_DEFAULT_PAGE_SIZE,
    payload: {
      defaultPageSize: data.defaultPageSize,
    },
  }
}
export function changeDefaultPageSize (data, emailId) {
  return dispatch => {
    dispatch(changePageSize(data))
    dispatch(requestCopyData(data.selectedFilters, data.currentPage, data.defaultPageSize, emailId))
  }
}

/**
 * Data will have following attributes
 * NewFilterContainer
 * CopyDataContainer
 * @param {*} data
 */
export function buildFilterAction (data, pageNumber, pageSize, emailId) {
  var alreadySelectedFilters = data.selectedFilters
    .filter((item) => item.filterValue === data.selectedFilter.value)
  if (alreadySelectedFilters.length > 0) {
    // If filter already selected and different value selected.
    let isDuplicateValueFound = false
    if (Array.isArray(data.selectedFilterValue)) {
      data.selectedFilterValue.forEach(item => {
        isDuplicateValueFound = (alreadySelectedFilters[0]
          .selectedValues
          .filter((val) => val.value === item.value)
          .length === 0)
      })
    } else {
      isDuplicateValueFound = (alreadySelectedFilters[0]
        .selectedValues
        .filter((val) => val.value === data.selectedFilterValue.value)
        .length === 0)
    }
    if (isDuplicateValueFound) {
      return dispatch => {
        dispatch(changePage({ currentPage: 0 })) // Reset Current Page to first page
        var filter = dispatch(handleAlreadySelectedFilter(data))
        dispatch(requestCopyData(filter.payload.selectedFilters, 0, pageSize, emailId))
      }
    } else {
      return displayErrorEvent(
        {
          isErrorMessageShown: true,
          errorMessage: 'You have attempted to add duplicate filters.',
        },
      )
    }
  } else {
    return dispatch => {
      dispatch(changePage({ currentPage: 0 })) // Reset Current Page to first page
      var filter = dispatch(handleNewFilter(data))
      dispatch(requestCopyData(filter.payload.selectedFilters, 0, pageSize, emailId))
    }
  }
}

function handleAlreadySelectedFilter (data) {
  var deepCopy = _.cloneDeep(data.selectedFilters)
  let selectedVaules = []
  if (Array.isArray(data.selectedFilterValue)) {
    data.selectedFilterValue.forEach(element => {
      selectedVaules.push(element)
    })
  } else {
    selectedVaules.push({
      display: data.selectedFilterValue.display,
      value: data.selectedFilterValue.value,
    })
  }
  let oldSelectedValue = deepCopy.filter((v) => v.filterValue === data.selectedFilter.value)[0].selectedValues
  selectedVaules.forEach(item => {
    oldSelectedValue.push(item)
  })
  deepCopy.filter((v) => v.filterValue === data.selectedFilter.value)[0].selectedValues.concat(selectedVaules)
  return {
    type: BUILD_FILTER_EVENT,
    payload: {
      newFilterContainerShown: true,
      copyDataContainerShown: true,
      selectedFilters: deepCopy,
    },
  }
}

function handleNewFilter (data) {
  let selectedVaules = []
  if (Array.isArray(data.selectedFilterValue)) {
    data.selectedFilterValue.forEach(element => {
      selectedVaules.push(element)
    })
  } else {
    selectedVaules.push({
      display: data.selectedFilterValue.display,
      value: data.selectedFilterValue.value,
    })
  }
  var newSelectedFilters = [{
    filterValue: data.selectedFilter.value,
    filterDisplay: data.selectedFilter.display,
    selectedValues: selectedVaules,
  }]
  return {
    type: BUILD_FILTER_EVENT,
    payload: {
      newFilterContainerShown: true,
      copyDataContainerShown: true,
      selectedFilters: data.selectedFilters.concat(newSelectedFilters),
    },
  }
}
/**
 * Requesting copy data
 * @param {*} data
 */
export function requestCopyData (data, pageNumber, pageSize, emailId) {
  var queryParam = ''
  data.map((item) => {
    item.selectedValues.map((sv) => {
      queryParam = queryParam + item.filterValue + '=' + sv.value + '&'
    })
  })
  if (data === undefined || data.length === 0) {
    return clearCopyDataEvent()
  }
  return dispatch => {
    dispatch(getStickerCount(data))
    dispatch(dispatchRequestCopyDataEvent(data, pageNumber, pageSize, emailId))
    return axios.get(`${envConfigs.api.longCopyApi}long_copy/search/page?${queryParam}page_number=${pageNumber}&page_size=${pageSize}&emailId=${emailId}&key=${envConfigs.api.gatewayKey}`)
      .then(res => {
        dispatch(successRequestDataEvent(data, res.data.content.map(d => {
          var item = {
            id: d.id,
            tcin: d.tcin,
            tcin_info: d.tcin_info,
            copy: d.copy,
            current_event: d.current_event,
            copy_due_date: d.copy_due_date,
            assigned_to: d.assigned_to,
            created_by: d.created_by,
            planner_note: d.planner_note,
          }
          return item
        }), res.data.totalPages, res.data.totalElements))
      })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}
function clearCopyDataEvent () {
  return {
    type: CLEAR_COPY_DATA_EVENT,
  }
}

function successRequestDataEvent (data, json, totalPages, totalElements) {
  return {
    type: RECEIVE_COPY_DATA,
    payload: {
      isFetching: false,
      copyData: json,
      totalPages: totalPages,
      totalElements: totalElements,
    },
  }
}
function dispatchRequestCopyDataEvent (data) {
  var newCopyData = _.cloneDeep(data)
  newCopyData.splice(0, newCopyData.length)
  return {
    type: REQUEST_COPY_DATA,
    payload: {
      isFetching: true,
      copyData: newCopyData,
      selectedCopy: [],
    },
  }
}
/**
 * This method confirmed route teams
 * @param {*} routeTeam New assigned Route Team
 * @param {*} confirmedBy Confirmed By
 * @param {*} trackingIds Tracking Ids
 */
export function setRoutingTeamEvent (routeTeam, trackingIds, confirmedBy) {
  return dispatch => {
    dispatch(setRouteTeamEventRequest())
    axios.put(`${envConfigs.api.longCopyApi}long_copy/confirm_routing?confirmed_by=${confirmedBy}&route_team=${routeTeam}&tracking_ids=${trackingIds}&key=${envConfigs.api.gatewayKey}`)
      .then(res => {
        dispatch(setRouteTeamEventSuccess('Routed Successfully'))
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: 'Routed successfully',
            isFetching: false,
          },
        ))
      })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}
function setRouteTeamEventRequest () {
  return {
    type: REQUEST_SET_ROUTE_TEAM,
    payload: {
      isFetching: true,
    },
  }
}
function setRouteTeamEventSuccess (message) {
  return {
    type: SUCCESS_SET_ROUTE_TEAM,
    payload: {
      isFetching: false,
      successMessage: message,
    },
  }
}
/**
 *
 * @param {*} note : Notes from planner
 * @param {*} trackingIds : Tracking ids
 * @param {*} createdBy : Created by
 */
export function setPlannerNotesEvent (note, trackingIds, createdBy) {
  return dispatch => {
    dispatch(setPlannerNotesEventRequest())
    axios.put(`${envConfigs.api.longCopyApi}long_copy/planner_notes?note=${note}&created_by=${createdBy}&tracking_ids=${trackingIds}&key=${envConfigs.api.gatewayKey}`)
      .then(res => {
        dispatch(setPlannerNotesEventSuccess('Notes save successfully.'))
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: 'Notes saved successfully',
            isFetching: false,
          },
        ))
      })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

export function setPlannerNotesEditPageEvent (note, trackingIds, createdBy) {
  return dispatch => {
    dispatch(setPlannerNotesEventRequest())
    axios.put(`${envConfigs.api.longCopyApi}long_copy/planner_notes?note=${note}&created_by=${createdBy}&tracking_ids=${trackingIds}&key=${envConfigs.api.gatewayKey}`)
      .then(res => {
        dispatch(setPlannerNotesEventSuccessEditPage(note))
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: 'Notes saved successfully',
            isFetching: false,
          },
        ))
      })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

function setPlannerNotesEventRequest () {
  return {
    type: REQUEST_SAVE_PLANNER_NOTES,
    payload: {
      isFetching: true,
    },
  }
}
function setPlannerNotesEventSuccess (message) {
  return {
    type: SUCCESS_SAVE_PLANNER_NOTES,
    payload: {
      isFetching: false,
      successMessage: message,
    },
  }
}
function setPlannerNotesEventSuccessEditPage (note) {
  return {
    type: SUCCESS_SAVE_PLANNER_NOTES_EDIT_PAGE,
    payload: {
      isFetching: false,
      plannerNotes: note,
    },
  }
}
export function clearSuccessMessage () {
  return {
    type: CLEAR_SUCCESS_MESSAGE,
    payload: {
      successMessage: '',
    },
  }
}

export function fetchSavedFiltersEvent (userId) {
  return dispatch => {
    dispatch(fetchSavedFilterEventRequest())
    axios.get(`${envConfigs.api.longCopyApi}long_copy/saved_filters?user_id=${userId}&key=${envConfigs.api.gatewayKey}`)
      .then(res => {
        dispatch(fetchSavedFilterEventSuccess(res.data.map(d => {
          return {
            filter_name: d.filter_name,
            id: d.id,
            user_id: d.user_id,
            filter_criteria: d.filter_criteria,
          }
        })))
      })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}
function fetchSavedFilterEventRequest () {
  return {
    type: REQUEST_SAVED_FILTER_DATA,
    payload: {
      isFetching: true,
    },
  }
}
function fetchSavedFilterEventSuccess (savedFilterData) {
  return {
    type: RECEIVE_SAVED_FILTER_DATA,
    payload: {
      isFetching: false,
      savedFilterData: savedFilterData,
    },
  }
}
/**
 * Save search filter
 */
export function saveFilterDataEvent (createFilterBody) {
  return dispatch => {
    dispatch(saveFilterData())
    axios.post(
      `${envConfigs.api.longCopyApi}long_copy/saved_filters?key=${envConfigs.api.gatewayKey}`,
      createFilterBody
    ).then(res => {
      dispatch(saveFilterDataSuccess())
      dispatch(fetchSavedFiltersEvent(createFilterBody.user_id))
    })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}
function saveFilterData () {
  return {
    type: REQUEST_SAVE_FILTER_DATA,
    payload: {
      isFetching: true,
    },
  }
}

function saveFilterDataSuccess () {
  return {
    type: SUCCESS_SAVE_FILTER_DATA,
    payload: {
      isFetching: false,
      isSaveFilterOpen: false,
    },
  }
}

export function loadExistingFilter (selectedFilters) {
  return {
    type: BUILD_FILTER_EVENT,
    payload: {
      newFilterContainerShown: true,
      copyDataContainerShown: true,
      selectedFilters: selectedFilters,
    },
  }
}

export function removeSavedFilter (id, userId) {
  return dispatch => {
    axios.delete(`${envConfigs.api.longCopyApi}long_copy/saved_filters/${id}?key=${envConfigs.api.gatewayKey}`)
      .then(res => {
        dispatch(fetchSavedFiltersEvent(userId))
        dispatch(toggleConfirmation(false))
      })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

export function getCountData (eventType, isSelected, dataCalled) {
  return dispatch => {
    dispatch(updateDataCalled(eventType, dataCalled))
    axios.get(`${envConfigs.api.longCopyApi}copy/v1/trackings/count_by_status?event_status=Complete&event_type=${eventType}&key=${envConfigs.api.gatewayKey}`)
      .then(res => {
        dispatch(countSuccessEvent(eventType, res.data, isSelected, dataCalled))
      })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

export function getStickerCount (selectedFilters) {
  var queryParam = ''
  selectedFilters.map((item) => {
    item.selectedValues.map((sv) => {
      queryParam = queryParam + item.filterValue + '=' + sv.value + '&'
    })
  })
  return dispatch => {
    dispatch(stickerCall())
    axios.get(`${envConfigs.api.longCopyApi}long_copy/search/status_count_by_criteria?${queryParam}&key=${envConfigs.api.gatewayKey}`)
      .then(res => {
        var arr = Object.keys(res.data.terms_aggregations.sticker_count_aggregation.values).map(function (key) {
          return { [key]: res.data.terms_aggregations.sticker_count_aggregation.values[key] }
        })
        dispatch(stickerCountSuccess(arr))
      })
      .catch((error, data) => {
        dispatch(handleErrorCopyEvent(
          {
            isErrorMessageShown: true,
            errorMessage: error.message,
            isFetching: false,
          },
        ))
      })
  }
}

function stickerCall () {
  return {
    type: STICKER_DATA_CALLED,
    payload: {
      count: -1,
    },
  }
}

function stickerCountSuccess (dataCount) {
  return {
    type: STICKER_DATA_SUCCESS,
    payload: {
      dataCount: dataCount,
    },
  }
}

function updateDataCalled (eventType, dataCalled) {
  return {
    type: UPDATE_DATA_CALLED,
    payload: {
      eventType: eventType,
      dataCalled: dataCalled,
    },
  }
}

function countSuccessEvent (eventType, count, isSelected, dataCalled) {
  return {
    type: RECEIVE_COUNT_DATA,
    payload: {
      eventType: eventType,
      count: count,
      isSelected: isSelected,
      dataCalled: dataCalled,
    },
  }
}

export function updateFilterSelected (eventType, isSelected, dataCalled) {
  return {
    type: UPDATE_SELECTED,
    payload: {
      eventType: eventType,
      isSelected: isSelected,
      dataCalled: dataCalled,
    },
  }
}
export function updateFilterSelectedSticker (eventType, isSelected, dataCalled) {
  return {
    type: UPDATE_SELECTED_STICKER,
    payload: {
      eventType: eventType,
      isSelected: isSelected,
    },
  }
}

export function clearSelectedSticker () {
  return {
    type: CLEAR_SELECTED_STICKER,
    payload: {
      isSelected: false,
    },
  }
}
function getCurrentImage (images) {
  let currentImgae = ''
  if (images != null && images) {
    currentImgae = images
      ? images.primary_image
        ? images.primary_image : images.alternate_images.length
          ? images.alternate_images : null : null
  }
  return currentImgae
}
export function updateCurrentImages (item, swatchImage) {
  return {
    type: UPDATE_CURRENT_IMAGES,
    payload: {
      currentImagesSelected: item,
      currentSwatch: swatchImage,
      currentImage: getCurrentImage(item.images),
    },
  }
}

export function updateCurrentSelectedImage (item) {
  return {
    type: UPDATE_CURRENT_IMAGE_SELECTED,
    payload: {
      currentImage: item,
    },
  }
}

export function clearFilters () {
  return {
    type: REMOVE_FILTER_EVENT,
    payload: {
      newFilterContainerShown: false,
      copyDataContainerShown: false,
      selectedFilters: [],
    },
  }
}

export function enterEvent (eventType) {
  return {
    type: ENTERED_EVENT,
    payload: {
      enteredEvent: eventType,
    },
  }
}

export function downloadSelectedTcinsCopyEvent (queryParamter) {
  harbinger.trackEvent('s7g49u', [{ key: 'Item Count', value: queryParamter.split(',').length }, { key: 'Button Pressed', value: 'Download Selected' }])
  return dispatch => {
    dispatch(downloadStartCopy(queryParamter))
    axios.post(
      `${envConfigs.api.longCopyApi}long_copy/download_copy_and_feature_bullets?key=${envConfigs.api.gatewayKey}`,
      `[${queryParamter}]`,
      {
        responseType: 'arraybuffer',
        headers:
        {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
      fileDownload(res.data, `copy_and_feature_bullets_${(new Date()).toISOString()}.xlsx`)
      dispatch(downloadFinishCopy(queryParamter))
    }).catch((error, data) => {
      dispatch(handleErrorCopyEvent(
        {
          isErrorMessageShown: true,
          errorMessage: error.message,
          isFetching: false,
        },
      ))
    })
  }
}
export function downloadAllToExcel (selectedFilters, totalElements) {
  var queryParam = ''
  selectedFilters.map((item) => {
    item.selectedValues.map((sv) => {
      queryParam = queryParam + item.filterValue + '=' + sv.value + '&'
    })
  })
  harbinger.trackEvent('s7g49u', [{ key: 'Item Count', value: totalElements }, { key: 'Button Pressed', value: 'Download All' }])
  return dispatch => {
    dispatch(downloadStartCopy(queryParam))
    axios.post(
      `${envConfigs.api.longCopyApi}long_copy/download_copy_and_feature_bullets_by_criteria?${queryParam}&key=${envConfigs.api.gatewayKey}`,
      `[${queryParam}]`,
      {
        responseType: 'arraybuffer',
        headers:
        {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
      fileDownload(res.data, `copy_and_feature_bullets_${(new Date()).toISOString()}.xlsx`)
      dispatch(downloadFinishCopy(queryParam))
    }).catch((error, data) => {
      dispatch(handleErrorCopyEvent(
        {
          isErrorMessageShown: true,
          errorMessage: error.message,
          isFetching: false,
        },
      ))
    })
  }
}
export function downloadStartCopy (downloadedTcins) {
  return {
    type: DOWNLOAD_START,
    payload: {
      downloadedTcins: downloadedTcins,
    },
  }
}

export function downloadFinishCopy (downloadedTcins) {
  return {
    type: DOWNLOAD_FINISH,
    payload: {
      downloadedTcins: downloadedTcins,
    },
  }
}

export function deleteBulletAndCopy (tcinList, showSelectedDeleteType, editSection = false) {
  return {
    type: DELETE_COPY_BULLET_CLICKED,
    payload: {
      tcinList: tcinList,
      showSelectedDeleteType: showSelectedDeleteType,
      editSection: editSection,
    },
  }
}

export function cancelCopyBulletDelete () {
  return {
    type: CANCEL_COPY_BULLET_CLICKED,
    payload: {
      tcinList: [],
      confirmationDelete: false,
      selectDeleteType: 'COPY_AND_FEATURE_BULLETS',
      showSelectedDeleteType: false,
      editSection: false,
      suceesfullDeleted: false,
    },
  }
}

export function handleValueDeleteOption (value) {
  return {
    type: DELETE_OPTION_VALUE,
    payload: {
      selectDeleteType: value,
    },
  }
}
export function selectTypeCopyBulletDelete (confirmationDelete, selectDeleteType, showSelectedDeleteType) {
  return {
    type: CONFIRMATION_DELETE,
    payload: {
      confirmationDelete: confirmationDelete,
      selectDeleteType: selectDeleteType,
      showSelectedDeleteType: showSelectedDeleteType,
    },
  }
}

export function confirmDeleteSelection (deleteData, email) {
  var queryParam = ''
  deleteData.tcinList.map((item) => {
    queryParam = queryParam + 'tcins' + '=' + item + '&'
  })
  return dispatch => {
    axios.delete(
      `${envConfigs.api.longCopyApi}long_copy/clear_copy_and_feature_bullets?deleted_by=${email}&scope=${deleteData.selectDeleteType}&${queryParam}&key=${envConfigs.api.gatewayKey}`
    ).then(res => {
      var data = {
        selectedCopy: [],
      }
      dispatch(handleErrorCopyEvent(
        {
          isErrorMessageShown: true,
          errorMessage: 'Deleted Data Successfully',
          isFetching: false,
        },
      ))
      if (deleteData.editSection) {
        dispatch(backTolistPage())
      }
      dispatch(cancelCopyBulletDelete())
      dispatch(handleSelectCopy(data))
    }).catch((error, data) => {
      dispatch(handleErrorCopyEvent(
        {
          isErrorMessageShown: true,
          errorMessage: error.message,
          isFetching: false,
        },
      ))
    })
  }
}

function backTolistPage () {
  return {
    type: DELETE_BACT_TO_LIST,
    payload: {
      suceesfullDeleted: true,
    },
  }
}

export function cancelQuickPublish () {
  return {
    type: CANCEL_QUICK_PUBLISH,
    payload: {
      quickEditConfirm: false,
    },
  }
}

export function quickEditPublishConfirm () {
  return {
    type: CANCEL_QUICK_PUBLISH,
    payload: {
      quickEditConfirm: true,
    },
  }
}

export function buildFilterExpand (value) {
  return {
    type: BUILD_FILTER_EXPAND,
    payload: {
      buildFilterExpansionPanel: value,
    },
  }
}
