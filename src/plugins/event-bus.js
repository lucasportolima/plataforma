import Vue from 'vue'

const EventBus = class {
  constructor () {
    this.vue = new Vue()
  }

  publish (event, data = null) {
    if (_.isEmpty(event)) {
      this.throwUndefined()
    }

    this.vue.$emit(event, data)
  }

  subscribe (event, callback) {
    if (_.isEmpty(event)) {
      this.throwUndefined()
    }

    this.vue.$on(event, callback)
  }

  unsubscribe (event, callback = null) {
    if (_.isEmpty(event)) {
      this.throwUndefined()
    }

    this.vue.$off(event, callback)
  }

  // private functions
  throwUndefined () {
    throw new Error('Event must be defined')
  }
}

export default new EventBus()
