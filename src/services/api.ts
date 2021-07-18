import axios from 'axios'

axios.defaults.headers.post[ 'Access-Control-Allow-Origin' ] = '*'
axios.defaults.headers.post[ 'Content-type' ] = 'application/x-www-form-urlencoded; charset=utf-8'
axios.defaults.headers.post[ 'Access-Control-Allow-Methods' ] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS'

export const api = axios.create({
  baseURL: 'https://api.github.com/users/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export const apiAuth = axios.create({
  baseURL: 'https://github.com/login/oauth/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
})
