import axios from 'axios'
import apiConfig from '../../../config/apiConfig'
import {
  RULES_SET_ITEMS,
  RULE_SET,
  RULE_GET_ERROR,
  RULE_STATE_RESET,
  RULES_ATTRIBUTES_ADD,
  RULES_GET_ITEMS_FAILED,
  SET_CHILD_COUNT,
} from './actionTypes'
import * as attributeNames from './SearchCriteriaStandardNames'
import * as inputTypes from '../../../components/RuleBuilder/Components/InputTypes'
import _ from 'lodash'

export const eSearchTypes = {
  [attributeNames.PRODUCT_TITLE]: 'item_data.product_description.title',
  [attributeNames.VENDOR_NAME]: 'item_data.product_vendors.id',
  [attributeNames.TAXONOMY_GROUP]: 'item_data.product_classification.product_type_name',
  [attributeNames.TAXONOMY_SUBGROUP]: 'item_data.product_classification.product_subtype_name',
  [attributeNames.MTA_TYPE]: 'item_data.merchandise_type_attributes.id',
  [attributeNames.MTA_VALUES]: 'item_data.merchandise_type_attributes.values.id',
  [attributeNames.MANUFACTURER_BRAND]: 'item_data.product_brand.brand',
}

function getProductTitle () {
  return dispatch => {
    return dispatch({
      type: RULES_ATTRIBUTES_ADD,
      attributeInformation: {
        attribute: attributeNames.PRODUCT_TITLE,
        data: [],
        display: 'Product Title',
        inputType: inputTypes.FREE_FORM,
      },
    })
  }
}

function getTaxonomies () {
  return dispatch => {
    return axios.get(apiConfig.api.itemApi + 'digital_items/v1/hierarchy/productTypes').then(
      function success (response) {
        let taxonomies = response.data.ProductTypeListType.ProductType
        taxonomies.sort((a, b) => {
          return a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1
        })
        let groups = []
        let subGroups = []
        _.forEach(taxonomies, (taxonomy) => {
          if (taxonomy.Status === 'ACTV') {
            groups.push({
              display: taxonomy.Name,
              value: taxonomy.Name,
            })
            let subgroup = []
            _.forEach(taxonomy.ProductSubType, (subGroup) => {
              if (subGroup.Status === 'ACTV') {
                subgroup.push({
                  display: subGroup.Name,
                  value: subGroup.Name,
                })
              }
            })
            subgroup.sort((a, b) => {
              return a.display.toLowerCase() > b.display.toLowerCase() ? 1 : -1
            })
            subGroups.push(subgroup)
          }
        })
        dispatch({
          type: RULES_ATTRIBUTES_ADD,
          attributeInformation: {
            attribute: attributeNames.TAXONOMY,
            data: [
              groups,
              subGroups,
            ],
            labels: [
              'Taxonomy Group',
              'Taxonomy Subgroup',
            ],
            display: 'Taxonomy',
            inputType: inputTypes.DOUBLE_COMBO_BOX,
          },
        })
      }
    )
  }
}

function getVendors () {
  const parseVendors = (vendors) => {
    let out = []
    _.forEach(vendors, (vendor) => {
      if (vendor.vendorActive) {
        out.push({
          key: vendor.gmsVendorNumber.toString(),
          value: vendor.vendorName,
        })
      }
    })
    return out.sort((a, b) => {
      return a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
    })
  }
  return dispatch => {
    return axios.get(apiConfig.api.itemApi + 'vendors/v1/gms').then(
      function success (response) {
        dispatch({
          type: RULES_ATTRIBUTES_ADD,
          attributeInformation: {
            attribute: attributeNames.VENDOR_NAME,
            data: parseVendors(response.data),
            display: 'Vendor Name',
            inputType: inputTypes.AUTOCOMPLETE,
          },
        })
      },
    )
  }
}

export const merchTypeAttributes = [142750, 133350, 110298, 110447, 110407]
function getMTAs () {
  // this is the 'hard coded' list of merch type attributes used on the rule builder
  // to add more merch type attributes to this list, just add the ID of the merch type
  // to the list
  /* CURRENTLY SUPPORTED MERCH TYPE ATTRIBUTES
   * 142750: Age specific gender
   * 133350: Apperal Item Type
   * 110298: Garment Fit
   * 110447: Occasion Worn For
   * 110407: Size Grouping
   */
  return dispatch => {
    return axios.post(apiConfig.api.itemApi + 'digital_items/v1/hierarchy/merchAttributes', merchTypeAttributes).then(
      function success (response) {
        let mtas = response.data
        let types = []
        let values = []
        _.forEach(mtas, (mta) => {
          types.push({
            display: mta.name,
            value: mta.id,
          })
          let attributes = []
          _.forEach(mta.item_attribute_values, (attribute) => {
            attributes.push({
              display: attribute.display_name,
              value: attribute.value_id,
            })
          })
          attributes.sort((a, b) => {
            return a.display.toLowerCase() > b.display.toLowerCase() ? 1 : -1
          })
          values.push(attributes)
        })
        dispatch({
          type: RULES_ATTRIBUTES_ADD,
          attributeInformation: {
            attribute: attributeNames.MTA,
            data: [
              types,
              values,
            ],
            labels: [
              'MTA Types',
              'MTA Values',
            ],
            display: attributeNames.MTA,
            inputType: inputTypes.DOUBLE_COMBO_BOX,
          },
        })
      }
    )
  }
}

// brandid isn't used in the search since brand names SHOULD be unique, also
// it could cause a null pointer down the road for the backend
function getManufacturerBrands () {
  return dispatch => {
    return axios.get(apiConfig.api.itemApi + 'digital_items/v1/brands')
      .then(
        function success (response) {
          let data = response.data.brand.map(brand => {
            return {
              key: brand.brandName,
              value: brand.brandName,
            }
          })
          data.sort((a, b) => {
            return a.key.toLowerCase() > b.key.toLowerCase() ? 1 : -1
          })
          dispatch({
            type: RULES_ATTRIBUTES_ADD,
            attributeInformation: {
              attribute: attributeNames.MANUFACTURER_BRAND,
              data,
              display: 'Manufacturer Brand',
              inputType: inputTypes.AUTOCOMPLETE,
            },
          })
        }
      )
  }
}

export function getRuleAttributes () {
  return dispatch => {
    // the chained promises make sure that the attributes are
    // called in a set order, rather than at the whim of the
    // scheduler
    dispatch(getProductTitle())
    return dispatch(getTaxonomies()).then(
      () => dispatch(getVendors()).then(
        () => dispatch(getMTAs()).then(
          () => dispatch(getManufacturerBrands())
        )
      )
    )
  }
}

function buildElasticSearchQuery (conditions, includeFields) {
  let mustCriteriaPayload = {}
  let mustNotCriteriaPayload = {}
  let relationshipIndex = -1
  if (conditions.length === 0) {
    return dispatch => { }
  }
  _.forEach(conditions, (condition, index) => {
    if (condition.key !== attributeNames.RELATIONSHIP_TYPE) {
      switch (condition.operator) {
        case 'in':
        case 'IN':
        case null:
        case undefined: {
          if (mustCriteriaPayload[eSearchTypes[condition.key]]) {
            mustCriteriaPayload[eSearchTypes[condition.key]].push({
              'sub_match_values': condition.values.slice(0),
              'match_phrase': true,
            })
          } else {
            mustCriteriaPayload[eSearchTypes[condition.key]] = [
              {
                'sub_match_values': condition.values.slice(0),
                'match_phrase': true,
              },
            ]
          }
          break
        }
        case 'OUT':
        case 'out': {
          if (mustNotCriteriaPayload[eSearchTypes[condition.key]]) {
            mustNotCriteriaPayload[eSearchTypes[condition.key]].push({
              'sub_match_values': condition.values.slice(0),
              'match_phrase': true,
            })
          } else {
            mustNotCriteriaPayload[eSearchTypes[condition.key]] = [
              {
                'sub_match_values': condition.values.slice(0),
                'match_phrase': true,
              },
            ]
          }
          break
        }
        default: {
          break
        }
      }
    } else {
      relationshipIndex = index
    }
  })
  const payload = {
    'filters': {
      'item_data.relationship_type_code': relationshipIndex !== -1 ? conditions[relationshipIndex].values.slice(0) : '[]',
    },
    'include_fields': includeFields.slice(0),
    'must': mustCriteriaPayload,
    'must_not': mustNotCriteriaPayload,
  }
  return payload
}

function getChildCountFromElasticSearch (payload) {
  return (dispatch) => {
    payload.filters = { 'item_data.relationship_type_code': ['VC'] }
    return axios.post(
      apiConfig.api.searchApi + 'es/advanced?page=0&size=0',
      payload
    ).then(
      function success (response) {
        dispatch({
          type: SET_CHILD_COUNT,
          childCount: response.data.results_count,
        })
      }, function error () {
        dispatch({
          type: SET_CHILD_COUNT,
          childCount: -1,
        })
      }
    )
  }
}

export function getRuleItems () {
  return (dispatch, getState) => {
    const {
      conditions,
      page,
      filter,
      includeFields,
    } = getState().rulesBuilder
    const payload = {
      ...buildElasticSearchQuery(conditions, includeFields),
      post_filter: filter,
    }
    return axios.post(
      apiConfig.api.searchApi + 'es/advanced?page=' + page + '&size=100',
      payload
    )
      .then(
        function success (response) {
          dispatch(
            getChildCountFromElasticSearch(payload)
          )
          dispatch({
            type: RULES_SET_ITEMS,
            foundItems: parseSearchResponse(response),
            page: page,
          })
        },
        function error () {
          axios.post(
            apiConfig.api.searchApi + 'es/advanced?coronaCall=true&page=' + page + '&size=100',
            {
              ...payload,
              filters: {
                'relationship.relationship_type_code': payload.filters['item_data.relationship_type_code'],
              },
            }
          ).then(
            function success (response) {
              dispatch({
                type: RULES_SET_ITEMS,
                foundItems: parseSearchResponse(response),
                page: page,
              })
            },
            function error () {
              dispatch({
                type: RULES_GET_ITEMS_FAILED,
              })
            }
          ) // should the filter search fail, switch to the default search
        }
      )
  }
}

function parseSearchResponse (response) {
  const results = {
    parentCount: response.data.results_count,
    totalResults: response.data.results_count,
    items: response.data.search.map(item => {
      return {
        tcin: item.metadata.tcin,
        launchDate: item.metadata.item_data.launch_date_time,
        children: item.metadata.item_data.child_items ? item.metadata.item_data.child_items : [],
        title: item.metadata.item_data.product_description.title,
        image: item.metadata.item_data.enrichment
          ? 'http:' + item.metadata.item_data.enrichment.images.base_url + item.metadata.item_data.enrichment.images.primary_image
          : '',
      }
    }),
  }
  return results
}

export function getRule (payload) {
  return dispatch => {
    return axios.post(apiConfig.api.sizeChartApi + 'rules/get', payload)
      .then(
        function success (response) {
          dispatch({
            type: RULE_SET,
            rule: response.data,
          })
        },
        function error () {
          // Rule not found
          dispatch({
            type: RULE_GET_ERROR,
            message: 'RULE NOT FOUND',
          })
        }
      )
  }
}

export function saveRule (payload) {
  return dispatch => {
    return axios.post(apiConfig.api.sizeChartApi + 'rules/save', payload)
      .then(
        function success (response) {
          dispatch({
            type: RULE_STATE_RESET,
          })
        }
      )
  }
}
