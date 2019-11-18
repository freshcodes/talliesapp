/* global API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID */
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Initialize Firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
}
firebase.initializeApp(firebaseConfig)

// https://github.com/firebase/firebase-js-sdk/issues/801#issuecomment-388371097
if ('serviceWorker' in navigator) {
  firebase.firestore().enablePersistence().catch(err => {
    if (err.code === 'failed-precondition') {
      console.debug('Could not enable persistence because there are multiple tabs open', err)
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
    } else if (err.code === 'unimplemented') {
      console.debug('Could not enable persistence because the browser does not support it', err)
      // The current browser does not support all of the
      // features required to enable persistence
    } else {
      console.debug('Unknown persistence error:', err)
    }
  })
}

export default firebase
