import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'
import { useUser } from 'hooks/useUser'
import { useEffect } from 'react'
import { BiLinkExternal, BiArrowBack } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'

export default function User () {
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (!user.avatar_url){
      router.push('/')
    }
  }, [])

  return (
    <main className={styles.wrapper}>
      <Link href='/'>
        <a className={styles.wrapper__link}>
          <BiArrowBack size={30}/>
        </a>
      </Link>

      <section className={styles.socialMediaDetails}>
        <div className={styles.socialMediaDetails__contentImage}>
          {user.avatar_url &&
          <Image
            src={user.avatar_url}
            height={150}
            width={150}
            alt='Foto do usuário'
            className={styles.socialMediaDetails__image}
          />
          }
        </div>

        <h1 className={styles.socialMediaDetails__username}>{user.login}</h1>

        <div className={styles.socialMediaDetails__contentSocialMedia}>

          <span className={styles.socialMediaDetails__item}>
            <strong>{user.followers}</strong>
            <small className={styles.socialMediaDetails__socialMedia}>Seguidores</small>
          </span>

          <span className={styles.socialMediaDetails__item}>
            <strong>{user.following}</strong>
            <small className={styles.socialMediaDetails__socialMedia}>Seguindo</small>
          </span>

        </div>
      </section>

      <section className={styles.userDetails}>
        <h1 className={styles.userDetails__name}>{user.name}</h1>
        <p className={styles.userDetails__bio}>{user.bio}</p>
        {user.email &&
        <span className={styles.userDetails__link}>
          <AiOutlineMail />
          <a
            href={`mailto:${user.email}`}
          >
            {user.email}
          </a>
        </span>
        }
        {user.blog &&
        <span className={styles.userDetails__link}>
          <BiLinkExternal />
          <a
            href={user.blog}
            target='_blank'
            rel="noreferrer"
          >
            {user.blog}
          </a>
        </span>
        }
        <span className={styles.userDetails__link}>
          <BiLinkExternal />
          <a
            href={user.html_url}
            target='_blank'
            rel="noreferrer"
          >
          Ir para perfil do usuário
          </a>
        </span>
      </section>
    </main>
  )
}
