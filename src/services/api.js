import axios from 'axios'

// export const BASE_URL = 'http://localhost:3001'
export const BASE_URL = 'https://sports-betting-be.herokuapp.com/'

const Client = axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
