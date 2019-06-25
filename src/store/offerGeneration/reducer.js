import {
  REQUEST_OFFER_DATA,
  RECIEVE_OFFER_DATA,
  DISPLAY_ERROR_EVENT_OFFER_GENERATION,
  HIDE_ERROR_EVENT_OFFER_GENERATION,
  SET_PRINTER_ID,
  REQUEST_PRINTER_DATA,
  RECIEVE_PRINTER_DATA,
} from './actionType'
import { DefaultState } from '../../components/OfferGeneration/Components/OfferGenerationData'

export default function offerGenerationReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case DISPLAY_ERROR_EVENT_OFFER_GENERATION: {
      const { payload } = action
      const newState = {
        ...state,
        isErrorMessageShownOfferGeneration: payload.isErrorMessageShownOfferGeneration,
        errorMessageOfferGeneration: payload.errorMessageOfferGeneration,
      }
      return newState
    }
    case HIDE_ERROR_EVENT_OFFER_GENERATION: {
      const newState = {
        ...state,
        isErrorMessageShownOfferGeneration: false,
        errorMessageOfferGeneration: '',
      }
      return newState
    }
    case REQUEST_OFFER_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        offerFetching: payload.offerFetching,
      }
      return newState
    }
    case RECIEVE_OFFER_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        offerFetching: payload.offerFetching,
        offerGenerationData: payload.offerGenerationData,
      }
      return newState
    }
    case SET_PRINTER_ID: {
      const { payload } = action
      const newState = {
        ...state,
        printerId: payload.printerId,
      }
      return newState
    }
    case REQUEST_PRINTER_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        printerDataFetching: payload.printerDataFetching,
      }
      return newState
    }
    case RECIEVE_PRINTER_DATA: {
      const { payload } = action
      const newState = {
        ...state,
        printerDataFetching: payload.printerDataFetching,
        printerData: payload.printerData,
      }
      return newState
    }
    default:
      return state
  }
}
