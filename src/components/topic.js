import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import { topicActions } from '../lib/store'

export class Topic extends Component {
  updateName = () => {
    let name = this.nameInput.value
    if (!name) this.nameInput.value = this.props.topic.name
    else if (name !== this.props.topic.name) this.props.updateTopicName(this.props.topic.id, name)
  }

  updateTallies = () => {
    let tallies = parseInt(this.talliesInput.value, 10)
    if (tallies < 0) this.talliesInput.value = this.props.tallies
    else if (tallies !== this.props.tallies) this.props.overwriteTalliesForCurrentDate(this.props.topic.id, tallies)
  }

  confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete this Tally?')) {
      this.props.markTopicForDeletion(this.props.topic.id)
    }
  }

  renderName (topic) {
    if (this.props.edit) {
      return (<span class='name'><input ref={input => { this.nameInput = input }} type='text' value={topic.name} onblur={this.updateName} /></span>)
    } else {
      return (<span class='name'>{topic.name}</span>)
    }
  }

  renderTallies (tallies) {
    if (this.props.edit) {
      return (<span class='count'><input ref={input => { this.talliesInput = input }} type='number' value={tallies} min='0' step='1' onblur={this.updateTallies} /></span>)
    } else {
      return (<span class='count'>{tallies}</span>)
    }
  }

  renderButtons (topic, tallies) {
    if (!this.props.edit) {
      return (
        <span class='buttons'>
          <button onclick={() => this.props.incrementForCurrentDate(topic.id)} aria-label={`Increment ${topic.name}`}><img src='assets/baseline-add_circle-24px.svg' width='24' height='24' alt='increment' /></button>
          <button disabled={tallies === 0} onclick={() => this.props.decrementForCurrentDate(topic.id)} aria-label={`Decrement ${topic.name}`}><img src='assets/baseline-remove_circle-24px.svg' width='24' height='24' alt='decrement' /></button>
        </span>
      )
    } else {
      return (
        <span class='buttons'>
          <button onclick={this.confirmDelete} aria-label={`Delete ${topic.name}`}><img src='assets/baseline-delete_forever-24px.svg' width='24' height='24' alt='delete' /></button>
        </span>
      )
    }
  }

  render ({ topic, tallies }) {
    return (
      <div class='topic'>
        {this.renderName(topic)}
        <span class='right'>
          {this.renderTallies(tallies)}
          {this.renderButtons(topic, tallies)}
        </span>
      </div>
    )
  }
}

export default connect('', topicActions)(Topic)
