import firebase from './firebase.js'
import * as firebaseui from 'firebaseui'

export const firebaseuiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/terms-of-service',
  privacyPolicyUrl: '/privacy-policy'
}

export const ui = new firebaseui.auth.AuthUI(firebase.auth())
