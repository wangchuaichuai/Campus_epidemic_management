import Vue from 'vue'
import App from './App'
import store from './store'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
Vue.config.productionTip = false
Vue.prototype.ali_app = 'https://www.zgnnet.com/api/ali_app/'
Vue.prototype.$store = store;
App.mpType = 'app'


if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
}else{
    console.log('生产环境')
}

const app = new Vue({
	store,
    ...App
})
app.$mount()
