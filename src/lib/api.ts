import axios, { AxiosInstance } from 'axios'

import { AppError } from '../utils/AppError'

type APIInstanceProps = AxiosInstance & {
  registerErrorInterceptor: () => () => void
}

export const api = axios.create({
  baseURL: 'http://localhost:3333',
}) as APIInstanceProps

api.registerErrorInterceptor = () => {
  const errorInterceptor = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      } else {
        return Promise.reject(
          new AppError('Error no servidor. Tente novamente mais tarde'),
        )
      }
    },
  )
  return () => {
    api.interceptors.response.eject(errorInterceptor)
  }
}
