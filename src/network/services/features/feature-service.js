import BaseService from '@/network/base-service'

class FeatureService extends BaseService {
  constructor () {
    super(`${process.env.VUE_APP_API_PARTNER_CUSTOMIZATION}/features`)
  }
}

export default new FeatureService()
