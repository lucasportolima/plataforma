import * as MutationTypes from '@/store/helpers/mutation-types'

const state = {
  topicInFocus: ''
}

export const mutations = {
  [MutationTypes.SET_TOPIC_IN_FOCUS] (state, topic) {
    state.topicInFocus = topic
  }
}

const getters = {
  getTopicInFocus: (state) => {
    return state.topicInFocus
  }
}

export const actions = {
  setTopicInFocus ({ commit }, topic) {
    commit(MutationTypes.SET_TOPIC_IN_FOCUS, topic)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
