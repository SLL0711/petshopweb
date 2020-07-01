import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index"
import elementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import Request from './network/request'
import { Msg, getLocalStorageToken } from './common/util'

Vue.prototype.myRequest = Request;
Vue.prototype.Msg = Msg;

Vue.config.productionTip = false

Vue.use(elementUI)

// 配置全局前置守卫，防止未登入情况下访问授权页面
router.beforeEach((to, from, next) => {
  if (to.fullPath != '/login') {
    //判断当前是否登录态
    if (!getLocalStorageToken()) {
      next('/login')
      return;
    }
  }
  next();
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  // store
})
