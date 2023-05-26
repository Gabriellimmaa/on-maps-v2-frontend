import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export const httpClient: AxiosInstance = axios.create({
  baseURL: 'https://on-maps-v2-backend.vercel.app',
  // baseURL: 'http://localhost:3333',
})

httpClient.interceptors.request.use((config: any) => {
  const authToken = localStorage.getItem('authToken')

  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }

  return config
})

export default httpClient
