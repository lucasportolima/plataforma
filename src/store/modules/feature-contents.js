import * as MutationTypes from '@/store/helpers/mutation-types'
import { underLoadingFunction } from '@/store/helpers/under-loading'

import FeatureContentsService from '@/network/services/features/feature-contents-service.js'

const state = {
  featuresContents: []
}

export const mutations = {
  [MutationTypes.SET_AVAILABLE_FEATURES_CONTENTS] (state, featuresContents) {
    state.featuresContents = featuresContents
  }
}

const getters = {
  availableFeaturesContents: state => state.featuresContents
}

export const actions = {
  getAvailableFeaturesContents: underLoadingFunction(async ({ commit }, payload) => {
    const response = await FeatureContentsService.getFeatureContentsAvaliable(payload)
    commit(MutationTypes.SET_AVAILABLE_FEATURES_CONTENTS, response.data)
    return response
  }),

  editAvailableFeaturesContents: underLoadingFunction(async ({ commit }, editedInfos) => {
    const payload = {
      partnerId: editedInfos.partnerId,
      contents: editedInfos.contents
    }
    return FeatureContentsService.bulkPatch(payload)
  })
}

export default {
  state,
  mutations,
  getters,
  actions
}
