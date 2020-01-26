import * as MutationTypes from '@/store/helpers/mutation-types'
import { underLoadingFunction } from '@/store/helpers/under-loading'

import AssessmentsService from '@/network/services/assessments/assessments-service'

const state = {
  assessmentsListing: [],
  assessmentsListingTotal: undefined
}

export const mutations = {
  [MutationTypes.SET_ASSESSMENTS_LISTING] (state, assessments) {
    state.assessmentsListing = assessments.data
    state.assessmentsListingTotal = assessments.total
  }
}

const getters = {
  assessmentsListing: state => state.assessmentsListing,
  assessmentsListingTotal: state => state.assessmentsListingTotal
}

export const actions = {
  getAssessmentsListing: underLoadingFunction(async ({ commit }, offset = 1, limit = 8) => {
    const response = await AssessmentsService.list(offset, limit)
    commit(MutationTypes.SET_ASSESSMENTS_LISTING, response.data)
    return response
  }),

  getAssessmentsListingSearch: underLoadingFunction(async ({ commit }, searchAssessments, offset = 1, limit = 8) => {
    const response = await AssessmentsService.searchAssessments(searchAssessments, offset, limit)
    commit(MutationTypes.SET_ASSESSMENTS_LISTING, response.data)
    return response
  })

}

export default {
  state,
  mutations,
  getters,
  actions
}
