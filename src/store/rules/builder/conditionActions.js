import {
  RULES_RELATION_CHANGE,
  RULES_CONDITION_CHANGE,
  RULES_ADDITION_CONDITION_SELECTION,
  RULES_ADDITION_CONDITION_RESET,
  RULES_ADDITION_CONDITION_INPUT_CHANGE,
  RULES_ADDITION_CONDITION_EXTRA_CHANGE,
  RULES_CONDITION_REMOVE,
  RULES_CONDITION_ATTRIBUTE_REMOVE,
  RULES_TABLE_FILTER_CHANGE,
  RULES_CONDITION_EDIT,
  RULES_CONDITION_MANUALLY_ADD,
  RULES_ADDITION_CONDITION_OPERATOR_CHANGE,
} from './actionTypes'

export function setRelationType (codes) {
  return dispatch => {
    dispatch({
      type: RULES_RELATION_CHANGE,
      index: codes,
    })
  }
}

// allows the developer to mock up the condition to avoid
// needing the indexes of the data points being added to the condition
// USE WITH CAUTION AND ONLY IF YOU KNOW WHAT YOU ARE DOING!!!!!!!!
export function manuallyAddCondition (payload) {
  return dispatch => {
    return dispatch({
      type: RULES_CONDITION_MANUALLY_ADD,
      condition: payload,
    })
  }
}

export function editCondition (conditionIndex) {
  return dispatch => {
    return dispatch({
      type: RULES_CONDITION_EDIT,
      condition: conditionIndex,
    })
  }
}

export function removeConditionAttribute (condition) {
  return dispatch => {
    return dispatch({
      type: RULES_CONDITION_ATTRIBUTE_REMOVE,
      condition,
    })
  }
}

export function removeCondition (condition) {
  return dispatch => {
    return dispatch({
      type: RULES_CONDITION_REMOVE,
      condition,
    })
  }
}

export function setAdditionCondition (index) {
  return dispatch => {
    return dispatch({
      type: RULES_ADDITION_CONDITION_SELECTION,
      index,
    })
  }
}

export function updateAdditionalConditionInput (value) {
  return dispatch => {
    return dispatch({
      type: RULES_ADDITION_CONDITION_INPUT_CHANGE,
      value,
    })
  }
}

export function updateAdditionalConditionExtra (value) {
  return dispatch => {
    return dispatch({
      type: RULES_ADDITION_CONDITION_EXTRA_CHANGE,
      value,
    })
  }
}

export function updateTableFilter (newFilter) {
  return dispatch => {
    return dispatch({
      type: RULES_TABLE_FILTER_CHANGE,
      newFilter,
    })
  }
}

export function resetAdditionalCondition () {
  return dispatch => {
    return dispatch({
      type: RULES_ADDITION_CONDITION_RESET,
    })
  }
}

export function saveAdditionalCondition () {
  return dispatch => {
    return dispatch({
      type: RULES_CONDITION_CHANGE,
    })
  }
}

export function changeAdditionalConditionOperator (selectedOperator) {
  return dispatch => {
    return dispatch({
      type: RULES_ADDITION_CONDITION_OPERATOR_CHANGE,
      selectedOperator,
    })
  }
}
