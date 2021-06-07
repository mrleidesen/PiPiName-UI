import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 30000
})

service.interceptors.response.use(
  res => res.data,
  err => err
)

export default service