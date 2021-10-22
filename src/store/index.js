import { createStore, createLogger, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import mutations from './mutations'
import modules from './modules'
import * as Cookies from "js-cookie";

console.log('env is ',process.env.NODE_ENV)
const storeParams = {
	paths: ['news', ],
	storage: {
		getItem: (key) => Cookies.get(key),
		// Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
		setItem: (key, value) =>
		  Cookies.set(key, value, { expires: 3, secure: true }),
		removeItem: (key) => Cookies.remove(key),
	  },
};
const store = createStore({
  strict: true,
  mutations,
  actions: {},
  modules: { ...modules },
  plugins:
    process.env.NODE_ENV !== 'production'
      ? [
          createLogger(),
          createPersistedState(storeParams)
        ]
      : [
          createPersistedState(storeParams)
        ]
})

export default store