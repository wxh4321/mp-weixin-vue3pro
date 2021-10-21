import { createStore, createLogger, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import mutations from './mutations'
import modules from './modules'


export const key = Symbol()

const store = createStore({
  strict: true,
  mutations,
  actions: {},
  modules: { ...modules },
  plugins:
    process.env.NODE_ENV !== 'production'
      ? [
          createLogger(),
          createPersistedState({
            paths: ['news', ]
          })
        ]
      : [
          createPersistedState({
            paths: ['news', ]
          })
        ]
})

export default store
