import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@fortawesome/fontawesome-free/css/all.css'
import {
  checkLogin
} from './api/index'
// import '@/api/mock'

import log from './util/log'

Vue.use(iView)

window.log = log

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (to.name == "login") {
    checkLogin().then(res => {
      if (res.code === -1) {
        next()
      } else {
        next("/examination")
      }
    })
  } else if (to.path == "/") {
    next("/examination")
  } else {
    checkLogin().then(res => {
      if (res.code === -1) {
        next("/login")
      } else {
        next()
      }
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
