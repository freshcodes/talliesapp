import { h } from 'preact'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'

import getToday from '../../src/lib/get-today'
import { TopicDateNav } from '../../src/components/topic-date-nav'

import firebasemock from 'firebase-mock'

const mockauth = new firebasemock.MockAuthentication()
const mockfirestore = new firebasemock.MockFirestore()
const mockstorage = new firebasemock.MockStorage()
const mockmessaging = new firebasemock.MockMessaging()
var mocksdk = new firebasemock.MockFirebaseSdk(
  null, // rtdb
  _ => mockauth,
  _ => mockfirestore,
  null, // storage
  null // messaging
)

jest.mock('../../src/lib/firebase', () => {
  return mocksdk
})

describe('Initial Test of the Header', () => {
  test('Show "Today" for formatted date', () => {
    const today = getToday()
    const noop = function () {}
    const context = shallow(<TopicDateNav currentDate={today} today={today} goToPreviousDay={noop} goToNextDay={noop} />)

    expect(context.find('span.date').text()).toBe('Today')
  })

  test('Show formatted date when not today', () => {
    const today = getToday()
    const yesterday = getToday()
    yesterday.setDate(yesterday.getDate() - 1)
    const noop = function () {}
    const context = shallow(<TopicDateNav currentDate={yesterday} today={today} goToPreviousDay={noop} goToNextDay={noop} />)

    const dateFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    const formatted = yesterday.toLocaleDateString('en-US', dateFormatOptions)

    expect(context.find('span.date').text()).toBe(formatted)
  })
})
