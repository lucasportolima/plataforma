import _ from 'lodash'
import http from '@/config/http'

class BaseService {
  constructor (resource) {
    this.http = http
    this.resource = resource
  }

  get (params) {
    let request = this.resource
    let options

    if (typeof params === 'string' || typeof params === 'number') {
      // Ex. GET /resource/featured
      request = `${this.resource}/${params}`
    } else {
      // Ex. GET /resource?featured=1&active=1
      options = { params }
    }

    return http.get(request, options)
  }

  patch (body, route) {
    let { resource } = this

    if (_.isEmpty(route) === false) {
      resource = `${this.resource}/${route}`
    }

    return http.patch(resource, body)
  }

  post (body, route, config) {
    let { resource } = this

    if (_.isEmpty(route) === false) {
      resource = `${this.resource}/${route}`
    }

    return http.post(resource, body, config)
  }

  put (body, route) {
    let { resource } = this

    if (_.isEmpty(route) === false) {
      resource = `${this.resource}/${route}`
    }

    return http.put(resource, body)
  }

  delete (params) {
    let request = this.resource
    let options

    if (typeof params === 'string') {
      // Ex. DELETE /resource/featured
      request = `${this.resource}/${params}`
    } else {
      // Ex. DELETE /resource?featured=1&active=1
      options = { params }
    }

    return http.delete(request, options)
  }
}

export default BaseService
