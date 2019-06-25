import {
  ERROR_IMAGE_LABEL,
  RANDOM_IMAGE_GET_SUCCESS,
} from './actionType'
import axios from 'axios'
import envConfigs from '../../config/apiConfig'

export function dispatchRandomImageGetSuccess (data) {
  return {
    type: RANDOM_IMAGE_GET_SUCCESS,
    payload: {
      imageUrl: data.image_url,
      signature: data.signature,
      experimentName: data.experiment_name,
      userEmail: data.user_email,
    },
  }
}

export function getRandomImage (data) {
  return dispatch => {
    return axios.post(
      envConfigs.api.imageOSphereApi + 'image_labels/v1/image_to_label',
      {
        product_type_name: ['APPAREL'],
        product_subtype_name: ['TOPS', 'BOTTOMS'],
        user_email: data.userEmail,
        experiment_name: data.experimentName,
      }
    ).then(res => {
      dispatch(dispatchRandomImageGetSuccess(res.data))
    }).catch((error, data) => {
      dispatch(handleImageLabelErrorEvent(
        {
          isErrorMessageShown: true,
          errorMessage: error.message,
          isFetching: false,
        },
      ))
    })
  }
}

export function submitImageLabel (chosenLabelData) {
  return dispatch => {
    return axios.post(
      envConfigs.api.imageOSphereApi + 'image_labels/v1/save_label',
      {
        image_url: chosenLabelData.currentImageUrl,
        signature: chosenLabelData.currentImageSignature,
        experiment_name: chosenLabelData.experimentName,
        label_name: chosenLabelData.labelName,
        user_email: chosenLabelData.userEmail,
      }
    ).then(res => {}
    ).catch((error, data) => {
      dispatch(handleImageLabelErrorEvent(
        {
          isErrorMessageShown: true,
          errorMessage: error.message,
          isFetching: false,
        },
      ))
    })
  }
}

export function handleImageLabelErrorEvent (data) {
  return {
    type: ERROR_IMAGE_LABEL,
    payload: {
      isErrorMessageShown: data.isErrorMessageShown,
      errorMessage: data.errorMessage,
      isFetching: false,
    },
  }
}
