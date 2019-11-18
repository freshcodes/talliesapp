import { h } from 'preact'

const Header = ({ currentUser, signOut }) => (
  <header>
    <h1><a href='/'>Tallies.app</a></h1>
    <nav>
      {!currentUser && <a href='/'>Sign In</a>}
      {currentUser && <a onclick={() => signOut()}>Sign Out</a>}
    </nav>
  </header>
)

export default Header
