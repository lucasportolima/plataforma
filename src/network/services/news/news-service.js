import BaseService from '@/network/base-service'

class NewsService extends BaseService {
  constructor () {
    super(`${process.env.VUE_APP_API_PARTNER_CUSTOMIZATION}/news`)
  }

  list (offset, limit) {
    return this.get(`?offset=${offset}&limit=${limit}`)
  }

  bulkPatch (payload) {
    const route = 'bulk'
    const news = {
      publish: payload.publish,
      ids: payload.ids
    }
    return this.patch(news, route)
  }

  deleteBulk (payload) {
    const route = `bulk/?ids=${payload.join('&ids=')}`
    return this.delete(route)
  }

  searchNews (searchString, offset, limit) {
    return this.get(`?search=${searchString}&offset=${offset}&limit=${limit}`)
  }
}

export default new NewsService()
