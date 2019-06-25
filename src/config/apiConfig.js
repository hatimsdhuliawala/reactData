import merge from 'lodash/merge'

const commonConfig = {
  auth: {
    authorizationPath: '/auth/oauth/v2/tgt/authorize/ad-pol/1',
    logoutPath: '/login/responses/logoff.html',
    popupOptions: { width: 482, height: 680 },
    redirectUri: `${window.location.origin}/auth/login`,
    responseType: 'token id_token',
    scope: ['openid profile'],
    storageType: 'localStorage',
    tokenType: 'Bearer',
  },
}

const envConfigs = {
  qa: {
    api: {
      imageHistory: 'item_assets/v1/external/image/history?page_number=',
      videoHistory: 'item_assets/v1/external/group_search/filtered_history?emailId=',
      gatewayKey: '8d783616af4f7906355dfcb9de903868caa7d6fd',
    },
    harbinger: {
      appId: 'deuwmu',
      apiKey: '2682a84d54de30d9eee4b2d59b8e545a94bc4f3c',
    },
    // image quality standards
    imageStandards: {
      minFileSize: 5000, // 5Kb
      maxFileSize: 100 * 1024 * 1024, // 100Mb
      allowedExtensionsRegex: /(jpg|jpeg|tif|tiff|png|psd)$/i,
      filenameRegex: /^([1-9][0-9]{4,7})(_[iI]mport){0,1}(?!_00)([_][0-9]{2}){0,1}$/,
    },
    uploadStandards: {
      maxNumberofFiles: 50,
      maxRetry: 10,
      chunkSize: 1024 * 1024, // 1 MB
      timeout: 10000, // 10sec
    },
  },
  stg: {
    api: {
      imageHistory: 'item_assets/v1/external/image/history?key=8d783616af4f7906355dfcb9de903868caa7d6fd&page_number=',
      videoHistory: 'item_assets/v1/external/group_search/filtered_history?key=8d783616af4f7906355dfcb9de903868caa7d6fd&emailId=',
      gatewayKey: '8d783616af4f7906355dfcb9de903868caa7d6fd',
    },
    harbinger: {
      appId: 'deuwmu',
      apiKey: '2682a84d54de30d9eee4b2d59b8e545a94bc4f3c',
    },
    // image quality standards
    imageStandards: {
      minFileSize: 5000, // 5Kb
      maxFileSize: 100 * 1024 * 1024, // 100Mb
      allowedExtensionsRegex: /(jpg|jpeg|tif|tiff|png|psd)$/i,
      filenameRegex: /^([1-9][0-9]{4,7})(_[iI]mport){0,1}(?!_00)([_][0-9]{2}){0,1}$/,
    },
    uploadStandards: {
      maxNumberofFiles: 50,
      maxRetry: 10,
      chunkSize: 1024 * 1024, // 1 MB
      timeout: 10000, // 10sec
    },
  },
  prod: {
    api: {
      imageHistory: 'item_assets/v1/external/image/history?key=485533e2d75d744c6c3a4abc673b59d4ea507db3&page_number=',
      videoHistory: 'item_assets/v1/external/group_search/filtered_history?key=485533e2d75d744c6c3a4abc673b59d4ea507db3&emailId=',
      gatewayKey: '485533e2d75d744c6c3a4abc673b59d4ea507db3',
    },
    harbinger: {
      appId: 'lwc0bo',
      apiKey: '2682a84d54de30d9eee4b2d59b8e545a94bc4f3c',
    },
    // image quality standards
    imageStandards: {
      minFileSize: 5000, // 5Kb
      maxFileSize: 100 * 1024 * 1024, // 100Mb
      allowedExtensionsRegex: /(jpg|jpeg|tif|tiff|png|psd)$/i,
      filenameRegex: /^([1-9][0-9]{4,7})(_[iI]mport){0,1}(?!_00)([_][0-9]{2}){0,1}$/,
    },
    uploadStandards: {
      maxNumberofFiles: 50,
      maxRetry: 10,
      chunkSize: 1024 * 1024, // 1 MB
      timeout: 10000, // 10sec
    },
  },
}

// env.js sets APP_ENV
const appEnv = process.env.APP_ENV
const config = envConfigs[appEnv]
const apiConfig = merge(commonConfig, config)

export default apiConfig
