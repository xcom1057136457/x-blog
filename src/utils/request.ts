import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

const instance = axios.create({
  baseURL: '',
  withCredentials: true,
  timeout: 3000,
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(response.data)
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export default instance
