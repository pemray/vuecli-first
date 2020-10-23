// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jq from 'jquery'
import vueAxios from 'vue-axios'
import axios from 'axios'
import store from '@/store/index'
// 自定义toast
import toast from '@/components/common/Toast/index.js'
// 平台原始js
import '../src/css/style.css'
import '../src/css/weui.css'
import '../src/icon/iconfont.css'

Vue.use(toast)
Vue.use(vueAxios, axios)
Vue.config.productionTip = false
// 设置路由守卫
router.beforeEach((to, from, next) => {
  // 路由前置钩子,可做一些逻辑判断,是否调转
  // 检测登录用户缓存数据是否存在,部分路由不做判断
  const noCheckUserDataRouter = ['/', '/login', '/forgetPwd']
  if (!noCheckUserDataRouter.some(p => p === to.path || p === to.name)) {
    let agent = window.localStorage.getItem('Agent') || '{}'
    agent = JSON.parse(agent)
    if (agent.MemberID) {
      if (!store.state.Agent.MemberID) {
        // 设置公共数据
        store.commit('RefreshAgent', agent)
      }
      next()
    } else next({ name: 'login' })
  } else next()
})
router.afterEach((to, from) => {
  // 路由后置钩子,不会改变导航本身
})
/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App, jq },
  template: '<App/>',
  watch: {
    $route (to, from) {
      document.title = this.$route.meta.title || '八零爸爸-代理商'
    }
  }
})
const weui = require('@/js/weui.min.js')
// 挂载数据
Object.defineProperty(window, '$', { value: jq })
Object.defineProperty(window, 'weui', { value: weui.weui })
Object.defineProperty(Vue.prototype, '$weui', { value: weui.weui })

// 测试代码.
// Object.defineProperty(window, 'vm', { value: vm })
console.log('vm is load. _uid ' + vm._uid)
