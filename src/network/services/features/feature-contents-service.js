import BaseService from '@/network/base-service'

class FeatureContentsService extends BaseService {
  constructor () {
    super(`${process.env.VUE_APP_API_PARTNER_CUSTOMIZATION}/feature_contents`)
  }

  getFeatureContentsAvaliable (infos) {
    return this.get(`?partner_id=${infos.partnerId}&feature_id=${infos.featureId}`)
  }

  bulkPatch (payload) {
    const route = 'bulk'
    const edit = {
      partner_id: payload.partnerId,
      contents: payload.contents
    }
    return this.patch(edit, route)
  }
}

export default new FeatureContentsService()
