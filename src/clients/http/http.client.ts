import axios from 'axios'

export const httpClient = axios.create({
  baseURL: 'https://on-maps-v2-backend.vercel.app',
})

export default httpClient
