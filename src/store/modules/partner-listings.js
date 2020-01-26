import * as MutationTypes from '@/store/helpers/mutation-types'
import { underLoadingFunction } from '@/store/helpers/under-loading'

import FeatureService from '@/network/services/features/feature-service'
import PartnerService from '@/network/services/partner/partner-service.js'

const state = {
  features: [],
  partnerListing: [],
  partnerListingTotal: undefined
}

export const mutations = {
  [MutationTypes.SET_AVAILABLE_FEATURES] (state, features) {
    state.features = features
  },

  [MutationTypes.SET_PARTNER_LISTING] (state, partners) {
    state.partnerListing = partners.data
    state.partnerListingTotal = partners.total
  }
}

const getters = {
  availableFeatures: state => state.features,
  partnerListing: state => state.partnerListing,
  partnerListingTotal: state => state.partnerListingTotal
}

export const actions = {
  deleteMultiplePartner: underLoadingFunction(async ({ commit }, ids) => PartnerService.deleteBulk(ids)),

  getAvailableFeatures: underLoadingFunction(async ({ commit }) => {
    const response = await FeatureService.get()
    commit(MutationTypes.SET_AVAILABLE_FEATURES, response.data)
    return response
  }),

  getPartnerListing: underLoadingFunction(async ({ commit }, offset = 1, limit = 8) => {
    const response = await PartnerService.list(offset, limit)
    commit(MutationTypes.SET_PARTNER_LISTING, response.data)
    return response
  }),

  getPartnerListingSearch: underLoadingFunction(async ({ commit }, searchString, offset = 1, limit = 8) => {
    const response = await PartnerService.searchPartner(searchString, offset, limit)
    commit(MutationTypes.SET_PARTNER_LISTING, response.data)
    return response
  }),

  toggleMultiplePartnerStatus: underLoadingFunction(async ({ commit }, partner) => {
    const payload = {
      active: partner.status,
      ids: partner.ids
    }
    return PartnerService.bulkPatch(payload)
  })

}

export default {
  state,
  mutations,
  getters,
  actions
}
