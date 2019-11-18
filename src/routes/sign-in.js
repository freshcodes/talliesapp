import { h, Component } from 'preact'
import firebase from '../lib/firebase.js'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

const firebaseuiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/terms-of-service',
  privacyPolicyUrl: '/privacy-policy'
}

export class SignIn extends Component {
  componentDidMount () {
    this.firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
    this.firebaseUiWidget.start('#firebaseui-auth-container', firebaseuiConfig)
  }

  componentWillUnmount () {
    this.firebaseUiWidget.reset()
  }

  render () {
    return (
      <main class='sign-in'>
        <h2>Sign In</h2>
        <div id='firebaseui-auth-container' />
      </main>
    )
  }
}

export default SignIn
