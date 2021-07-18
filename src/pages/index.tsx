import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CardRepository, SearchInput } from 'components'
import { useUser } from 'hooks/useUser'

import styles from '../styles/index.module.scss'

export default function App () {
  const { user, repositories, getUserRepositories, getRepositories } = useUser()

  const [ typeRequest, setTypeRequest ] = useState('repos')

  function handleTypeRequest (type: string) {
    setTypeRequest(type)
  }

  return (
    <main>
      <section className={styles.searchBar}>
        <h1 className={styles.searchBar__title}>Buscar por usuário github</h1>
        <SearchInput typeRequest={typeRequest} handleTypeRequest={handleTypeRequest} />
      </section>

      <section className={styles.user}>
        <h1 className={styles.user__title}>Usuário</h1>
        {user.login &&
          <div className={styles.user__card}>
            <div className={styles.user__contentImage}>
              <Image
                src={user.avatar_url}
                height={80}
                width={80}
                alt='Foto do usuário'
                className={styles.user__image}
              />
            </div>
            <div className={styles.user__info}>
              <h3 className={styles.user__username}>{user.name}</h3>
              <p className={styles.user__bio}>{user.bio}</p>
              <Link href={`/user/${user.login}`}>
                <a className={styles.user__link}>Mais detalhes</a>
              </Link>
            </div>
          </div>
        }
      </section>

      <section className={styles.repositories}>
        <h1 className={styles.repositories__title}>
          {typeRequest === 'repos' ?
            'Repositórios do usuário'
            :
            'Repositórios favoritados'
          }
        </h1>

        {repositories.length > 0 &&
          <ul>
            {repositories.map(repository => (
              <CardRepository
                key={repository.id}
                name={repository.name}
                language={repository.language}
                html_url={repository.html_url}
                archived={repository.archived}
              />
            ))}
          </ul>
        }
      </section>
    </main>
  )
}
