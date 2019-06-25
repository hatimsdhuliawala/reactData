import {
  ADD_REVIEW_HISTORY_FILES,
} from './actionType'

export function addReviewHistoryFiles (files) {
  return {
    type: ADD_REVIEW_HISTORY_FILES,
    payload: {
      files: files,
    },
  }
}
