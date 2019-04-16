import createStore from 'unistore'
import firebase from './firebase'
import getToday from './get-today'

const initialState = {
  lastUri: null,
  showSplashScreen: true,
  currentUser: null,
  today: getToday(),
  currentDate: getToday(),
  topics: [],
  topicRefs: {}, // by topic id
  talliesForCurrentDate: [],
  tallyRefsForCurrentDate: {} // by topic id
}

const store = createStore(initialState)

const actions = (store) => ({
  navigate (state, event) {
    if (typeof window !== 'undefined' && window.ga) window.ga('send', 'pageview', event.url)
    return { lastUri: event.url }
  },

  signOut (state) {
    firebase.auth().signOut().then(() => {
      console.debug('Signed out')
      // Sign-out successful.
    }).catch((error) => {
      console.error(error)
    })
  }
})

const topicActions = (store) => ({
  addTopic (state, name) {
    if (!name) return
    let doc = {
      uid: state.currentUser.uid,
      name: name,
      state: 'active'
    }
    let collection = firebase.firestore().collection('topics')
    collection.add(doc).catch(error => {
      console.debug(`Could not add topic: ${name}`, error)
    })
  },

  updateTopicName (state, topicId, name) {
    let ref = state.topicRefs[topicId]
    if (!ref || !name) return
    ref.update({ name: name }).catch(error => {
      console.debug(`Could not update topic name: ${topicId} ${name}`, error)
    })
  },

  markTopicForDeletion (state, topicId) {
    let ref = state.topicRefs[topicId]
    if (!ref) return
    ref.update({ state: 'deleted' }).catch(error => {
      console.debug(`Could not delete topic: ${topicId}`, error)
    })
  },

  incrementForCurrentDate (state, topicId) {
    let ref = state.tallyRefsForCurrentDate[topicId]
    if (ref) {
      let currentCount = state.talliesForCurrentDate[topicId]
      ref.update({ count: ++currentCount }).catch(error => {
        console.debug(`Could not increment (by adding to existing tally record) topic for current date: ${topicId} ${state.currentDate}`, error)
      })
    } else {
      let collection = firebase.firestore().collection('tallies')
      let doc = {
        topicid: topicId,
        uid: state.currentUser.uid,
        count: 1,
        date: state.currentDate
      }
      collection.add(doc).catch(error => {
        console.debug(`Could not increment (by creating tally record) topic for current date: ${topicId} ${state.currentDate}`, error)
      })
    }
  },

  decrementForCurrentDate (state, topicId) {
    let ref = state.tallyRefsForCurrentDate[topicId]
    if (!ref) return
    let currentCount = state.talliesForCurrentDate[topicId]
    let newCount = Math.max(0, --currentCount)
    ref.update({ count: newCount }).catch(error => {
      console.debug(`Could not decrement topic for current date: ${topicId} ${state.currentDate}`, error)
    })
  },

  overwriteTalliesForCurrentDate (state, topicId, count) {
    let ref = state.tallyRefsForCurrentDate[topicId]
    if (!ref) return
    ref.update({ count }).catch(error => {
      console.debug(`Could not overwrite tallies for current date: ${topicId} ${state.currentDate} ${count}`, error)
    })
  }
})

const topicDateNavActions = (store) => ({
  goToPreviousDay (state) {
    let date = new Date(state.currentDate.getTime())
    date.setDate(date.getDate() - 1)
    return { currentDate: date }
  },

  goToNextDay (state) {
    let date = new Date(state.currentDate.getTime())

    if (date.getTime() === state.today.getTime()) return

    date.setDate(date.getDate() + 1)
    return { currentDate: date }
  }
})

let topicsQuery, clearTopicsQueryOnSnapshot
function loadTopics () {
  let { currentUser } = store.getState()
  if (!currentUser) return // TODO: should this reset state?
  let collection = firebase.firestore().collection('topics')
  topicsQuery = topicsQuery || collection.where('uid', '==', currentUser.uid)
    .where('state', '==', 'active')
    .orderBy('name', 'asc')

  if (clearTopicsQueryOnSnapshot) clearTopicsQueryOnSnapshot()
  clearTopicsQueryOnSnapshot = topicsQuery.onSnapshot(snapshot => {
    if (!snapshot.size) return store.setState({ topics: [], topicRefs: {} })

    let topicRefs = {}
    let topics = snapshot.docs.map(doc => {
      topicRefs[doc.id] = doc.ref
      return Object.assign({ id: doc.id }, doc.data())
    })
    store.setState({ topics, topicRefs })
  })
  loadTopicTalliesForCurrentDate()
}

let clearTopicTalliesForCurrentDateQueryOnSnapshot
function loadTopicTalliesForCurrentDate () {
  let { currentUser, currentDate } = store.getState()
  if (!currentUser) return // TODO: should this reset state?
  let collection = firebase.firestore().collection('tallies')
  let query = collection.where('uid', '==', currentUser.uid)
    .where('date', '==', currentDate)

  if (clearTopicTalliesForCurrentDateQueryOnSnapshot) {
    clearTopicTalliesForCurrentDateQueryOnSnapshot()
    store.setState({ talliesForCurrentDate: [], tallyRefsForCurrentDate: {} })
  }

  clearTopicTalliesForCurrentDateQueryOnSnapshot = query.onSnapshot(snapshot => {
    if (!snapshot.size) return

    let talliesForCurrentDate = {}; let tallyRefsForCurrentDate = {}
    snapshot.docs.forEach(doc => {
      let data = doc.data()
      talliesForCurrentDate[data.topicid] = data.count
      tallyRefsForCurrentDate[data.topicid] = doc.ref
    })
    store.setState({ talliesForCurrentDate, tallyRefsForCurrentDate })
  })
}

// Listen for focus even for long running browser instances
// and check if today is still what we think it is
window.addEventListener('focus', () => {
  let actualToday = getToday()
  let { today, currentDate } = store.getState()

  // Advance today in state if today has changed
  if (today.getTime() !== actualToday.getTime()) store.setState({ today: actualToday })

  // Advance current date to today if today has changed and the user was on "today" view
  if (currentDate.getTime() === today.getTime()) {
    store.setState({ currentDate: actualToday })
    loadTopicTalliesForCurrentDate()
  }
}, false)

let previousCurrentDate
store.subscribe(function monitorCurrentDate (state) {
  if (!state.currentUser) return
  if (!previousCurrentDate) previousCurrentDate = state.currentDate
  if (previousCurrentDate.getTime() !== state.currentDate.getTime()) {
    // currentDate has changed, need to reload tallies
    previousCurrentDate = state.currentDate
    loadTopicTalliesForCurrentDate()
  }
})

export {
  store,
  actions,
  topicActions,
  topicDateNavActions,
  loadTopics
}
