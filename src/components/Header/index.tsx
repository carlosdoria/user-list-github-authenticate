import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { apiAuth } from 'services/api'

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
            <a
              href='https://github.com/login/oauth/authorize?client_id=563737ece7b04efef268'
              // target='_blank'
              // rel="noreferrer"
              className={styles.card__link}
            >
              Autenticar
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
