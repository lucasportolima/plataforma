import axios from 'axios'
import AuthService from '@/network/services/auth/auth-service.js'
import Event from '@/plugins/event-bus'
import LayoutEvents from '@/plugins/layout-events'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    client_id: process.env.VUE_APP_CLIENT_ID,
    access_token: process.env.VUE_APP_ACCESS_TOKEN
  }
})

http.interceptors.request.use((config) => {
  const token = AuthService.getToken()

  if (token) {
    config.headers.Authorization = `${token}`
  }

  config.headers.Platform = 'web'

  return config
}, error => Promise.reject(error))

http.interceptors.response.use(response => response, (error) => {
  if (_.get(error, 'response.status') === 401) {
    Event.publish(
      LayoutEvents.DISPLAY_MESSAGE, {
        message: 'Sua sessão expirou',
        type: 'is-danger'
      }
    )
    AuthService.logout()
    const redirectProtocol = window.location.protocol
    const redirectHostname = window.location.hostname
    const redirectPort = `:${window.location.port}`
    const redirectRoute = '#/login'
    const redirectUrl = `${redirectProtocol}//${redirectHostname}${redirectPort}/${redirectRoute}`
    window.location.href = redirectUrl
  }
  return Promise.reject(error)
})

export default http
