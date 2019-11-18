import { h } from 'preact'
import { Link } from 'preact-router/match'

const Footer = () => (
  <footer>
    <nav>
      <Link href='/privacy-policy'>Privacy Policy</Link>
      <Link href='/terms-of-service'>Terms Of Service</Link>
    </nav>
    <p><a href='https://fresh.codes'><img src='/assets/fresh-codes.svg' alt='Fresh Codes' width='200' /></a></p>
  </footer>
)

export default Footer
