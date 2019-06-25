import harbinger from 'harbinger'
import _ from 'lodash'
const SIGN_IN = 'auth/SIGN_IN'
const SIGN_IN_SUCCESS = 'auth/SIGN_IN_SUCCESS'
const SIGN_OUT = 'auth/SIGN_OUT'
const PROMPT_SIGN_IN = 'auth/PROMPT_SIGN_IN'
const DECLINE_SIGN_IN = 'auth/DECLINE_SIGN_IN'
const ADD_PERMISSON = 'auth/ADD_PERMISSON'

export const signIn = () => ({ type: SIGN_IN })

export const signInSuccess = payload => ({ type: SIGN_IN_SUCCESS, payload })

export const signOut = () => ({ type: SIGN_OUT })

export function addPermision (permission) {
  return {
    type: ADD_PERMISSON,
    payload: {
      permission: permission,
    },
  }
}

export const promptToSignIn = () => ({ type: PROMPT_SIGN_IN })

export const declineSignIn = () => ({ type: DECLINE_SIGN_IN })

const formatAdGroups = (groups = []) => {
  return groups.reduce((result, group) => {
    group.split(',').forEach(attribute => {
      if (attribute.indexOf('CN=') === 0) result.push(attribute.split('CN=')[1])
    })
    return result
  }, [])
}

const checkPermission = (userInfo) => {
  var permission = {
    isCepSuperUser: false,
    imgCurationEdit: false,
    imgReviewUpload: false,
    imgLabelsEdit: false,
    imgReview: false,
    sizeChartsEdit: false,
    videoUpload: false,
    videoReview: false,
    cgi: false,
    longCopy: false,
    copy: false,
    vendorTcinMap: false,
    specMismatch: false,
    hostName: window.location.host,
    deleteCopyFeature: false,
    instantEditLongCopy: false,
    badgesEdit: false,
  }
  harbinger.visitorId = userInfo.lanId
  // determine user access rights based on AD groups
  _.each(userInfo, function (group) {
    var upperGroup = group.toUpperCase()
    // DO NOT DELETE YET... WAIT UNTIL USERS ARE MIGRATED OUT TO CEP-ITEMDATA
    if (_.includes(upperGroup, 'APP-CEP-IMAGES-EDIT')) {
      permission.imgCurationEdit = true
      permission.imgReviewUpload = true
      harbinger.segment = 'IDS'
    }

    // ITEM DATA SPECIALIST
    if (_.includes(upperGroup, 'APP-CEP-ITEMDATA')) {
      permission.imgCurationEdit = true
      permission.imgReviewUpload = true
      permission.imgReview = true
      harbinger.segment = 'IDS'
    }

    // ITEM DATA SPECIALIST ADVANCED
    if (_.includes(upperGroup, 'APP-CEP-ITEMDATA-ADVANCED')) {
      permission.imgCurationEdit = true
      permission.imgReviewUpload = true
      permission.imgLabelsEdit = true
      permission.videoUpload = true
      permission.imgReview = true
      permission.videoReview = true
      harbinger.segment = 'IDS-Advanced'
    }

    // SITE MERCHANDISING
    if (_.includes(upperGroup, 'APP-CEP-SITEMERCH')) {
      permission.imgLabelsEdit = true
      permission.imgCurationEdit = true
      harbinger.segment = 'Site Merch'
    }

    // CONTENT PLANNING
    if (_.includes(upperGroup, 'APP-CEP-CONTENT')) {
      permission.imgCurationEdit = true
      permission.sizeChartsEdit = true
      permission.imgLabelsEdit = true
      permission.videoUpload = true
      permission.videoReview = true
      permission.copy = true
      permission.imgReviewUpload = true
      permission.longCopy = true
      permission.specMismatch = true
      permission.deleteCopyFeature = true
      permission.instantEditLongCopy = true
      permission.badgesEdit = true
      harbinger.segment = 'Content Planning'
    }

    // CGI --- IS THIS SOMETHING WE CAN DELETE? WE ARE NOT USING INTERNAL CGI, RIGHT?
    if (_.includes(upperGroup, 'APP-CEP-CGI')) {
      permission.cgi = true
      harbinger.segment = 'Cgi'
    }

    // COPY WRITERS (INTERNAL/INDIA)
    if (_.includes(upperGroup, 'APP-CEP-COPYWRITING')) {
      permission.longCopy = true
      harbinger.segment = 'Copy Writer'
    }

    // PIPELINE TEAM OR CGI TEAM
    if (_.includes(upperGroup, 'ADMN-CEP-PROD') || _.includes(upperGroup, 'APP-CEP-PIPELINE-TEAM')) {
      permission.isCepSuperUser = true
      permission.imgCurationEdit = true
      permission.imgLabelsEdit = true
      permission.videoUpload = true
      permission.videoReview = true
      permission.imgReviewUpload = true
      permission.cgi = true
      permission.longCopy = true
      permission.sizeChartsEdit = true
      permission.copy = true
      permission.imgReview = true
      permission.specMismatch = true
      permission.deleteCopyFeature = true
      permission.instantEditLongCopy = true
      permission.badgesEdit = true
      harbinger.segment = 'Pipeline Team'
    }

    // VENDOR PARTNER TYPE
    if (_.includes(upperGroup, 'APP-CEP-EXTVENDOR-UPLOAD')) {
      permission.imgCurationEdit = true
      permission.imgLabelsEdit = true
      permission.videoUpload = true
      permission.imgReviewUpload = true
      permission.cgi = true
      permission.vendorTcinMap = false
      harbinger.segment = 'Merch Vendor'
    }

    // MARKETING PARTNER TYPE
    if (_.includes(upperGroup, 'APP-CEP-MARKETING-PARTNER')) {
      permission.longCopy = true
      permission.vendorTcinMap = false
      harbinger.segment = 'Copywriter'
    }

    // SALES REP TYPE
    if (_.includes(upperGroup, 'POL-MULTI-PARTNER')) {
      permission.imgCurationEdit = true
      permission.imgLabelsEdit = true
      permission.videoUpload = true
      permission.imgReviewUpload = true
      permission.cgi = true
      permission.vendorTcinMap = false
      harbinger.segment = 'Sales Rep'
    }
  })
  return permission
}

export const formatUserInfo = (info = {}) => {
  return {
    email: info.mail,
    firstName: info.firstname,
    lanId: info.samaccountname,
    lastName: info.lastname,
    memberOf: formatAdGroups(info.memberof),
    permission: checkPermission(formatAdGroups(info.memberof)),
    accessToken: info.accessToken,
  }
}

export const initialState = {
  ...formatUserInfo(),
  isAuthorized: false,
  popupCount: 0,
  popupType: null,
  authModalIsShown: false,
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        popupType: 'login',
        popupCount: state.popupCount + 1,
      }

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        ...formatUserInfo(payload),
        isAuthorized: true,
        authModalIsShown: false,
      }

    case SIGN_OUT:
      return {
        ...state,
        ...formatUserInfo(),
        isAuthorized: false,
        popupType: 'logout',
        popupCount: state.popupCount + 1,
      }

    case PROMPT_SIGN_IN:
      return {
        ...state,
        authModalIsShown: true,
      }

    case DECLINE_SIGN_IN:
      return {
        ...state,
        ...formatUserInfo(),
        isAuthorized: false,
        authModalIsShown: false,
      }

    case ADD_PERMISSON:
      return {
        ...state,
        permission: payload.permission,
      }

    default:
      return state
  }
}

export default reducer
