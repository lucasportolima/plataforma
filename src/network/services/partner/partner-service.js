import BaseService from '@/network/base-service'

class PartnerService extends BaseService {
  constructor () {
    super(`${process.env.VUE_APP_API_PARTNER_CUSTOMIZATION}/partners`)
  }

  list (offset, limit) {
    return this.get(`?offset=${offset}&limit=${limit}`)
  }

  bulkPatch (payload) {
    const route = 'bulk'
    const partners = {
      active: payload.active,
      ids: payload.ids
    }
    return this.patch(partners, route)
  }

  deleteBulk (payload) {
    const route = `bulk/?ids=${payload.join('&ids=')}`
    return this.delete(route)
  }

  searchPartner (searchString, offset, limit) {
    return this.get(`?search=${searchString}&offset=${offset}&limit=${limit}`)
  }
}

export default new PartnerService()
