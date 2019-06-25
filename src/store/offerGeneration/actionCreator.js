import {
  REQUEST_OFFER_DATA,
  RECIEVE_OFFER_DATA,
  DISPLAY_ERROR_EVENT_OFFER_GENERATION,
  HIDE_ERROR_EVENT_OFFER_GENERATION,
  REQUEST_PRINTER_DATA,
  RECIEVE_PRINTER_DATA,
} from './actionType'
import axios from 'axios'
import envConfigs from '../../config/apiConfig'
import { reset } from 'redux-form'

export function hideErrorEventOfferGeneration (tcinList) {
  return {
    type: HIDE_ERROR_EVENT_OFFER_GENERATION,
  }
}

export function displayErrorEventOfferGeneration (errorMessage, showMessage) {
  return {
    type: DISPLAY_ERROR_EVENT_OFFER_GENERATION,
    payload: {
      isErrorMessageShownOfferGeneration: showMessage,
      errorMessageOfferGeneration: errorMessage,
    },
  }
}

export function getOfferGenerationData (offerId) {
  return dispatch => {
    dispatch(clearOfferGenerationData())
    dispatch(requestOfferGenerationData())
    dispatch(clearPrintData([]))
    return axios.post(`${envConfigs.api.offerGeneratorApi}generate/${offerId}`)
      .then(res => {
        dispatch(recieveOfferGenerationData(res.data))
      }).catch((err) => {
        dispatch(displayErrorEventOfferGeneration(err.response.data.message, true))
        dispatch(requestOfferGenerationData(false))
      })
  }
}

function requestOfferGenerationData (fetching = true) {
  return {
    type: REQUEST_OFFER_DATA,
    payload: {
      offerFetching: fetching,
    },
  }
}

function recieveOfferGenerationData (offerData) {
  return {
    type: RECIEVE_OFFER_DATA,
    payload: {
      offerGenerationData: [offerData],
      offerFetching: false,
    },
  }
}

function clearOfferGenerationData () {
  return {
    type: RECIEVE_OFFER_DATA,
    payload: {
      offerGenerationData: null,
      offerFetching: false,
    },
  }
}

export function resetForm () {
  return dispatch => {
    dispatch(reset('OfferGenerationForm'))
  }
}

export function printData (printerName, offerGenerationData) {
  let requestBody = offerGenerationData[0].request
  return dispatch => {
    dispatch(requestPrinterGenerationData())
    return axios.post(`${envConfigs.api.offerGeneratorApi}print/${printerName}`, requestBody)
      .then(res => {
        dispatch(recievePrinterGenerationData(res.data))
      }).catch((err) => {
        dispatch(displayErrorEventOfferGeneration(err.response.data.message, true))
        dispatch(requestPrinterGenerationData(false))
      })
  }
}

function requestPrinterGenerationData (fetching = true) {
  return {
    type: REQUEST_PRINTER_DATA,
    payload: {
      printerDataFetching: fetching,
    },
  }
}

function recievePrinterGenerationData (offerData) {
  return {
    type: RECIEVE_PRINTER_DATA,
    payload: {
      printerData: [offerData],
      printerDataFetching: false,
    },
  }
}

function clearPrintData () {
  return {
    type: RECIEVE_PRINTER_DATA,
    payload: {
      printerData: [],
      printerDataFetching: false,
    },
  }
}
