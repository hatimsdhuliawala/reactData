import { decodeBase64, getKey, getPayload, OAuthProvider } from 'react-oauth-openid'
import { signIn, signInSuccess, signOut } from '../../store/auth'
import apiConfig from '../../config/apiConfig'
import AuthModal from './AuthModal'
import { connect } from 'react-redux'
import Interceptor from './Interceptor'
import React from 'react'
import { showNotification } from '../../store/notification/actionCreator'
import { openstateHandler } from '../../store/signInPrompt/actionCreator'

const config = {
  authorizationUrl: `${apiConfig.auth.host}${apiConfig.auth.authorizationPath}`,
  clientId: apiConfig.auth.clientId,
  logoutUrl: `${apiConfig.auth.logoutHost}${apiConfig.auth.logoutPath}`,
  nonce: apiConfig.auth.nonce,
  popupOptions: apiConfig.auth.popupOptions,
  redirectUri: apiConfig.auth.redirectUri,
  responseType: apiConfig.auth.responseType,
  scope: apiConfig.auth.scope,
  storageType: apiConfig.auth.storageType,
  tokenType: apiConfig.auth.tokenType,
}

export class Auth extends React.Component {
  componentDidMount () {
    const userInfo = {
      accessToken: getKey('access_token'),
      ...getPayload('id_token'),
    }
    if (userInfo.accessToken) this.props.signInSuccess(userInfo)
  }

  handleError = error => {
    this.props.showNotification(true, error.message)
  }

  handleSuccess = response => {
    const userInfo = {
      accessToken: response.access_token,
      ...decodeBase64(response.id_token),
    }
    this.props.signInSuccess(userInfo)
    this.props.openstateHandler(false)
  }

  render () {
    return (
      <div>
        <OAuthProvider
          config={config}
          errorCallback={this.handleError}
          successCallback={this.handleSuccess}
          popupType={this.props.popupType}
          showPopup={this.props.popupCount}
        />
        <Interceptor />
        <AuthModal />
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  popupType: auth.popupType,
  popupCount: auth.popupCount,
})

const mapDispatchToProps = {
  openstateHandler,
  showNotification,
  signIn,
  signInSuccess,
  signOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
