import axios from 'axios'
import config from '@/config'

const service = axios.create({
  baseURL: config.django.url(),
  timeout: 10000
})

service.interceptors.request.use(config => {
  console.log('[request]', config)
  return config
})

service.interceptors.response.use(response => {
  console.log('[response]', response)
  return response.data
})

export default service