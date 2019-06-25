import auth from './auth'
import { combineReducers } from 'redux'
import layout from '../store/layout/reducer'
import notification from './notification/reducer'
import { reducer as formReducer } from 'redux-form'
import longCopy from './longCopy/reducer'
import bulkUpload from './bulkUpload/reducer'
import bulkUploadHistory from './bulkUploadHistory/reducer'
import dashboard from './dashboard/reducer'
import sizeChartEdit from './sizeChartEdit/reducer'
import rulesSelection from './rules/selection/reducer'
import rulesBuilder from './rules/builder/reducer'
import upload from './upload/reducer'
import images from './images/reducer'
import videos from './videos/reducer'
import imageLabel from './imageLabel/reducer'
import errorMessages from './errorMessage/reducer'
import imageReview from './images/Review/reducer'
import imageReviewHistory from './images/ReviewHistory/reducer'
import searchAndManage from './images/SearchAndManage/reducer'
import videoReview from './videos/Review/reducer'
import badges from './badges/reducer'
import signInPrompt from './signInPrompt/reducer'
import stageCorona from './stageCorona/reducer'
import classification from './images/classification/reducer'
import offerGeneration from './offerGeneration/reducer'
import tagTraining from './images/tagTraining/reducer'

const rootReducer = combineReducers({
  auth,
  layout,
  notification,
  form: formReducer,
  longCopy,
  bulkUpload,
  dashboard,
  sizeChartEdit,
  rulesSelection,
  rulesBuilder,
  upload,
  images,
  videos,
  imageLabel,
  errorMessages,
  bulkUploadHistory,
  imageReview,
  imageReviewHistory,
  videoReview,
  searchAndManage,
  badges,
  signInPrompt,
  stageCorona,
  classification,
  offerGeneration,
  tagTraining,
})

export default rootReducer
