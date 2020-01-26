const TOKEN_KEY = 'authToken'
const USER_KEY = 'me'
const STORE_KEY = 'EMBP'

class AuthService {
  constrainLogin (router, redirect) {
    router.push({
      path: '/login',
      query: { redirect: JSON.stringify(redirect) }
    })
  }

  getMe () {
    return JSON.parse(localStorage.getItem(USER_KEY))
  }

  getToken () {
    return localStorage.getItem(TOKEN_KEY)
  }

  isAuthenticated () {
    return !!localStorage.getItem(TOKEN_KEY)
  }

  login (token, user) {
    if (token) {
      this.setToken(token)
    }
    this.setMe(user)
  }

  logout () {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(STORE_KEY)
  }

  setMe (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  setToken (token) {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

// TODO: Refactor authservice to export class and not an instance
export default new AuthService()
