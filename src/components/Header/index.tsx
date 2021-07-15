import styles from './styles.module.scss'

export function Header () {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.header__logo}>Header</h1>
      </div>
    </header>
  )
}
