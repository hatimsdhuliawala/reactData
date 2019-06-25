import {
  SEARCH_AND_MANAGE_FILES,
} from './actionType'

export function searchAndManageFiles (files) {
  return {
    type: SEARCH_AND_MANAGE_FILES,
    payload: {
      files: files,
    },
  }
}
