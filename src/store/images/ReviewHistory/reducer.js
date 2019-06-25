import {
  ADD_REVIEW_HISTORY_FILES,
} from './actionType'
import { DefaultState } from '../../../components/Images/ReviewHistory/Components/ImagesReviewHistoryData'

export default function imageReviewHistoryReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case ADD_REVIEW_HISTORY_FILES: {
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
