import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Home.vue'
import {
  checkLogin
} from "./api/index";

/** 管理区 */

Vue.use(Router)

const checkUser = (to, from, next) => {
  console.log("router")
  next()
  checkLogin().then(res => {
    if (res.code == 1) {
      if (res.msg != "adtester") {
        next();
      } else {
        next("/hotkeyword")
      }
    }
  })
};

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      name: 'login',
      component: () => import('./views/Login/Login.vue')
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [{
          path: '/examination',
          name: 'examination',
          component: () => import('./views/Games/Examination.vue'),
          beforeEnter: checkUser
        },
        {
          path: '/direction',
          name: 'direction',
          component: () => import('./views/Games/Direction.vue'),
          beforeEnter: checkUser
        },
        {
          path: '/support',
          name: 'support',
          component: () => import('./views/Games/Support.vue'),
          beforeEnter: checkUser
        },
        {
          path: '/hotkeyword',
          name: 'hotkeyword',
          component: () => import('./views/Games/Hotkeyword.vue')
        },
        {
          path: '/keywordthink',
          name: 'keywordthink',
          component: () => import('./views/Games/Keywordthink.vue')
        },

        {
          path: '/clearlist',
          name: 'clearlist',
          component: () => import('./views/Games/ClearList.vue')
        },
        {
          path: '/KeywordApp',
          name: 'KeywordApp',
          component: () => import('./views/Games/KeywordApp.vue')
        },
        {
          path: '/WechatThink',
          name: 'WechatThink',
          component: () => import('./views/Games/WechatThink.vue')
        },
        {
          path: '/WechatSearch',
          name: 'WechatSearch',
          component: () => import('./views/Games/WechatSearch.vue')
        },
        {
          path: '/BrandRegister',
          name: 'BrandRegister',
          component: () => import('./views/Games/BrandRegister.vue')
        },
      ]
    }
  ]
})
