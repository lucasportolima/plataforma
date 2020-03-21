import * as MutationTypes from '@/store/helpers/mutation-types'

const state = {
  styleModes: {
    dark: {
      gray: '#2b2b2b',
      blue: '#337093',
      background: '#2b2b2b',
      fontColor: '#e8e8e8',
      blueShadow: '#2e4959'
    },
    light: {
      gray: '#515151',
      blue: '#4599ca',
      background: '#e8e8e8',
      fontColor: '#2b2b2b',
      blueShadow: '#546874'
    }
  },
  styleModeSelected: 'dark'
}

export const mutations = {
  [MutationTypes.SET_STYLE_MODE_SELECTED] (state, mode) {
    state.styleModeSelected = mode
  }
}

const getters = {
  getStyleModeSelected: (state) => {
    const secondaryMode = Object.keys(state.styleModes).filter(el => el !== state.styleModeSelected)[0]
    return {
      primary: state.styleModes[state.styleModeSelected],
      secondary: state.styleModes[secondaryMode]
    }
  },
  getModeSelected: state => state.styleModeSelected,
  isDarkModeSelected: state => state.styleModeSelected === 'dark'
}

export const actions = {
  setStyleModeSelected ({ commit }, mode) {
    commit(MutationTypes.SET_STYLE_MODE_SELECTED, mode)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
