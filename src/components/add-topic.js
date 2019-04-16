import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import firebase from '../lib/firebase'

export class AddTopic extends Component {
  state = {
    name: ''
  }

  updateNameState = (event) => {
    this.setState({ name: event.target.value })
  }

  addTopic = (event) => {
    event.preventDefault()
    if (this.state.name) {
      firebase.firestore().collection('topics').add({ uid: this.props.currentUser.uid, name: this.state.name, state: 'active' })
      this.setState({ name: '' })
    }
  }

  render () {
    return (
      <form onsubmit={this.addTopic} class='add-topic'>
        <fieldset>
          <legend>Add New Tally</legend>
          <label>
            <span>Name:</span>
            <input oninput={this.updateNameState} value={this.state.name} type='text' />
          </label>
          <button disabled={!this.state.name} type='submit' aria-label='Add'><img src='/assets/baseline-done-24px.svg' width='24' height='24' alt='Add' /></button>
        </fieldset>
      </form>
    )
  }
}

export default connect('currentUser')(AddTopic)
