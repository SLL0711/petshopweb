import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index"
import elementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import Request from './network/request'
import { Msg } from './common/util'

Vue.prototype.myRequest = Request;
Vue.prototype.Msg = Msg;

Vue.config.productionTip = false

Vue.use(elementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  // store
})
