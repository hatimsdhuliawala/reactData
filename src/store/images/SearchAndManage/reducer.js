import {
  SEARCH_AND_MANAGE_FILES,
} from './actionType'
import { DefaultState } from '../../../components/Images/SearchAndManage/Components/SearchAndManageData'

export default function imageReviewHistoryReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case SEARCH_AND_MANAGE_FILES: {
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
