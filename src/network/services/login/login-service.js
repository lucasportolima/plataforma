import BaseService from '@/network/base-service'

class LoginService extends BaseService {
  constructor () {
    super(`${process.env.VUE_APP_API_AUTH}/auth/login`)
  }
}

export default new LoginService()
