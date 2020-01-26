import * as MutationTypes from '@/store/helpers/mutation-types'
import { underLoadingFunction } from '@/store/helpers/under-loading'

import FilesService from '@/network/services/files/files-service'
import PartnerService from '@/network/services/partner/partner-service'

const state = {
  id: undefined,
  name: undefined,
  company_id: undefined,
  business_unit_id: undefined,
  onesignal_app_id: undefined,
  logo_url: undefined,
  icon_url: undefined,
  domains: [],
  colors: [],
  active: true,
  features: []
}

export const mutations = {
  [MutationTypes.SET_PARTNER] (state, partner) {
    state.id = partner.id
    state.name = partner.name
    state.logo_url = partner.logo_url
    state.icon_url = partner.icon_url
    state.colors = partner.colors
    state.active = partner.active
    state.features = partner.features
    state.company_id = partner.company_id
    state.business_unit_id = partner.business_unit_id
    state.onesignal_app_id = partner.onesignal_app_id
    state.domains = partner.domains
  },

  [MutationTypes.SET_NAME] (state, name) {
    state.name = name
  },

  [MutationTypes.SET_COMPANY] (state, companyId) {
    state.company_id = companyId
  },

  [MutationTypes.SET_BUSINESS] (state, businessUnitId) {
    state.business_unit_id = businessUnitId
  },

  [MutationTypes.SET_ONESIGNAL] (state, onesignalId) {
    state.onesignal_app_id = onesignalId
  },

  [MutationTypes.SET_LOGO] (state, url) {
    state.logo_url = url
  },

  [MutationTypes.SET_ICON] (state, url) {
    state.icon_url = url
  },

  [MutationTypes.SET_STATUS] (state, status) {
    state.active = status
  },

  [MutationTypes.SET_COLOR] (state, color) {
    state.colors.splice(color.order, 1, color.value)
  },

  [MutationTypes.SET_DOMAIN] (state, domain) {
    state.domains.splice(domain.order, 1, domain.name)
  },

  [MutationTypes.REMOVE_DOMAIN] (state, domain) {
    state.domains.splice(state.domains.indexOf(domain.name), 1)
  },

  [MutationTypes.SET_FEATURES] (state, features) {
    state.features = features
  },

  [MutationTypes.RESET_PARTNER] (state) {
    state.id = null
    state.name = null
    state.company_id = null
    state.business_unit_id = null
    state.onesignal_app_id = null
    state.logo_url = null
    state.icon_url = null
    state.colors = []
    state.domains = []
    state.active = true
    state.features = []
  }
}

const getters = {
  getCurrentPartner: state => state
}

export const actions = {
  setPartner ({ commit }, partner) {
    commit(MutationTypes.SET_PARTNER, partner)
  },

  setPartnerName ({ commit }, name) {
    commit(MutationTypes.SET_NAME, name)
  },

  setCompanyId ({ commit }, companyId) {
    commit(MutationTypes.SET_COMPANY, companyId)
  },

  setBusinessUnitId ({ commit }, businessUnitId) {
    commit(MutationTypes.SET_BUSINESS, businessUnitId)
  },

  setOnesignalId ({ commit }, onesignalId) {
    commit(MutationTypes.SET_ONESIGNAL, onesignalId)
  },

  setPartnerLogo: underLoadingFunction(async ({ commit }, image) => {
    const response = await FilesService.saveImage(image)
    commit(MutationTypes.SET_LOGO, response.data.url)
    return response
  }),

  setPartnerIcon: underLoadingFunction(async ({ commit }, image) => {
    const response = await FilesService.saveImage(image)
    commit(MutationTypes.SET_ICON, response.data.url)
    return response
  }),

  togglePartnerActive: underLoadingFunction(async ({ commit }, partner) => {
    const payload = { active: partner.status }
    const id = `${partner.id}`

    const response = await PartnerService.patch(payload, id)
    commit(MutationTypes.SET_STATUS, partner.status)
    return response
  }),

  deletePartner: underLoadingFunction(async ({ commit }, id) => {
    const response = await PartnerService.delete(`${id}`)
    commit(MutationTypes.RESET_PARTNER)
    return response
  }),

  patchPartner: underLoadingFunction(async ({ commit }, partner) => {
    const payload = partner
    return PartnerService.patch(payload, `${partner.id}`)
  }),

  postPartner: underLoadingFunction(async ({ commit }, partner) => {
    const payload = partner
    return PartnerService.post(payload)
  }),

  setPartnerColor ({ commit }, color) {
    commit(MutationTypes.SET_COLOR, color)
  },

  setPartnerDomain ({ commit }, domain) {
    commit(MutationTypes.SET_DOMAIN, domain)
  },

  removePartnerDomain ({ commit }, domain) {
    commit(MutationTypes.REMOVE_DOMAIN, domain)
  },

  setPartnerFeatures ({ commit }, features) {
    commit(MutationTypes.SET_FEATURES, features)
  },

  resetPartner ({ commit }) {
    commit(MutationTypes.RESET_PARTNER)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
