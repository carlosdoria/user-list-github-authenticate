import { createContext, ReactNode, useContext, useState } from 'react'
import { api } from 'services/api'

interface UserProviderProps {
  children: ReactNode
}

interface IRepository {
  id: number
  name: string
  language: string
  html_url: string
  stargazers_count: number
  forks_count: number
  archived: boolean
}

interface IUser {
  id: number
  avatar_url: string
  name: string
  login: string
  bio: string
  email: string
  blog: string
  html_url: string
  public_repos: number
  followers: number
  following: number
}

interface UserContext {
  user: IUser
  repositories: IRepository[]
  getUserRepositories: (username: string, typeRequest: string) => Promise<void>
  getRepositories: (username: string, typeRequest: string) => Promise<void>
}

const UserContext = createContext({} as UserContext)

export function UserProvider ({ children }: UserProviderProps) {
  const [ repositories, setRepositories ] = useState<IRepository[]>([] as IRepository[])
  const [ user, setUser ] = useState<IUser>({} as IUser)

  async function getUserRepositories (username: string, typeRequest: string) {
    try {
      const responseUser = await api.get(`/${username}`)
      setUser(responseUser.data)
      await getRepositories(responseUser.data.login, typeRequest)
    } catch (error) {
      setUser({} as IUser)
      setRepositories([])
      console.error(error)
    }
  }

  async function getRepositories (username: string, typeRequest: string) {
    try {
      const responseRepos = await api.get(`/${username}/${typeRequest}`)
      const dataFormated = responseRepos.data.map((repository: IRepository) => ({
        id: repository.id,
        name: repository.name,
        language: repository.language,
        html_url: repository.html_url,
        archived: repository.archived,
      }))
      setRepositories(dataFormated)
    } catch (error) {
      setRepositories([])
      console.error(error)
    }
  }

  return (
    <UserContext.Provider value={{
      user,
      repositories,
      getUserRepositories,
      getRepositories,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser () {
  const context = useContext(UserContext)
  return context
}
