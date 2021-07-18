import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

import styles from './styles.module.scss'

export function Header () {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <a className={styles.header__logo}>
          <FaGithub
            size={50}
          />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
