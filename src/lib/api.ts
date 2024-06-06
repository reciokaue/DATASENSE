import axios from 'axios'

import { AppError } from '../utils/AppError'

const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(
        new AppError(
          error.response.data.message,
          error.response.data?.description || '',
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
