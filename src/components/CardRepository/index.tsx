import styles from './styles.module.scss'

interface IRepository {
  name: string
  language: string
  html_url: string
  archived: boolean
}

export function CardRepository ({
  name,
  language,
  html_url,
  archived,
}: IRepository) {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h3 className={styles.card__username}>{name}</h3>
        {archived &&
          <span className={styles.card__status}>Arquivado</span>
        }
      </div>
      <p className={styles.card__language}>{language}</p>
      <a
        href={html_url}
        target='_blank'
        rel="noreferrer"
        className={styles.card__link}
      >
        Ir para o repositório
      </a>
    </div>
  )
}
