import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

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
