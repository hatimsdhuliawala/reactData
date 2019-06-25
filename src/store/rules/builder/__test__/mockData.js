import * as attributeNames from '../SearchCriteriaStandardNames'
import { FREE_FORM, AUTOCOMPLETE, DOUBLE_COMBO_BOX } from '../../../../components/RuleBuilder/Components/InputTypes'
import { eSearchTypes } from '../apiActions'

/*
 * I made a seperate file for mock data to avoid rewriting the same
 * code over and over again, this fill SHOULD hold all the mocks
 * for data
 */

export const ruleAttributes = [
  {
    attribute: attributeNames.PRODUCT_TITLE,
    data: [],
    display: 'Product Title',
    inputType: FREE_FORM,
  },

  {
    attribute: attributeNames.TAXONOMY,
    data: [
      [
        {
          value: 'APPAREL',
          display: 'APPAREL',
        },
        {
          value: 'GROCERY',
          display: 'GROCERY',
        },
      ],
      [
        [
          {
            value: 'BOTTOMS',
            display: 'BOTTOMS',
          },
          {
            value: 'TOPS',
            display: 'TOPS',
          },
          {
            value: 'OUTERWEAR',
            display: 'OUTERWEAR',
          },
        ],
        [
          {
            value: 'CRACKERS',
            display: 'CRACKERS',
          },
          {
            value: 'FRUIT',
            display: 'FRUIT',
          },
        ],
      ],
    ],
    display: 'Taxonomy',
    inputType: DOUBLE_COMBO_BOX,
    labels: [
      'Taxonomy Group',
      'Taxonomy Subgroup',
    ],
  },

  {
    attribute: attributeNames.VENDOR_NAME,
    data: [
      {
        key: '1',
        value: 'The Borg',
      },
      {
        key: '2',
        value: 'The Federation',
      },
    ],
    display: 'Vendor Name',
    inputType: AUTOCOMPLETE,
  },

  {
    attribute: attributeNames.MTA,
    data: [
      [

        {
          value: 142750,
          display: 'Age specific gender',
        },
        {
          value: 133350,
          display: 'Apparel item type',
        },

        {
          value: 110298,
          display: 'Garment Fit',
        },
        {
          value: 110447,
          display: 'Occasion Worn For',
        },
        {
          value: 110407,
          display: 'Size Grouping',
        },
      ],
      [
        [
          {
            value: '3',
            display: 'Women',
          },
          {
            value: '4',
            display: 'Men',
          },
        ],
        [
          {
            value: '1',
            display: 'Poet Shirts',
          },
          {
            value: '2',
            display: 'T-Shirts',
          },
        ],
        [
          {
            value: '7',
            display: 'Normal',
          },
          {
            value: '8',
            display: 'Whack Yo',
          },
        ],
        [
          {
            value: '5',
            display: 'Graduation',
          },
          {
            value: '6',
            display: 'Debugging',
          },
        ],
        [
          {
            value: '9',
            display: 'regular',
          },
          {
            value: '10',
            display: 'plus',
          },
        ],
      ],
    ],
    display: 'MTA',
    inputType: DOUBLE_COMBO_BOX,
    labels: [
      'MTA Type',
      'MTA Values',
    ],
  },
  {
    attribute: attributeNames.MANUFACTURER_BRAND,
    data: [
      {
        value: 'Brand 1',
        key: 'Brand 1',
      },
      {
        value: 'Brand 2',
        key: 'Brand 2',
      },
      {
        value: 'Brand 3',
        key: 'Brand 3',
      },
    ],
    display: 'Manufacturer Brand',
    inputType: AUTOCOMPLETE,
  },
]

export const borgAssimilationItemsRule = {
  sizeChartInfo: {
    category: 'Assimilation',
    brand: 'brog',
    size: 'all',
  },
  name: 'assimilation',
  criteria: [
    {
      key: attributeNames.RELATIONSHIP_TYPE,
      values: ['VAP', 'VPC'],
    },
    {
      key: attributeNames.PRODUCT_TITLE,
      values: ['Assimilation', 'Nano Probes'],
    },
    {
      key: attributeNames.TAXONOMY_GROUP,
      values: ['APPAREL'],
    },
    {
      key: attributeNames.TAXONOMY_SUBGROUP,
      values: ['TOPS', 'BOTTOMS'],
    },
    {
      key: attributeNames.PRODUCT_TITLE,
      values: ['Borg', 'The Borg'],
    },
  ],
  priority: 5,
}

export const borgAssimilationCriteriaParsed = [
  {
    key: attributeNames.RELATIONSHIP_TYPE,
    display: 'Relationship Type',
    values: ['VAP', 'VPC'],
    displayValues: ['VAP', 'VPC'],
  },
  {
    key: attributeNames.PRODUCT_TITLE,
    display: 'Product Title',
    values: ['Assimilation', 'Nano Probes'],
    displayValues: ['Assimilation', 'Nano Probes'],
  },
  {
    key: attributeNames.TAXONOMY_SUBGROUP,
    display: 'APPAREL Subgroup',
    values: ['TOPS', 'BOTTOMS'],
    displayValues: ['TOPS', 'BOTTOMS'],
  },
  {
    key: attributeNames.PRODUCT_TITLE,
    display: 'Product Title',
    values: ['Borg', 'The Borg'],
    displayValues: ['Borg', 'The Borg'],
  },
]

export const theJonItem = [
  {
    key: attributeNames.RELATIONSHIP_TYPE,
    display: 'Relationship Type',
    values: ['VAP', 'VPC'],
    displayValues: ['VAP', 'VPC'],
  },
  {
    key: attributeNames.PRODUCT_TITLE,
    display: 'Product Title',
    values: ['Jon', 'Bergh'],
    displayValues: ['Jon', 'Bergh'],
  },
  {
    key: attributeNames.MANUFACTURER_BRAND,
    display: 'Manufacturer Brand',
    values: ['Brand 1', 'Brand 3'],
    displayValues: ['Brand 1', 'Brand 3'],
  },
  {
    key: attributeNames.VENDOR_NAME,
    display: 'Vendor Name',
    values: ['2'],
    displayValues: ['2 - The Federation'],
  },
  {
    key: attributeNames.MTA_VALUES,
    display: 'Occasion Worn For Values',
    values: ['6'],
    displayValues: ['Debugging'],
  },
]

export const borgAssimilationRuleElasticSearchResponse = {
  status: 200,
  statusText: 'You Did it Fam',
  data: {
    results_count: 2,
    search: [
      {
        metadata: {
          tcin: '40100000',
          item_data: {
            launch_date_time: 'last month',
            child_items: [
              '1',
              '2',
            ],
            product_description: {
              title: 'A Test Item',
            },
          },
        },
      },
      {
        metadata: {
          tcin: '40100001',
          item_data: {
            launch_date_time: 'last year',
            child_items: [
              '3',
              '4',
              '5',
            ],
            product_description: {
              title: 'A Second Test Item',
            },
          },
        },
      },
    ],
    terms_aggregations: {
      child_tcins: {
        unique_count: 0,
      },
    },
  },
}

export const borgAssimilationRuleElasticSearchQuery = {
  'filters': {
    'item_data.relationship_type_code': ['VAP', 'VPC'],
  },
  'include_fields': [
    'tcin',
    'item_data.product_description.title',
    'item_data.launch_date_time',
    'item_data.child_items',
    'item_data.enrichment.images.base_url',
    'item_data.enrichment.images.primary_image',
  ],
  'must': {
    [eSearchTypes[attributeNames.PRODUCT_TITLE]]: [
      {
        'sub_match_values': ['Assimilation', 'Nano Probes'],
        'match_phrase': true,
      },
      {
        'sub_match_values': ['Borg', 'The Borg'],
        'match_phrase': true,
      },
    ],
    [eSearchTypes[attributeNames.TAXONOMY_GROUP]]: [
      {
        'sub_match_values': ['APPAREL'],
        'match_phrase': true,
      },
    ],
    [eSearchTypes[attributeNames.TAXONOMY_SUBGROUP]]: [
      {
        'sub_match_values': ['TOPS', 'BOTTOMS'],
        'match_phrase': true,
      },
    ],
  },
  'must_not': {},
  'post_filter': '',
  'terms_aggregations': {
    'child_tcins': 'item_data.child_items.tcin',
  },
}
