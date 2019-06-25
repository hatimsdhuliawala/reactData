import {
  SET_TCIN_DATA,
  HIDE_ERROR_EVENT_CLASSIFIER,
  DISPLAY_ERROR_EVENT_CLASSIFIER,
  UPDATE_ACTIVE_STEP,
  REQUEST_TCIN_IMAGE,
  RECIEVE_TCIN_IMAGE,
  IMAGE_SELECTED,
  TAG_DATA_SELECTION,
  REQUEST_SIMILAR_IMAGE,
  RECIEVE_SIMILAR_IMAGE,
  RECIEVE_SIMILAR_IMAGE1,
  NEXT_IMAGE,
  MAX_SIMILAR_IMAGE_COUNT,
  REQUEST_TAG_DATA,
  RECIEVE_TAG_DATA,
} from './actionType'
import axios from 'axios'
import envConfigs from '../../../config/apiConfig'
import { reset } from 'redux-form'
import _ from 'lodash'

export function setTcinData (tcinList) {
  return {
    type: SET_TCIN_DATA,
    payload: {
      tcinList: [tcinList],
    },
  }
}

function clearTcinData () {
  return {
    type: SET_TCIN_DATA,
    payload: {
      tcinList: [],
    },
  }
}

export function hideErrorEventClassification (tcinList) {
  return {
    type: HIDE_ERROR_EVENT_CLASSIFIER,
  }
}

export function getImageData (tcinData) {
  return dispatch => {
    dispatch(changeAtiveStep(1))
    dispatch(requestImageData())
    return axios.get(`${envConfigs.api.classifierApi}assets/v1/content/findByTcin?tcin=${tcinData}`)
      .then(res => {
        let imageData = []
        res.data.map(item => {
          if (item.view_type.toLowerCase() !== 'swatch') {
            imageData.push(item)
          }
        })
        dispatch(recieveImageData(imageData))
        dispatch(setTcinData(tcinData))
      }).catch(() => {
        dispatch(displayErrorEventClassifier('Service not availabe please try again later', true))
        dispatch(startOver())
        dispatch(reset())
      })
  }
}

export function resetForm () {
  return dispatch => {
    dispatch(reset('classificationForm'))
  }
}

export function displayErrorEventClassifier (errorMessage, showMessage) {
  return {
    type: DISPLAY_ERROR_EVENT_CLASSIFIER,
    payload: {
      isErrorMessageShownClassification: showMessage,
      errorMessageClassification: errorMessage,
    },
  }
}

function changeAtiveStep (value) {
  return {
    type: UPDATE_ACTIVE_STEP,
    payload: {
      currentActiveStep: value,
    },
  }
}

export function startOver () {
  return dispatch => {
    dispatch(reset('classificationForm'))
    dispatch(changeAtiveStep(0))
    dispatch(selectImage(null))
    dispatch(recieveImageData([]))
    dispatch(recieveSimilarItem([]))
    dispatch(nextImage(-1))
    dispatch(tagDataSelection([]))
    dispatch(clearTcinData())
    dispatch(maxSimilarCount(0))
  }
}

function requestImageData () {
  return {
    type: REQUEST_TCIN_IMAGE,
    payload: {
      imageListFetching: true,
    },
  }
}

function recieveImageData (imgData) {
  return {
    type: RECIEVE_TCIN_IMAGE,
    payload: {
      imageList: imgData,
      imageListFetching: false,
    },
  }
}

export function selectImage (item) {
  return {
    type: IMAGE_SELECTED,
    payload: {
      selectedImage: item,
    },
  }
}

export function imageSelectedContinue () {
  return dispatch => {
    dispatch(changeAtiveStep(2))
  }
}

export function tagSelectedContinue () {
  return dispatch => {
    dispatch(changeAtiveStep(3))
  }
}

export function backToSelectImage () {
  return dispatch => {
    dispatch(changeAtiveStep(1))
  }
}

export function backToEnterTcin () {
  return dispatch => {
    dispatch(changeAtiveStep(0))
  }
}

export function tagDataSelection (data) {
  return {
    type: TAG_DATA_SELECTION,
    payload: {
      tagSelectedData: data,
    },
  }
}

export function getSimilarItems (selectedImage, emailId) {
  return dispatch => {
    let requestBody = {
      'tcin': selectedImage.tcin,
      'search_size': 2,
      'results_size': 75,
    }
    dispatch(requestSimilarItem())
    dispatch(test1(selectedImage, emailId))
    return axios.post(``, requestBody)
      .then(res => {
        let searchResult = []
        res.data.search_results.map(item => {
          if (!_.includes(item.image_uri.toLowerCase(), '_alt')) {
            searchResult.push(item)
          }
        })
        dispatch(recieveSimilarItem(searchResult))
        dispatch(maxSimilarCount(searchResult.length))
      }).catch(() => {
        dispatch(displayErrorEventClassifier('Service not availabe please try again later', true))
        dispatch(startOver())
        dispatch(reset())
      })
  }
}

function test1 (selectedImage, emailId) {
  return dispatch => {
    dispatch(requestSimilarItem())
    return axios.get(`${envConfigs.api.classificationApi}classify/v1/search/additional_images?emailId=${emailId}&imageUrl=${selectedImage.publish_url}`)
      .then(res => {
        dispatch(recieveSimilarItem1(res.data))
        // dispatch(maxSimilarCount(searchResult.length))
      }).catch(() => {
        dispatch(displayErrorEventClassifier('Service not availabe please try again later', true))
      })
  }
}

function requestSimilarItem () {
  return {
    type: REQUEST_SIMILAR_IMAGE,
    payload: {
      similarImageFetching: true,
    },
  }
}

function recieveSimilarItem (data) {
  return {
    type: RECIEVE_SIMILAR_IMAGE,
    payload: {
      similarImageFetching: false,
      similarImageData: data,
    },
  }
}

function recieveSimilarItem1 (data) {
  return {
    type: RECIEVE_SIMILAR_IMAGE1,
    payload: {
      similarImageFetching: false,
      similarImageData1: data,
    },
  }
}

export function nextImage (currentImage) {
  return {
    type: NEXT_IMAGE,
    payload: {
      currentSimilarImageCount: (currentImage + 1),
    },
  }
}

export function skipCurrentImage (currentSimilarImageCount, maxSimilarImage) {
  let currentImageCount = currentSimilarImageCount + 1
  return dispatch => {
    if (maxSimilarImage > currentImageCount) {
      dispatch(nextImage(currentSimilarImageCount))
    } else {
      dispatch(displayErrorEventClassifier('There are no more image for this TCIN. Please start Over', true))
    }
  }
}

export function sendSimilarItemValidation (email, vote, currentImage, maxSimilarImage) {
  let currentImageCount = currentImage + 1
  return dispatch => {
    // dispatch(requestSimilarItem())
    // return axios.post(``, { 'tcin': tcin[0], 'search_size': 2, 'results_size': 75 })
    //   .then(res => {
    //     dispatch(recieveSimilarItem(res.data.search_results))
    //   }).catch(err => {
    //     console.log(err)
    //     dispatch(displayErrorEventClassifier('err.response', true))
    //     dispatch(startOver())
    //     dispatch(reset())
    //   })
    if (maxSimilarImage > currentImageCount) {
      dispatch(nextImage(currentImage))
    } else {
      dispatch(displayErrorEventClassifier('There are no more image for this TCIN. Please start Over', true))
    }
  }
}

function maxSimilarCount (count) {
  return {
    type: MAX_SIMILAR_IMAGE_COUNT,
    payload: {
      maxSimilarImageCount: count,
    },
  }
}

export function getTagData (selectedImage) {
  // let publishUrl = selectedImage.publish_url
  return dispatch => {
    dispatch(requestTagData())
    return axios.get(`${envConfigs.api.classificationApi}classify/v1/tags/`)
      .then(res => {
        dispatch(recieveTagData(res.data, false))
      }).catch(() => {
        dispatch(displayErrorEventClassifier('Service not availabe please try again later', true))
        dispatch(requestTagData(false))
      })
  }
}

function requestTagData (fetching = true) {
  return {
    type: REQUEST_TAG_DATA,
    payload: {
      tagDataFetching: fetching,
    },
  }
}

function recieveTagData (tagData, fetching) {
  return {
    type: RECIEVE_TAG_DATA,
    payload: {
      tagDataFetching: fetching,
      tagData: tagData,
    },
  }
}

export function backToSelectTags () {
  return dispatch => {
    dispatch(changeAtiveStep(2))
    dispatch(tagDataSelection([]))
  }
}
