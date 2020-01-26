import BaseService from '@/network/base-service'

class AssessmentsService extends BaseService {
  constructor () {
    super(`${process.env.VUE_APP_API_PARTNER_CUSTOMIZATION}/assessments`)
  }

  list () {
    return this.get()
  }

  searchAssessments (searchString) {
    return this.get(`?answer=${searchString}`)
  }
}

export default new AssessmentsService()
