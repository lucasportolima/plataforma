import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'
import currentPartner from '@/store/modules/current-partner'
import partnerListings from '@/store/modules/partner-listings'
import currentNews from '@/store/modules/current-news'
import newsListings from '@/store/modules/news-listings'
import assessmentsListings from '@/store/modules/assessments-listings'
import featureContents from '@/store/modules/feature-contents'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: undefined,
    isMenuOpen: false,
    userName: undefined
  },
  getters: {
    isLoading: state => state.isLoading,
    isMenuOpen: state => state.isMenuOpen,
    userName: state => state.userName
  },
  actions: {
    changeLoadingState ({ commit }, loading) {
      commit('setLoadingState', loading)
    },

    toggleMenu ({ commit }) {
      commit('toggleMenu')
    },

    setUserName ({ commit }, userName) {
      commit('setUserName', userName)
    }
  },
  mutations: {
    setLoadingState (state, loading) {
      state.isLoading = loading
    },

    toggleMenu (state) {
      state.isMenuOpen = !state.isMenuOpen
    },

    setUserName (state, userName) {
      state.userName = userName
    }
  },
  modules: {
    currentPartner,
    partnerListings,
    assessmentsListings,
    currentNews,
    newsListings,
    featureContents
  },
  plugins: [createPersistedState({
    key: 'EMBP',
    paths: [
      'currentPartner',
      'partnerListings',
      'assessmentsListings',
      'currentNews',
      'newsListings',
      'featureContents'
    ]
  })]
})
