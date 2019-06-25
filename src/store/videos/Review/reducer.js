import {
  ADD_REVIEW_FILES_VIDEO,
} from './actionType'
import { DefaultState } from '../../../components/Videos/Review/Components/VideosReviewData'

export default function videoReviewReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case ADD_REVIEW_FILES_VIDEO: {
      const { payload } = action
      const newState = {
        ...state,
        files: payload.files,
      }
      return newState
    }
    default:
      return state
  }
}
