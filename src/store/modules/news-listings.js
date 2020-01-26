import * as MutationTypes from '@/store/helpers/mutation-types'
import { underLoadingFunction } from '@/store/helpers/under-loading'

import NewsService from '@/network/services/news/news-service.js'

const state = {
  features: [],
  newsListing: [],
  newsListingTotal: undefined
}

export const mutations = {
  [MutationTypes.SET_NEWS_LISTING] (state, news) {
    state.newsListing = news.data
    state.newsListingTotal = news.total
  }
}

const getters = {
  newsListing: state => state.newsListing,
  newsListingTotal: state => state.newsListingTotal
}

export const actions = {
  deleteMultipleNews: underLoadingFunction(async ({ commit }, ids) => NewsService.deleteBulk(ids)),

  getNewsListing: underLoadingFunction(async ({ commit }, offset = 1, limit = 8) => {
    const response = await NewsService.list(offset, limit)
    commit(MutationTypes.SET_NEWS_LISTING, response.data)
    return response
  }),

  getNewsListingSearch: underLoadingFunction(async ({ commit }, searchString, offset = 1, limit = 8) => {
    const response = await NewsService.searchNews(searchString, offset, limit)
    commit(MutationTypes.SET_NEWS_LISTING, response.data)
    return response
  }),

  toggleMultipleNewsStatus: underLoadingFunction(async ({ commit }, listing) => {
    const payload = {
      publish: listing.status,
      ids: listing.ids
    }
    return NewsService.bulkPatch(payload)
  })

}

export default {
  state,
  mutations,
  getters,
  actions
}
