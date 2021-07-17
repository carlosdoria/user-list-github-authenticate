import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CardRepository } from 'components'
import { useUser } from 'hooks/useUser'
import { GoSearch } from 'react-icons/go'

import styles from '../styles/index.module.scss'

export default function App () {
  const inputRef = useRef<HTMLInputElement>(null)
  const { user, repositories, getUserRepositories, getRepositories } = useUser()

  const [ typeRequest, setTypeRequest ] = useState('repos')

  function submitRequest (keyCode: string) {
    if (keyCode === 'Enter') {
      if (inputRef.current === null) return
      getUserRepositories(inputRef.current.value, typeRequest)
    }
  }

  return (
    <main>
      <section className={styles.searchBar}>
        <h1 className={styles.searchBar__title}>Buscar por usuário github</h1>
        <div className={styles.searchBar__boxInput}>
          <GoSearch color='black' />
          <input
            type='text'
            placeholder='Digite o nome do usuário'
            // onChange={(event => getUserRepositories(event.target.value, typeRequest))}
            // onKeyPress={event => getUserRepositories(event.target.value, typeRequest)}
            onKeyPress={event => submitRequest(event.key)}
            ref={inputRef}
            className={`${styles.searchBar__input} ${styles.searchBar__input_a}`}
          />
        </div>
        <div className={styles.searchBar__boxButtons}>
          <button
            className={`${styles.searchBar__button} ${typeRequest === 'repos' ? styles.searchBar__button_modSelected : ''}`}
            onClick={ () => {
              getRepositories(user.login, 'repos')
              setTypeRequest('repos')
            }}
          >
            Repositórios
          </button>
          <button
            className={`${styles.searchBar__button} ${typeRequest === 'starred' ? styles.searchBar__button_modSelected : ''}`}
            onClick={ () => {
              getRepositories(user.login, 'starred')
              setTypeRequest('starred')
            }}
          >
            Favoritados
          </button>
        </div>
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
                stargazers_count={repository.stargazers_count}
                forks_count={repository.forks_count}
                archived={repository.archived}
              />
            ))}
          </ul>
        }
      </section>
    </main>
  )
}
