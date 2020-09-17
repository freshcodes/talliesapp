/* global API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID */
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
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
}
firebase.initializeApp(firebaseConfig)

if ('serviceWorker' in navigator) {
  firebase.firestore().enablePersistence({ synchronizeTabs: true }).catch(err => {
    if (err.code === 'unimplemented') {
      console.debug('Could not enable persistence because the browser does not support it', err)
    } else {
      console.debug('Unknown persistence error:', err)
    }
  })
}

export default firebase
