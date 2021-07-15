import styles from './styles.module.scss'

interface IRepository {
  name: string
  language: string
  html_url: string
  stargazers_count: number
  forks_count: number
  archived: boolean
}

export function CardRepository ({
  name,
  language,
  html_url,
  stargazers_count,
  forks_count,
  archived,
}: IRepository) {
  return (
    <div>
      <h1>{name}</h1>
      <span>{archived ? 'Arquivado' : ''}</span>
      <p>{language}</p>
      <a href={html_url} target='_blank' rel="noreferrer">Ir para o repositório</a>
    </div>
  )
}
