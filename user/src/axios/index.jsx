import axios from 'axios'
import ReactDOM from 'react-dom/client'
import { Spin } from 'antd'
const instance = axios.create({
  // baseURL: 'http://localhost:3000/',
  baseURL: 'https://gogoship.azurewebsites.net/',
  timeout: 1000 * 30,
  headers: {
    token: localStorage.getItem('token') || '',
  }
})

let isLoading = false

const createLoading = () => {
  isLoading = true
  const dom = document.createElement('div')
  dom.setAttribute('id', 'loading')
  document.body.appendChild(dom)
  ReactDOM.createRoot(dom).render(<Spin fullscreen />)
}

const removeLoading = () => {
  document.body.removeChild(document.getElementById('loading'))
  isLoading = false
}

instance.interceptors.request.use(
  config => {
    if (!isLoading) {
      createLoading()
    }
    return config
  }
)

instance.interceptors.response.use(
  response => {
    removeLoading()
    return response.data
  },
  error => {
    removeLoading()
    return error
  }
)
export default instance
