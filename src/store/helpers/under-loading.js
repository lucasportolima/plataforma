export function underLoadingFunction (actionFn) {
  return async function (context, payload) {
    context.commit('setLoadingState', true, { root: true })
    try {
      return await actionFn.call(this, context, payload)
    } finally {
      context.commit('setLoadingState', false, { root: true })
    }
  }
}
