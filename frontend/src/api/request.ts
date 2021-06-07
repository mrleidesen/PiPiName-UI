import axios from 'axios'

const service = axios.create({
  timeout: 30000
})

export default service