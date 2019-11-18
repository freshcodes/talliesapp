import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import { topicActions } from '../lib/store'

import Topic from './topic'
import AddTopic from './add-topic'

export class Topics extends Component {
  state = {
    edit: false
  }

  renderTopics () {
    const topics = this.props.topics.map(topic => (<li key={topic.id}><Topic edit={this.state.edit} topic={topic} tallies={this.props.talliesForCurrentDate[topic.id] || 0} /></li>))
    return (<ul>{topics}</ul>)
  }

  renderEditButton () {
    const copy = this.state.edit ? 'Finished' : 'Manage Tallies'
    return (<button class='edit-tallies' type='button' onclick={() => { this.setState({ edit: !this.state.edit }) }}>{copy}</button>)
  }

  render () {
    return (
      <div class='topics'>
        {this.renderTopics()}
        <AddTopic />
        {this.renderEditButton()}
      </div>
    )
  }
}

export default connect('currentUser,currentDate,topics,talliesForCurrentDate', topicActions)(Topics)
