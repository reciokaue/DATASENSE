import axios from 'axios'

import { AppError } from '../utils/AppError'

const api = axios.create({
  baseURL: 'http://192.168.15.12:3333',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(
        new AppError(
          error.response.data.message,
          error.response.data?.description || '',
          error,
        ),
      )
    } else {
      const message =
        error.message === 'Network Error'
          ? 'Erro na conexão'
          : 'Error no servidor. Tente novamente mais tarde'

      return Promise.reject(new AppError(message, ''))
    }
  },
)

export { api }
