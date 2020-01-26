import * as MutationTypes from '@/store/helpers/mutation-types'
import { underLoadingFunction } from '@/store/helpers/under-loading'

import FilesService from '@/network/services/files/files-service'
import NewsService from '@/network/services/news/news-service'

const state = {
  id: undefined,
  title: undefined,
  banner_url: undefined,
  content: undefined,
  partners: [],
  published_at: undefined
}

export const mutations = {
  [MutationTypes.SET_CURRENT_NEWS] (state, news) {
    state.id = news.id
    state.title = news.title
    state.banner_url = news.banner_url
    state.content = news.content
    state.partners = news.partners
    state.published_at = news.published_at
  },

  [MutationTypes.SET_NEWS_TITLE] (state, title) {
    state.title = title
  },

  [MutationTypes.SET_NEWS_BANNER] (state, url) {
    state.banner_url = url
  },

  [MutationTypes.SET_NEWS_CONTENT] (state, content) {
    state.content = content
  },

  [MutationTypes.SET_NEWS_PARTNERS] (state, partners) {
    state.partners = partners
  },

  [MutationTypes.RESET_NEWS] (state) {
    state.id = null
    state.title = null
    state.banner_url = null
    state.content = null
    state.partners = []
    state.published_at = null
  }
}

const getters = {
  getCurrentNews: state => state
}

export const actions = {
  setNews ({ commit }, news) {
    commit(MutationTypes.SET_CURRENT_NEWS, news)
  },

  setNewsTitle ({ commit }, title) {
    commit(MutationTypes.SET_NEWS_TITLE, title)
  },

  setNewsBanner: underLoadingFunction(async ({ commit }, image) => {
    const response = await FilesService.saveImage(image)
    commit(MutationTypes.SET_NEWS_BANNER, response.data.url)
    return response
  }),

  toggleNewsActive: underLoadingFunction(async ({ commit }, news) => {
    const payload = { publish: news.status }
    const id = `${news.id}`

    const response = await NewsService.patch(payload, id)
    commit(MutationTypes.SET_STATUS, news.status)
    return response
  }),

  deleteNews: underLoadingFunction(async ({ commit }, id) => {
    const response = await NewsService.delete(`${id}`)
    commit(MutationTypes.RESET_NEWS)
    return response
  }),

  patchNews: underLoadingFunction(async ({ commit }, news) => {
    const payload = news
    return NewsService.patch(payload, `${news.id}`)
  }),

  postNews: underLoadingFunction(async ({ commit }, news) => NewsService.post(news)),

  setNewsContent ({ commit }, color) {
    commit(MutationTypes.SET_NEWS_CONTENT, color)
  },

  setNewsPartners ({ commit }, partners) {
    commit(MutationTypes.SET_NEWS_PARTNERS, partners)
  },

  resetNews ({ commit }) {
    commit(MutationTypes.RESET_NEWS)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
