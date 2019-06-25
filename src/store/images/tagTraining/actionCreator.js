import {
  SET_IMAGE_URLS,
  SET_IMAGE_FETCHING,
  SET_TAGS_LIST,
  SET_TRAINING_IN_PROGRESS,
  HIDE_NOTIFICATION_TRAINING,
  DISPLAY_NOTIFICATION_TRAINING,
} from './actionType'
import axios from 'axios'
import envConfigs from '../../../config/apiConfig'

function setImageUrlsFetching (status) {
  return {
    type: SET_IMAGE_FETCHING,
    payload: {
      imageUrlsFetching: status,
    },
  }
}

function setImageUrls (imageUrls, group, label) {
  return {
    type: SET_IMAGE_URLS,
    payload: {
      urls: imageUrls,
      group: group,
      label: label,
    },
  }
}

function setTagsList (tagsList) {
  return {
    type: SET_TAGS_LIST,
    payload: {
      tags: tagsList,
    },
  }
}

export function hideNotificationTraining () {
  return {
    type: HIDE_NOTIFICATION_TRAINING,
  }
}

export function displayNotificationTraining (notification, showNotification) {
  return {
    type: DISPLAY_NOTIFICATION_TRAINING,
    payload: {
      notificationMessageTraining: notification,
      isNotificationMessageShownTraining: showNotification,
    },
  }
}

export function getImageUrlsForModelLabel (model, label) {
  return dispatch => {
    dispatch(setImageUrlsFetching(true))
    return axios.get(`${envConfigs.api.classificationApi}classify/v1/search/image_list?model=${model}&label=${label}`)
      .then(
        res => {
          dispatch(setImageUrls(res.data, model, label))
          dispatch(setImageUrlsFetching(false))
        }
      )
      .catch(
        error => {
          dispatch(displayNotificationTraining(`Error While Fetching Images: ${error.response.status}`, true))
          dispatch(setImageUrlsFetching(false))
        }
      )
  }
}

function parseModels (modelsFromApi) {
  let tagsList = []
  modelsFromApi.forEach(function (model) {
    let labels = []
    model.labels.forEach(function (l) {
      labels.push(
        {
          label: l.label,
          isEligibleForTraining: l.eligible_for_training,
        })
    })

    tagsList.push({
      tag: model.model,
      id: model.id,
      isEligibleForTraining: model.eligible_for_training,
      isTrainingInProgress: model.training_in_progress,
      labels: labels,
    })
  })
  return tagsList
}

export function getTagsListFromApi () {
  return dispatch => {
    return axios.get(`${envConfigs.api.classificationApi}classify/v1/search/models`)
      .then(
        res => {
          let tagsList = parseModels(res.data)
          dispatch(setTagsList(tagsList))
        }
      )
      .catch(
        () => {
          dispatch(displayNotificationTraining('Error Getting Tags For Review', true))
        }
      )
  }
}

export function initiateModelTraining (id, userEmail) {
  return dispatch => {
    dispatch(setTrainingRequesting(true))
    dispatch(displayNotificationTraining('Initiating Model Training Request', true))
    return axios.post(`${envConfigs.api.classificationApi}classify/v1/training/initiate_training?classifyTrainingDataId=${id}&emailId=${userEmail}`)
      .then(
        () => {
          dispatch(getTagsListFromApi())
          dispatch(displayNotificationTraining('Model Training Request Complete', true))
        }
      )
      .catch(
        () => {
          dispatch(displayNotificationTraining('Error While Initiating Model Training', true))
        }
      )
  }
}

function setTrainingRequesting (status) {
  return {
    type: SET_TRAINING_IN_PROGRESS,
    payload: {
      isTrainingInProgress: status,
    },
  }
}
