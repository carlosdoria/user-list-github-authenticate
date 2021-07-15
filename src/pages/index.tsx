import { useState } from 'react'
import { api } from 'services/api'

interface IRepository {
  id: number
  name: string
  language: string
  html_url: string
  archived: boolean
}

export default function App () {
  const [ timeRequest, setTimeRequest ] = useState<any>()
  const [ repositories, setRepositories ] = useState<IRepository[]>()

  async function getUserRepositories (username: string, typeRequest: string) {
    if (timeRequest) clearTimeout(timeRequest)

    setTimeRequest(setTimeout(async () => {
      try {
        const { data } = await api.get(`/${username}/${typeRequest}`)
        // const dataFormated = data.map((repository: IRepository) => ({
        //   id: repository.id,
        //   name: repository.name,
        //   language: repository.language,
        //   html_url: repository.html_url,
        //   archived: repository.archived,
        // }))
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }, 2000))
  }

  return (
    <>
      <input type='text' placeholder='Nome do usuário' onChange={(event => getUserRepositories(event.target.value, 'repos'))} />
    </>
  )
}
