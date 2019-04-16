import { h, Component } from 'preact'
import { Router } from 'preact-router'
import { connect } from 'unistore/preact'
import { actions } from '../lib/store'

import Header from './header'
import Footer from './footer'
import SplashScreen from './splash-screen'

// Code-splitting is automated for routes
import Home from '../routes/home'
import SignIn from '../routes/sign-in'
import About from '../routes/about'
import PrivacyPolicy from '../routes/privacy-policy'
import TermsOfService from '../routes/terms-of-service'

export class App extends Component {
  handleRoute = (event) => {
    this.props.navigate(event)
  }

  signOut = () => {
    this.props.signOut()
  }

  render ({ currentUser, showSplashScreen }) {
    let app = (
      <div>
        <Header currentUser={currentUser} signOut={this.signOut} />
        <Router onChange={this.handleRoute}>
          <Home path='/' />
          <SignIn path='/sign-in' />
          <About path='/about' />
          <PrivacyPolicy path='/privacy-policy' />
          <TermsOfService path='/terms-of-service' />
        </Router>
        <Footer />
      </div>
    )
    return (
      <div id='app'>
        { !showSplashScreen && app }
        <SplashScreen show={showSplashScreen} />
      </div>
    )
  }
}

export default connect('showSplashScreen,currentUser', actions)(App)
