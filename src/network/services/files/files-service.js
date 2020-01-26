import BaseService from '@/network/base-service'

class FilesService extends BaseService {
  constructor () {
    super(`${process.env.VUE_APP_API_FILES}`)
  }

  saveImage (image) {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    const formData = new FormData()
    formData.append('file', image)

    return this.post(formData, '', config)
  }
}

export default new FilesService()
