import {
  CANCEL_UPLOAD,
  UPLOAD_INPROGRESS_START,
  ADD_FILES_UPLOAD,
  CLEAR_UPLOAD,
  VALUE_PERCENT,
  UPLOAD_FAILURES,
  TOTAL_FILES,
} from './actionType'
import axios from 'axios'
import {
  addedFiles,
  validNumberFiles,
  successfullUploads,
} from '../images/actionCreator'
import {
  addedFilesVideo,
  validNumberFilesVideos,
  successfullUploadsVideos,
} from '../videos/actionCreator'

import envConfigs from '../../config/apiConfig'
import _ from 'lodash'

var activeFiles = []
var errorFiles = []

var videoSaveBody = {}
var groupJobId = null
var sendDeleteAsset = []
var uploadMessage = ''
var totalFilesToAdd = 0

export function uploadStart (userEmail, data, assetType, saveRequestBody = {}, externalGroupJobId = null, deleteAsset = []) {
  if (data.length > 0) {
    totalFilesToAdd = data.length
    if (!_.isEmpty(saveRequestBody)) {
      videoSaveBody = saveRequestBody
    }
    groupJobId = externalGroupJobId
    sendDeleteAsset = deleteAsset

    if (data.length > envConfigs.uploadStandards.maxNumberofFiles) {
      for (var i = 0; i < envConfigs.uploadStandards.maxNumberofFiles; i++) {
        activeFiles.push(data[i])
      }
      data.splice(0, envConfigs.uploadStandards.maxNumberofFiles)
    } else {
      _.each(data, function (file) {
        activeFiles.push(file)
      })
      data.splice(0, envConfigs.uploadStandards.maxNumberofFiles)
    }
    return dispatch => {
      dispatch(totalNumberFiles(totalFilesToAdd))
      dispatch(chunkStartRequest(userEmail, activeFiles, data, assetType))
      dispatch(uploadInProgressStart())
    }
  } else {
    if (!_.isEmpty(saveRequestBody)) {
      videoSaveBody = saveRequestBody
    }
    groupJobId = externalGroupJobId
    sendDeleteAsset = deleteAsset
    return dispatch => {
      dispatch(updateSavedGroup())
    }
  }
}

function uploadInProgressStart () {
  return {
    type: UPLOAD_INPROGRESS_START,
    payload: {
      uploadInProgress: true,
    },
  }
}

export function addFilesToQueue (files) {
  return {
    type: ADD_FILES_UPLOAD,
    payload: {
      uploadData: files,
    },
  }
}

function chunkStartRequest (userEmail, activeFiles, data, assetType) {
  var uploadAssetTo = assetType === 'images' ? 'INTERNAL' : 'GUEST'
  return dispatch => {
    _.each(activeFiles, function (value) {
      return axios.post(envConfigs.vaultEnvURL.url + envConfigs.vaultEnvURL.sessionStartPath, { targets: [uploadAssetTo] },
        { headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        })
        .then(res => {
          value.chunkSize = envConfigs.uploadStandards.chunkSize
          value.sizeOfFile = value.size
          value.numberOfChunks = Math.ceil(value.sizeOfFile / value.chunkSize)
          value.currentChunk = 0
          value.retry = 0
          if (assetType === 'video') {
            videoSaveBody.external_job_requests.push({
              job_id: res.data.upload_id,
              file_name: value.name,
              type: value.assetType,
              status: 'Complete',
              source: 'vendor',
              user_info: {
                email_id: userEmail,
                vendor_name: userEmail.split('@')[1].split('.')[0],
              },
            })
          }
          dispatch(chunkUpload(res.data.upload_id, userEmail, value, activeFiles, data, assetType))
          // dispatch(saveRequest(res.data.upload_id, userEmail, value, activeFiles, data, assetType))
        }).catch((error, data) => {
          // Handle error
          dispatch(updatePercent(value, -1))
          dispatch(errorHandler(value.name, error))
          _.remove(activeFiles, function (n) { return n === value })
        })
    })
  }
}

function saveRequest (jobid, userEmail, value, assetType) {
  let fileName = value.name
  let fileNmaeNoExtension = fileName.split('.')
  let suffix = fileNmaeNoExtension[0].split('_')
  let companyName = userEmail.split('@')[1].split('.')
  let requestBody = {
    job_id: jobid,
    tcin: suffix[0],
    view_type: suffix[1] ? 'alternate' : 'primary',
    suffix: suffix[1] ? suffix[1] : '00',
    file_name: value.name,
    type: 'image',
    source: 'vendor',
    status: 'Complete',
    user_info: {
      email_id: userEmail,
      vendor_name: companyName[0],
    },
  }
  return dispatch => {
    return axios.post(envConfigs.vaultEnvURL.saveJobApi + envConfigs.vaultEnvURL.saveJob, requestBody)
      .then(res => {
        dispatch(updatePercent(value, 101))
        _.remove(activeFiles, function (n) { return n === value })
      }).catch((error, data) => {
        dispatch(updatePercent(value, -1))
        dispatch(errorHandler(value.name, error))
        _.remove(activeFiles, function (n) { return n === value })
      })
  }
}

function saveRequestFail (jobid, userEmail, value, assetType) {
  let fileName = value.name
  let fileNmaeNoExtension = fileName.split('.')
  let suffix = fileNmaeNoExtension[0].split('_')
  let companyName = userEmail.split('@')[1].split('.')
  let requestBody = {
    job_id: jobid,
    tcin: suffix[0],
    view_type: suffix[1] ? 'alternate' : 'primary',
    suffix: suffix[1] ? suffix[1] : '00',
    file_name: value.name,
    type: 'image',
    source: 'vendor',
    status: 'Error',
    user_info: {
      email_id: userEmail,
      vendor_name: companyName[0],
    },
  }
  return dispatch => {
    return axios.post(envConfigs.vaultEnvURL.saveJobApi + envConfigs.vaultEnvURL.saveJob, requestBody)
      .then(res => {
        dispatch(updatePercent(value, 101))
        _.remove(activeFiles, function (n) { return n === value })
      }).catch((error, data) => {
        dispatch(updatePercent(value, -1))
        dispatch(errorHandler(value.name, error))
        _.remove(activeFiles, function (n) { return n === value })
      })
  }
}

function saveRequestGroup () {
  uploadMessage = 'Successfully Uploaded Video Group'
  return dispatch => {
    return axios.post(envConfigs.vaultEnvURL.saveJobApi + envConfigs.vaultEnvURL.saveGroupJob, videoSaveBody)
      .then(res => {
        setTimeout(() => {
          dispatch(clearUploader())
          dispatch(addedFilesVideo([]))
          dispatch(validNumberFilesVideos(0))
          dispatch(successfullUploadsVideos(uploadMessage))
          dispatch(totalNumberFiles(0))
        }, 2000)
      }).catch((error, data) => {
        dispatch(errorHandler(error))
      })
  }
}

function updateSavedGroup () {
  uploadMessage = 'Successfully Updated Video Group'
  let requestBody = { child_jobs_to_add: [],
    child_jobs_to_delete: sendDeleteAsset,
  }
  videoSaveBody.external_job_requests.map(function (item) {
    requestBody.child_jobs_to_add.push(item)
  })
  return dispatch => {
    return axios.post(envConfigs.vaultEnvURL.saveJobApi + envConfigs.vaultEnvURL.updateGroupJob + '/' + groupJobId + envConfigs.vaultEnvURL.updateGroupKey, requestBody)
      .then(res => {
        setTimeout(() => {
          dispatch(clearUploader())
          dispatch(addedFilesVideo([]))
          dispatch(validNumberFilesVideos(0))
          dispatch(successfullUploadsVideos(uploadMessage))
          dispatch(totalNumberFiles(0))
        }, 2000)
      }).catch((error, data) => {
        dispatch(errorHandler(error))
      })
  }
}
// headers: {
//   'Content-Type': 'application/json;charset=UTF-8',
//
//   UploadChunks: true,
//   Pragma: 'no-cache',
// },

function chunkUpload (jobid, userEmail, value, activeFiles, data, assetType) {
  var chunkedFormData = new window.FormData()
  chunkedFormData.append('chunkUploadRequest', new window.Blob([JSON.stringify({
    upload_id: jobid,
    file_name: value.name,
    chunk_number: value.currentChunk,
    total_number_of_chunks: value.numberOfChunks,
    chunk_size: value.chunkSize,
    total_file_size: value.sizeOfFile,
    content_type: assetType,
  })], {
    type: 'application/json',
  }))
  chunkedFormData.append('file', value.slice(value.currentChunk * value.chunkSize, (value.currentChunk + 1) * value.chunkSize))
  return dispatch => {
    return axios.post(envConfigs.vaultEnvURL.url + envConfigs.vaultEnvURL.sessionUploadPath, chunkedFormData)
      .then(res => {
        value.currentChunk++
        if (value.currentChunk <= value.numberOfChunks) {
          var percentageComplete = ((value.currentChunk + 1) / value.numberOfChunks) * 100
          dispatch(updatePercent(value, percentageComplete))
          dispatch(chunkUpload(jobid, userEmail, value, activeFiles, data, assetType))
        } else {
          dispatch(chunckComplete(jobid, userEmail, value, activeFiles, data, assetType))
        }
      }).catch((error, data) => {
        if (value.retry === envConfigs.uploadStandards.maxRetry) {
          dispatch(updatePercent(value, -1))
          dispatch(errorHandler(value.name, error))
          if (assetType === 'images') {
            dispatch(saveRequestFail(jobid, userEmail, value, assetType))
          }
          if (assetType === 'video') {
            videoSaveBody.external_job_requests.map(function (data) {
              if (data.job_id === jobid) {
                data.status = 'Error'
              }
            })
          }
        } else {
          value.retry++
          setTimeout(() => {
            dispatch(chunkUpload(jobid, userEmail, value, activeFiles, data, assetType))
          }, envConfigs.uploadStandards.timeout)
        }
      })
  }
}

function updatePercent (data, percent) {
  return {
    type: VALUE_PERCENT,
    payload: {
      fileName: data.name,
      percent: percent,
    },
  }
}

function chunckComplete (jobid, userEmail, value, activeFiles, data, assetType) {
  let params = {
    job_id: jobid,
    user_id: userEmail,
    vault_upload_status: '',
    original_asset_name: value.name,
    content_signature: '',
    asset_content_type: '',
    asset_size: value.size,
    metadata: '',
    user_email_address: userEmail,
    asset_relationship: assetType === 'images' ? 'standalone' : 'group',
  }
  var requestBody = {
    targets: assetType === 'images' ? ['INTERNAL'] : ['GUEST'],
    upload_id: jobid,
    file_name: value.name,
    total_number_of_chunks: value.numberOfChunks,
    chunk_size: value.chunkSize,
    total_file_size: value.sizeOfFile,
    content_type: assetType,
    metadata: JSON.stringify(params),
  }

  return dispatch => {
    return axios.post(envConfigs.vaultEnvURL.url + envConfigs.vaultEnvURL.sessionEndPath, requestBody)
      .then(res => {
        if (assetType === 'images') {
          _.remove(activeFiles, function (n) { return n === value })
          dispatch(saveRequest(jobid, userEmail, value, assetType))
          if (_.isEmpty(activeFiles)) {
            if (_.isEmpty(data)) {
              setTimeout(() => {
                dispatch(clearUploader())
                dispatch(addedFiles([]))
                dispatch(validNumberFiles(0))
                dispatch(successfullUploads())
                dispatch(totalNumberFiles(0))
              }, 2000)
            } else {
              dispatch(remainingFiles(userEmail, activeFiles, data, assetType))
            }
          }
        } else if (assetType === 'video') {
          _.remove(activeFiles, function (n) { return n === value })
          if (_.isEmpty(activeFiles)) {
            if (_.isEmpty(data)) {
              if (groupJobId !== null) {
                dispatch(updateSavedGroup())
              } else {
                dispatch(saveRequestGroup())
              }
            }
          }
        }
      }).catch((error) => {
        if (value.retry === envConfigs.uploadStandards.maxRetry) {
          dispatch(updatePercent(value, -1))
          dispatch(errorHandler(value.name, error))
          if (assetType === 'images') {
            dispatch(saveRequestFail(jobid, userEmail, value, assetType))
          }
          if (assetType === 'video') {
            videoSaveBody.external_job_requests.map(function (data) {
              if (data.job_id === jobid) {
                data.status = 'Error'
              }
            })
          }
        } else {
          value.retry++
          setTimeout(() => {
            dispatch(chunckComplete(jobid, userEmail, value, activeFiles, data))
          }, envConfigs.uploadStandards.timeout)
        }
      })
  }
}
function remainingFiles (userEmail, activeFiles, data, assetType) {
  if (data.length > envConfigs.uploadStandards.maxNumberofFiles) {
    for (var i = 0; i < envConfigs.uploadStandards.maxNumberofFiles; i++) {
      activeFiles.push(data[i])
    }
    data.splice(0, envConfigs.uploadStandards.maxNumberofFiles)
  } else {
    _.each(data, function (file) {
      activeFiles.push(file)
    })
    data.splice(0, envConfigs.uploadStandards.maxNumberofFiles)
  }
  return dispatch => {
    dispatch(chunkStartRequest(userEmail, activeFiles, data, assetType))
  }
}
// export function uploadCancel () {
//   return {
//     type: UPLOAD_START,
//     payload: {
//       uploadInProgress: false,
//     },
//   }
// }
function clearUploader () {
  return {
    type: CLEAR_UPLOAD,
    payload: {
      uploadInProgress: false,
      fileQueue: [],
      uploadData: [],
    },
  }
}

export function cancelUpload () {
  return dispatch => {
    dispatch(uploadCancelSuccessfull())
    dispatch(refreshPage())
  }
}

function uploadCancelSuccessfull () {
  return {
    type: CANCEL_UPLOAD,
    payload: {
      uploadInProgress: false,
      fileQueue: [],
      uploadData: [],
    },
  }
}

function refreshPage () {
  setTimeout(() => {
    window.location.reload()
  }, 500)
}

function errorHandler (value, error) {
  errorFiles = { data: value, error: error }
  return {
    type: UPLOAD_FAILURES,
    payload: {
      uploadErrorFiles: errorFiles,
    },
  }
}

function totalNumberFiles (value) {
  return {
    type: TOTAL_FILES,
    payload: {
      totalFiles: value,
    },
  }
}
