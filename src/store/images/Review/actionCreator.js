import {
  ADD_REVIEW_FILES,
} from './actionType'

export function addReviewFiles (files) {
  return {
    type: ADD_REVIEW_FILES,
    payload: {
      files: files,
    },
  }
}
