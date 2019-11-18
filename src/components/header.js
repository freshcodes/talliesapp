import { h } from 'preact'
import { Link } from 'preact-router/match'

const Header = ({ currentUser, signOut }) => (
  <header>
    <h1><a href='/'>Tallies.app</a></h1>
    <nav>
      {!currentUser && <Link activeClassName='active' href='/'>Sign In</Link>}
      {currentUser && <a activeClassName='active' onclick={() => signOut()}>Sign Out</a>}
    </nav>
  </header>
)

export default Header
