import Link from 'next/link'
import styles from './styles.module.scss'
import { useUser } from 'hooks/useUser'

export default function User () {
  const { user } = useUser()

  return (
    <main className={styles.container}>
      <Link href='/'>Voltar</Link>
      <h1>{user.name}</h1>
    </main>
  )
}
