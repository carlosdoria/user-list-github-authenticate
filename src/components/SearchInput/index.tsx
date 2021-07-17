import { useUser } from 'hooks/useUser'
import { useRef, useState } from 'react'
import { GoSearch } from 'react-icons/go'
import styles from './styles.module.scss'

interface SearchInputProps {
  typeRequest: string
  handleTypeRequest: (type: string) => void
}

export function SearchInput ({ typeRequest, handleTypeRequest }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { user, repositories, getUserRepositories, getRepositories } = useUser()

  function submitRequest (keyCode: string) {
    if (keyCode === 'Enter') {
      if (inputRef.current === null) return
      getUserRepositories(inputRef.current.value, typeRequest)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__boxInput}>
        <GoSearch color='black' />
        <input
          type='text'
          placeholder='Digite o nome do usuário'
          // onChange={(event => getUserRepositories(event.target.value, typeRequest))}
          // onKeyPress={event => getUserRepositories(event.target.value, typeRequest)}
          onKeyPress={event => submitRequest(event.key)}
          ref={inputRef}
          className={`${styles.container__input} ${styles.container__input_a}`}
        />
      </div>
      <div className={styles.container__boxButtons}>
        <button
          className={`${styles.container__button} ${typeRequest === 'repos' ? styles.container__button_modSelected : ''}`}
          onClick={ () => {
            getRepositories(user.login, 'repos')
            handleTypeRequest('repos')
          }}
        >
          Repositórios
        </button>
        <button
          className={`${styles.container__button} ${typeRequest === 'starred' ? styles.container__button_modSelected : ''}`}
          onClick={ () => {
            getRepositories(user.login, 'starred')
            handleTypeRequest('starred')
          }}
        >
          Favoritados
        </button>
      </div>
    </div>
  )
}
