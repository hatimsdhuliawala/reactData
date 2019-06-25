import * as actionTypes from './actionTypes'

export function setRuleName (name, modified = true) {
  return dispatch => {
    return dispatch({
      type: actionTypes.RULES_NAME_CHANGE,
      name,
      modified,
    })
  }
}

export function setRulePriority (priority) {
  return dispatch => {
    return dispatch({
      type: actionTypes.RULES_PRIORITY_CHANGE,
      priority,
    })
  }
}

export function resetState () {
  return dispatch => {
    return dispatch({
      type: actionTypes.RULE_STATE_RESET,
    })
  }
}

export function sendWarning (warning) {
  return dispatch => {
    dispatch({
      type: actionTypes.RULES_BUILDER_WARNING,
      warning,
    })
  }
}

export function setActiveStep (index) {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_ACTIVE_STEP,
      index,
    })
  }
}

export function completeStep (index) {
  return dispatch => {
    dispatch({
      type: actionTypes.RULES_COMPLETE_STEP,
      index,
    })
  }
}

export function changePage (page) {
  return dispatch => {
    dispatch({
      type: actionTypes.RULES_TABLE_PAGE_CHANGE,
      page,
    })
  }
}
