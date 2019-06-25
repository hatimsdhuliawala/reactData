import * as actionTypes from './rulesSelectionActionTypes'
import * as apiActions from './apiActions'

export function filterRules (filterText, displayRules) {
  let regex = /^[0-9]{6,8}$/g
  let matches = filterText.match(regex)
  if (matches !== null && matches.length > 0) {
    let tcins = []
    for (let match in matches) { tcins.push(matches[match]) }
    return dispatch => {
      dispatch({
        type: actionTypes.FILTER_CHANGE,
        filter: filterText,
        filteredRules: displayRules,
      })
      dispatch(apiActions.searchTcins(tcins))
    }
  } else {
    return (dispatch) => {
      let outputRules = {}
      let filters = filterText.split(' ')
      /*
       * The Large Amount of for loops were used instead of a map function
       * because the rules for the filter page are stored in an assosiative
       * array to cut down on search time, which means that a map function
       * won't return the correct type of array, since .map returns a list
       * instead of an object
       */
      // For each filter that was searched on
      for (let i in filters) {
        let filter = filters[i]
        // Check the category level
        for (let categoryName in displayRules) {
          let category = displayRules[categoryName]
          if (categoryName.indexOf(filter) >= 0) {
            // if the category name matches, keep the entire category
            outputRules[categoryName] = category
          } else {
            let outCategory = {
              items: 0,
              ruleCount: 0,
              brands: { },
            }
            // Check the brand Level
            for (let brandName in category.brands) {
              let brand = category.brands[brandName]
              if (brandName.indexOf(filter) >= 0) {
                // If the Brand Name Matches, keep the entire brand
                outCategory.ruleCount += brand.ruleCount
                outCategory.items += brand.items
                outCategory.brands[brandName] = { ...brand }
              } else {
                let outBrand = {
                  items: 0,
                  ruleCount: 0,
                  sizes: { },
                }
                // Check the Size Level
                for (let sizeName in brand.sizes) {
                  let size = brand.sizes[sizeName]
                  if (sizeName.indexOf(filter) >= 0) {
                    // If the Size Name Matches, keep the entire size
                    outBrand.items += size.items
                    outBrand.ruleCount += size.ruleCount
                    outBrand.sizes[sizeName] = { ...size }
                  } else {
                    let outSize = {
                      items: 0,
                      ruleCount: 0,
                      rules: { },
                    }
                    // Check each rule
                    for (let ruleName in size.rules) {
                      let rule = size.rules[ruleName]
                      if (ruleName.indexOf(filter) >= 0) {
                        // Only Keep the Rule if the Rule Name matches the filter
                        outSize.items += rule.items
                        outSize.ruleCount += 1
                        outSize.rules[ruleName] = { ...rule }
                      }
                    }
                    if (outSize.ruleCount > 0) {
                      // if there were rules kept from this size, keep the size too
                      outBrand.items += outSize.items
                      outBrand.ruleCount += outSize.ruleCount
                      outBrand.sizes[sizeName] = { ...outSize }
                    }
                  }
                }
                if (outBrand.ruleCount > 0) {
                  // if there were sizes kept for this brand, keep the brand too
                  outCategory.items += outBrand.items
                  outCategory.ruleCount += outBrand.ruleCount
                  outCategory.brands[brandName] = { ...outBrand }
                }
              }
            }
            if (outCategory.ruleCount > 0) {
              // if there were brands kept for this category, keep the category too
              outputRules[categoryName] = outCategory
            }
          }
        }
      }
      return dispatch(changeFilteredRules(outputRules, filterText))
    }
  }
}

export function expandRuleIndex (key, expanded, level) {
  return dispatch => {
    let newExpanded = expanded.slice(0, level)
    if (newExpanded.length < level + 1) {
      newExpanded.push(-1)
    }
    newExpanded[level] = key
    return dispatch({
      type: actionTypes.EXPANDED_STATE_CHANGE,
      expanded: newExpanded,
    })
  }
}

export function sendWarning (warning) {
  return dispatch => {
    dispatch({
      type: actionTypes.RULE_FILTER_WARNING,
      warning: warning,
    })
  }
}

function changeFilteredRules (newRules, filter) {
  return {
    type: actionTypes.FILTER_CHANGE,
    filteredRules: newRules,
    filter: filter,
  }
}
