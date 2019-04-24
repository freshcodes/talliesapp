import './style'
import { h } from 'preact'
import { Provider } from 'unistore/preact'
import { route } from 'preact-router'
import { store, loadTopics } from './lib/store'
import App from './components/app'
import firebase from './lib/firebase'

const start = Date.now()
firebase.auth().onAuthStateChanged(currentUser => {
  console.debug(`onAuthStateChanged (took ${(Date.now()) - start}ms)`, currentUser)

  store.setState({ currentUser: currentUser, showSplashScreen: false })

  if (!currentUser) {
    route('/sign-in')
    // Clearing out any user based data that might be in the store
    store.setState({ topics: [], topicRefs: {}, talliesForCurrentDate: [], tallyRefsForCurrentDate: {} })
  } else {
    // Kick off loading the topics since we have a currentUser
    loadTopics()
  }
}, error => {
  console.error(error)
  store.setState({ currentUser: null, showSplashScreen: false })
  route('/sign-in')
})

export default () => {
  return (<Provider store={store}><App /></Provider>)
}
