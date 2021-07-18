import axios from 'axios'

axios.defaults.headers.post[ 'Access-Control-Allow-Origin' ] = '*'

const username = process.env.NEXT_PUBLIC_CLIENT_USERNAME || ''
const password = process.env.NEXT_PUBLIC_CLIENT_TOKEN || ''

export const api = axios.create({
  baseURL: 'https://api.github.com/users/',
  auth: {
    username,
    password
  }
})
