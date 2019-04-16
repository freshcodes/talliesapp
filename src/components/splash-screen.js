import { h } from 'preact'

export default function SplashScreen ({ show }) {
  return (
    <div id='splash' class={show === true ? 'visible' : 'hidden'}>
      <div>
        <h1>Tallies.app</h1>
        <p>Loading...</p>
      </div>
    </div>
  )
}
