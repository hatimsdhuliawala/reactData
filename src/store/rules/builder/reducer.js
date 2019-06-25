import * as actionTypes from './actionTypes'
import _ from 'lodash'
import * as attributeNames from './SearchCriteriaStandardNames'

export const initialState = {
  // select items redux stuff
  priority: 1,
  relationIndex: 0,
  conditions: [
    {
      key: attributeNames.RELATIONSHIP_TYPE,
      display: 'Relationship Type',
      values: ['VAP', 'VPC'],
      displayValues: ['VAP', 'VPC'],
    },
  ],
  additionalConditionKey: -1,
  additionalConditionExtra: [],
  additionalConditionInput: '',
  ruleAttributes: [],
  name: '',
  overwriteIndex: -1,

  // container redux stuff
  warning: {
    open: false,
    ignore: false,
    message: '',
    ok: () => { },
    cancel: () => { },
  },
  stages: [
    'Select Items',
    'Confirm Size Chart',
    'Add How to Measure',
    'Confirm Rule',
  ],
  activeStep: 0,
  completedSteps: [false, false, false, false],
  modified: false,

  // table redux stuff
  needsRefresh: false,
  childCount: 0,
  parentCount: 0,
  totalResults: 0,
  foundItems: [],
  filter: '',
  page: 0,
  selectedOperator: 0,
  operators: [
    'IN',
    'OUT',
  ],
  includeFields: [
    'tcin',
    'item_data.product_description.title',
    'item_data.launch_date_time',
    'item_data.child_items',
    'item_data.enrichment.images.base_url',
    'item_data.enrichment.images.primary_image',
  ],
  loadingConditions: true,
}

export default function rulesBuilder (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.RULES_RELATION_CHANGE: {
      const types = [
        ['VAP', 'VPC'],
        ['VAP', 'VPC', 'SA', 'CC'],
      ]
      let newState = {
        ...state,
        relationIndex: action.index,
        additionalConditionExtra: Number(action.index) === 0 ? types[0] : types[1],
        needsRefresh: true,
        page: 0,
      }
      newState = {
        ...newState,
        conditions: saveCondition(newState), // HAAAAAAAXXXXXX
        additionalConditionExtra: [],
      }
      return newState
    }
    case actionTypes.RULES_CONDITION_CHANGE: {
      const newState = {
        ...state,
        conditions: saveCondition(state),
        needsRefresh: true,
        page: 0,
        modified: true,
        overwriteIndex: -1,
      }
      return newState
    }
    case actionTypes.RULES_CONDITION_MANUALLY_ADD: {
      let conditions = state.conditions.slice(0)
      conditions.push(action.condition)
      const newState = {
        ...state,
        conditions,
        needsRefresh: true,
        page: 0,
      }
      return newState
    }
    case actionTypes.RULES_ADDITION_CONDITION_SELECTION: {
      const newState = {
        ...state,
        additionalConditionKey: action.index,
        additionalConditionInput: '',
        additionalConditionExtra: [],
        overwriteIndex: -1,
      }
      return newState
    }
    case actionTypes.RULES_ADDITION_CONDITION_INPUT_CHANGE: {
      const newState = {
        ...state,
        additionalConditionInput: action.value,
      }
      return newState
    }
    case actionTypes.RULES_ADDITION_CONDITION_EXTRA_CHANGE: {
      const newState = {
        ...state,
        additionalConditionExtra: [
          ...action.value,
        ],
      }
      return newState
    }
    case actionTypes.RULES_ADDITION_CONDITION_RESET: {
      const newState = {
        ...state,
        additionalConditionKey: -1,
        additionalConditionInput: '',
        additionalConditionExtra: [],
        overwriteIndex: -1,
        selectedOperator: 0,
      }
      return newState
    }
    case actionTypes.RULES_ADDITION_CONDITION_OPERATOR_CHANGE: {
      const newState = {
        ...state,
        selectedOperator: action.selectedOperator,
      }
      return newState
    }
    case actionTypes.RULES_CONDITION_REMOVE: {
      let conditions = state.conditions.slice(0)
      conditions.splice(action.condition.conditionIndex, 1)
      const newState = {
        ...state,
        conditions,
        needsRefresh: true,
        page: 0,
        modified: true,
      }
      return newState
    }
    case actionTypes.RULES_CONDITION_ATTRIBUTE_REMOVE: {
      let conditions = state.conditions.slice(0)
      let attributes = conditions[action.condition.conditionIndex].values.slice(0)
      let types = conditions[action.condition.conditionIndex].displayValues.slice(0)
      attributes.splice(action.condition.attributeIndex, 1)
      types.splice(action.condition.attributeIndex, 1)
      if (attributes.length === 0) {
        conditions.splice(action.condition.conditionIndex, 1)
      } else {
        conditions[action.condition.conditionIndex] = {
          ...conditions[action.condition.conditionIndex],
          values: attributes,
          displayValues: types,
        }
      }
      const newState = {
        ...state,
        conditions,
        needsRefresh: true,
        modified: true,
      }
      return newState
    }
    case actionTypes.SET_CHILD_COUNT: {
      const newState = {
        ...state,
        childCount: action.childCount,
      }
      return newState
    }
    case actionTypes.RULES_SET_ITEMS: {
      const newState = {
        ...state,
        foundItems: action.foundItems.items,
        parentCount: action.foundItems.parentCount,
        childCount: action.foundItems.childCount,
        totalResults: action.foundItems.totalResults,
        needsRefresh: false,
        overwriteIndex: -1,
        page: action.page ? action.page : 0,
        loadingConditions: false,
      }
      return newState
    }
    case actionTypes.RULES_GET_ITEMS_FAILED: {
      const newState = {
        ...state,
        needsRefresh: false,
      }
      return newState
    }
    case actionTypes.RULES_TABLE_FILTER_CHANGE: {
      const newState = {
        ...state,
        filter: action.newFilter,
        needsRefresh: true,
        page: 0,
      }
      return newState
    }
    case actionTypes.RULES_NAME_CHANGE: {
      const newState = {
        ...state,
        name: action.name,
        modified: action.modified,
      }
      return newState
    }
    case actionTypes.RULE_SET: {
      const newState = {
        ...state,
        conditions: getDisplayValues(action.rule.criteria, state.ruleAttributes),
        priority: action.rule.priority,
        ruleId: action.rule.id,
        needsRefresh: true,
        page: 0,
        modified: false,
      }
      return newState
    }
    case actionTypes.RULE_GET_ERROR: {
      const newState = {
        ...state,
        isGetRuleError: true,
        getRuleErrorMessage: action.message,
      }
      return newState
    }
    case actionTypes.RULES_CONDITION_EDIT: {
      let conditionIndex = action.condition
      let condition = state.conditions[conditionIndex]
      const newState = {
        ...state,
        ...getConditionInfo(condition, state.ruleAttributes),
        overwriteIndex: conditionIndex,
      }
      return newState
    }
    case actionTypes.RULES_PRIORITY_CHANGE: {
      const newState = {
        ...state,
        priority: action.priority,
        modified: true,
      }
      return newState
    }
    case actionTypes.RULE_STATE_RESET: {
      const newState = {
        ...initialState,
      }
      return newState
    }
    case actionTypes.RULES_ATTRIBUTES_ADD: {
      const newState = {
        ...state,
        ruleAttributes: [
          ...state.ruleAttributes,
          {
            ...action.attributeInformation,
          },
        ],
      }
      return newState
    }
    case actionTypes.RULES_BUILDER_WARNING: {
      const newState = {
        ...state,
        warning: action.warning,
      }
      return newState
    }
    case actionTypes.SET_ACTIVE_STEP: {
      const newState = {
        ...state,
        activeStep: action.index,
      }
      return newState
    }
    case actionTypes.RULES_COMPLETE_STEP: {
      let completedSteps = state.completedSteps.slice(0)
      completedSteps[action.index] = true
      const newState = {
        ...state,
        completedSteps,
      }
      return newState
    }
    case actionTypes.RULES_TABLE_PAGE_CHANGE: {
      const newState = {
        ...state,
        page: action.page,
      }
      return newState
    }
    default:
      return state
  }
}

function getConditionInfo (condition, ruleAttributes) {
  // find which of the conditions we are trying to edit
  let key = -1
  let input = ''
  let extra = []
  switch (condition.key) {
    case attributeNames.PRODUCT_TITLE: {
      key = 0
      input = ''
      extra = condition.values.slice(0)
      break
    }
    case attributeNames.TAXONOMY_SUBGROUP: {
      key = 1
      ruleAttributes[1].data[1].map((subgroups, groupIndex) => {
        subgroups.map((subgroupName, subgroupIndex) => {
          condition.values.map((value) => {
            if (subgroupName.display === value) {
              extra.push(subgroupIndex)
              input = groupIndex
            }
          })
        })
      })
      break
    }
    case attributeNames.VENDOR_NAME: {
      key = 2
      input = ''
      ruleAttributes[2].data.map((vendor, index) => {
        condition.values.map((value, conditionIndex) => {
          if (value === vendor.value || value === vendor.key) {
            // extra.push(index)
            // the above would display the index in the vendor add condition box instead of the vendor id/name
            // then when adding it would show no results because it would use the index as the id

            // the below code makes it so the vendor id only shows up when editting existing vendor criteria
            // if you try to assign `${vendor.id} - ${vendor.name}` it breaks because extra needs to be an array
            // even though it only shows the vendor id it displays correctly after adding the condition back into the criteria
            // TODO: figure out how to display vendor name also
            extra = condition.values.slice(0)
          }
        })
      })
      break
    }
    case attributeNames.MTA_VALUES: {
      key = 3
      ruleAttributes[3].data[1].map((typeValues, typeIndex) => {
        typeValues.map((value, valueIndex) => {
          condition.values.map((conditionValue) => {
            if (value.value === conditionValue) {
              extra.push(valueIndex)
              input = typeIndex
            }
          })
        })
      })
      break
    }
    case attributeNames.MANUFACTURER_BRAND: {
      key = 4
      input = ''
      condition.values.map(value => {
        _.forEach(ruleAttributes[key].data, (brand, index) => {
          if (brand.key === value) {
            extra.push(index)
          }
        })
      })
      break
    }
  }

  return {
    additionalConditionKey: key,
    additionalConditionInput: input,
    additionalConditionExtra: extra,
  }
}

function saveCondition (state) {
  const {
    conditions,
    ruleAttributes,
    overwriteIndex,
    additionalConditionInput,
    additionalConditionExtra,
    additionalConditionKey,
    operators,
    selectedOperator,
  } = state
  let newConditions = conditions.slice(0)
  const ruleAttribute = additionalConditionKey > -1 ? ruleAttributes[additionalConditionKey] : {
    attribute: attributeNames.RELATIONSHIP_TYPE,
  }
  switch (ruleAttribute.attribute) {
    case attributeNames.PRODUCT_TITLE: {
      let values = additionalConditionExtra.slice(0)
      let displayValues = additionalConditionExtra.slice(0)
      let newCondition = {
        key: ruleAttribute.attribute,
        display: ruleAttribute.display,
        values,
        displayValues,
        operator: operators[selectedOperator],
      }
      if (overwriteIndex >= 0) {
        newConditions[overwriteIndex] = newCondition
      } else {
        newConditions.push(newCondition)
      }
      break
    }
    case attributeNames.TAXONOMY: {
      // TAXONOMY gets 2 conditions to describe it
      let subGroupCondition = {
        key: attributeNames.TAXONOMY_SUBGROUP,
        display: ruleAttribute.data[0][additionalConditionInput].display + ' Subgroups',
        values: additionalConditionExtra.map((index) => {
          return ruleAttribute.data[1][additionalConditionInput][index].value
        }),
        displayValues: additionalConditionExtra.map((index) => {
          return ruleAttribute.data[1][additionalConditionInput][index].display
        }),
        operator: operators[selectedOperator],
      }
      if (overwriteIndex >= 0) {
        newConditions[overwriteIndex] = subGroupCondition
      } else {
        newConditions.push(subGroupCondition)
      }
      break
    }
    case attributeNames.VENDOR_NAME: {
      let newCondition = {
        key: attributeNames.VENDOR_NAME,
        values: additionalConditionExtra.map(index => {
          for (let i = 0; i < ruleAttribute.data.length; i++) {
            if (`${ruleAttribute.data[i].key} - ${ruleAttribute.data[i].value}` === index) {
              return ruleAttribute.data[i].key
            }
          }
          return index
        }),
        display: ruleAttribute.display,
        displayValues: additionalConditionExtra.map(index => {
          for (let i = 0; i < ruleAttribute.data.length; i++) {
            if (ruleAttribute.data[i].key === index) {
              return `${ruleAttribute.data[i].key} - ${ruleAttribute.data[i].value}`
            }
          }
          return index
        }),
        operator: operators[selectedOperator],
      }
      if (overwriteIndex >= 0) {
        newConditions[overwriteIndex] = newCondition
      } else {
        newConditions.push(newCondition)
      }
      break
    }
    case attributeNames.RELATIONSHIP_TYPE: {
      let newCondition = {
        key: attributeNames.RELATIONSHIP_TYPE,
        display: 'Relationship Type',
        values: additionalConditionExtra.slice(0),
        displayValues: additionalConditionExtra.slice(0),
        operator: operators[selectedOperator],
      }
      let found = false
      newConditions = newConditions.map(condition => {
        found = found || (condition.key === attributeNames.RELATIONSHIP_TYPE)
        return condition.key === attributeNames.RELATIONSHIP_TYPE ? newCondition : condition
      })
      // sanity check
      if (!found) {
        newConditions.push(newCondition)
      }
      break
    }
    case attributeNames.MTA: {
      let valueCondition = {
        key: attributeNames.MTA_VALUES,
        display: [ruleAttribute.data[0][additionalConditionInput].display] + ' Values',
        values: additionalConditionExtra.map(index => {
          return ruleAttribute.data[1][additionalConditionInput][index].value
        }),
        displayValues: additionalConditionExtra.map(index => {
          return ruleAttribute.data[1][additionalConditionInput][index].display
        }),
        operator: operators[selectedOperator],
      }
      if (overwriteIndex >= 0) {
        newConditions[overwriteIndex] = valueCondition
      } else {
        newConditions.push(valueCondition)
      }
      break
    }
    case attributeNames.MANUFACTURER_BRAND: {
      let values = additionalConditionExtra.slice(0)
      let displayValues = additionalConditionExtra.slice(0)
      let newCondition = {
        key: ruleAttribute.attribute,
        display: ruleAttribute.display,
        values,
        displayValues,
        operator: operators[selectedOperator],
      }
      if (overwriteIndex >= 0) {
        newConditions[overwriteIndex] = newCondition
      } else {
        newConditions.push(newCondition)
      }
      break
    }
  }
  return newConditions
}

// add display values to the criteria returned
// from the size chart app
function getDisplayValues (conditions, ruleAttributes) {
  // there are lots of different variations of the same attribute name,
  // and while we would like them to all be the same, rules have been through
  // many iterations over the years which leave them with a variety of different
  // names for the same field to be searching on
  if (!conditions) {
    return initialState.conditions
  }
  let out = []
  _.forEach(conditions, (condition) => {
    switch (condition.key.toLowerCase()) {
      case 'product title':
      case 'product_title':
      case attributeNames.PRODUCT_TITLE: {
        out.push({
          ...condition,
          key: attributeNames.PRODUCT_TITLE,
          display: 'Product Title',
          displayValues: condition.values.slice(0),
        })
        break
      }
      // Out Dated Condition
      case 'group_name':
      case 'iac_group_value':
      case attributeNames.TAXONOMY_GROUP: {
        break
      }
      case 'sub_group':
      case 'iac_subgroup_value':
      case attributeNames.TAXONOMY_SUBGROUP: {
        let subgroups = []
        let groupIndex = -1
        // check each of the mta arrays
        _.forEach(ruleAttributes[1].data[1], (array, index) => {
          // check each value in the array
          _.forEach(array, (subgroup) => {
            // for each value in this condition
            _.forEach(condition.values, (value) => {
              // if the value is the mta, add its display
              if (subgroup.value === value) {
                subgroups.push(subgroup.value)
                groupIndex = index
              }
            })
          })
        })
        out.push({
          ...condition,
          key: attributeNames.TAXONOMY_SUBGROUP,
          display: ruleAttributes[1].data[0][groupIndex].display + ' Subgroups',
          displayValues: condition.values.slice(0),
        })
        break
      }
      case 'vendor name':
      case 'vendor_name':
      case 'vendor id':
      case 'vendor_id':
      case 'vendors id':
      case 'vendors_id':
      case attributeNames.VENDOR_NAME: {
        out.push({
          ...condition,
          key: attributeNames.VENDOR_NAME,
          display: 'Vendor Name',
          displayValues: condition.values.map((nameOrId, index) => {
            let vendorNameMatch = ''
            _.forEach(ruleAttributes[2].data, (vendor) => {
              // handle vendor id or name, but always display both (vendor.key is id vendor.value is name)
              if (vendor.key === nameOrId || vendor.value === nameOrId) {
                vendorNameMatch = `${vendor.key} - ${vendor.value}`
                condition.values[index] = vendor.key
              }
            })
            return vendorNameMatch === '' ? 'Vendor Unknown' : vendorNameMatch
          }),
        })
        break
      }
      case 'relationship type':
      case attributeNames.RELATIONSHIP_TYPE: {
        out.push({
          ...condition,
          key: attributeNames.RELATIONSHIP_TYPE,
          display: 'Relationship Type',
          displayValues: condition.values.slice(0),
        })
        break
      }
      // Out Data condition
      case 'iac_attribute':
      case 'iac':
      case attributeNames.MTA_TYPE: {
        break
      }
      case 'iac_attribute_values':
      case 'iac_value':
      case attributeNames.MTA_VALUES: {
        let mtaValues = []
        let mtaIndex = -1
        // check each of the mta arrays
        _.forEach(ruleAttributes[3].data[1], (array, index) => {
          // check each value in the array
          _.forEach(array, (mta) => {
            // for each value in this condition
            _.forEach(condition.values, (value) => {
              // if the value is the mta, add its display
              if (mta.value === value) {
                mtaValues.push(mta.display)
                mtaIndex = index
              }
            })
          })
        })
        out.push({
          ...condition,
          key: attributeNames.MTA_VALUES,
          display: ruleAttributes[3].data[0][mtaIndex].display + ' Values',
          displayValues: mtaValues,
        })
        break
      }
      case 'manufacturer_brand':
      case attributeNames.MANUFACTURER_BRAND: {
        out.push({
          ...condition,
          key: attributeNames.MANUFACTURER_BRAND,
          display: 'Manufacturer Brand',
          displayValues: condition.values.map(value => {
            let out = ''
            _.forEach(ruleAttributes[4].data, (brand) => {
              if (brand.key === value) {
                out = brand.key
              }
            })
            return out === '' ? value : out
          }),
        })
        break
      }
      default: {
        out.push({
          ...condition,
          display: condition.key,
          displayValues: condition.values.slice(0),
        })
      }
    }
  })
  return out
}
