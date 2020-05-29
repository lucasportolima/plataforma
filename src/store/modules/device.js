import * as MutationTypes from '@/store/helpers/mutation-types'

const MOBILE_MAX_WITCH = 400

const state = {
  isMobile: false
}

export const mutations = {
  [MutationTypes.SET_DEVICE] (state, isMobile) {
    state.isMobile = isMobile
  }
}

const getters = {
  isMobile: state => state.isMobile
}

export const actions = {
  setDevice ({ commit }, witch) {
    commit(
      MutationTypes.SET_DEVICE,
      witch <= MOBILE_MAX_WITCH
    )
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
