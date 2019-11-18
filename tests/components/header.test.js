import { h } from 'preact'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'

import Header from '../../src/components/header'

describe('Header', () => {
  test('Has sign in link with no current user', () => {
    const context = shallow(<Header currentUser={null} signOut={function () {}} />)
    expect(context.find('a').length).toBe(2)
    expect(context.find('nav a').text()).toBe('Sign In')
  })

  test('Has sign out link with current user', () => {
    const context = shallow(<Header currentUser={true} signOut={function () {}} />)
    expect(context.find('a').length).toBe(2)
    expect(context.find('nav a').text()).toBe('Sign Out')
  })
})
