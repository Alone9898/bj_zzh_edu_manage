import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './vuex/index';
import axios from './service/axios';
import dayjs from "dayjs"
import ElementUI from 'element-ui';
import './service/common';
import 'element-ui/lib/theme-chalk/index.css';
import './css/common.scss';
Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.prototype.dayjs = dayjs;
Vue.use(ElementUI, {  size: 'small' })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
