import {
  SAVE_SIZECHART_PENDING,
  SAVE_SIZECHART_ERROR,
  SAVE_SIZECHART_SUCCESS,
  GET_SIZECHART_PENDING,
  GET_SIZECHART_ERROR,
  GET_SIZECHART_SUCCESS,
  SIZECHART_DELETE_SUCCESS,
  SIZECHART_INSERT_SUCCESS,
  SIZECHART_MERGE_SUCCESS,
  SIZECHART_DATA_SUCCESS,
  SET_SIZECHART_CREATE,
  SIZECHART_CREATE_SUCCESS,
  SIZECHART_SET_SELECTMODE,
  SIZECHART_SELECTION_CLEAR,
  SIZECHART_SELECTION_CHANGE,
  SIZECHART_SET_CATEGORIES,
  SIZECHART_SET_BRANDS,
  SIZECHART_DATA_CLEAR,
  SIZECHART_UNDO,
  SIZECHART_REDO,
  SIZECHART_SET_IDENTIFIERS,
  SIZECHART_SET_SIZES,
  SET_SIZECHART_SUCCESS,
  SIZECHART_RULE_SET,
  SIZECHART_RESET,
  SIZECHART_MEASUREMENT_TOGGLE,
  SIZECHART_MEASUREMENT_GET,
  SIZECHART_SET_TABNAMES,
  SIZECHART_GET_TABNAMES_PENDING,
  SIZECHART_GET_TABNAMES_ERROR,
} from './sizeChartActionTypes'

export const initialState = {
  isSaveSizeChartPending: false,
  isSaveSizeChartError: false,
  isSaveSizeChartSuccess: false,
  isGetSizeChartPending: false,
  isGetSizeChartError: false,
  isGetSizeChartSuccess: false,
  newChart: false,
  hasSelection: false,
  selectMode: false,
  selectStart: { row: -1, col: -1, chart: -1 },
  selectEnd: { row: -1, col: -1, chart: -1 },
  identifiers: [],
  categories: [],
  brands: [],
  sizes: [],
  sizeChart: {
    category: '',
    brand: '',
    size: '',
    charts: [],
    categoryTitle: '',
    sizeChartTabName: '',
    disclaimer: 'All Sizes in Inches Unless Otherwise Stated',
    shopAllUrl: '',
    measurementCategory: '',
  },
  previousSizeCharts: [],
  stateIndex: -1,
  saveErrorMessage: '',
  howToMeasure: '<div><p>OOPS, Looks like we couldn\'t find this how to measure</p></div>',
  modified: false,
  useMeasurementGuide: true,
  sizeChartTabNames: [],
  isGetTabNamesError: false,
  isGetTabNamesPending: false,
}

export default function sizeChartReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_SIZECHART_SUCCESS: {
      const newState = {
        ...initialState,
        isSaveSizeChartSuccess: action.isSaveSizechartSuccess,
        modified: false,
        identifiers: state.identifiers,
        categories: state.categories,
      }
      return newState
    }
    case SET_SIZECHART_SUCCESS: {
      const newState = {
        ...state,
        isSaveSizeChartSuccess: action.value,
      }
      return newState
    }
    case SAVE_SIZECHART_ERROR: {
      const newState = {
        ...state,
        isSaveSizeChartError: action.isSaveSizechartError,
        saveErrorMessage: action.message ? action.message : 'Error Not Specified',
      }
      return newState
    }
    case SAVE_SIZECHART_PENDING: {
      const newState = {
        ...state,
        isSaveSizeChartPending: action.isSaveSizechartPending,
      }
      return newState
    }
    case SIZECHART_RULE_SET: {
      const newState = {
        ...state,
        sizeChart: {
          ...state.sizeChart,
          category: action.rule.category,
          brand: action.rule.brand,
          size: action.rule.size,
          ruleId: action.rule.id,
        },
      }
      return newState
    }
    case SIZECHART_SET_TABNAMES: {
      const newState = {
        ...state,
        sizeChartTabNames: action.sizeChartTabNames,
      }
      return newState
    }
    case SIZECHART_GET_TABNAMES_ERROR: {
      const newState = {
        ...state,
        isGetTabNamesError: action.isGetTabNamesError,
      }
      return newState
    }
    case SIZECHART_GET_TABNAMES_PENDING: {
      const newState = {
        ...state,
        isGetSizeChartPending: action.isGetSizeChartPending,
      }
      return newState
    }
    case GET_SIZECHART_SUCCESS: {
      const newSizeChart = {
        category: action.sizeChart.category,
        brand: action.sizeChart.brand,
        size: action.sizeChart.size,
        sizeChartId: action.sizeChart.id,
        disclaimer: action.sizeChart.disclaimer,
        sizeChartTabName: action.sizeChart.size_chart_tab_name,
        measuringGuides: action.sizeChart.measuring_guides,
        shopAllUrl: action.sizeChart.shop_all_url,
        categoryTitle: action.sizeChart.category_title === null ? action.sizeChart.category : action.sizeChart.category_title,
        charts: parseCharts(action.sizeChart.charts.slice(0)),
      }
      const newState = {
        ...state,
        sizeChart: newSizeChart,
        previousSizeCharts: [],
        stateIndex: -1,
        isGetSizeChartSuccess: true,
      }
      return newState
    }
    case GET_SIZECHART_ERROR: {
      const newState = {
        ...state,
        isGetSizeChartError: action.isGetSizechartError,
      }
      return newState
    }
    case GET_SIZECHART_PENDING: {
      const newState = {
        ...state,
        isGetSizeChartPending: action.isGetSizechartPending,
      }
      return newState
    }
    case SIZECHART_DELETE_SUCCESS: {
      const newState = {
        ...state,
        sizeChart: action.sizeChart,
        previousSizeCharts: [state.sizeChart, ...state.previousSizeCharts.slice(state.stateIndex)],
        hasSelection: false,
        selectMode: false,
        modified: true,
        selectStart: { row: -1, col: -1, chart: -1 },
        selectEnd: { row: -1, col: -1, chart: -1 },
      }
      return newState
    }
    case SIZECHART_INSERT_SUCCESS: {
      const newState = {
        ...state,
        previousSizeCharts: [state.sizeChart, ...state.previousSizeCharts.slice(state.stateIndex)],
        stateIndex: -1,
        sizeChart: action.sizeChart,
        selectStart: action.selectStart,
        selectEnd: action.selectEnd,
        modified: true,
      }
      return newState
    }
    case SIZECHART_MERGE_SUCCESS: {
      const newState = {
        ...state,
        sizeChart: action.sizeChart,
        previousSizeCharts: [state.sizeChart, ...state.previousSizeCharts.slice(state.stateIndex)],
        stateIndex: -1,
        selectStart: action.selectStart,
        selectEnd: action.selectEnd,
        modified: true,
      }
      return newState
    }
    case SIZECHART_DATA_SUCCESS: {
      const newState = {
        ...state,
        sizeChart: action.sizeChart,
        previousSizeCharts: [state.sizeChart, ...state.previousSizeCharts.slice(state.stateIndex)],
        stateIndex: -1,
        modified: true,
      }
      return newState
    }
    case SET_SIZECHART_CREATE: {
      const newState = {
        ...state,
        newChart: action.value,
      }
      return newState
    }
    case SIZECHART_CREATE_SUCCESS: {
      const newState = {
        ...state,
        newChart: false,
        modified: true,
        sizeChart: action.sizeChart,
        previousSizeCharts: [state.sizeChart, ...state.previousSizeCharts.slice(state.stateIndex)],
        stateIndex: -1,
      }
      return newState
    }
    case SIZECHART_SET_SELECTMODE: {
      const newState = {
        ...state,
        selectMode: action.value,
      }
      return newState
    }
    case SIZECHART_SELECTION_CHANGE: {
      const newState = {
        ...state,
        selectStart: action.selectStart,
        selectEnd: action.selectEnd,
        hasSelection: action.hasSelection,
      }
      return newState
    }
    case SIZECHART_SELECTION_CLEAR: {
      const newState = {
        ...state,
        selectStart: action.selectStart,
        selectEnd: action.selectEnd,
        hasSelection: false,
        selectMode: false,
      }
      return newState
    }

    // Set Search Terms for the type ahead text fields
    case SIZECHART_SET_CATEGORIES: {
      const newState = {
        ...state,
        categories: action.categories,
      }
      return newState
    }

    case SIZECHART_SET_BRANDS: {
      const newState = {
        ...state,
        brands: action.brands,
      }
      return newState
    }

    case SIZECHART_SET_SIZES: {
      const newState = {
        ...state,
        sizes: action.sizes,
      }
      return newState
    }

    case SIZECHART_DATA_CLEAR: {
      const newState = {
        ...initialState,
        categories: state.categories,
        brands: state.brands,
      }
      return newState
    }
    case SIZECHART_UNDO: {
      if (state.stateIndex + 1 === state.previousSizeCharts.length) {
        return state
      }
      const newState = {
        ...state,
        // pull the most recent state from the list of previous states
        sizeChart: state.previousSizeCharts[state.stateIndex + 1],
        stateIndex: state.stateIndex + 1,
      }
      return newState
    }
    case SIZECHART_REDO: {
      if (state.stateIndex - 1 < 0) {
        return state
      }
      const newState = {
        ...state,
        // pull the most recent state from the list of previous states
        sizeChart: state.previousSizeCharts[state.stateIndex - 1],
        stateIndex: state.stateIndex - 1,
      }
      return newState
    }
    case SIZECHART_SET_IDENTIFIERS:
      const newState = {
        ...state,
        // pull the most recent state from the list of previous states
        identifiers: action.identifiers,
      }
      return newState
    case SIZECHART_RESET: {
      const newState = {
        ...initialState,
        identifiers: state.identifiers,
      }
      return newState
    }
    case SIZECHART_MEASUREMENT_TOGGLE: {
      const newState = {
        ...state,
        useMeasurementGuide: !state.useMeasurementGuide,
      }
      return newState
    }
    case SIZECHART_MEASUREMENT_GET: {
      return {
        ...state,
        howToMeasure: action.howToMeasure === '' || action.howToMeasure === undefined ? state.howToMeasure : action.howToMeasure,
      }
    }
    default:
      return state
  }
}

function parseCharts (inCharts) {
  var outCharts = []
  var i = 0
  for (i = 0; i < inCharts.length; i++) {
    outCharts.push({
      data: inCharts[i].data,
      header: inCharts[i].header,
      brandTitle: inCharts[i].brand_title,
      sizeTitle: inCharts[i].size_title,
    })
  }
  return outCharts
}
