import {
  ADD_REVIEW_FILES_VIDEO,
} from './actionType'

export function addedReviewFilesVideo (files) {
  return {
    type: ADD_REVIEW_FILES_VIDEO,
    payload: {
      files: files,
    },
  }
}
