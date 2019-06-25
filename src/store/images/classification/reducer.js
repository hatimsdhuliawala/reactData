import {
  SET_TCIN_DATA,
  DISPLAY_ERROR_EVENT_CLASSIFIER,
  HIDE_ERROR_EVENT_CLASSIFIER,
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
import { DefaultState } from '../../../components/Images/Classification/Components/ClassificationData'

export default function imageClassifierReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case SET_TCIN_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        tcinList: payload.tcinList,
      }
      return newState
    }
    case DISPLAY_ERROR_EVENT_CLASSIFIER: {
      const { payload } = action
      const newState = {
        ...state,
        isErrorMessageShownClassification: payload.isErrorMessageShownClassification,
        errorMessageClassification: payload.errorMessageClassification,
      }
      return newState
    }
    case HIDE_ERROR_EVENT_CLASSIFIER: {
      const newState = {
        ...state,
        isErrorMessageShownClassification: false,
        errorMessageClassification: '',
      }
      return newState
    }
    case UPDATE_ACTIVE_STEP: {
      const { payload } = action
      const newState = {
        ...state,
        currentActiveStep: payload.currentActiveStep,
      }
      return newState
    }
    case REQUEST_TCIN_IMAGE: {
      const { payload } = action
      const newState = {
        ...state,
        imageListFetching: payload.imageListFetching,
      }
      return newState
    }
    case RECIEVE_TCIN_IMAGE: {
      const { payload } = action
      const newState = {
        ...state,
        imageListFetching: payload.imageListFetching,
        imageList: payload.imageList,
      }
      return newState
    }
    case IMAGE_SELECTED: {
      const { payload } = action
      const newState = {
        ...state,
        selectedImage: payload.selectedImage,
      }
      return newState
    }
    case TAG_DATA_SELECTION: {
      const { payload } = action
      const newState = {
        ...state,
        tagSelectedData: payload.tagSelectedData,
      }
      return newState
    }
    case REQUEST_SIMILAR_IMAGE: {
      const { payload } = action
      const newState = {
        ...state,
        similarImageFetching: payload.similarImageFetching,
      }
      return newState
    }
    case RECIEVE_SIMILAR_IMAGE: {
      const { payload } = action
      const newState = {
        ...state,
        similarImageFetching: payload.similarImageFetching,
        similarImageData: payload.similarImageData,
      }
      return newState
    }
    case RECIEVE_SIMILAR_IMAGE1: {
      const { payload } = action
      const newState = {
        ...state,
        similarImageFetching: payload.similarImageFetching,
        similarImageData1: payload.similarImageData1,
      }
      return newState
    }
    case NEXT_IMAGE: {
      const { payload } = action
      const newState = {
        ...state,
        currentSimilarImageCount: payload.currentSimilarImageCount,
      }
      return newState
    }
    case MAX_SIMILAR_IMAGE_COUNT: {
      const { payload } = action
      const newState = {
        ...state,
        maxSimilarImageCount: payload.maxSimilarImageCount,
      }
      return newState
    }
    case REQUEST_TAG_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        tagDataFetching: payload.tagDataFetching,
      }
      return newState
    }
    case RECIEVE_TAG_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        tagDataFetching: payload.tagDataFetching,
        tagData: payload.tagData,
      }
      return newState
    }
    default:
      return state
  }
}
