import App from './App';
import store from './store';
// import {
//     createApp
// } from 'vue';
import Vue from 'vue';
import qs from 'qs';
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$adpid = "1111111111"
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
App.mpType = 'app'

Vue.prototype.$qs = qs //即可直接使用  this.$qs
const app = new Vue({
	store,
	...App
})
app.$mount();
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	app.config.globalProperties.$adpid = "1111111111"
	app.config.globalProperties.$backgroundAudioData = {
		playing: false,
		playTime: 0,
		formatedPlayTime: '00:00:00'
	}
	return {
		app
	}
}

// import App from './App.vue'
// createApp(App).mount()
