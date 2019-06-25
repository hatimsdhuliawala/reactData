import * as actionTypes from './rulesSelectionActionTypes'

export const initialState = {
  rules: { },
  filteredRules: { },
  expanded: [-1],
  filter: '',
  searchedTCINs: [],
  warning: {
    open: false,
    message: '',
    ok: () => {},
    cancel: () => {},
  },
}

export default function rulesSelectionReducer (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.SET_RULES: {
      const newState = {
        ...state,
        rules: action.rules,
        searchedTCINs: [],
      }
      return newState
    }
    case actionTypes.FILTER_CHANGE: {
      const newState = {
        ...state,
        filteredRules: action.filteredRules,
        expanded: [-1],
        filter: action.filter,
        searchedTCINs: action.filter === '' ? [] : state.searchedTCINs,
      }
      return newState
    }
    case actionTypes.EXPANDED_STATE_CHANGE: {
      const newState = {
        ...state,
        expanded: action.expanded,
      }
      return newState
    }
    case actionTypes.RULES_FILTERED_TCINS_FOUND: {
      const newState = {
        ...state,
        searchedTCINs: action.tcins,
      }
      return newState
    }
    case actionTypes.RULE_FILTER_WARNING: {
      const newState = {
        ...state,
        warning: {
          ...state.warning,
          ...action.warning,
        },
      }
      return newState
    }
    default:
      return state
  }
}
