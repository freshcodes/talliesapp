import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import { route } from 'preact-router'

import TopicDateNav from '../components/topic-date-nav'
import Topics from '../components/topics'

export class Home extends Component {
  componentWillMount () {
    if (!this.props.currentUser) return route('/sign-in')
  }

  render () {
    return (
      <div id='topic-listing'>
        <TopicDateNav />
        <Topics />
      </div>
    )
  }
}

export default connect('currentUser,currentDate')(Home)
