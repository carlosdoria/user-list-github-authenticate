import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CardRepository } from 'components'
import { useUser } from 'hooks/useUser'

import styles from '../styles/index.module.scss'

export default function App () {
  const { user, repositories, getUserRepositories, getRepositories } = useUser()

  const [ typeRequest, setTypeRequest ] = useState('repos')

  return (
    <main className={styles.container}>
      <section>
        <input
          type='text'
          placeholder='Nome do usuário'
          onChange={(event => getUserRepositories(event.target.value, typeRequest))}
        />
        <div>
          <button onClick={ () => {
            getRepositories(user.login, 'repos')
            setTypeRequest('repos')
          }}>
            Repositórios
          </button>
          <button onClick={ () => {
            getRepositories(user.login, 'starred')
            setTypeRequest('starred')
          }}>
            Favoritados
          </button>
        </div>
      </section>

      <section>
        <h1>Usuário</h1>
        {user.login &&
          <div>
            <Image
              src={user.avatar_url}
              width={100}
              height={100}
              alt='Foto do perfil'
            />
            <h3>{user.name}</h3>
            <p>{user.bio}</p>
            <Link href={`/user/${user.login}`}>Mais detalhes</Link>
          </div>
        }
      </section>

      <section>
        <h1>
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
