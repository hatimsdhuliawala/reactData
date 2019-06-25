import axios from 'axios'
import * as actionTypes from './rulesSelectionActionTypes'
import envConfigs from '../../../config/apiConfig'

export function getRules () {
  return (dispatch) => {
    axios.get(envConfigs.api.sizeChartApi + 'rules/get/all')
      .then(
        function success (response) {
          let rules = response.data
          // TODO: sort in backend, not here
          // sort the rules alphabetically
          rules.sort((a, b) => {
            if (a.size_chart_info === null) {
              return -1
            }
            if (b.size_chart_info === null) {
              return 1
            }
            if (a.size_chart_info.category === b.size_chart_info.category) {
              if (a.size_chart_info.brand === b.size_chart_info.brand) {
                if (a.size_chart_info.size === b.size_chart_info.size) {
                  return a.name <= b.name ? -1 : 1
                }
                return a.size_chart_info.size < b.size_chart_info.size ? -1 : 1
              }
              return a.size_chart_info.brand < b.size_chart_info.brand ? -1 : 1
            }
            return a.size_chart_info.category < b.size_chart_info.category ? -1 : 1
          })

          let outputTree = {}
          for (let i = 0; i < rules.length; i++) {
            if (rules[i].size_chart_info !== null) {
              let rule = {
                ...rules[i].size_chart_info,
                name: rules[i].name !== undefined && rules[i].name !== null ? rules[i].name : rules[i].id,
                items: rules[i].tcins === null ? 0 : rules[i].tcins,
                ruleId: rules[i].id,
              }
              if (outputTree[rule.category] === undefined) {
                outputTree[rule.category] = {
                  items: rule.items,
                  brands: { },
                  ruleCount: 1,
                }
                outputTree[rule.category].brands[rule.brand] = {
                  items: rule.items,
                  ruleCount: 1,
                  sizes: { },
                }
                outputTree[rule.category].brands[rule.brand].sizes[rule.size] = {
                  items: rule.items,
                  ruleCount: 1,
                  rules: { },
                }
                outputTree[rule.category].brands[rule.brand].sizes[rule.size].rules[rule.name] = {
                  ruleId: rule.ruleId,
                  items: rule.items,
                }
              } else {
                outputTree[rule.category].items += rule.items
                outputTree[rule.category].ruleCount += 1
                if (outputTree[rule.category].brands[rule.brand] === undefined) {
                  outputTree[rule.category].brands[rule.brand] = {
                    items: rule.items,
                    ruleCount: 1,
                    sizes: { },
                  }
                  outputTree[rule.category].brands[rule.brand].sizes[rule.size] = {
                    items: rule.items,
                    ruleCount: 1,
                    rules: { },
                  }
                  outputTree[rule.category].brands[rule.brand].sizes[rule.size].rules[rule.name] = {
                    ruleId: rule.ruleId,
                    items: rule.items,
                  }
                } else {
                  outputTree[rule.category].brands[rule.brand].items += rule.items
                  outputTree[rule.category].brands[rule.brand].ruleCount += 1
                  if (outputTree[rule.category].brands[rule.brand].sizes[rule.size] === undefined) {
                    outputTree[rule.category].brands[rule.brand].sizes[rule.size] = {
                      items: rule.items,
                      ruleCount: 1,
                      rules: { },
                    }
                    outputTree[rule.category].brands[rule.brand].sizes[rule.size].rules[rule.name] = {
                      ruleId: rule.ruleId,
                      items: rule.items,
                    }
                  } else {
                    outputTree[rule.category].brands[rule.brand].sizes[rule.size].items += rule.items
                    outputTree[rule.category].brands[rule.brand].sizes[rule.size].ruleCount += 1
                    outputTree[rule.category].brands[rule.brand].sizes[rule.size].rules[rule.name] = {
                      ruleId: rule.ruleId,
                      items: rule.items,
                    }
                  }
                }
              }
            }
          }
          dispatch(setRules(outputTree))
        },
        function error (response, status) {
          // THROW ALL THE THINGS, LET CAOS REIN
        }
      )
  }
}

export function searchTcins (tcins) {
  return dispatch => {
    let out = []
    axios.post(envConfigs.api.sizeChartApi + 'rules/get/tcins', tcins)
      .then(
        function success (response) {
          let results = response.data
          if (results.length === 1 && results[0] === null) {
          } else {
            for (let i = 0; i < results.length; i++) {
              axios.get(envConfigs.api.itemApi + 'digital_items/v1/' + results[i].tcin)
                .then(
                  function success (response) {
                    out.push({
                      tcin: results[i].tcin,
                      rules: results[i].rules,
                      title: response.data.product_description.title,
                    })
                  },
                  function error () {
                    // maybe report an invalid tcin ?
                  }
                ).then(
                  () => {
                    return dispatch({
                      type: actionTypes.RULES_FILTERED_TCINS_FOUND,
                      tcins: out.slice(0),
                    })
                  }
                )
            }
          }
        },
        function error (status) {
          // AAAAAAAAAAAAAAAAAAAAAA
        }
      )
  }
}

export function deleteRule (rule) {
  return dispatch => {
    return axios.post(envConfigs.api.sizeChartApi + 'rules/delete', {
      size_chart_info: {
        category: rule.category,
        brand: rule.brand,
        size: rule.size,
      },
      name: rule.name,
    })
      .then(
        function success () {
          dispatch(getRules())
        },
        function error () {
          // Let fly the doors of h**l
        },
      )
  }
}

function setRules (rules) {
  return {
    type: actionTypes.SET_RULES,
    rules: rules,
  }
}
