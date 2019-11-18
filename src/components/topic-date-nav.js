import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import { topicDateNavActions } from '../lib/store'

export class TopicDateNav extends Component {
  get isCurrentDateToday () {
    const { currentDate, today } = this.props
    return currentDate.getTime() === today.getTime()
  }

  get formattedDate () {
    if (this.isCurrentDateToday) return 'Today'

    const dateFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    return this.props.currentDate.toLocaleDateString('en-US', dateFormatOptions)
  }

  render ({ goToPreviousDay, goToNextDay }) {
    return (
      <nav class='topic-date-nav'>
        <button type='button' onclick={goToPreviousDay} aria-label='Previous Day'><img src='/assets/baseline-navigate_before-24px.svg' width='24' height='24' /></button>
        <span class='date'>{this.formattedDate}</span>
        <button disabled={this.isCurrentDateToday} type='button' onclick={goToNextDay} aria-label='Next Day'><img src='/assets/baseline-navigate_next-24px.svg' width='24' height='24' /></button>
      </nav>
    )
  }
}

export default connect('currentDate,today', topicDateNavActions)(TopicDateNav)
