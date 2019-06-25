import {
  ADD_REVIEW_FILES,
} from './actionType'
import { DefaultState } from '../../../components/Images/Review/Components/ImagesReviewData'

export default function imageReviewReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case ADD_REVIEW_FILES: {
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
