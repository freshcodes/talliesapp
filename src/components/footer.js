import { h } from 'preact'
import { Link } from 'preact-router/match'

const Footer = () => (
  <footer>
    <nav>
      <Link href='/privacy-policy'>Privacy Policy</Link>
      <Link href='/terms-of-service'>Terms Of Service</Link>
    </nav>
    <p>&copy; Copyright 2019 Fresh Codes LLC</p>
  </footer>
)

export default Footer
